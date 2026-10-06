import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, Package, BadgeCheck, Clock, Truck, ChevronRight } from 'lucide-react';
import { vendors, products } from '../data';
import ProductCard from '../components/ProductCard';

export default function NurseryDetailPage() {
  const { slug } = useParams();
  const vendor = vendors.find(v => v.slug === slug);

  if (!vendor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏪</div>
          <h2 className="text-2xl font-bold text-text mb-2">Nursery not found</h2>
          <Link to="/nurseries" className="text-primary font-medium">← Browse Nurseries</Link>
        </div>
      </div>
    );
  }

  const vendorProducts = products.filter(p => p.vendorId === vendor.id);

  return (
    <div className="min-h-screen">
      {/* Cover */}
      <div className="relative h-48 sm:h-64 lg:h-80">
        <img src={vendor.coverImage} alt={vendor.businessName} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        <div className="absolute bottom-6 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-xl">
              {vendor.logo}
            </div>
            <div className="text-white">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl sm:text-3xl font-bold">{vendor.businessName}</h1>
                {vendor.verified && (
                  <BadgeCheck className="w-5 h-5 text-secondary" />
                )}
              </div>
              <div className="flex items-center gap-3 text-sm text-white/80">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{vendor.city}, {vendor.state}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />Since {vendor.joinedYear}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/nurseries" className="hover:text-primary">Nurseries</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-text">{vendor.businessName}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-border p-5 sticky top-24 space-y-4">
              {/* Rating */}
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-warning text-warning" />
                <span className="text-xl font-bold text-text">{vendor.rating}</span>
                <span className="text-sm text-text-muted">({vendor.totalReviews} reviews)</span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-background rounded-xl p-3 text-center">
                  <Package className="w-4 h-4 text-primary mx-auto mb-1" />
                  <p className="text-lg font-bold text-text">{vendor.totalProducts}</p>
                  <p className="text-xs text-text-muted">Products</p>
                </div>
                <div className="bg-background rounded-xl p-3 text-center">
                  <Truck className="w-4 h-4 text-primary mx-auto mb-1" />
                  <p className="text-lg font-bold text-text">{vendor.deliveryRadius}km</p>
                  <p className="text-xs text-text-muted">Delivery</p>
                </div>
              </div>

              {/* Specialties */}
              <div>
                <h3 className="text-sm font-semibold text-text mb-2">Specialties</h3>
                <div className="flex flex-wrap gap-1.5">
                  {vendor.specialties.map(s => (
                    <span key={s} className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">{s}</span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-semibold text-text mb-2">About</h3>
                <p className="text-sm text-text-light leading-relaxed">{vendor.description}</p>
              </div>

              {/* Contact */}
              <button className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors">
                Contact Nursery
              </button>
            </div>
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-text">Plants from {vendor.businessName}</h2>
              <span className="text-sm text-text-muted">{vendorProducts.length} products</span>
            </div>
            {vendorProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
                {vendorProducts.map((product, i) => (
                  <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <ProductCard product={product} index={i} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-border">
                <div className="text-5xl mb-4">🌱</div>
                <h3 className="text-lg font-semibold text-text mb-2">Products coming soon</h3>
                <p className="text-text-muted text-sm">This nursery is updating their catalog</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
