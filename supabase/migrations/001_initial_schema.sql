-- PlantConnect Database Schema
-- PostgreSQL / Supabase
-- Migration: 001_initial_schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ENUMS
-- ============================================

CREATE TYPE user_role AS ENUM ('admin', 'nursery', 'customer');

-- ============================================
-- PROFILES TABLE
-- ============================================

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'customer',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- MASTER PLANTS TABLE
-- ============================================

CREATE TABLE master_plants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sku TEXT UNIQUE NOT NULL,
  common_name TEXT NOT NULL,
  scientific_name TEXT,
  category TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  image_source_url TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_master_plants_sku ON master_plants(sku);
CREATE INDEX idx_master_plants_category ON master_plants(category);
CREATE INDEX idx_master_plants_active ON master_plants(active);

-- ============================================
-- NURSERY PLANTS TABLE
-- ============================================

CREATE TABLE nursery_plants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nursery_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  plant_id UUID NOT NULL REFERENCES master_plants(id) ON DELETE CASCADE,
  selling_price DECIMAL(10, 2) NOT NULL CHECK (selling_price >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(nursery_id, plant_id)
);

CREATE INDEX idx_nursery_plants_nursery ON nursery_plants(nursery_id);
CREATE INDEX idx_nursery_plants_plant ON nursery_plants(plant_id);

-- ============================================
-- CATALOGUE IMPORTS TABLE
-- ============================================

CREATE TABLE catalogue_imports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  uploaded_by UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  total_rows INTEGER NOT NULL DEFAULT 0,
  successful_rows INTEGER NOT NULL DEFAULT 0,
  failed_rows INTEGER NOT NULL DEFAULT 0,
  error_log JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_catalogue_imports_uploaded_by ON catalogue_imports(uploaded_by);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE master_plants ENABLE ROW LEVEL SECURITY;
ALTER TABLE nursery_plants ENABLE ROW LEVEL SECURITY;
ALTER TABLE catalogue_imports ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Master plants policies
CREATE POLICY "Anyone can view active master plants"
  ON master_plants FOR SELECT
  USING (active = true);

CREATE POLICY "Admins can view all master plants"
  ON master_plants FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Only admins can insert master plants"
  ON master_plants FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Only admins can update master plants"
  ON master_plants FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Only admins can delete master plants"
  ON master_plants FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Nursery plants policies
CREATE POLICY "Nurseries can view their own plant listings"
  ON nursery_plants FOR SELECT
  USING (nursery_id = auth.uid());

CREATE POLICY "Anyone can view nursery plant listings with prices"
  ON nursery_plants FOR SELECT
  USING (true);

CREATE POLICY "Nurseries can insert their own plant listings"
  ON nursery_plants FOR INSERT
  WITH CHECK (nursery_id = auth.uid());

CREATE POLICY "Nurseries can update only their own plant listings"
  ON nursery_plants FOR UPDATE
  USING (nursery_id = auth.uid());

CREATE POLICY "Nurseries can delete only their own plant listings"
  ON nursery_plants FOR DELETE
  USING (nursery_id = auth.uid());

-- Catalogue imports policies
CREATE POLICY "Admins can view all imports"
  ON catalogue_imports FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can insert imports"
  ON catalogue_imports FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can view their own imports"
  ON catalogue_imports FOR SELECT
  USING (uploaded_by = auth.uid());

-- ============================================
-- FUNCTIONS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_master_plants_updated_at
  BEFORE UPDATE ON master_plants
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_nursery_plants_updated_at
  BEFORE UPDATE ON nursery_plants
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SEED DATA (Optional)
-- ============================================

-- Insert demo admin user (replace with actual auth.uid() after signup)
-- INSERT INTO profiles (id, full_name, role) VALUES ('your-uuid-here', 'Admin User', 'admin');
