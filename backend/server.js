require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const statsRoutes = require('./routes/stats');

const app = express();

app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

/* =========================
   PING ROUTE (KEEP ALIVE)
   ========================= */
app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

/* =========================
   API ROUTES
   ========================= */
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stats', statsRoutes);

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    port: process.env.PORT 
  });
});

/* =========================
   ERROR HANDLER
   ========================= */
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log('==========================================');
  console.log('🚀 FER3OON DASHBOARD SERVER');
  console.log('==========================================');
  console.log(`📡 Server running on port ${PORT}`);
  console.log(`🔐 Admin: ${process.env.ADMIN_USERNAME}`);
  console.log('==========================================');
});
