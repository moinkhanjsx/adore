import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const HeroSection = () => {
  const { isAuthenticated } = useAuth();
  return (
    <section className="bg-gradient-to-r from-emerald-500 to-teal-600 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Connecting Rural Communities
        </h1>
        <p className="text-xl text-gray-100 mb-8 max-w-3xl mx-auto">
          Your trusted platform for accessing essential products and services in rural areas
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to={isAuthenticated ? "/dashboard" : "/register"} 
            className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            {isAuthenticated ? "Go to Dashboard" : "Get Started"}
          </Link>
          <Link 
            to="#products" 
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
