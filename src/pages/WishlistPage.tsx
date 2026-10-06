import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data';
import ProductCard from '../components/ProductCard';

export default function WishlistPage() {
  const { wishlist } = useCart();
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-12 h-12 text-error" />
          </div>
          <h2 className="text-2xl font-bold text-text mb-2">Your wishlist is empty</h2>
          <p className="text-text-muted mb-6">Save your favorite plants to buy later</p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            Browse Plants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="w-7 h-7 text-error" />
          <h1 className="text-3xl font-bold text-text">My Wishlist</h1>
          <span className="px-2.5 py-0.5 bg-error/10 text-error text-sm font-medium rounded-full">{wishlistProducts.length}</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {wishlistProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
