/**
 * CSV Import Validation Tests
 * 
 * Tests for the CSV parsing, validation, and duplicate detection logic.
 * Run with: npm test (when test runner is configured)
 */

import { describe, it, expect } from 'vitest';
import { parseAndValidateCSV, validatePlantRow, VALID_CATEGORIES } from '../lib/csv-import';

// Helper to create a mock File object
function createMockCSV(content: string): File {
  const blob = new Blob([content], { type: 'text/csv' });
  return new File([blob], 'test.csv', { type: 'text/csv' });
}

describe('CSV Import Validation', () => {
  describe('validatePlantRow', () => {
    it('should validate a complete valid row', () => {
      const row = {
        sku: 'MON-001',
        common_name: 'Monstera Deliciosa',
        scientific_name: 'Monstera deliciosa',
        category: 'Indoor Plants',
        description: 'A beautiful tropical plant',
      };
      const error = validatePlantRow(row, 1);
      expect(error).toBeNull();
    });

    it('should reject row without SKU', () => {
      const row = {
        common_name: 'Monstera',
        category: 'Indoor Plants',
      };
      const error = validatePlantRow(row, 1);
      expect(error).not.toBeNull();
      expect(error?.message).toContain('SKU is required');
    });

    it('should reject row without common name', () => {
      const row = {
        sku: 'MON-001',
        category: 'Indoor Plants',
      };
      const error = validatePlantRow(row, 1);
      expect(error).not.toBeNull();
      expect(error?.message).toContain('Common Name is required');
    });

    it('should reject row without category', () => {
      const row = {
        sku: 'MON-001',
        common_name: 'Monstera',
      };
      const error = validatePlantRow(row, 1);
      expect(error).not.toBeNull();
      expect(error?.message).toContain('Category is required');
    });

    it('should reject invalid category', () => {
      const row = {
        sku: 'MON-001',
        common_name: 'Monstera',
        category: 'Invalid Category',
      };
      const error = validatePlantRow(row, 1);
      expect(error).not.toBeNull();
      expect(error?.message).toContain('Invalid category');
    });

    it('should accept all valid categories', () => {
      VALID_CATEGORIES.forEach(category => {
        const row = {
          sku: 'TEST-001',
          common_name: 'Test Plant',
          category,
        };
        const error = validatePlantRow(row, 1);
        expect(error).toBeNull();
      });
    });
  });

  describe('parseAndValidateCSV', () => {
    it('should parse valid CSV with all required fields', async () => {
      const csv = `SKU,Common Name,Category
MON-001,Monstera Deliciosa,Indoor Plants
SNA-001,Snake Plant,Air Purifying Plants`;

      const file = createMockCSV(csv);
      const result = await parseAndValidateCSV(file);

      expect(result.valid).toBe(true);
      expect(result.totalRows).toBe(2);
      expect(result.validRows).toBe(2);
      expect(result.invalidRows).toBe(0);
      expect(result.rows).toHaveLength(2);
      expect(result.rows[0].sku).toBe('MON-001');
      expect(result.rows[1].sku).toBe('SNA-001');
    });

    it('should detect missing required fields', async () => {
      const csv = `SKU,Common Name,Category
MON-001,,Indoor Plants
,Snake Plant,Air Purifying Plants`;

      const file = createMockCSV(csv);
      const result = await parseAndValidateCSV(file);

      expect(result.valid).toBe(false);
      expect(result.invalidRows).toBe(2);
      expect(result.errors).toHaveLength(2);
    });

    it('should detect duplicate SKUs within CSV', async () => {
      const csv = `SKU,Common Name,Category
MON-001,Monstera Deliciosa,Indoor Plants
MON-001,Monstera Variegata,Indoor Plants`;

      const file = createMockCSV(csv);
      const result = await parseAndValidateCSV(file);

      expect(result.valid).toBe(false);
      expect(result.duplicates).toContain('MON-001');
      expect(result.errors.some(e => e.message.includes('Duplicate SKU'))).toBe(true);
    });

    it('should detect duplicates against existing database', async () => {
      const csv = `SKU,Common Name,Category
MON-001,Monstera Deliciosa,Indoor Plants`;

      const existingSkus = new Set(['MON-001']);
      const file = createMockCSV(csv);
      const result = await parseAndValidateCSV(file, existingSkus);

      // Should warn about existing SKU but still include in valid rows (for upsert)
      expect(result.errors.some(e => e.message.includes('already exists'))).toBe(true);
      expect(result.rows).toHaveLength(1);
    });

    it('should handle CSV with optional fields', async () => {
      const csv = `SKU,Common Name,Scientific Name,Category,Description,Image URL
MON-001,Monstera Deliciosa,Monstera deliciosa,Indoor Plants,A tropical plant,https://example.com/image.jpg`;

      const file = createMockCSV(csv);
      const result = await parseAndValidateCSV(file);

      expect(result.valid).toBe(true);
      expect(result.rows[0].scientific_name).toBe('Monstera deliciosa');
      expect(result.rows[0].description).toBe('A tropical plant');
      expect(result.rows[0].image_url).toBe('https://example.com/image.jpg');
    });

    it('should handle empty CSV', async () => {
      const csv = `SKU,Common Name,Category`;

      const file = createMockCSV(csv);
      const result = await parseAndValidateCSV(file);

      expect(result.valid).toBe(true);
      expect(result.totalRows).toBe(0);
      expect(result.rows).toHaveLength(0);
    });

    it('should trim whitespace from values', async () => {
      const csv = `SKU,Common Name,Category
  MON-001  ,  Monstera Deliciosa  ,  Indoor Plants  `;

      const file = createMockCSV(csv);
      const result = await parseAndValidateCSV(file);

      expect(result.rows[0].sku).toBe('MON-001');
      expect(result.rows[0].common_name).toBe('Monstera Deliciosa');
      expect(result.rows[0].category).toBe('Indoor Plants');
    });
  });
});

describe('Security Permissions', () => {
  it('should define valid categories', () => {
    expect(VALID_CATEGORIES).toContain('Indoor Plants');
    expect(VALID_CATEGORIES).toContain('Succulents');
    expect(VALID_CATEGORIES.length).toBeGreaterThan(10);
  });

  // Note: Actual RLS policy testing requires Supabase connection
  // These tests verify the validation logic that runs before database operations
});
