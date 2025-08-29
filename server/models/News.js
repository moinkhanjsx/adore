const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  excerpt: {
    type: String,
    required: true
  },
  content: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    default: Date.now
  },
  author: {
    type: String,
    default: 'RuralConnect Team'
  },
  published: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('News', newsSchema);
