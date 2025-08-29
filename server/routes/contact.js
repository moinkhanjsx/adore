const express = require('express');
const Contact = require('../models/Contact');

const router = express.Router();

// POST /api/contact - Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name and message are required fields'
      });
    }

    const contactSubmission = new Contact({
      name,
      email,
      phone,
      message
    });

    await contactSubmission.save();

    res.status(201).json({
      success: true,
      data: contactSubmission,
      message: 'Contact form submitted successfully'
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while submitting contact form'
    });
  }
});

// GET /api/contact - Get all contact submissions (admin only)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: contacts,
      message: 'Contact submissions retrieved successfully'
    });
  } catch (error) {
    console.error('Contact retrieval error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching contact submissions'
    });
  }
});

// GET /api/contact/:id - Get specific contact submission (admin only)
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }

    res.json({
      success: true,
      data: contact,
      message: 'Contact submission retrieved successfully'
    });
  } catch (error) {
    console.error('Contact detail error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching contact submission'
    });
  }
});

// PUT /api/contact/:id - Update contact status (admin only)
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }

    res.json({
      success: true,
      data: contact,
      message: 'Contact status updated successfully'
    });
  } catch (error) {
    console.error('Contact update error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating contact status'
    });
  }
});

module.exports = router;
