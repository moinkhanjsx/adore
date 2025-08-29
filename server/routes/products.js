const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// GET /api/products - List all products with search and filter
router.get('/', async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};

    // Build search query
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by category
    if (category) {
      query.category = { $regex: category, $options: 'i' };
    }

    const products = await Product.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: products,
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
    const categories = await Product.distinct('category');
    
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
