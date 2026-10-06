import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, Package, BadgeCheck, Search } from 'lucide-react';
import { vendors } from '../data';
import { useState } from 'react';

export default function NurseriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredVendors = vendors.filter(v =>
    v.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-light border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-3xl lg:text-4xl font-bold text-text mb-3">Verified Nurseries</h1>
          <p className="text-text-muted max-w-lg mx-auto mb-8">
            Discover trusted nurseries and plant sellers across India. Every vendor is verified for quality and reliability.
          </p>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search by name, city, or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Vendor Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map((vendor, i) => (
            <motion.div
              key={vendor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link to={`/nursery/${vendor.slug}`} className="group block bg-white rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
                {/* Cover Image */}
                <div className="h-40 overflow-hidden relative">
                  <img
                    src={vendor.coverImage}
                    alt={vendor.businessName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <div className="absolute bottom-3 left-4 flex items-center gap-2">
                    <span className="text-2xl">{vendor.logo}</span>
                    <span className="text-white font-bold text-lg">{vendor.businessName}</span>
                  </div>
                  {vendor.verified && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-white/90 rounded-full">
                      <BadgeCheck className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-medium text-primary">Verified</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-sm text-text-muted mb-3">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{vendor.city}, {vendor.state}</span>
                    <span className="text-border">•</span>
                    <span>{vendor.deliveryRadius}km delivery</span>
                  </div>

                  <p className="text-sm text-text-light line-clamp-2 mb-4">{vendor.description}</p>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {vendor.specialties.map(s => (
                      <span key={s} className="px-2 py-0.5 bg-accent/30 text-primary text-xs font-medium rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-warning text-warning" />
                      <span className="text-sm font-semibold text-text">{vendor.rating}</span>
                      <span className="text-xs text-text-muted">({vendor.totalReviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-text-muted">
                      <Package className="w-3.5 h-3.5" />
                      <span>{vendor.totalProducts} products</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredVendors.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-text mb-2">No nurseries found</h3>
            <p className="text-text-muted">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  );
}
