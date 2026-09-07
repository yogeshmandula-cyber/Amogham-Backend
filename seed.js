// Run with: npm run seed
// Populates the database with the full Amogham menu and creates one admin account.
require('dotenv').config();
const connectDB = require('./config/db');
const MenuItem = require('./models/MenuItem');
const User = require('./models/User');

const menuData = [
  // --- Soups ---
  { category: 'Soups & Sides', group: 'Vegetarian Soup', name: 'Tomato Cream Soup', price: 120, isVeg: true },
  { category: 'Soups & Sides', group: 'Vegetarian Soup', name: 'Sweet Corn Soup', price: 120, isVeg: true },
  { category: 'Soups & Sides', group: 'Vegetarian Soup', name: 'Veg Manchow Soup', price: 120, isVeg: true },
  { category: 'Soups & Sides', group: 'Vegetarian Soup', name: 'Lemon Coriander Soup', price: 120, isVeg: true },
  { category: 'Soups & Sides', group: 'Vegetarian Soup', name: 'Hot and Sour Soup', price: 120, isVeg: true },
  { category: 'Soups & Sides', group: 'Non-Vegetarian Soup', name: 'Chicken Corn Soup', price: 140, isVeg: false },
  { category: 'Soups & Sides', group: 'Non-Vegetarian Soup', name: 'Chicken Manchow Soup', price: 140, isVeg: false },
  { category: 'Soups & Sides', group: 'Non-Vegetarian Soup', name: 'Chicken Lemon Coriander Soup', price: 140, isVeg: false },
  { category: 'Soups & Sides', group: 'Non-Vegetarian Soup', name: 'Chicken Hot and Sour Soup', price: 140, isVeg: false },
  { category: 'Soups & Sides', group: 'Non-Vegetarian Soup', name: 'Chicken Garlic Soup', price: 140, isVeg: false },
  { category: 'Soups & Sides', group: 'Sides', name: 'Roasted Papad', price: 40, isVeg: true },
  { category: 'Soups & Sides', group: 'Sides', name: 'Masala Papad', price: 50, isVeg: true },
  { category: 'Soups & Sides', group: 'Sides', name: 'Cucumber Salad', price: 50, isVeg: true },
  { category: 'Soups & Sides', group: 'Sides', name: 'Mixed Salad', price: 50, isVeg: true },
  { category: 'Soups & Sides', group: 'Sides', name: 'Boiled Eggs (2)', price: 40, isVeg: false },
  { category: 'Soups & Sides', group: 'Sides', name: 'Omlette', price: 60, isVeg: false },
  { category: 'Soups & Sides', group: 'Sides', name: 'Plain Curd', price: 40, isVeg: true },
  { category: 'Soups & Sides', group: 'Sides', name: 'Plain Curd Half', price: 20, isVeg: true },

  // --- Vegetarian Starters ---
  { category: 'Starters', group: 'Vegetarian Starters', name: 'Veg Manchurian', price: 210, isVeg: true },
  { category: 'Starters', group: 'Vegetarian Starters', name: 'Crispy Veg', price: 210, isVeg: true, tag: 'Special' },
  { category: 'Starters', group: 'Vegetarian Starters', name: 'Veg Bullets', price: 220, isVeg: true },
  { category: 'Starters', group: 'Vegetarian Starters', name: 'French Fries (Salted)', price: 200, isVeg: true },
  { category: 'Starters', group: 'Vegetarian Starters', name: 'French Fries (Peri-peri)', price: 210, isVeg: true },
  { category: 'Starters', group: 'Vegetarian Starters', name: 'Gobi Manchurian', price: 210, isVeg: true },
  { category: 'Starters', group: 'Vegetarian Starters', name: 'Chilli Gobi', price: 220, isVeg: true },
  { category: 'Starters', group: 'Vegetarian Starters', name: 'Gobi 65', price: 220, isVeg: true },
  { category: 'Starters', group: 'Vegetarian Starters', name: 'Crispy Corn', price: 210, isVeg: true },
  { category: 'Starters', group: 'Vegetarian Starters', name: 'Crispy Baby Corn', price: 250, isVeg: true },
  { category: 'Starters', group: 'Vegetarian Starters', name: 'Chilli Baby Corn', price: 250, isVeg: true },
  { category: 'Starters', group: 'Vegetarian Starters', name: 'Baby Corn 65', price: 250, isVeg: true },
  { category: 'Starters', group: 'Vegetarian Starters', name: 'Mushroom Manchuria', price: 240, isVeg: true },
  { category: 'Starters', group: 'Vegetarian Starters', name: 'Mushroom 65', price: 240, isVeg: true },
  { category: 'Starters', group: 'Vegetarian Starters', name: 'Chilli Mushroom', price: 240, isVeg: true },
  { category: 'Starters', group: 'Vegetarian Starters', name: 'Pepper Mushroom', price: 260, isVeg: true },
  { category: 'Starters', group: 'Vegetarian Starters', name: 'Chilli Paneer', price: 270, isVeg: true },
  { category: 'Starters', group: 'Vegetarian Starters', name: 'Schezwan Paneer', price: 260, isVeg: true },
  { category: 'Starters', group: 'Vegetarian Starters', name: 'Paneer 65', price: 260, isVeg: true },
  { category: 'Starters', group: 'Vegetarian Starters', name: 'Paneer Majestic', price: 260, isVeg: true, tag: 'Special' },
  { category: 'Starters', group: 'Vegetarian Starters', name: 'Pepper Paneer', price: 260, isVeg: true },
  { category: 'Starters', group: 'Vegetarian Starters', name: 'Kaju Paneer 65', price: 260, isVeg: true },
  { category: 'Starters', group: 'Vegetarian Starters', name: 'Paneer Lollipop', price: 260, isVeg: true, tag: 'Special' },
  { category: 'Starters', group: 'Vegetarian Starters', name: 'Kaju Roast', price: 290, isVeg: true, tag: 'Special' },

  // --- Non-Vegetarian Starters ---
  { category: 'Starters', group: 'Non-Vegetarian Starters', name: 'Egg Manchurian', price: 220, isVeg: false },
  { category: 'Starters', group: 'Non-Vegetarian Starters', name: 'Egg 65', price: 220, isVeg: false },
  { category: 'Starters', group: 'Non-Vegetarian Starters', name: 'Chilli Egg', price: 220, isVeg: false },
  { category: 'Starters', group: 'Non-Vegetarian Starters', name: 'Egg Pakoda', price: 220, isVeg: false, tag: 'Special' },
  { category: 'Starters', group: 'Non-Vegetarian Starters', name: 'Chicken Manchurian', price: 260, isVeg: false },
  { category: 'Starters', group: 'Non-Vegetarian Starters', name: 'Chicken 65', price: 260, isVeg: false },
  { category: 'Starters', group: 'Non-Vegetarian Starters', name: 'Chilli Chicken', price: 260, isVeg: false },
  { category: 'Starters', group: 'Non-Vegetarian Starters', name: 'Chicken 555', price: 280, isVeg: false },
  { category: 'Starters', group: 'Non-Vegetarian Starters', name: 'Pepper Chicken', price: 270, isVeg: false },
  { category: 'Starters', group: 'Non-Vegetarian Starters', name: 'Kaju Chicken', price: 280, isVeg: false },
  { category: 'Starters', group: 'Non-Vegetarian Starters', name: 'Fried Chicken', price: 260, isVeg: false },
  { category: 'Starters', group: 'Non-Vegetarian Starters', name: 'Hongkong Chicken', price: 270, isVeg: false },
  { category: 'Starters', group: 'Non-Vegetarian Starters', name: 'Chicken Pakoda', price: 260, isVeg: false },
  { category: 'Starters', group: 'Non-Vegetarian Starters', name: 'Chicken Majestic', price: 270, isVeg: false, tag: 'Special' },
  { category: 'Starters', group: 'Non-Vegetarian Starters', name: 'Chicken Lollipop (6)', price: 270, isVeg: false },
  { category: 'Starters', group: 'Non-Vegetarian Starters', name: 'Chicken Drumsticks (6)', price: 270, isVeg: false },
  { category: 'Starters', group: 'Non-Vegetarian Starters', name: 'Chicken Wings Roast (8)', price: 280, isVeg: false },
  { category: 'Starters', group: 'Non-Vegetarian Starters', name: 'Chicken Ghee Roast', price: 290, isVeg: false, tag: 'Special' },
  { category: 'Starters', group: 'Non-Vegetarian Starters', name: 'Apollo Fish (Dry/Wet)', price: 300, isVeg: false, tag: 'Special' },
  { category: 'Starters', group: 'Non-Vegetarian Starters', name: 'Pepper Fish', price: 300, isVeg: false },
  { category: 'Starters', group: 'Non-Vegetarian Starters', name: 'Chilli Fish', price: 300, isVeg: false },
  { category: 'Starters', group: 'Non-Vegetarian Starters', name: 'Chilli Garlic Fish', price: 310, isVeg: false },
  { category: 'Starters', group: 'Non-Vegetarian Starters', name: 'Chilli Prawns', price: 310, isVeg: false },
  { category: 'Starters', group: 'Non-Vegetarian Starters', name: 'Schezwan Prawns', price: 310, isVeg: false },
  { category: 'Starters', group: 'Non-Vegetarian Starters', name: 'Loose Prawns', price: 310, isVeg: false },
  { category: 'Starters', group: 'Non-Vegetarian Starters', name: 'Pepper Prawns', price: 310, isVeg: false, tag: 'Special' },
  { category: 'Starters', group: 'Non-Vegetarian Starters', name: 'Golden Fried Prawns', price: 310, isVeg: false, tag: 'Special' },

  // --- Tandoori ---
  { category: 'Tandoori', group: 'Vegetarian Tandoori', name: 'Veg Seekh Kabab', price: 250, isVeg: true },
  { category: 'Tandoori', group: 'Vegetarian Tandoori', name: 'Veg Harabhara Kabab', price: 280, isVeg: true, tag: 'Special' },
  { category: 'Tandoori', group: 'Vegetarian Tandoori', name: 'Paneer Tikka Kabab', price: 280, isVeg: true, tag: 'Special' },
  { category: 'Tandoori', group: 'Vegetarian Tandoori', name: 'Malai Paneer Kabab', price: 280, isVeg: true },
  { category: 'Tandoori', group: 'Vegetarian Tandoori', name: 'Paneer Banjara Kabab', price: 280, isVeg: true },
  { category: 'Tandoori', group: 'Non-Vegetarian Tandoori', name: 'Tandoori Chicken (Half)', price: 320, isVeg: false },
  { category: 'Tandoori', group: 'Non-Vegetarian Tandoori', name: 'Tandoori Chicken (Full)', price: 550, isVeg: false },
  { category: 'Tandoori', group: 'Non-Vegetarian Tandoori', name: 'Tangdi Kabab (Half)', price: 200, isVeg: false },
  { category: 'Tandoori', group: 'Non-Vegetarian Tandoori', name: 'Tangdi Kabab (Full)', price: 360, isVeg: false },
  { category: 'Tandoori', group: 'Non-Vegetarian Tandoori', name: 'Chicken Wings Tikka (8)', price: 300, isVeg: false },
  { category: 'Tandoori', group: 'Non-Vegetarian Tandoori', name: 'Chicken Tikka Kabab', price: 310, isVeg: false },
  { category: 'Tandoori', group: 'Non-Vegetarian Tandoori', name: 'Murgh Reshmi Kabab', price: 310, isVeg: false, tag: 'Special' },
  { category: 'Tandoori', group: 'Non-Vegetarian Tandoori', name: 'Murgh Malai Kabab', price: 310, isVeg: false },
  { category: 'Tandoori', group: 'Non-Vegetarian Tandoori', name: 'Murgh Hariyali Kabab', price: 310, isVeg: false },
  { category: 'Tandoori', group: 'Non-Vegetarian Tandoori', name: 'Murgh Banjara Kabab', price: 310, isVeg: false },
  { category: 'Tandoori', group: 'Non-Vegetarian Tandoori', name: 'Mutton Seekh Kabab', price: 360, isVeg: false, tag: 'Special' },
  { category: 'Tandoori', group: 'Non-Vegetarian Tandoori', name: 'Fish Tikka Kabab', price: 310, isVeg: false },
  { category: 'Tandoori', group: 'Non-Vegetarian Tandoori', name: 'Prawns Tikka Kabab', price: 310, isVeg: false, tag: 'Special' },

  // --- Vegetarian Curries ---
  { category: 'Curries', group: 'Vegetarian Curries', name: 'Dal Fry', price: 190, isVeg: true },
  { category: 'Curries', group: 'Vegetarian Curries', name: 'Dal Tadka', price: 190, isVeg: true },
  { category: 'Curries', group: 'Vegetarian Curries', name: 'Kadai Veg', price: 240, isVeg: true },
  { category: 'Curries', group: 'Vegetarian Curries', name: 'Mixed Veg', price: 230, isVeg: true },
  { category: 'Curries', group: 'Vegetarian Curries', name: 'Veg Kolhapuri', price: 240, isVeg: true },
  { category: 'Curries', group: 'Vegetarian Curries', name: 'Veg Marwadi', price: 250, isVeg: true, tag: 'Special' },
  { category: 'Curries', group: 'Vegetarian Curries', name: 'Amogham Special Veg Curry', price: 250, isVeg: true, tag: 'Special' },
  { category: 'Curries', group: 'Vegetarian Curries', name: 'Mushroom Masala', price: 250, isVeg: true },
  { category: 'Curries', group: 'Vegetarian Curries', name: 'Kadai Mushroom', price: 250, isVeg: true },
  { category: 'Curries', group: 'Vegetarian Curries', name: 'Palak Paneer', price: 250, isVeg: true },
  { category: 'Curries', group: 'Vegetarian Curries', name: 'Kadai Paneer', price: 260, isVeg: true },
  { category: 'Curries', group: 'Vegetarian Curries', name: 'Matar Paneer', price: 260, isVeg: true },
  { category: 'Curries', group: 'Vegetarian Curries', name: 'Paneer Butter Masala', price: 260, isVeg: true },
  { category: 'Curries', group: 'Vegetarian Curries', name: 'Methi Chaman', price: 270, isVeg: true, tag: 'Special' },
  { category: 'Curries', group: 'Vegetarian Curries', name: 'Kaju Masala', price: 270, isVeg: true },
  { category: 'Curries', group: 'Vegetarian Curries', name: 'Kaju Paneer Masala', price: 270, isVeg: true, tag: 'Special' },
  { category: 'Curries', group: 'Vegetarian Curries', name: 'Paneer Tikka Masala', price: 270, isVeg: true },
  { category: 'Curries', group: 'Vegetarian Curries', name: 'Shahi Paneer', price: 270, isVeg: true },
  { category: 'Curries', group: 'Vegetarian Curries', name: 'Paneer Chatpata', price: 270, isVeg: true, tag: 'Special' },
  { category: 'Curries', group: 'Vegetarian Curries', name: 'Paneer Maharani', price: 270, isVeg: true, tag: 'Special' },
  { category: 'Curries', group: 'Vegetarian Curries', name: 'Paneer Marwadi', price: 270, isVeg: true, tag: 'Special' },

  // --- Indian Breads ---
  { category: 'Indian Breads', group: 'Breads', name: 'Phulka', price: 20, isVeg: true },
  { category: 'Indian Breads', group: 'Breads', name: 'Butter Phulka', price: 25, isVeg: true },
  { category: 'Indian Breads', group: 'Breads', name: 'Rumali Roti', price: 30, isVeg: true },
  { category: 'Indian Breads', group: 'Breads', name: 'Tandoori Roti', price: 30, isVeg: true },
  { category: 'Indian Breads', group: 'Breads', name: 'Butter Roti', price: 35, isVeg: true },
  { category: 'Indian Breads', group: 'Breads', name: 'Garlic Roti', price: 45, isVeg: true },
  { category: 'Indian Breads', group: 'Breads', name: 'Plain Naan', price: 40, isVeg: true },
  { category: 'Indian Breads', group: 'Breads', name: 'Butter Naan', price: 50, isVeg: true },
  { category: 'Indian Breads', group: 'Breads', name: 'Garlic Naan', price: 60, isVeg: true },
  { category: 'Indian Breads', group: 'Breads', name: 'Masala Kulcha', price: 70, isVeg: true },
  { category: 'Indian Breads', group: 'Breads', name: 'Stuffed Kulcha', price: 70, isVeg: true },
  { category: 'Indian Breads', group: 'Breads', name: 'Paneer Kulcha', price: 80, isVeg: true },
  { category: 'Indian Breads', group: 'Breads', name: 'Aloo Paratha', price: 70, isVeg: true },
  { category: 'Indian Breads', group: 'Breads', name: 'Paneer Paratha', price: 80, isVeg: true },

  // --- Fried Rice / Egg Biryani ---
  { category: 'Rice & Biryani', group: 'Fried Rice & Egg Biryani', name: 'Egg Fried Rice', price: 200, isVeg: false },
  { category: 'Rice & Biryani', group: 'Fried Rice & Egg Biryani', name: 'Egg Schezwan Fried Rice', price: 210, isVeg: false },
  { category: 'Rice & Biryani', group: 'Fried Rice & Egg Biryani', name: 'Egg Garlic Fried Rice', price: 210, isVeg: false },
  { category: 'Rice & Biryani', group: 'Fried Rice & Egg Biryani', name: 'Chicken Fried Rice', price: 230, isVeg: false },
  { category: 'Rice & Biryani', group: 'Fried Rice & Egg Biryani', name: 'Chicken Schezwan Fried Rice', price: 240, isVeg: false },
  { category: 'Rice & Biryani', group: 'Fried Rice & Egg Biryani', name: 'Chicken Garlic Fried Rice', price: 240, isVeg: false },
  { category: 'Rice & Biryani', group: 'Fried Rice & Egg Biryani', name: 'Prawns Fried Rice', price: 250, isVeg: false },
  { category: 'Rice & Biryani', group: 'Fried Rice & Egg Biryani', name: 'Prawns Schezwan Fried Rice', price: 250, isVeg: false },
  { category: 'Rice & Biryani', group: 'Fried Rice & Egg Biryani', name: 'Prawns Garlic Fried Rice', price: 250, isVeg: false },
  { category: 'Rice & Biryani', group: 'Fried Rice & Egg Biryani', name: 'Egg Biryani', price: 200, isVeg: false },
  { category: 'Rice & Biryani', group: 'Fried Rice & Egg Biryani', name: 'Egg Biryani Family Pack', price: 440, isVeg: false },

  // --- Chicken Biryani ---
  { category: 'Rice & Biryani', group: 'Chicken Biryani', name: 'Chicken Dum Biryani Mini', price: 150, isVeg: false },
  { category: 'Rice & Biryani', group: 'Chicken Biryani', name: 'Chicken Dum Biryani Full', price: 250, isVeg: false },
  { category: 'Rice & Biryani', group: 'Chicken Biryani', name: 'Chicken Dum Biryani Family Pack', price: 600, isVeg: false },
  { category: 'Rice & Biryani', group: 'Chicken Biryani', name: 'Chicken Dum Biryani Jumbo Pack', price: 840, isVeg: false },
  { category: 'Rice & Biryani', group: 'Chicken Biryani', name: 'Chicken Fry Piece Biryani', price: 280, isVeg: false, tag: 'Special' },
  { category: 'Rice & Biryani', group: 'Chicken Biryani', name: 'Chicken 65 Biryani', price: 280, isVeg: false },
  { category: 'Rice & Biryani', group: 'Chicken Biryani', name: 'Chicken Lollipop Biryani', price: 290, isVeg: false },
  { category: 'Rice & Biryani', group: 'Chicken Biryani', name: 'Chicken Tangdi Biryani', price: 290, isVeg: false },
  { category: 'Rice & Biryani', group: 'Chicken Biryani', name: 'Chicken Tangdi Biryani Family Pack', price: 620, isVeg: false, tag: 'Special' },
  { category: 'Rice & Biryani', group: 'Chicken Biryani', name: 'Chicken Tandoori Biryani', price: 280, isVeg: false, tag: 'Special' },
  { category: 'Rice & Biryani', group: 'Chicken Biryani', name: 'Chicken Tandoori Biryani Family Pack', price: 580, isVeg: false },
  { category: 'Rice & Biryani', group: 'Chicken Biryani', name: 'Amogham Special Chicken Biryani', price: 280, isVeg: false, tag: 'Special' },
  { category: 'Rice & Biryani', group: 'Chicken Biryani', name: 'Amogham Special Chicken Biryani Family Pack', price: 580, isVeg: false, tag: 'Special' },

  // --- Mutton / Fish / Prawns Biryani ---
  { category: 'Rice & Biryani', group: 'Mutton, Fish & Prawns Biryani', name: 'Mutton Dum Biryani Mini', price: 200, isVeg: false },
  { category: 'Rice & Biryani', group: 'Mutton, Fish & Prawns Biryani', name: 'Mutton Dum Biryani Full', price: 350, isVeg: false },
  { category: 'Rice & Biryani', group: 'Mutton, Fish & Prawns Biryani', name: 'Mutton Dum Biryani Family Pack', price: 770, isVeg: false },
  { category: 'Rice & Biryani', group: 'Mutton, Fish & Prawns Biryani', name: 'Mutton Nalli Gosht Biryani', price: 390, isVeg: false },
  { category: 'Rice & Biryani', group: 'Mutton, Fish & Prawns Biryani', name: 'Mutton Kheema Biryani', price: 390, isVeg: false, tag: 'Special' },
  { category: 'Rice & Biryani', group: 'Mutton, Fish & Prawns Biryani', name: 'Fish Biryani', price: 300, isVeg: false },
  { category: 'Rice & Biryani', group: 'Mutton, Fish & Prawns Biryani', name: 'Prawns Biryani', price: 330, isVeg: false },
  { category: 'Rice & Biryani', group: 'Mutton, Fish & Prawns Biryani', name: 'Mixed Non-Veg Biryani Full', price: 370, isVeg: false, tag: 'Special' },
  { category: 'Rice & Biryani', group: 'Mutton, Fish & Prawns Biryani', name: 'Mixed Non-Veg Biryani Family Pack', price: 730, isVeg: false },

  // --- Desserts & Beverages ---
  { category: 'Desserts & Beverages', group: 'Desserts', name: 'Gulab Jamun (2)', price: 60, isVeg: true },
  { category: 'Desserts & Beverages', group: 'Desserts', name: 'Gulab Jamun (2) with Vanilla Ice Cream', price: 100, isVeg: true },
  { category: 'Desserts & Beverages', group: 'Desserts', name: 'Gajar ka Halwa', price: 80, isVeg: true },
  { category: 'Desserts & Beverages', group: 'Desserts', name: 'Khaddu ka Kheer', price: 70, isVeg: true },
  { category: 'Desserts & Beverages', group: 'Desserts', name: 'Ice Cream Scoop (1)', price: 60, isVeg: true },
  { category: 'Desserts & Beverages', group: 'Beverages', name: 'Virgin Mojito', price: 80, isVeg: true },
  { category: 'Desserts & Beverages', group: 'Beverages', name: 'Blue Lagoon', price: 80, isVeg: true },
  { category: 'Desserts & Beverages', group: 'Beverages', name: 'Mint Mojito', price: 80, isVeg: true },
  { category: 'Desserts & Beverages', group: 'Beverages', name: 'Black Currant Mojito', price: 50, isVeg: true },
  { category: 'Desserts & Beverages', group: 'Beverages', name: 'Fresh Lime Soda (Sweet/Salt/Masala)', price: 20, isVeg: true },
  { category: 'Desserts & Beverages', group: 'Beverages', name: 'Soft Drinks', price: 20, isVeg: true },
  { category: 'Desserts & Beverages', group: 'Beverages', name: 'Water Bottle', price: 20, isVeg: true }
];

async function seed() {
  await connectDB();

  await MenuItem.deleteMany({});
  await MenuItem.insertMany(menuData);
  console.log(`Seeded ${menuData.length} menu items.`);

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@amogham.com';
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await User.create({
      name: 'Amogham Admin',
      email: adminEmail,
      password: process.env.ADMIN_PASSWORD || 'change_this_password',
      role: 'admin'
    });
    console.log(`Admin account created: ${adminEmail}`);
  } else {
    console.log('Admin account already exists, skipping.');
  }

  console.log('Seeding complete.');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
