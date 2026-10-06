import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Truck, Shield, Leaf, MapPin, Clock, Users, ChevronRight, Sparkles, TreePine } from 'lucide-react';
import { products, categories, vendors, services, testimonials } from '../data';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 8);
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-light">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">India's #1 Plant Marketplace</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text leading-tight mb-6">
                Bring Nature
                <span className="text-primary block">Home</span>
              </h1>
              <p className="text-lg text-text-light mb-8 max-w-lg leading-relaxed">
                Discover thousands of plants from verified nurseries across India. From rare tropicals to easy-care succulents — delivered fresh to your doorstep.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:-translate-y-0.5"
                >
                  Shop Plants
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-accent/30 text-primary font-semibold rounded-xl border border-primary/20 transition-all hover:-translate-y-0.5"
                >
                  <TreePine className="w-4 h-4" />
                  Book Services
                </Link>
              </div>
              {/* Stats */}
              <div className="flex flex-wrap gap-8 mt-10">
                {[
                  { value: '500+', label: 'Nurseries' },
                  { value: '10K+', label: 'Plants' },
                  { value: '50K+', label: 'Happy Customers' },
                ].map(stat => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-text-muted">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&h=700&fit=crop"
                  alt="Beautiful plants"
                  className="w-full max-w-md mx-auto rounded-3xl shadow-2xl shadow-primary/20 object-cover aspect-[4/5]"
                />
              </div>
              {/* Floating cards */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-10 -left-4 bg-white rounded-2xl p-3 shadow-xl flex items-center gap-2"
              >
                <div className="w-10 h-10 bg-accent/30 rounded-xl flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold">Fresh Plants</p>
                  <p className="text-[10px] text-text-muted">Direct from nurseries</p>
                </div>
              </motion.div>
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="absolute bottom-20 -right-4 bg-white rounded-2xl p-3 shadow-xl flex items-center gap-2"
              >
                <div className="w-10 h-10 bg-warning/10 rounded-xl flex items-center justify-center">
                  <Star className="w-5 h-5 text-warning fill-warning" />
                </div>
                <div>
                  <p className="text-xs font-semibold">4.8 Rating</p>
                  <p className="text-[10px] text-text-muted">50K+ reviews</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck, title: 'Free Delivery', desc: 'On orders above ₹499' },
              { icon: Shield, title: 'Secure Payments', desc: '100% safe checkout' },
              { icon: Leaf, title: 'Fresh & Healthy', desc: 'Quality guaranteed' },
              { icon: Clock, title: 'Same Day Dispatch', desc: 'Order before 2 PM' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3 p-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">{title}</p>
                  <p className="text-xs text-text-muted">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-text">Shop by Category</h2>
              <p className="text-text-muted mt-1">Find the perfect plant for every space</p>
            </div>
            <Link to="/shop" className="hidden sm:flex items-center gap-1 text-primary font-medium text-sm hover:gap-2 transition-all">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.slice(0, 12).map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/shop?category=${cat.slug}`}
                  className="group block p-4 bg-white rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all text-center"
                >
                  <div className="text-3xl mb-2">{cat.icon}</div>
                  <h3 className="text-sm font-medium text-text group-hover:text-primary transition-colors">{cat.name}</h3>
                  <p className="text-xs text-text-muted mt-0.5">{cat.productCount} plants</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Plants */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-text">Featured Plants</h2>
              <p className="text-text-muted mt-1">Handpicked by our plant experts</p>
            </div>
            <Link to="/shop" className="hidden sm:flex items-center gap-1 text-primary font-medium text-sm hover:gap-2 transition-all">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-text">🔥 Best Sellers</h2>
              <p className="text-text-muted mt-1">Most loved by our customers</p>
            </div>
            <Link to="/shop" className="hidden sm:flex items-center gap-1 text-primary font-medium text-sm hover:gap-2 transition-all">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {bestSellers.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Nurseries */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-text">Top Nurseries Near You</h2>
              <p className="text-text-muted mt-1">Verified nurseries delivering in your area</p>
            </div>
            <Link to="/nurseries" className="hidden sm:flex items-center gap-1 text-primary font-medium text-sm hover:gap-2 transition-all">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendors.slice(0, 3).map((vendor, i) => (
              <motion.div
                key={vendor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={`/nursery/${vendor.slug}`} className="group block bg-background rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all">
                  <div className="h-36 overflow-hidden">
                    <img src={vendor.coverImage} alt={vendor.businessName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-text group-hover:text-primary transition-colors">{vendor.businessName}</h3>
                        <div className="flex items-center gap-1 text-sm text-text-muted">
                          <MapPin className="w-3 h-3" />
                          {vendor.city}, {vendor.state}
                        </div>
                      </div>
                      {vendor.verified && (
                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">✓ Verified</span>
                      )}
                    </div>
                    <p className="text-sm text-text-muted line-clamp-2 mb-3">{vendor.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-warning text-warning" />
                        <span className="text-sm font-semibold">{vendor.rating}</span>
                        <span className="text-xs text-text-muted">({vendor.totalReviews})</span>
                      </div>
                      <span className="text-xs text-text-muted">{vendor.totalProducts} products</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Plantation Services */}
      <section className="py-16 lg:py-20 bg-gradient-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-text">Plantation Services</h2>
            <p className="text-text-muted mt-2 max-w-lg mx-auto">Book professional gardeners, landscapers & plantation experts near you</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 3).map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={`/services`} className="group block bg-white rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all">
                  <div className="h-44 overflow-hidden">
                    <img src={service.images[0]} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">{service.vendorName}</span>
                      <span className="text-xs text-text-muted">{service.serviceArea}</span>
                    </div>
                    <h3 className="font-bold text-text group-hover:text-primary transition-colors mb-1">{service.name}</h3>
                    <p className="text-sm text-text-muted line-clamp-2 mb-3">{service.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-warning text-warning" />
                        <span className="text-sm font-semibold">{service.rating}</span>
                      </div>
                      <p className="text-primary font-bold">From ₹{service.priceFrom.toLocaleString()}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/services" className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors">
              Explore All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-text">What Our Customers Say</h2>
            <p className="text-text-muted mt-2">Join thousands of happy plant parents</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-background rounded-2xl p-6 border border-border"
              >
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-sm text-text-light mb-4 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/30 rounded-full flex items-center justify-center text-lg">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text">{t.name}</p>
                    <p className="text-xs text-text-muted">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Vendor CTA */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-green rounded-3xl p-8 lg:p-14 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl lg:text-4xl font-bold text-white mb-3">Are You a Nursery or Plant Seller?</h2>
                <p className="text-white/80 text-lg max-w-lg">Join 500+ verified nurseries on PlantConnect and reach thousands of plant lovers across India.</p>
                <div className="flex flex-wrap gap-6 mt-6 justify-center lg:justify-start">
                  {[
                    { icon: Users, text: '50K+ Customers' },
                    { icon: Truck, text: 'Pan-India Delivery' },
                    { icon: Shield, text: 'Secure Payments' },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-white/90">
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Link
                to="/vendor/register"
                className="px-8 py-4 bg-white text-primary font-bold rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all text-lg whitespace-nowrap"
              >
                Become a Vendor →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
