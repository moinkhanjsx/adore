const express = require('express');
const News = require('../models/News');

const router = express.Router();

// GET /api/news - List all news articles
router.get('/', async (req, res) => {
  try {
    const news = await News.find({ published: true })
      .sort({ date: -1 })
      .limit(10);

    res.json({
      success: true,
      data: news,
      message: 'News retrieved successfully'
    });
  } catch (error) {
    console.error('News error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching news'
    });
  }
});

// GET /api/news/:id - Get specific news article
router.get('/:id', async (req, res) => {
  try {
    const newsArticle = await News.findById(req.params.id);
    
    if (!newsArticle) {
      return res.status(404).json({
        success: false,
        message: 'News article not found'
      });
    }

    res.json({
      success: true,
      data: newsArticle,
      message: 'News article retrieved successfully'
    });
  } catch (error) {
    console.error('News detail error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching news article'
    });
  }
});

// POST /api/news - Create new news article (admin only)
router.post('/', async (req, res) => {
  try {
    const { title, excerpt, content, author, published } = req.body;

    const newsArticle = new News({
      title,
      excerpt,
      content: content || '',
      author: author || 'RuralConnect Team',
      published: published !== undefined ? published : true
    });

    await newsArticle.save();

    res.status(201).json({
      success: true,
      data: newsArticle,
      message: 'News article created successfully'
    });
  } catch (error) {
    console.error('News creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating news article'
    });
  }
});

module.exports = router;
