import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Package, Heart, MapPin, Star, Settings, LogOut, ChevronRight, Truck } from 'lucide-react';

export default function AccountPage() {
  const recentOrders = [
    { id: 'PC8X2K9M', date: '2024-01-15', status: 'Delivered', total: 1847, items: 3 },
    { id: 'PC5N7P3Q', date: '2024-01-08', status: 'In Transit', total: 899, items: 1 },
    { id: 'PC2R4T6W', date: '2024-01-02', status: 'Delivered', total: 2345, items: 4 },
  ];

  const menuItems = [
    { icon: Package, label: 'My Orders', desc: 'Track and manage your orders', path: '/account/orders', count: 12 },
    { icon: Heart, label: 'Wishlist', desc: 'Your saved plants', path: '/wishlist', count: 5 },
    { icon: MapPin, label: 'Addresses', desc: 'Manage delivery addresses', path: '/account/addresses', count: 3 },
    { icon: Star, label: 'Reviews', desc: 'Your product reviews', path: '/account/reviews', count: 8 },
    { icon: Truck, label: 'Service Bookings', desc: 'Booked plantation services', path: '/account/services', count: 2 },
    { icon: Settings, label: 'Settings', desc: 'Account preferences', path: '/account/settings', count: 0 },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-border p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-16 h-16 bg-gradient-green rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              RS
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-text">Rahul Sharma</h1>
              <p className="text-text-muted text-sm">rahul.sharma@email.com • +91 98765 43210</p>
              <p className="text-xs text-text-muted mt-1">Member since January 2023</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-sm text-text-light hover:bg-background transition-colors">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Menu */}
          <div className="lg:col-span-1 space-y-2">
            {menuItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={item.path}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-text">{item.label}</p>
                    <p className="text-xs text-text-muted">{item.desc}</p>
                  </div>
                  {item.count > 0 && (
                    <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">{item.count}</span>
                  )}
                  <ChevronRight className="w-4 h-4 text-text-muted" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-text">Recent Orders</h2>
                <Link to="/account/orders" className="text-sm text-primary font-medium hover:underline">View All</Link>
              </div>
              <div className="space-y-4">
                {recentOrders.map(order => (
                  <div key={order.id} className="flex items-center gap-4 p-4 bg-background rounded-xl border border-border">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Package className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm text-text">#{order.id}</p>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                          order.status === 'Delivered' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-xs text-text-muted mt-0.5">{order.items} items • {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>
                    <p className="font-bold text-text">₹{order.total.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                { label: 'Total Orders', value: '12', icon: Package },
                { label: 'Wishlist', value: '5', icon: Heart },
                { label: 'Reviews', value: '8', icon: Star },
              ].map(stat => (
                <div key={stat.label} className="bg-white rounded-xl border border-border p-4 text-center">
                  <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-text">{stat.value}</p>
                  <p className="text-xs text-text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
