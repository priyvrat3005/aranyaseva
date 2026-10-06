import { motion } from 'framer-motion';
import { Leaf, Users, MapPin, Award, Heart, TreePine } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-light border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full mb-6">
              <Leaf className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Our Story</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold text-text mb-4">
              Connecting India with<br />
              <span className="text-primary">Nature's Beauty</span>
            </h1>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              PlantConnect is India's largest multi-vendor marketplace for plants, gardening supplies, and plantation services. We bridge the gap between passionate nurseries and plant lovers across the country.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Heart, title: 'Our Mission', desc: 'To make quality plants accessible to every Indian household while empowering local nurseries with a digital marketplace.' },
            { icon: Users, title: 'Our Community', desc: '50,000+ plant lovers, 500+ verified nurseries, and growing every day. We are building India\'s greenest community.' },
            { icon: TreePine, title: 'Our Impact', desc: 'Every purchase supports local nurseries and contributes to a greener India. Together, we\'ve planted 100,000+ trees.' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-border p-8 text-center"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-text mb-2">{item.title}</h3>
              <p className="text-text-light text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-primary-dark py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '500+', label: 'Verified Nurseries' },
              { value: '10,000+', label: 'Plant Varieties' },
              { value: '50,000+', label: 'Happy Customers' },
              { value: '100+', label: 'Cities Served' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold text-secondary mb-1">{stat.value}</div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-text">Why Choose PlantConnect?</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Award, title: 'Verified Nurseries', desc: 'Every nursery is verified for quality, authenticity, and reliability.' },
            { icon: MapPin, title: 'Pan-India Delivery', desc: 'Fresh plants delivered safely to 100+ cities across India.' },
            { icon: Heart, title: 'Plant Care Support', desc: 'Free care guides and expert support for all your plants.' },
            { icon: Leaf, title: 'Fresh & Healthy', desc: 'Plants sourced directly from nurseries, never from warehouses.' },
            { icon: Users, title: 'Expert Community', desc: 'Connect with fellow plant lovers and get advice anytime.' },
            { icon: TreePine, title: 'Green Mission', desc: 'For every 10 orders, we plant a tree in partnership with NGOs.' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex gap-4 p-5 bg-white rounded-2xl border border-border"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-text mb-1">{item.title}</h3>
                <p className="text-sm text-text-light">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-green rounded-3xl p-8 lg:p-14 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">Ready to Start Your Green Journey?</h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">Join thousands of plant parents and discover the joy of nurturing nature at home.</p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            Explore Plants →
          </Link>
        </div>
      </div>
    </div>
  );
}
