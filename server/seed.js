const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const News = require('./models/News');

// Load environment variables
dotenv.config();

// Sample data
const sampleProducts = [
  {
    name: 'Rice (5kg)',
    price: 250,
    category: 'Grains',
    image: '🌾',
    description: 'Premium quality rice, perfect for daily meals'
  },
  {
    name: 'Wheat Flour (2kg)',
    price: 120,
    category: 'Grains',
    image: '🌾',
    description: 'Fresh wheat flour for making soft chapatis and breads'
  },
  {
    name: 'Cooking Oil (1L)',
    price: 180,
    category: 'Cooking',
    image: '🫒',
    description: 'Pure cooking oil, ideal for all cooking needs'
  },
  {
    name: 'Sugar (1kg)',
    price: 45,
    category: 'Sweeteners',
    image: '🍚',
    description: 'Refined sugar, perfect for sweetening your tea and desserts'
  },
  {
    name: 'Salt (1kg)',
    price: 25,
    category: 'Spices',
    image: '🧂',
    description: 'Iodized salt, essential for cooking and health'
  },
  {
    name: 'Milk (1L)',
    price: 60,
    category: 'Dairy',
    image: '🥛',
    description: 'Fresh pasteurized milk, rich in calcium'
  },
  {
    name: 'Bread (Pack)',
    price: 40,
    category: 'Bakery',
    image: '🍞',
    description: 'Soft and fresh bread, perfect for breakfast'
  },
  {
    name: 'Eggs (12)',
    price: 90,
    category: 'Dairy',
    image: '🥚',
    description: 'Farm fresh eggs, rich in protein'
  }
];

const sampleNews = [
  {
    title: 'New Mobile Medical Unit Launched in Rural Areas',
    excerpt: 'Government introduces mobile medical units to provide healthcare access to remote villages...',
    content: 'The government has launched a new initiative to provide healthcare access to remote rural areas through mobile medical units. These units will visit villages on a regular schedule, providing basic medical check-ups, vaccinations, and essential medicines.',
    author: 'Health Ministry',
    published: true
  },
  {
    title: 'Digital Payment System Now Available in Local Markets',
    excerpt: 'Local vendors now accept digital payments, making transactions easier for rural communities...',
    content: 'In a major push towards digital inclusion, local markets in rural areas now accept digital payments. This initiative aims to make transactions easier and safer for rural communities.',
    author: 'RuralConnect Team',
    published: true
  },
  {
    title: 'Community Farming Initiative Shows Great Results',
    excerpt: 'Cooperative farming program helps increase crop yields and farmer income by 40%...',
    content: 'A community farming initiative has shown remarkable success, helping farmers increase their crop yields by 40% and improve their income significantly through cooperative farming methods.',
    author: 'Agriculture Department',
    published: true
  }
];

// Connect to MongoDB and seed data
const seedDatabase = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      console.error('MONGODB_URI environment variable is not set');
      process.exit(1);
    }

    await mongoose.connect(mongoURI);
    console.log('MongoDB connected for seeding');

    // Clear existing data
    await Product.deleteMany({});
    await News.deleteMany({});
    console.log('Existing data cleared');

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log('Sample products inserted');

    // Insert sample news
    await News.insertMany(sampleNews);
    console.log('Sample news inserted');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
