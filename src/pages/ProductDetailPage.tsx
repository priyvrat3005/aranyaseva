import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, Sun, Droplets, Leaf, ChevronRight, Minus, Plus, Check } from 'lucide-react';
import { products, reviews } from '../data';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug);
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🌱</div>
          <h2 className="text-2xl font-bold text-text mb-2">Plant not found</h2>
          <Link to="/shop" className="text-primary font-medium">← Back to Shop</Link>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const discount = Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100);
  const relatedProducts = products.filter(p => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const careInfo = [
    { icon: Sun, label: 'Sunlight', value: product.sunlight },
    { icon: Droplets, label: 'Water', value: product.water },
    { icon: Leaf, label: 'Difficulty', value: product.difficulty },
  ];

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/shop" className="hover:text-primary">Shop</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-text">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Images */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-light mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === i ? 'border-primary shadow-lg' : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            {/* Vendor */}
            <Link to={`/nursery/${product.vendorName.toLowerCase().replace(/\s+/g, '-')}`} className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full text-sm text-primary font-medium mb-4 hover:bg-primary/20 transition-colors">
              <Leaf className="w-3.5 h-3.5" />
              {product.vendorName}
            </Link>

            <h1 className="text-3xl lg:text-4xl font-bold text-text mb-2">{product.name}</h1>
            <p className="text-text-muted italic mb-4">{product.scientificName}</p>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-warning text-warning' : 'text-border'}`} />
                ))}
              </div>
              <span className="text-sm font-medium text-text">{product.rating}</span>
              <span className="text-sm text-text-muted">({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-primary">₹{product.price}</span>
              {product.compareAtPrice > product.price && (
                <>
                  <span className="text-xl text-text-muted line-through">₹{product.compareAtPrice}</span>
                  <span className="px-2 py-0.5 bg-error/10 text-error text-sm font-semibold rounded-md">{discount}% OFF</span>
                </>
              )}
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2 mb-6">
              <div className={`w-2 h-2 rounded-full ${product.stock > 20 ? 'bg-success' : product.stock > 5 ? 'bg-warning' : 'bg-error'}`}></div>
              <span className="text-sm text-text-light">
                {product.stock > 20 ? 'In Stock' : product.stock > 5 ? `Only ${product.stock} left` : `Hurry! Only ${product.stock} left`}
              </span>
            </div>

            {/* Description */}
            <p className="text-text-light leading-relaxed mb-6">{product.description}</p>

            {/* Care Info */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {careInfo.map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-background rounded-xl p-3 text-center border border-border">
                  <Icon className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-xs text-text-muted">{label}</p>
                  <p className="text-sm font-medium text-text">{value}</p>
                </div>
              ))}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-background transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-5 py-3 font-medium text-text min-w-[50px] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-3 hover:bg-background transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                  addedToCart
                    ? 'bg-success text-white'
                    : 'bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/20'
                }`}
              >
                {addedToCart ? (
                  <><Check className="w-5 h-5" /> Added!</>
                ) : (
                  <><ShoppingCart className="w-5 h-5" /> Add to Cart</>
                )}
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3.5 rounded-xl border transition-all ${
                  inWishlist ? 'bg-error/10 border-error/30 text-error' : 'border-border hover:border-error/30 text-text-muted hover:text-error'
                }`}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-background rounded-2xl border border-border">
              {[
                { icon: Truck, text: 'Free Delivery' },
                { icon: Shield, text: 'Secure Payment' },
                { icon: RotateCcw, text: '7-Day Returns' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex flex-col items-center gap-1 text-center">
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="text-xs text-text-muted">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Reviews */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-text mb-8">Customer Reviews</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {reviews.map(review => (
              <div key={review.id} className="bg-white rounded-2xl border border-border p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-accent/30 rounded-full flex items-center justify-center text-lg">
                    {review.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-text">{review.userName}</span>
                      {review.verified && (
                        <span className="px-1.5 py-0.5 bg-primary/10 text-primary text-[10px] font-medium rounded-full">Verified</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-warning text-warning" />
                      ))}
                    </div>
                  </div>
                </div>
                <h4 className="font-semibold text-sm text-text mb-1">{review.title}</h4>
                <p className="text-sm text-text-light">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-text mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
