/**
 * Catalogue Service
 * 
 * Abstracts data access for master plants, nursery plants, and imports.
 * Uses Supabase when configured, falls back to local demo data.
 */

import { supabase, isSupabaseConfigured } from './supabase';
import type { MasterPlant, NurseryPlant, CatalogueImport, CsvPlantRow, ImportError } from './database.types';
import { FALLBACK_IMAGE_URL } from './csv-import';

// ============================================
// DEMO DATA (used when Supabase is not configured)
// ============================================

const DEMO_MASTER_PLANTS: MasterPlant[] = [
  {
    id: 'mp-1',
    sku: 'MON-001',
    common_name: 'Monstera Deliciosa',
    scientific_name: 'Monstera deliciosa',
    category: 'Indoor Plants',
    description: 'Large tropical plant with characteristic split leaves',
    image_url: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&h=400&fit=crop',
    image_source_url: 'https://unsplash.com/photos/monstera',
    active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'mp-2',
    sku: 'SNA-001',
    common_name: 'Snake Plant',
    scientific_name: 'Dracaena trifasciata',
    category: 'Air Purifying Plants',
    description: 'Low-maintenance air purifier perfect for bedrooms',
    image_url: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?w=400&h=400&fit=crop',
    image_source_url: 'https://unsplash.com/photos/snake-plant',
    active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'mp-3',
    sku: 'ROS-001',
    common_name: 'Hybrid Tea Rose',
    scientific_name: 'Rosa hybrida',
    category: 'Flowering Plants',
    description: 'Classic fragrant rose with beautiful blooms',
    image_url: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400&h=400&fit=crop',
    image_source_url: 'https://unsplash.com/photos/rose',
    active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'mp-4',
    sku: 'ECH-001',
    common_name: 'Echeveria',
    scientific_name: 'Echeveria elegans',
    category: 'Succulents',
    description: 'Beautiful rosette-shaped succulent',
    image_url: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&h=400&fit=crop',
    image_source_url: 'https://unsplash.com/photos/echeveria',
    active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'mp-5',
    sku: 'TUL-001',
    common_name: 'Tulsi',
    scientific_name: 'Ocimum tenuiflorum',
    category: 'Herbal Plants',
    description: 'Sacred Indian herb with medicinal properties',
    image_url: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400&h=400&fit=crop',
    image_source_url: 'https://unsplash.com/photos/tulsi',
    active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
];

const DEMO_NURSERY_PLANTS: NurseryPlant[] = [
  {
    id: 'np-1',
    nursery_id: 'nursery-demo-1',
    plant_id: 'mp-1',
    selling_price: 899,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
  {
    id: 'np-2',
    nursery_id: 'nursery-demo-1',
    plant_id: 'mp-2',
    selling_price: 449,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
];

// Local state for demo mode
let demoMasterPlants = [...DEMO_MASTER_PLANTS];
let demoNurseryPlants = [...DEMO_NURSERY_PLANTS];
let demoImports: CatalogueImport[] = [];

// ============================================
// MASTER PLANTS
// ============================================

/**
 * Fetch all master plants
 */
export async function fetchMasterPlants(options?: {
  activeOnly?: boolean;
  category?: string;
  search?: string;
}): Promise<MasterPlant[]> {
  if (isSupabaseConfigured() && supabase) {
    let query = supabase.from('master_plants').select('*');
    
    if (options?.activeOnly) {
      query = query.eq('active', true);
    }
    if (options?.category) {
      query = query.eq('category', options.category);
    }
    if (options?.search) {
      query = query.or(`common_name.ilike.%${options.search}%,scientific_name.ilike.%${options.search}%`);
    }
    
    query = query.order('common_name');
    
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }
  
  // Demo mode
  let result = [...demoMasterPlants];
  if (options?.activeOnly) result = result.filter(p => p.active);
  if (options?.category) result = result.filter(p => p.category === options.category);
  if (options?.search) {
    const s = options.search.toLowerCase();
    result = result.filter(p =>
      p.common_name.toLowerCase().includes(s) ||
      (p.scientific_name?.toLowerCase().includes(s) ?? false)
    );
  }
  return result;
}

/**
 * Get all existing SKUs (for duplicate detection)
 */
export async function getExistingSkus(): Promise<Set<string>> {
  const plants = await fetchMasterPlants();
  return new Set(plants.map(p => p.sku));
}

/**
 * Create or update master plants (upsert)
 */
export async function upsertMasterPlants(
  rows: CsvPlantRow[],
  uploadedBy: string,
  filename: string
): Promise<{ success: number; failed: number; errors: ImportError[] }> {
  const errors: ImportError[] = [];
  let success = 0;
  let failed = 0;

  if (isSupabaseConfigured() && supabase) {
    // Use Supabase upsert
    const plantsToUpsert = rows.map(row => ({
      sku: row.sku,
      common_name: row.common_name,
      scientific_name: row.scientific_name || null,
      category: row.category,
      description: row.description || null,
      image_url: row.image_url || FALLBACK_IMAGE_URL,
      image_source_url: row.image_source_url || null,
      active: true,
    }));

    const { data, error } = await (supabase
      .from('master_plants') as any)
      .upsert(plantsToUpsert, { onConflict: 'sku' })
      .select();

    if (error) {
      errors.push({ row: 0, message: `Database error: ${error.message}` });
      failed = rows.length;
    } else {
      success = data?.length || 0;
    }

    // Log import
    await (supabase.from('catalogue_imports') as any).insert({
      uploaded_by: uploadedBy,
      filename,
      total_rows: rows.length,
      successful_rows: success,
      failed_rows: failed,
      error_log: errors,
    });
  } else {
    // Demo mode
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const existingIndex = demoMasterPlants.findIndex(p => p.sku === row.sku);
      
      if (existingIndex >= 0) {
        // Update existing
        demoMasterPlants[existingIndex] = {
          ...demoMasterPlants[existingIndex],
          common_name: row.common_name,
          scientific_name: row.scientific_name || null,
          category: row.category,
          description: row.description || null,
          image_url: row.image_url || FALLBACK_IMAGE_URL,
          image_source_url: row.image_source_url || null,
          updated_at: new Date().toISOString(),
        };
      } else {
        // Create new
        demoMasterPlants.push({
          id: `mp-${Date.now()}-${i}`,
          sku: row.sku,
          common_name: row.common_name,
          scientific_name: row.scientific_name || null,
          category: row.category,
          description: row.description || null,
          image_url: row.image_url || FALLBACK_IMAGE_URL,
          image_source_url: row.image_source_url || null,
          active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      }
      success++;
    }

    // Log import
    demoImports.push({
      id: `imp-${Date.now()}`,
      uploaded_by: uploadedBy,
      filename,
      total_rows: rows.length,
      successful_rows: success,
      failed_rows: failed,
      error_log: errors,
      created_at: new Date().toISOString(),
    });
  }

  return { success, failed, errors };
}

/**
 * Get import history
 */
export async function fetchImportHistory(): Promise<CatalogueImport[]> {
  if (isSupabaseConfigured() && supabase) {
    const { data, error } = await supabase
      .from('catalogue_imports')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }
  
  return [...demoImports].reverse();
}

// ============================================
// NURSERY PLANTS
// ============================================

/**
 * Fetch nursery's plant listings with master plant details
 */
export async function fetchNurseryPlants(nurseryId: string): Promise<NurseryPlant[]> {
  if (isSupabaseConfigured() && supabase) {
    const { data, error } = await supabase
      .from('nursery_plants')
      .select('*, master_plant:master_plants(*)')
      .eq('nursery_id', nurseryId);
    
    if (error) throw error;
    return data || [];
  }
  
  // Demo mode
  return demoNurseryPlants.filter(np => np.nursery_id === nurseryId);
}

/**
 * Add a plant to nursery's listing
 */
export async function addPlantToNursery(
  nurseryId: string,
  plantId: string,
  sellingPrice: number
): Promise<NurseryPlant> {
  if (isSupabaseConfigured() && supabase) {
    const { data, error } = await (supabase
      .from('nursery_plants') as any)
      .insert({
        nursery_id: nurseryId,
        plant_id: plantId,
        selling_price: sellingPrice,
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
  
  // Demo mode
  const newListing: NurseryPlant = {
    id: `np-${Date.now()}`,
    nursery_id: nurseryId,
    plant_id: plantId,
    selling_price: sellingPrice,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  demoNurseryPlants.push(newListing);
  return newListing;
}

/**
 * Update nursery plant price (nurseries can ONLY update their own prices)
 */
export async function updateNurseryPlantPrice(
  nurseryId: string,
  listingId: string,
  newPrice: number
): Promise<NurseryPlant> {
  if (isSupabaseConfigured() && supabase) {
    // RLS will enforce that nursery can only update their own records
    const { data, error } = await (supabase
      .from('nursery_plants') as any)
      .update({ selling_price: newPrice })
      .eq('id', listingId)
      .eq('nursery_id', nurseryId) // Extra safety check
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
  
  // Demo mode
  const index = demoNurseryPlants.findIndex(
    np => np.id === listingId && np.nursery_id === nurseryId
  );
  if (index === -1) throw new Error('Listing not found or access denied');
  
  demoNurseryPlants[index] = {
    ...demoNurseryPlants[index],
    selling_price: newPrice,
    updated_at: new Date().toISOString(),
  };
  return demoNurseryPlants[index];
}

/**
 * Remove plant from nursery listing
 */
export async function removePlantFromNursery(
  nurseryId: string,
  listingId: string
): Promise<void> {
  if (isSupabaseConfigured() && supabase) {
    const { error } = await supabase
      .from('nursery_plants')
      .delete()
      .eq('id', listingId)
      .eq('nursery_id', nurseryId);
    
    if (error) throw error;
    return;
  }
  
  // Demo mode
  demoNurseryPlants = demoNurseryPlants.filter(
    np => !(np.id === listingId && np.nursery_id === nurseryId)
  );
}

/**
 * Get all plants available in master catalogue (for nursery to select from)
 */
export async function fetchAvailablePlantsForNursery(
  nurseryId: string
): Promise<{ available: MasterPlant[]; selected: NurseryPlant[] }> {
  const [allPlants, nurseryListings] = await Promise.all([
    fetchMasterPlants({ activeOnly: true }),
    fetchNurseryPlants(nurseryId),
  ]);
  
  const selectedPlantIds = new Set(nurseryListings.map(np => np.plant_id));
  const available = allPlants.filter(p => !selectedPlantIds.has(p.id));
  
  return { available, selected: nurseryListings };
}
