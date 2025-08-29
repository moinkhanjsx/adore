import { Heart, Truck, Phone, ShoppingCart, Store, Users } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    { id: 1, name: 'Medical Supplies', icon: Heart, description: 'Essential medicines and health products' },
    { id: 2, name: 'Grocery Delivery', icon: ShoppingCart, description: 'Fresh groceries and daily essentials' },
    { id: 3, name: 'Transport Service', icon: Truck, description: 'Reliable transport for goods and people' },
    { id: 4, name: 'Emergency Support', icon: Phone, description: '24/7 emergency assistance' },
    { id: 5, name: 'Local Markets', icon: Store, description: 'Connect with local vendors' },
    { id: 6, name: 'Community Help', icon: Users, description: 'Community support network' }
  ];

  return (
    <section id="services" className="py-16 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Services</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Essential services designed to meet the unique needs of rural communities
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.id} 
                className="bg-gray-700 rounded-lg p-6 hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center mb-4">
                  <Icon className="h-8 w-8 text-green-400 mr-3" />
                  <h3 className="text-xl font-semibold text-white">{service.name}</h3>
                </div>
                <p className="text-gray-300">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
