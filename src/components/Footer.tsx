import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-1">Join our Green Community</h3>
              <p className="text-white/70 text-sm">Get gardening tips, exclusive offers & new plant alerts</p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-72 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-secondary text-sm"
              />
              <button className="px-6 py-3 bg-secondary hover:bg-secondary/90 text-primary-dark font-semibold rounded-xl transition-colors text-sm whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-secondary rounded-xl flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary-dark" />
              </div>
              <span className="text-xl font-bold">PlantConnect</span>
            </Link>
            <p className="text-white/60 text-sm mb-4 leading-relaxed">
              India's #1 marketplace connecting plant lovers with verified nurseries, gardeners & plantation services.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-secondary/20 flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-secondary">Shop</h4>
            <ul className="space-y-2.5">
              {['Indoor Plants', 'Outdoor Plants', 'Flowering Plants', 'Succulents', 'Bonsai', 'Gardening Tools'].map(item => (
                <li key={item}>
                  <Link to="/shop" className="text-white/60 hover:text-white text-sm transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-secondary">Services</h4>
            <ul className="space-y-2.5">
              {['Garden Setup', 'Terrace Gardening', 'Landscape Design', 'Tree Plantation', 'Garden Maintenance', 'Bonsai Workshop'].map(item => (
                <li key={item}>
                  <Link to="/services" className="text-white/60 hover:text-white text-sm transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-secondary">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-secondary shrink-0" />
                <span className="text-white/60 text-sm">123 Green Street, Indiranagar, Bangalore 560038</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-secondary shrink-0" />
                <span className="text-white/60 text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-secondary shrink-0" />
                <span className="text-white/60 text-sm">hello@plantconnect.in</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/50 text-xs">© 2024 PlantConnect. All rights reserved. Made with 🌱 in India.</p>
          <div className="flex gap-4 text-xs text-white/50">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Vendor Agreement</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
