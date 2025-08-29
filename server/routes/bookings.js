const express = require('express');
const Booking = require('../models/Booking');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

const router = express.Router();

// POST /api/bookings - Create new booking
router.post('/', auth, async (req, res) => {
  try {
    const { items, deliveryAddress, notes } = req.body;
    const userId = req.user._id;

    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one item is required'
      });
    }

    // Calculate total amount and validate products
    let totalAmount = 0;
    const bookingItems = [];

    for (const item of items) {
      // If using static product data, search by string ID
      let product;
      if (item.productId.length !== 24) {
        // This is not a MongoDB ObjectId, so it's likely a static product
        const staticProducts = [
          {
            _id: '1',
            name: 'Rice (5kg)',
            price: 250,
            category: 'Grains',
            image: '🌾',
            description: 'Premium quality rice, perfect for daily meals',
            inStock: true
          },
          {
            _id: '2',
            name: 'Wheat Flour (2kg)',
            price: 120,
            category: 'Grains',
            image: '🌾',
            description: 'Fresh wheat flour for making soft chapatis and breads',
            inStock: true
          },
          {
            _id: '3',
            name: 'Cooking Oil (1L)',
            price: 180,
            category: 'Cooking',
            image: '🫒',
            description: 'Pure cooking oil, ideal for all cooking needs',
            inStock: true
          },
          {
            _id: '4',
            name: 'Sugar (1kg)',
            price: 45,
            category: 'Sweeteners',
            image: '🍚',
            description: 'Refined sugar, perfect for sweetening your tea and desserts',
            inStock: true
          },
          {
            _id: '5',
            name: 'Salt (1kg)',
            price: 25,
            category: 'Spices',
            image: '🧂',
            description: 'Iodized salt, essential for cooking and health',
            inStock: true
          },
          {
            _id: '6',
            name: 'Milk (1L)',
            price: 60,
            category: 'Dairy',
            image: '🥛',
            description: 'Fresh pasteurized milk, rich in calcium',
            inStock: true
          },
          {
            _id: '7',
            name: 'Bread (Pack)',
            price: 40,
            category: 'Bakery',
            image: '🍞',
            description: 'Soft and fresh bread, perfect for breakfast',
            inStock: true
          },
          {
            _id: '8',
            name: 'Eggs (12)',
            price: 90,
            category: 'Dairy',
            image: '🥚',
            description: 'Farm fresh eggs, rich in protein',
            inStock: true
          }
        ];
        product = staticProducts.find(p => p._id === item.productId);
      } else {
        // This is a MongoDB ObjectId, try to find it in the database
        try {
          product = await Product.findById(item.productId);
        } catch (error) {
          console.error('Error finding product:', error);
          product = null;
        }
      }
      
      if (!product) {
        return res.status(400).json({
          success: false,
          message: `Product with ID ${item.productId} not found`
        });
      }

      if (!product.inStock) {
        return res.status(400).json({
          success: false,
          message: `${product.name} is out of stock`
        });
      }

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      bookingItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity
      });
    }

    const booking = new Booking({
      userId,
      items: bookingItems,
      totalAmount,
      deliveryAddress,
      notes: notes || ''
    });

    await booking.save();

    res.status(201).json({
      success: true,
      data: booking,
      message: 'Booking created successfully'
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    console.error('Request body:', req.body);
    res.status(500).json({
      success: false,
      message: 'Server error while creating booking',
      error: error.message
    });
  }
});

// GET /api/bookings/user - Get user's bookings
router.get('/user', auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const bookings = await Booking.find({ userId })
      .sort({ orderDate: -1 })
      .populate('items.productId', 'name image');

    res.json({
      success: true,
      data: bookings,
      message: 'Bookings retrieved successfully'
    });
  } catch (error) {
    console.error('User bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching bookings'
    });
  }
});

// GET /api/bookings/:id - Get specific booking
router.get('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('userId', 'name email phone')
      .populate('items.productId', 'name image category');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user owns the booking or is admin
    if (booking.userId._id.toString() !== req.user._id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      data: booking,
      message: 'Booking retrieved successfully'
    });
  } catch (error) {
    console.error('Booking detail error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching booking'
    });
  }
});

// PUT /api/bookings/:id - Update booking status
router.put('/:id', auth, async (req, res) => {
  try {
    const { status, deliveryDate } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user owns the booking or is admin
    if (booking.userId.toString() !== req.user._id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const updateData = {};
    if (status) updateData.status = status;
    if (deliveryDate) updateData.deliveryDate = deliveryDate;

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({
      success: true,
      data: updatedBooking,
      message: 'Booking updated successfully'
    });
  } catch (error) {
    console.error('Booking update error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating booking'
    });
  }
});

// DELETE /api/bookings/:id - Cancel booking
router.delete('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user owns the booking
    if (booking.userId.toString() !== req.user._id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Only allow cancellation of pending bookings
    if (booking.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Only pending bookings can be cancelled'
      });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json({
      success: true,
      data: booking,
      message: 'Booking cancelled successfully'
    });
  } catch (error) {
    console.error('Booking cancellation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while cancelling booking'
    });
  }
});

module.exports = router;
