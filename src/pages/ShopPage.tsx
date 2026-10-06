import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Grid3X3, LayoutGrid, X } from 'lucide-react';
import { products, categories } from '../data';
import ProductCard from '../components/ProductCard';

export default function ShopPage() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [showFilters, setShowFilters] = useState(false);
  const [gridCols, setGridCols] = useState(4);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory) {
      result = result.filter(p => p.categoryId === categories.find(c => c.slug === selectedCategory)?.id);
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': result.sort((a, b) => b.id.localeCompare(a.id)); break;
      default: result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [selectedCategory, sortBy, priceRange]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-light border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-text">Shop Plants</h1>
          <p className="text-text-muted mt-1">Discover from {products.length}+ plants across India</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Categories */}
              <div className="bg-white rounded-2xl border border-border p-5">
                <h3 className="font-semibold text-text mb-3">Categories</h3>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      !selectedCategory ? 'bg-primary/10 text-primary font-medium' : 'text-text-light hover:bg-primary/5'
                    }`}
                  >
                    All Plants
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                        selectedCategory === cat.slug ? 'bg-primary/10 text-primary font-medium' : 'text-text-light hover:bg-primary/5'
                      }`}
                    >
                      <span>{cat.icon} {cat.name}</span>
                      <span className="text-xs text-text-muted">{cat.productCount}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="bg-white rounded-2xl border border-border p-5">
                <h3 className="font-semibold text-text mb-3">Price Range</h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-primary"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">₹{priceRange[0]}</span>
                    <span className="font-medium text-text">₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-xl text-sm font-medium text-text-light hover:border-primary/30 transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </button>
                <p className="text-sm text-text-muted">
                  Showing <span className="font-medium text-text">{filteredProducts.length}</span> plants
                </p>
                {selectedCategory && (
                  <button
                    onClick={() => setSelectedCategory('')}
                    className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-lg"
                  >
                    {categories.find(c => c.slug === selectedCategory)?.name}
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-white border border-border rounded-xl text-sm text-text-light focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="newest">Newest</option>
                </select>
                <div className="hidden sm:flex items-center gap-1 bg-white border border-border rounded-xl p-1">
                  <button
                    onClick={() => setGridCols(3)}
                    className={`p-1.5 rounded-lg ${gridCols === 3 ? 'bg-primary/10 text-primary' : 'text-text-muted'}`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setGridCols(4)}
                    className={`p-1.5 rounded-lg ${gridCols === 4 ? 'bg-primary/10 text-primary' : 'text-text-muted'}`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="lg:hidden mb-6 bg-white rounded-2xl border border-border p-5"
              >
                <h3 className="font-semibold text-text mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                      !selectedCategory ? 'bg-primary text-white' : 'bg-background text-text-light border border-border'
                    }`}
                  >
                    All
                  </button>
                  {categories.slice(0, 8).map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                        selectedCategory === cat.slug ? 'bg-primary text-white' : 'bg-background text-text-light border border-border'
                      }`}
                    >
                      {cat.icon} {cat.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className={`grid grid-cols-2 ${gridCols === 3 ? 'md:grid-cols-3' : 'md:grid-cols-3 lg:grid-cols-4'} gap-4 lg:gap-6`}>
                {filteredProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🌱</div>
                <h3 className="text-xl font-semibold text-text mb-2">No plants found</h3>
                <p className="text-text-muted">Try adjusting your filters or browse all plants</p>
                <button
                  onClick={() => { setSelectedCategory(''); setPriceRange([0, 5000]); }}
                  className="mt-4 px-6 py-2 bg-primary text-white rounded-xl text-sm font-medium"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
