const express = require('express');
const MenuItem = require('../models/MenuItem');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// GET /api/menu — public, everyone can see the menu
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find({ available: true }).sort({ category: 1, group: 1, name: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Could not load menu', error: err.message });
  }
});

// POST /api/menu — admin only, add a new dish
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const item = await MenuItem.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: 'Could not create menu item', error: err.message });
  }
});

// PUT /api/menu/:id — admin only, edit a dish (price, availability, etc.)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!item) return res.status(404).json({ message: 'Menu item not found' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: 'Could not update menu item', error: err.message });
  }
});

// DELETE /api/menu/:id — admin only, remove a dish
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Menu item not found' });
    res.json({ message: 'Menu item deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Could not delete menu item', error: err.message });
  }
});

module.exports = router;
