/**
 * CSV Import Validation & Processing
 * 
 * Handles:
 * - CSV parsing
 * - Row-level validation
 * - Duplicate SKU detection
 * - Error reporting
 * - Safe upsert logic
 */

import Papa from 'papaparse';
import type { CsvPlantRow, ImportError, MasterPlant } from './database.types';

// Valid categories (must match master_plants.category values)
export const VALID_CATEGORIES = [
  'Indoor Plants',
  'Outdoor Plants',
  'Flowering Plants',
  'Fruit Plants',
  'Vegetable Plants',
  'Medicinal Plants',
  'Herbal Plants',
  'Air Purifying Plants',
  'Succulents',
  'Cactus',
  'Bonsai',
  'Trees',
  'Shrubs',
  'Climbers',
  'Seeds',
  'Pots',
  'Planters',
  'Soil',
  'Fertilizers',
  'Gardening Tools',
  'Plant Care Products',
];

// CSV column mapping (source column name → database field)
export const CSV_COLUMN_MAP: Record<string, keyof CsvPlantRow> = {
  'SKU': 'sku',
  'sku': 'sku',
  'Common Name': 'common_name',
  'common_name': 'common_name',
  'CommonName': 'common_name',
  'Scientific Name': 'scientific_name',
  'scientific_name': 'scientific_name',
  'ScientificName': 'scientific_name',
  'Category': 'category',
  'category': 'category',
  'Description': 'description',
  'description': 'description',
  'Image URL': 'image_url',
  'image_url': 'image_url',
  'ImageURL': 'image_url',
  'Image Source URL': 'image_source_url',
  'image_source_url': 'image_source_url',
  'ImageSourceURL': 'image_source_url',
};

export interface ValidationResult {
  valid: boolean;
  rows: CsvPlantRow[];
  errors: ImportError[];
  duplicates: string[];
  totalRows: number;
  validRows: number;
  invalidRows: number;
}

/**
 * Parse CSV file and validate all rows
 */
export async function parseAndValidateCSV(
  file: File,
  existingSkus: Set<string> = new Set()
): Promise<ValidationResult> {
  return new Promise((resolve) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
      complete: (results) => {
        const errors: ImportError[] = [];
        const validRows: CsvPlantRow[] = [];
        const seenSkus = new Set<string>();
        const duplicates: string[] = [];

        (results.data as Array<Record<string, string>>).forEach((row, index) => {
          const rowNumber = index + 2; // +2 because row 1 is header, and index is 0-based
          
          // Map CSV columns to our fields
          const mapped: Partial<CsvPlantRow> = {};
          Object.entries(row).forEach(([key, value]) => {
            const dbField = CSV_COLUMN_MAP[key];
            if (dbField && value) {
              mapped[dbField] = value.trim();
            }
          });

          // Validate required fields
          if (!mapped.sku) {
            errors.push({ row: rowNumber, message: 'SKU is required' });
            return;
          }

          if (!mapped.common_name) {
            errors.push({ row: rowNumber, sku: mapped.sku, message: 'Common Name is required' });
            return;
          }

          if (!mapped.category) {
            errors.push({ row: rowNumber, sku: mapped.sku, message: 'Category is required' });
            return;
          }

          // Validate category
          if (!VALID_CATEGORIES.includes(mapped.category)) {
            errors.push({
              row: rowNumber,
              sku: mapped.sku,
              field: 'category',
              message: `Invalid category "${mapped.category}". Must be one of: ${VALID_CATEGORIES.join(', ')}`,
            });
            return;
          }

          // Check for duplicates within the CSV
          if (seenSkus.has(mapped.sku)) {
            errors.push({
              row: rowNumber,
              sku: mapped.sku,
              message: 'Duplicate SKU within this CSV file',
            });
            duplicates.push(mapped.sku);
            return;
          }

          // Check for duplicates against existing database
          if (existingSkus.has(mapped.sku)) {
            errors.push({
              row: rowNumber,
              sku: mapped.sku,
              message: 'SKU already exists in database (will be updated)',
            });
            // This is a warning, not a hard error - we'll upsert
          }

          seenSkus.add(mapped.sku);
          validRows.push(mapped as CsvPlantRow);
        });

        resolve({
          valid: errors.length === 0,
          rows: validRows,
          errors,
          duplicates,
          totalRows: results.data.length,
          validRows: validRows.length,
          invalidRows: errors.length,
        });
      },
      error: (error) => {
        resolve({
          valid: false,
          rows: [],
          errors: [{ row: 0, message: `CSV parse error: ${error.message}` }],
          duplicates: [],
          totalRows: 0,
          validRows: 0,
          invalidRows: 0,
        });
      },
    });
  });
}

/**
 * Validate a single plant row
 */
export function validatePlantRow(row: Partial<CsvPlantRow>, rowNumber: number): ImportError | null {
  if (!row.sku) {
    return { row: rowNumber, message: 'SKU is required' };
  }
  if (!row.common_name) {
    return { row: rowNumber, sku: row.sku, message: 'Common Name is required' };
  }
  if (!row.category) {
    return { row: rowNumber, sku: row.sku, message: 'Category is required' };
  }
  if (!VALID_CATEGORIES.includes(row.category)) {
    return {
      row: rowNumber,
      sku: row.sku,
      field: 'category',
      message: `Invalid category "${row.category}"`,
    };
  }
  return null;
}

/**
 * Generate a demo CSV template as a Blob
 */
export function generateDemoCsvTemplate(): string {
  const header = 'SKU,Common Name,Scientific Name,Category,Description,Image URL,Image Source URL';
  const demoRows = [
    'MON-001,Monstera Deliciosa,Monstera deliciosa,Indoor Plants,Large tropical plant with split leaves,https://example.com/monstera.jpg,https://source.example.com/monstera',
    'SNA-001,Snake Plant,Dracaena trifasciata,Air Purifying Plants,Low-maintenance air purifier,https://example.com/snake.jpg,https://source.example.com/snake',
    'ROS-001,Hybrid Tea Rose,Rosa hybrida,Flowering Plants,Classic fragrant rose,https://example.com/rose.jpg,https://source.example.com/rose',
    'ECH-001,Echeveria,Echeveria elegans,Succulents,Rosette-shaped succulent,https://example.com/echeveria.jpg,https://source.example.com/echeveria',
    'TUL-001,Tulsi,Ocimum tenuiflorum,Herbal Plants,Sacred Indian herb,https://example.com/tulsi.jpg,https://source.example.com/tulsi',
  ];
  return [header, ...demoRows].join('\n');
}

/**
 * Download CSV template
 */
export function downloadCsvTemplate() {
  const csv = generateDemoCsvTemplate();
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'plant_catalogue_template.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Check if an image URL is valid (returns 200 and is an image)
 * Note: This may fail due to CORS restrictions in browser
 */
export async function verifyImageUrl(url: string): Promise<{ valid: boolean; error?: string }> {
  if (!url) return { valid: false, error: 'No URL provided' };
  
  try {
    const response = await fetch(url, { method: 'HEAD', mode: 'no-cors' });
    // no-cors mode returns opaque response, so we can't check status
    // But if fetch doesn't throw, the URL is at least reachable
    return { valid: true };
  } catch (error) {
    return { valid: false, error: `Image URL not reachable: ${url}` };
  }
}

/**
 * Fallback image for plants without valid images
 */
export const FALLBACK_IMAGE_URL = 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=400&fit=crop';
