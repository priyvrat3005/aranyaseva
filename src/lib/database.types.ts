/**
 * Supabase Database Types
 * Auto-generated from schema - matches supabase/migrations/001_initial_schema.sql
 */

export type UserRole = 'admin' | 'nursery' | 'customer';

export interface Profile {
  id: string;
  full_name: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface MasterPlant {
  id: string;
  sku: string;
  common_name: string;
  scientific_name: string | null;
  category: string;
  description: string | null;
  image_url: string | null;
  image_source_url: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface NurseryPlant {
  id: string;
  nursery_id: string;
  plant_id: string;
  selling_price: number;
  created_at: string;
  updated_at: string;
  // Joined fields (when queried with master_plants)
  master_plant?: MasterPlant;
}

export interface CatalogueImport {
  id: string;
  uploaded_by: string;
  filename: string;
  total_rows: number;
  successful_rows: number;
  failed_rows: number;
  error_log: ImportError[] | null;
  created_at: string;
}

export interface ImportError {
  row: number;
  sku?: string;
  field?: string;
  message: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at' | 'updated_at'> & {
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Profile>;
      };
      master_plants: {
        Row: MasterPlant;
        Insert: Omit<MasterPlant, 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<MasterPlant>;
      };
      nursery_plants: {
        Row: NurseryPlant;
        Insert: Omit<NurseryPlant, 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<NurseryPlant>;
      };
      catalogue_imports: {
        Row: CatalogueImport;
        Insert: Omit<CatalogueImport, 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<CatalogueImport>;
      };
    };
  };
}

// CSV row type for import
export interface CsvPlantRow {
  sku: string;
  common_name: string;
  scientific_name?: string;
  category: string;
  description?: string;
  image_url?: string;
  image_source_url?: string;
}
