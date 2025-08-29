const express = require('express');

const router = express.Router();

// Sample services data
const services = [
  { 
    id: 1, 
    name: 'Medical Supplies', 
    description: 'Essential medicines and health products',
    icon: 'heart'
  },
  { 
    id: 2, 
    name: 'Grocery Delivery', 
    description: 'Fresh groceries and daily essentials',
    icon: 'shopping-cart'
  },
  { 
    id: 3, 
    name: 'Transport Service', 
    description: 'Reliable transport for goods and people',
    icon: 'truck'
  },
  { 
    id: 4, 
    name: 'Emergency Support', 
    description: '24/7 emergency assistance',
    icon: 'phone'
  },
  { 
    id: 5, 
    name: 'Local Markets', 
    description: 'Connect with local vendors',
    icon: 'store'
  },
  { 
    id: 6, 
    name: 'Community Help', 
    description: 'Community support network',
    icon: 'users'
  }
];

// GET /api/services - List all services
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      data: services,
      message: 'Services retrieved successfully'
    });
  } catch (error) {
    console.error('Services error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching services'
    });
  }
});

// GET /api/services/:id - Get specific service
router.get('/:id', (req, res) => {
  try {
    const serviceId = parseInt(req.params.id);
    const service = services.find(s => s.id === serviceId);
    
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.json({
      success: true,
      data: service,
      message: 'Service retrieved successfully'
    });
  } catch (error) {
    console.error('Service detail error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching service'
    });
  }
});

module.exports = router;
