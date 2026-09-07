const express = require('express');
const Reservation = require('../models/Reservation');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// POST /api/reservations — anyone can request a table
router.post('/', async (req, res) => {
  try {
    const { name, phone, guests, date, time, notes } = req.body;
    if (!name || !phone || !guests || !date || !time) {
      return res.status(400).json({ message: 'Name, phone, guests, date and time are required' });
    }
    const reservation = await Reservation.create({ name, phone, guests, date, time, notes });
    res.status(201).json({ message: 'Reservation request received', reservation });
  } catch (err) {
    res.status(400).json({ message: 'Could not create reservation', error: err.message });
  }
});

// GET /api/reservations — admin only, view all requests
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: 'Could not load reservations', error: err.message });
  }
});

// PUT /api/reservations/:id — admin only, confirm/cancel a request
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
    res.json(reservation);
  } catch (err) {
    res.status(400).json({ message: 'Could not update reservation', error: err.message });
  }
});

module.exports = router;
