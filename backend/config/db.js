const mongoose = require('mongoose');

const DEFAULT_LOCAL_MONGO_URI = 'mongodb://127.0.0.1:27017/adsky';

const connectionOptions = {
    serverSelectionTimeoutMS: 10000,
};

const getConnectionCandidates = () => {
    const candidates = [];

    if (process.env.MONGO_URI) {
        candidates.push({
            label: 'primary MongoDB connection',
            uri: process.env.MONGO_URI,
        });
    }

    if (process.env.MONGO_URI_LOCAL) {
        candidates.push({
            label: 'local MongoDB connection',
            uri: process.env.MONGO_URI_LOCAL,
        });
    } else if (process.env.NODE_ENV !== 'production') {
        candidates.push({
            label: 'default local MongoDB connection',
            uri: DEFAULT_LOCAL_MONGO_URI,
        });
    }

    return candidates;
};

const isAtlasNetworkError = (error) => {
    const message = [error?.message, error?.cause?.message]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

    return (
        message.includes('mongodb atlas') ||
        message.includes('whitelist') ||
        message.includes('replicasetnoprimary') ||
        message.includes('could not connect to any servers')
    );
};

const connectDB = async () => {
    const candidates = getConnectionCandidates();

    if (!candidates.length) {
        throw new Error('No MongoDB connection string found. Set MONGO_URI or MONGO_URI_LOCAL in the backend environment.');
    }

    let lastError;

    for (const candidate of candidates) {
        try {
            await mongoose.connect(candidate.uri, connectionOptions);
            console.log(`MongoDB connected successfully using ${candidate.label}`);
            return;
        } catch (error) {
            lastError = error;
            await mongoose.disconnect().catch(() => undefined);
            console.error(`MongoDB connection failed using ${candidate.label}: ${error.message}`);
        }
    }

    if (isAtlasNetworkError(lastError)) {
        throw new Error(
            'MongoDB Atlas rejected the connection. Whitelist your current IP in Atlas Network Access or set MONGO_URI_LOCAL for local development.'
        );
    }

    throw lastError;
};

module.exports = connectDB;
