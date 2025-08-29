# RuralConnect - Rural Communities Platform

A full-stack web application designed to help rural communities easily find and access essential products and services.

## 🌟 Features

### Frontend Features
- **Responsive Homepage**: Attractive UI with Navbar, Hero, Services, Products, News, and Contact sections
- **Product Catalog**: 6+ essential products with search and filter functionality
- **News & Updates**: 2-3 relevant news headlines for rural communities
- **Contact System**: Contact form with address, helpline, and message submission
- **User Authentication**: Complete signup/login flow with protected routes
- **User Dashboard**: Welcome message, profile management, and order tracking
- **Mobile Responsive**: Works seamlessly on both mobile and desktop devices

### Backend Features
- **RESTful APIs**: Complete API endpoints for all features
- **Database Integration**: MongoDB Atlas cloud database with proper data models
- **User Management**: Secure authentication with JWT tokens
- **Product Management**: CRUD operations for products
- **Contact Form Handling**: Store and manage contact submissions
- **Booking System**: Order management and tracking (infrastructure ready)

## 🛠 Technology Stack

### Frontend
- **React.js** v19.1.1 - Frontend framework
- **Vite** v7.1.2 - Build tool and development server
- **React Router** v7.8.2 - Client-side routing
- **Tailwind CSS** v4.1.12 - Utility-first CSS framework
- **Lucide React** v0.542.0 - Icon library
- **Axios** v1.11.0 - HTTP client for API calls

### Backend
- **Node.js** v22.13.1 - JavaScript runtime environment
- **Express.js** v4.18.2 - Web application framework
- **MongoDB** - NoSQL database (MongoDB Atlas cloud)
- **Mongoose** v8.0.3 - MongoDB object modeling tool
- **JWT** v9.0.2 - JSON Web Token for authentication
- **bcryptjs** v2.4.3 - Password hashing
- **cors** v2.8.5 - Cross-Origin Resource Sharing
- **dotenv** v16.3.1 - Environment variables

## 🚀 Getting Started

### Prerequisites
- Node.js v16 or higher
- MongoDB Atlas account (free tier available)
- Git (for version control)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ruralconnect
   ```

2. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ..
   npm install
   ```

4. **Environment Setup**
   
   Create a `.env` file in the `server` directory:
   ```bash
   PORT=5000
   NODE_ENV=development
   
   # MongoDB Atlas Configuration
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/ruralconnect?retryWrites=true&w=majority&appName=Cluster0
   
   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_secure
   
   # CORS Configuration (for development)
   CORS_ORIGIN=http://localhost:5173
   ```

5. **Database Setup**
   
   Seed the database with sample data:
   ```bash
   cd server
   node seed.js
   ```

### Running the Application

1. **Start Backend Server**
   ```bash
   cd server
   npm run dev
   ```
   Backend will run on http://localhost:5000

2. **Start Frontend Development Server**
   ```bash
   cd ..
   npm run dev
   ```
   Frontend will run on http://localhost:5173

3. **Access the Application**
   
   Open your browser and navigate to http://localhost:5173

## 📁 Project Structure

```
ruralconnect/
├── server/                 # Backend Node.js application
│   ├── models/            # MongoDB data models
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── News.js
│   │   ├── Contact.js
│   │   └── Booking.js
│   ├── routes/            # API route definitions
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── services.js
│   │   ├── news.js
│   │   ├── contact.js
│   │   └── bookings.js
│   ├── middleware/        # Custom middleware
│   │   └── auth.js
│   ├── seed.js            # Database seeding script
│   ├── index.js           # Main server file
│   ├── package.json       # Backend dependencies
│   └── .env              # Environment variables
├── src/                   # Frontend React application
│   ├── components/       # React components
│   │   ├── Navbar.jsx
│   │   ├── HeroSection.jsx
│   │   ├── ServicesSection.jsx
│   │   ├── ProductsSection.jsx
│   │   ├── NewsSection.jsx
│   │   ├── ContactSection.jsx
│   │   ├── Spinner.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/           # Page components
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   └── DashboardPage.jsx
│   ├── contexts/        # React contexts
│   │   └── AuthContext.jsx
│   ├── services/        # API services
│   │   ├── api.js
│   │   └── authService.js
│   ├── hooks/           # Custom hooks
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Main App component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static files
├── package.json         # Frontend dependencies
├── vite.config.js       # Vite configuration
├── index.html          # HTML template
├── .gitignore          # Git ignore file
└── README.md           # Project documentation

## 📋 Assignment Requirements Status

### ✅ Completed Requirements

1. **Homepage UI (Frontend)** ✅
   - Navbar with Logo, Home, Services, Products, Contact
   - "Our Services" section with 5+ services (name + icon)
   - "Available Products" section with 6+ products (name + price + icon)
   - "News & Updates" section with 2-3 dummy news headlines
   - "Contact Us" section with address, helpline number & simple form
   - Responsive design (works on mobile and desktop)

2. **User Features (Frontend + Backend)** ✅
   - Signup/Login flow with forms on frontend
   - Users stored in MongoDB Atlas database
   - User dashboard showing welcome message
   - Option to edit profile (basic info)

3. **Backend (API Endpoints)** ✅
   - GET /services — List of service types
   - GET /products — List of products with details
   - POST /register — User registration
   - POST /login — User login
   - GET /news — Return news headlines
   - POST /contact — Store contact form submissions

4. **Booking & Extra Features** ✅
   - Service Booking infrastructure ready (database models, APIs)
   - Product Search and filter functionality implemented
   - User Profile Edit functionality implemented

5. **Tech Stack** ✅
   - Frontend: React.js + Vite
   - Backend: Node.js + Express
   - Database: MongoDB Atlas
   - Additional impressive features: JWT authentication, cloud hosting, responsive design

### 🎯 Demo Credentials

You can test the application with these sample credentials:

- **Email**: demo@ruralconnect.com
- **Password**: demo123

Or register a new account to test the complete flow.

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile` - Get user profile (protected)

### Products
- `GET /api/products` - List all products (with search/filter)
- `GET /api/products/:id` - Get specific product
- `GET /api/products/categories/list` - Get all categories

### Services
- `GET /api/services` - List all services
- `GET /api/services/:id` - Get specific service

### News
- `GET /api/news` - List all news articles
- `GET /api/news/:id` - Get specific news article

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all submissions (admin)

### Bookings
- `POST /api/bookings` - Create new booking (protected)
- `GET /api/bookings/user` - Get user's bookings (protected)
- `GET /api/bookings/:id` - Get specific booking (protected)

## 🔧 Features Covered

### Core Features
- ✅ Full-stack web application with React and Node.js
- ✅ MongoDB Atlas cloud database integration
- ✅ JWT-based authentication system
- ✅ Responsive design for mobile and desktop
- ✅ RESTful API endpoints for all operations
- ✅ Real-time data fetching from cloud database
- ✅ Search and filter functionality
- ✅ Contact form with database storage
- ✅ User dashboard with profile management

### Advanced Features
- ✅ Protected routes with authentication
- ✅ Error handling and loading states
- ✅ Modern UI with Tailwind CSS
- ✅ Icon library integration
- ✅ Form validation
- ✅ CORS configuration
- ✅ Environment variables management
- ✅ Database seeding for development

## 📦 Deployment Guide

The application is fully configured for deployment to production platforms.

### 🚀 Recommended Deployment Stack

- **Frontend**: Vercel (Static site hosting with CI/CD)
- **Backend**: Render (Node.js hosting with auto-deployment)
- **Database**: MongoDB Atlas (Cloud database)

### 📋 Deployment Files Added

The project now includes deployment configuration files:

- **`vercel.json`** - Vercel frontend configuration
- **`render.yaml`** - Render backend configuration  
- **`.env.production`** - Frontend environment variables template
- **`server/.env.production`** - Backend environment variables template
- **Updated `.gitignore`** - Excludes sensitive files and build artifacts

### 🔧 Step-by-Step Deployment Process

#### Phase 1: GitHub Repository Setup
1. **Initialize Git Repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: RuralConnect application"
   ```

2. **Create GitHub Repository**:
   - Go to GitHub.com
   - Create new repository named "ruralconnect"
   - Copy the repository URL

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/your-username/ruralconnect.git
   git branch -M main
   git push -u origin main
   ```

#### Phase 2: Frontend Deployment (Vercel)

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**:
   ```bash
   vercel
   ```
   - Follow the prompts to link to your Vercel account
   - Choose project settings
   - Deploy the frontend

3. **Configure Environment Variables on Vercel**:
   - Go to your Vercel dashboard
   - Select your project
   - Go to Settings → Environment Variables
   - Add the following variables:
     ```
     VITE_API_URL=https://your-backend-name.onrender.com/api
     VITE_FRONTEND_URL=https://your-frontend-name.vercel.app
     ```

4. **Configure Custom Domain** (optional):
   - In Vercel dashboard, go to Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

#### Phase 3: Backend Deployment (Render)

1. **Sign up for Render.com**:
   - Go to render.com and create an account
   - Connect your GitHub account

2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect to your GitHub repository
   - Select the "ruralconnect" repository

3. **Configure Service Settings**:
   - **Name**: ruralconnect-backend
   - **Runtime**: Node
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Instance Type**: Free (to start)

4. **Add Environment Variables**:
   ```bash
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/ruralconnect?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-secure-for-production
   CORS_ORIGIN=https://your-frontend-name.vercel.app
   FRONTEND_URL=https://your-frontend-name.vercel.app
   ```

5. **Deploy the Backend**:
   - Click "Create Web Service"
   - Render will automatically deploy your backend
   - Note the deployed URL (e.g., `https://ruralconnect-backend.onrender.com`)

#### Phase 4: Final Configuration

1. **Update Frontend Environment Variables**:
   - Go back to Vercel dashboard
   - Update `VITE_API_URL` to point to your Render backend URL
   - Redeploy the frontend

2. **Update MongoDB Atlas IP Whitelist**:
   - Go to MongoDB Atlas dashboard
   - Network Access → IP Access List
   - Add Render's IP addresses (check Render docs for current IPs)
   - Add Vercel's IP addresses if needed

3. **Test the Deployed Application**:
   - Visit your frontend URL
   - Test all features (registration, login, products, checkout)
   - Verify database operations are working

### 🔄 Alternative Deployment Options

#### Netlify (Frontend Alternative)
1. **Connect to Netlify**:
   ```bash
   npm install netlify-cli -g
   netlify login
   netlify deploy --prod
   ```

2. **Configure Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`

#### Heroku (Backend Alternative)
1. **Install Heroku CLI**:
   ```bash
   npm install -g heroku
   ```

2. **Deploy to Heroku**:
   ```bash
   heroku login
   heroku create ruralconnect-backend
   git push heroku main
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_jwt_secret
   ```

### 📊 Production Checklist

- [ ] GitHub repository created and pushed
- [ ] Vercel frontend deployed
- [ ] Render backend deployed
- [ ] Environment variables configured on both platforms
- [ ] MongoDB Atlas IP whitelist updated
- [ ] CORS properly configured for production URLs
- [ ] All API endpoints tested in production
- [ ] User authentication working
- [ ] Database operations functioning
- [ ] Checkout process working end-to-end
- [ ] Mobile responsiveness verified
- [ ] Custom domain configured (optional)

### 🔍 Troubleshooting Common Issues

#### CORS Issues
```javascript
// Make sure CORS_ORIGIN matches your frontend URL exactly
CORS_ORIGIN=https://your-frontend-name.vercel.app
```

#### Environment Variables Not Loading
- Verify variable names match exactly
- Check that variables are set in the correct environment
- Restart the deployment after changing variables

#### Database Connection Issues
- Verify MongoDB Atlas connection string
- Check IP whitelist in MongoDB Atlas
- Ensure database user has proper permissions

#### Build Failures
- Check Node.js version compatibility
- Verify all dependencies are properly installed
- Review build logs for specific error messages

### 📈 Monitoring and Maintenance

#### Application Monitoring
- Set up error tracking (Sentry, LogRocket)
- Monitor API response times
- Track user engagement metrics

#### Database Monitoring
- Monitor MongoDB Atlas performance metrics
- Set up alerts for unusual activity
- Regular backup verification

#### Security Maintenance
- Regularly update dependencies
- Monitor for security vulnerabilities
- Rotate JWT secrets periodically

### 💡 Best Practices

#### Security
- Never commit `.env` files to version control
- Use strong, unique JWT secrets
- Implement rate limiting for APIs
- Regular security audits

#### Performance
- Optimize database queries
- Implement caching strategies
- Use CDN for static assets
- Monitor and optimize bundle sizes

#### Reliability
- Implement proper error handling
- Set up health checks
- Use retry logic for external services
- Implement logging and monitoring

---

## 🤝 Contributing

This project was developed as a full-stack web application assignment. The codebase follows modern React and Node.js best practices.

## 📄 License

This project is for educational purposes as part of a full-stack web development assignment.

## 📞 Support

For any questions or issues with the application, please refer to the documentation above or test the application locally using the provided setup instructions.

## 🤝 Contributing

This project was developed as a full-stack web application assignment. The codebase follows modern React and Node.js best practices.

## 📄 License

This project is for educational purposes as part of a full-stack web development assignment.

## 📞 Support

For any questions or issues with the application, please refer to the documentation above or test the application locally using the provided setup instructions.
