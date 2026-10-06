import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, CheckCircle2, ArrowRight, Leaf } from 'lucide-react';
import { services } from '../data';

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative bg-gradient-green overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 rounded-full mb-6">
              <Leaf className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Professional Plantation Services</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">
              Expert Gardening &<br />Plantation Services
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Book verified gardeners, landscapers and plantation experts. From home garden setup to corporate plantation — we've got you covered.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Service Types */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
          {[
            { emoji: '🌳', name: 'Tree Plantation' },
            { emoji: '🏡', name: 'Garden Setup' },
            { emoji: '🌿', name: 'Terrace Garden' },
            { emoji: '🎨', name: 'Landscape Design' },
            { emoji: '🏢', name: 'Corporate Green' },
          ].map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-border p-4 text-center hover:border-primary/30 hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="text-3xl mb-2">{item.emoji}</div>
              <p className="text-sm font-medium text-text">{item.name}</p>
            </motion.div>
          ))}
        </div>

        {/* Services Grid */}
        <h2 className="text-2xl font-bold text-text mb-8">Available Services</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all group"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-48 h-48 sm:h-auto overflow-hidden shrink-0">
                  <img
                    src={service.images[0]}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      {service.vendorName}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-text-muted">
                      <MapPin className="w-3 h-3" />
                      {service.serviceArea}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-text group-hover:text-primary transition-colors mb-2">
                    {service.name}
                  </h3>
                  <p className="text-sm text-text-light line-clamp-2 mb-3">{service.description}</p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-1 mb-4">
                    {service.features.slice(0, 4).map(f => (
                      <div key={f} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-primary shrink-0" />
                        <span className="text-xs text-text-muted truncate">{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-warning text-warning" />
                        <span className="text-sm font-semibold">{service.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-text-muted">
                        <Clock className="w-3 h-3" />
                        {service.duration}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-primary font-bold">₹{service.priceFrom.toLocaleString()}+</span>
                      <button className="px-3 py-1.5 bg-primary hover:bg-primary-dark text-white text-xs font-medium rounded-lg transition-colors">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How it Works */}
      <div className="bg-gradient-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-text">How It Works</h2>
            <p className="text-text-muted mt-2">Simple 4-step booking process</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Choose Service', desc: 'Browse and select the service you need', emoji: '🔍' },
              { step: '02', title: 'Share Requirements', desc: 'Tell us about your space and needs', emoji: '📋' },
              { step: '03', title: 'Get Quotation', desc: 'Vendor provides a custom quote', emoji: '💰' },
              { step: '04', title: 'Enjoy Your Garden', desc: 'Sit back while experts do the work', emoji: '🌿' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative bg-white rounded-2xl p-6 border border-border text-center"
              >
                <div className="text-4xl mb-3">{item.emoji}</div>
                <div className="absolute top-4 right-4 text-3xl font-bold text-primary/10">{item.step}</div>
                <h3 className="font-bold text-text mb-1">{item.title}</h3>
                <p className="text-sm text-text-muted">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl border border-border p-8 lg:p-12 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-text mb-3">Need a Custom Solution?</h2>
          <p className="text-text-muted max-w-lg mx-auto mb-6">
            Have a unique requirement? Our team can connect you with the right expert for any plantation project.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors"
          >
            Contact Us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
