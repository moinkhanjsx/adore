import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { productAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import Spinner from './Spinner';

const ProductsSection = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      fetchProductsWithSearch();
    } else if (products.length > 0) {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getProducts();
      setProducts(response.data.data);
      setFilteredProducts(response.data.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const fetchProductsWithSearch = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getProducts({ search: searchTerm });
      setFilteredProducts(response.data.data);
      setError(null);
    } catch (err) {
      console.error('Error searching products:', err);
      setError('Failed to search products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      return;
    }
    addToCart(product);
  };

  return (
    <section id="products" className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Available Products</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Essential products at affordable prices, delivered to your doorstep
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-400 text-lg">{error}</p>
            <button
              onClick={fetchProducts}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product._id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
                <div className="text-4xl mb-4 text-center">{product.image}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{product.category}</p>
                {product.description && (
                  <p className="text-gray-300 text-sm mb-3">{product.description}</p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-400">₹{product.price}</span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
                    disabled={!product.inStock}
                  >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && !loading && !error && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No products found matching your search.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
