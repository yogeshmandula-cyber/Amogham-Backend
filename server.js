require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const connectDB = require('./db');

const authRoutes = require('./auth');
const menuRoutes = require('./menuRoutes');
const reservationRoutes = require('./reservationRoutes');

const app = express();

connectDB();

app.use(express.json());

const allowedOrigins = (process.env.CLIENT_ORIGIN || '').split(',').map(o => o.trim());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  })
);

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 });
app.use('/api/', limiter);

app.get('/', (req, res) => {
  res.json({ message: 'Amogham API is running' });
});
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/reservations', reservationRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong on the server' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Amogham API listening on port ${PORT}`));
