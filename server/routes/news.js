const express = require('express');
const News = require('../models/News');

const router = express.Router();

// GET /api/news - List all news articles
router.get('/', async (req, res) => {
  try {
    // Static news data
    const staticNews = [
      {
        _id: '1',
        title: 'New Mobile Medical Unit Launched in Rural Areas',
        excerpt: 'Government introduces mobile medical units to provide healthcare access to remote villages...',
        content: 'The government has launched a new initiative to provide healthcare access to remote rural areas through mobile medical units. These units will visit villages on a regular schedule, providing basic medical check-ups, vaccinations, and essential medicines.',
        date: new Date(),
        author: 'Health Ministry',
        published: true
      },
      {
        _id: '2',
        title: 'Digital Payment System Now Available in Local Markets',
        excerpt: 'Local vendors now accept digital payments, making transactions easier for rural communities...',
        content: 'In a major push towards digital inclusion, local markets in rural areas now accept digital payments. This initiative aims to make transactions easier and safer for rural communities.',
        date: new Date(Date.now() - 86400000), // 1 day ago
        author: 'RuralConnect Team',
        published: true
      },
      {
        _id: '3',
        title: 'Community Farming Initiative Shows Great Results',
        excerpt: 'Cooperative farming program helps increase crop yields and farmer income by 40%...',
        content: 'A community farming initiative has shown remarkable success, helping farmers increase their crop yields by 40% and improve their income significantly through cooperative farming methods.',
        date: new Date(Date.now() - 172800000), // 2 days ago
        author: 'Agriculture Department',
        published: true
      }
    ];

    res.json({
      success: true,
      data: staticNews,
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
