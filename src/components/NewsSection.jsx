import { Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { newsAPI } from '../services/api';
import Spinner from './Spinner';

const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await newsAPI.getNews();
      setNews(response.data.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Failed to load news');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">News & Updates</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Stay informed about the latest developments in rural communities
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-400 text-lg">{error}</p>
            <button
              onClick={fetchNews}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <div key={item._id} className="bg-gray-700 rounded-lg p-6 hover:bg-gray-600 transition-colors">
                <div className="flex items-center text-gray-400 text-sm mb-3">
                  <Clock className="h-4 w-4 mr-2" />
                  {new Date(item.date).toLocaleDateString()}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-gray-300 mb-4">{item.excerpt}</p>
                <button className="text-green-400 hover:text-green-300 font-medium">
                  Read More →
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsSection;
