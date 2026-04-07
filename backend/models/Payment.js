const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['Payout', 'Refund', 'Escrow', 'Commission'], required: true },
    status: { type: String, enum: ['Pending', 'Completed', 'Failed', 'Refunded'], default: 'Pending' },
    transactionId: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now },
    completedAt: { type: Date }
});

module.exports = mongoose.model('Payment', paymentSchema);
