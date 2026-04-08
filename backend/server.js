const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const adminRoutes = require('./routes/adminRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

app.use('/api/auth', authRoutes);
app.use('/api', jobRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/applications', applicationRoutes);

// Socket.io integration for chat support
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    
    socket.on('join_room', (room) => {
        socket.join(room);
        console.log(`User ${socket.id} joined room: ${room}`);
    });

    socket.on('send_message', (data) => {
        socket.to(data.room).emit('receive_message', data);
    });

    socket.on('support_message', (data) => {
        // Simulate bot reply after 1.5s
        setTimeout(() => {
            socket.emit('support_reply', {
                message: getAutoReply(data.message),
                time: new Date().toISOString()
            });
        }, 1500);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

function getAutoReply(message) {
    const msg = message.toLowerCase();
    if (msg.includes('payment') || msg.includes('pay')) return 'Payments are processed within 3-5 business days. For urgent issues, please call our support line.';
    if (msg.includes('job') || msg.includes('apply')) return 'Browse available jobs in the Categories section. You can apply directly from any job listing.';
    if (msg.includes('profile') || msg.includes('kyc')) return 'Complete your profile and KYC in the Profile section to increase your visibility to clients.';
    if (msg.includes('hello') || msg.includes('hi')) return 'Hello! How can I help you today? Feel free to ask any question.';
    return 'Thank you for reaching out. A support agent will review your message shortly. For urgent help, use "Request a Call".';
}

app.get('/', (req, res) => {
    res.send('AdSky Platform Backend API is running ✅');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
