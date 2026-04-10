const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const { getRequiredEnv } = require('./utils/env');

dotenv.config();
connectDB();

const app = express();
app.set('trust proxy', 1);

const allowedOrigin = getRequiredEnv('FRONTEND_URL');
const corsOptions = {
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
};

const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const adminRoutes = require('./routes/adminRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

app.use('/api/auth', authRoutes);
app.use('/api', jobRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/payment', paymentRoutes);

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
    setTimeout(() => {
      socket.emit('support_reply', {
        message: getAutoReply(data.message),
        time: new Date().toISOString(),
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
  res.send('AdSky Platform Backend API is running');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
