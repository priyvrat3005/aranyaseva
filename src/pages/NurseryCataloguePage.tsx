import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, Edit2, Check, X, Package, DollarSign } from 'lucide-react';
import { fetchAvailablePlantsForNursery, addPlantToNursery, updateNurseryPlantPrice, removePlantFromNursery } from '../lib/catalogue-service';
import { VALID_CATEGORIES } from '../lib/csv-import';
import type { MasterPlant, NurseryPlant } from '../lib/database.types';

// Demo nursery ID (in real app, from auth)
const DEMO_NURSERY_ID = 'nursery-demo-1';

export default function NurseryCataloguePage() {
  const [available, setAvailable] = useState<MasterPlant[]>([]);
  const [selected, setSelected] = useState<NurseryPlant[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<MasterPlant | null>(null);
  const [price, setPrice] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await fetchAvailablePlantsForNursery(DEMO_NURSERY_ID);
      setAvailable(data.available);
      setSelected(data.selected);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPlant = async () => {
    if (!selectedPlant || !price) return;

    try {
      await addPlantToNursery(DEMO_NURSERY_ID, selectedPlant.id, parseFloat(price));
      await loadData();
      setShowAddModal(false);
      setSelectedPlant(null);
      setPrice('');
    } catch (error) {
      console.error('Failed to add plant:', error);
      alert('Failed to add plant. Please try again.');
    }
  };

  const handleUpdatePrice = async (listingId: string) => {
    if (!editPrice) return;

    try {
      await updateNurseryPlantPrice(DEMO_NURSERY_ID, listingId, parseFloat(editPrice));
      await loadData();
      setEditingId(null);
      setEditPrice('');
    } catch (error) {
      console.error('Failed to update price:', error);
      alert('Failed to update price. Please try again.');
    }
  };

  const handleRemovePlant = async (listingId: string) => {
    if (!confirm('Remove this plant from your listing?')) return;

    try {
      await removePlantFromNursery(DEMO_NURSERY_ID, listingId);
      await loadData();
    } catch (error) {
      console.error('Failed to remove plant:', error);
      alert('Failed to remove plant. Please try again.');
    }
  };

  const filteredAvailable = available.filter(plant => {
    const matchesSearch = !search || 
      plant.common_name.toLowerCase().includes(search.toLowerCase()) ||
      plant.scientific_name?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !category || plant.category === category;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-muted">Loading catalogue...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text">My Plant Listings</h1>
          <p className="text-text-muted mt-1">Browse catalogue and manage your plant listings</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Available Plants */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-text">Available Plants</h2>
                <span className="text-sm text-text-muted">{filteredAvailable.length} plants</span>
              </div>

              {/* Filters */}
              <div className="flex gap-3 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    type="text"
                    placeholder="Search plants..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="">All Categories</option>
                  {VALID_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Plant Grid */}
              {filteredAvailable.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-text-muted mx-auto mb-3" />
                  <p className="text-text-muted">No plants found</p>
                  <p className="text-sm text-text-muted mt-1">Try adjusting your filters</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {filteredAvailable.map((plant, i) => (
                    <motion.div
                      key={plant.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="bg-background rounded-xl border border-border p-4 hover:border-primary/30 transition-all"
                    >
                      <div className="flex gap-3">
                        {plant.image_url && (
                          <img
                            src={plant.image_url}
                            alt={plant.common_name}
                            className="w-16 h-16 rounded-lg object-cover shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm text-text truncate">{plant.common_name}</h3>
                          {plant.scientific_name && (
                            <p className="text-xs text-text-muted italic truncate">{plant.scientific_name}</p>
                          )}
                          <p className="text-xs text-text-muted mt-1">{plant.category}</p>
                          <button
                            onClick={() => {
                              setSelectedPlant(plant);
                              setShowAddModal(true);
                            }}
                            className="mt-2 px-3 py-1.5 bg-primary hover:bg-primary-dark text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" />
                            Add to Listing
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* My Listings */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-border p-6 sticky top-24">
              <h2 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                My Listings
              </h2>
              <p className="text-sm text-text-muted mb-4">{selected.length} plants listed</p>

              {selected.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="w-10 h-10 text-text-muted mx-auto mb-2" />
                  <p className="text-sm text-text-muted">No plants listed yet</p>
                  <p className="text-xs text-text-muted mt-1">Add plants from the catalogue</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {selected.map(listing => {
                    const plant = available.find(p => p.id === listing.plant_id) || 
                                 { common_name: 'Unknown', image_url: null, category: '' };
                    const isEditing = editingId === listing.id;

                    return (
                      <div key={listing.id} className="bg-background rounded-xl border border-border p-3">
                        <div className="flex items-start gap-3">
                          {plant.image_url && (
                            <img
                              src={plant.image_url}
                              alt={plant.common_name}
                              className="w-12 h-12 rounded-lg object-cover shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-text truncate">{plant.common_name}</p>
                            <p className="text-xs text-text-muted">{plant.category}</p>
                            
                            {isEditing ? (
                              <div className="flex items-center gap-2 mt-2">
                                <div className="relative flex-1">
                                  <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-text-muted" />
                                  <input
                                    type="number"
                                    value={editPrice}
                                    onChange={(e) => setEditPrice(e.target.value)}
                                    className="w-full pl-7 pr-2 py-1.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                                    placeholder="Price"
                                    autoFocus
                                  />
                                </div>
                                <button
                                  onClick={() => handleUpdatePrice(listing.id)}
                                  className="p-1.5 bg-success hover:bg-success/90 text-white rounded-lg transition-colors"
                                >
                                  <Check className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => {
                                    setEditingId(null);
                                    setEditPrice('');
                                  }}
                                  className="p-1.5 bg-border hover:bg-border/80 text-text-muted rounded-lg transition-colors"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center justify-between mt-2">
                                <p className="text-sm font-bold text-primary">₹{listing.selling_price}</p>
                                <div className="flex gap-1">
                                  <button
                                    onClick={() => {
                                      setEditingId(listing.id);
                                      setEditPrice(listing.selling_price.toString());
                                    }}
                                    className="p-1.5 hover:bg-primary/10 text-text-muted hover:text-primary rounded-lg transition-colors"
                                  >
                                    <Edit2 className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={() => handleRemovePlant(listing.id)}
                                    className="p-1.5 hover:bg-error/10 text-text-muted hover:text-error rounded-lg transition-colors"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Plant Modal */}
      {showAddModal && selectedPlant && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full"
          >
            <h3 className="text-lg font-bold text-text mb-4">Add to Your Listing</h3>
            
            <div className="flex gap-3 mb-4">
              {selectedPlant.image_url && (
                <img
                  src={selectedPlant.image_url}
                  alt={selectedPlant.common_name}
                  className="w-20 h-20 rounded-xl object-cover"
                />
              )}
              <div>
                <p className="font-semibold text-text">{selectedPlant.common_name}</p>
                {selectedPlant.scientific_name && (
                  <p className="text-xs text-text-muted italic">{selectedPlant.scientific_name}</p>
                )}
                <p className="text-xs text-text-muted mt-1">{selectedPlant.category}</p>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-text mb-1.5">Your Selling Price (₹)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter price"
                  className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  autoFocus
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setSelectedPlant(null);
                  setPrice('');
                }}
                className="flex-1 py-2.5 border border-border text-text font-medium rounded-xl hover:bg-background transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPlant}
                disabled={!price}
                className="flex-1 py-2.5 bg-primary hover:bg-primary-dark disabled:opacity-50 text-white font-medium rounded-xl transition-colors"
              >
                Add Plant
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
