const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// GET /api/products - List all products with search and filter
router.get('/', async (req, res) => {
  try {
    const { search, category } = req.query;
    
    // Static products data
    const staticProducts = [
      {
        _id: '1',
        name: 'Rice (5kg)',
        price: 250,
        category: 'Grains',
        image: '🌾',
        description: 'Premium quality rice, perfect for daily meals',
        inStock: true,
        createdAt: new Date()
      },
      {
        _id: '2',
        name: 'Wheat Flour (2kg)',
        price: 120,
        category: 'Grains',
        image: '🌾',
        description: 'Fresh wheat flour for making soft chapatis and breads',
        inStock: true,
        createdAt: new Date()
      },
      {
        _id: '3',
        name: 'Cooking Oil (1L)',
        price: 180,
        category: 'Cooking',
        image: '🫒',
        description: 'Pure cooking oil, ideal for all cooking needs',
        inStock: true,
        createdAt: new Date()
      },
      {
        _id: '4',
        name: 'Sugar (1kg)',
        price: 45,
        category: 'Sweeteners',
        image: '🍚',
        description: 'Refined sugar, perfect for sweetening your tea and desserts',
        inStock: true,
        createdAt: new Date()
      },
      {
        _id: '5',
        name: 'Salt (1kg)',
        price: 25,
        category: 'Spices',
        image: '🧂',
        description: 'Iodized salt, essential for cooking and health',
        inStock: true,
        createdAt: new Date()
      },
      {
        _id: '6',
        name: 'Milk (1L)',
        price: 60,
        category: 'Dairy',
        image: '🥛',
        description: 'Fresh pasteurized milk, rich in calcium',
        inStock: true,
        createdAt: new Date()
      },
      {
        _id: '7',
        name: 'Bread (Pack)',
        price: 40,
        category: 'Bakery',
        image: '🍞',
        description: 'Soft and fresh bread, perfect for breakfast',
        inStock: true,
        createdAt: new Date()
      },
      {
        _id: '8',
        name: 'Eggs (12)',
        price: 90,
        category: 'Dairy',
        image: '🥚',
        description: 'Farm fresh eggs, rich in protein',
        inStock: true,
        createdAt: new Date()
      }
    ];

    let filteredProducts = staticProducts;

    // Apply search filter
    if (search) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply category filter
    if (category) {
      filteredProducts = filteredProducts.filter(product =>
        product.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    res.json({
      success: true,
      data: filteredProducts,
      message: 'Products retrieved successfully'
    });
  } catch (error) {
    console.error('Products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching products'
    });
  }
});

// GET /api/products/categories - Get all categories
router.get('/categories/list', async (req, res) => {
  try {
    // Static categories data
    const categories = [
      'Grains',
      'Cooking',
      'Sweeteners',
      'Spices',
      'Dairy',
      'Bakery'
    ];
    
    res.json({
      success: true,
      data: categories,
      message: 'Categories retrieved successfully'
    });
  } catch (error) {
    console.error('Categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching categories'
    });
  }
});

// GET /api/products/:id - Get specific product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product,
      message: 'Product retrieved successfully'
    });
  } catch (error) {
    console.error('Product detail error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching product'
    });
  }
});

// POST /api/products - Create new product (admin only)
router.post('/', async (req, res) => {
  try {
    const { name, price, category, image, description, inStock } = req.body;

    const product = new Product({
      name,
      price,
      category,
      image: image || '📦',
      description: description || '',
      inStock: inStock !== undefined ? inStock : true
    });

    await product.save();

    res.status(201).json({
      success: true,
      data: product,
      message: 'Product created successfully'
    });
  } catch (error) {
    console.error('Product creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating product'
    });
  }
});

module.exports = router;
