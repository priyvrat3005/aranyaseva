import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Product } from '../data';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const inWishlist = isInWishlist(product.id);
  const discount = Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gradient-light">
        <Link to={`/plant/${product.slug}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {discount > 0 && (
            <span className="px-2 py-0.5 bg-error text-white text-xs font-semibold rounded-md">
              -{discount}%
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2 py-0.5 bg-warning text-white text-xs font-semibold rounded-md">
              Bestseller
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            inWishlist
              ? 'bg-error text-white shadow-lg'
              : 'bg-white/80 text-text-muted hover:bg-white hover:text-error shadow-sm'
          }`}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Add */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={() => addToCart(product)}
            className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-xl flex items-center justify-center gap-2 shadow-lg transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <Link to={`/plant/${product.slug}`} className="block">
          <p className="text-xs text-text-muted mb-1">{product.vendorName}</p>
          <h3 className="font-semibold text-text group-hover:text-primary transition-colors line-clamp-1 mb-1">
            {product.name}
          </h3>
          <p className="text-xs text-text-muted italic mb-2">{product.scientificName}</p>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3.5 h-3.5 fill-warning text-warning" />
          <span className="text-xs font-medium text-text">{product.rating}</span>
          <span className="text-xs text-text-muted">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-primary">₹{product.price}</span>
            {product.compareAtPrice > product.price && (
              <span className="text-sm text-text-muted line-through">₹{product.compareAtPrice}</span>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-text-muted">
            <Truck className="w-3 h-3" />
            <span>Free</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-2">
          {product.tags.slice(0, 2).map(tag => (
            <span key={tag} className="px-2 py-0.5 bg-accent/30 text-primary text-[10px] font-medium rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
