require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const menuRoutes = require('./routes/menu');
const reservationRoutes = require('./routes/reservations');

const app = express();

// --- Database ---
connectDB();

// --- Core middleware ---
app.use(express.json());

const allowedOrigins = (process.env.CLIENT_ORIGIN || '').split(',').map(o => o.trim());
app.use(
  cors({
    origin: function (origin, callback) {
      // allow tools like curl/postman (no origin) and any listed origin
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  })
);

// Basic rate limiting to slow down abuse (especially on auth + reservations)
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 });
app.use('/api/', limiter);

// --- Routes ---
app.get('/', (req, res) => {
  res.json({ message: 'Amogham API is running' });
});
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/reservations', reservationRoutes);

// --- 404 handler ---
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// --- Central error handler ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong on the server' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Amogham API listening on port ${PORT}`));
