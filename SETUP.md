# PlantConnect Setup Guide

Complete setup instructions for the PlantConnect multi-vendor plant marketplace with admin catalogue management and CSV bulk import.

## 📋 Prerequisites

- Node.js 18+ and npm
- A Supabase account (free tier works)
- (Optional) Apper.io MCP server access for AI-assisted development

## 🚀 Quick Start

### 1. Clone and Install

```bash
# Install dependencies
npm install
```

### 2. Configure Supabase

#### Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the database to be ready (takes ~2 minutes)
3. Go to **Project Settings** → **API**
4. Copy your **Project URL** and **anon/public key**

#### Run Database Migrations

1. Go to **SQL Editor** in your Supabase dashboard
2. Copy the contents of `supabase/migrations/001_initial_schema.sql`
3. Paste and run the SQL
4. Verify tables were created: `profiles`, `master_plants`, `nursery_plants`, `catalogue_imports`

#### Create Environment File

```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

⚠️ **SECURITY WARNING**: 
- Use ONLY the `anon` key in `.env`
- NEVER use the `service_role` key in frontend code
- The `service_role` key bypasses Row Level Security (RLS)
- All access control is enforced by RLS policies in the database

### 3. Create Test Users

In Supabase **Authentication** → **Users**, create test users:

```
Admin User:
- Email: admin@plantconnect.test
- Password: (your choice)

Nursery User:
- Email: nursery@plantconnect.test
- Password: (your choice)
```

Then in **Table Editor** → `profiles`, add profiles for these users:

```sql
-- Get the user IDs from Authentication → Users
INSERT INTO profiles (id, full_name, role) VALUES
  ('admin-user-uuid-here', 'Admin User', 'admin'),
  ('nursery-user-uuid-here', 'Green Valley Nursery', 'nursery');
```

### 4. Start Development Server

```bash
npm run dev
```

Open http://localhost:5173

## 🎯 Features Overview

### Admin Features (`/admin`)

1. **Dashboard** - View statistics and recent imports
2. **CSV Upload** (`/admin/import`)
   - Download CSV template
   - Upload and validate CSV files
   - Preview data before import
   - View validation errors
   - Import plants in bulk
3. **Catalogue Viewer** (`/admin/catalogue`)
   - Browse all master plants
   - Search and filter by category
   - View plant details and status

### Nursery Features (`/nursery/catalogue`)

1. **Browse Master Catalogue** - View all admin-approved plants
2. **Search & Filter** - Find plants by name or category
3. **Add to Listing** - Select plants and set your selling price
4. **Manage Listings** - Update prices or remove plants
5. **Price Control** - Nurseries can ONLY set their own prices

### Customer Features (Existing)

- Browse plants from all nurseries
- Shop by category
- Add to cart and checkout
- Wishlist functionality
- View nursery profiles

## 📊 Database Schema

### Tables

1. **profiles** - User profiles with roles (admin, nursery, customer)
2. **master_plants** - Admin-managed plant catalogue
3. **nursery_plants** - Nursery-specific listings with custom prices
4. **catalogue_imports** - Import history and error logs

### Row Level Security (RLS)

All tables have RLS enabled with these policies:

- **profiles**: Users can view/update their own profile; admins can view all
- **master_plants**: Anyone can view active plants; only admins can insert/update/delete
- **nursery_plants**: Nurseries can manage only their own listings; anyone can view
- **catalogue_imports**: Only admins can view and create imports

## 📥 CSV Import Format

### Required Columns

- `SKU` - Unique identifier (e.g., "MON-001")
- `Common Name` - Plant name (e.g., "Monstera Deliciosa")
- `Category` - Must be one of the predefined categories

### Optional Columns

- `Scientific Name` - Latin name (e.g., "Monstera deliciosa")
- `Description` - Plant description
- `Image URL` - Link to plant image
- `Image Source URL` - Attribution for image

### Example CSV

```csv
SKU,Common Name,Scientific Name,Category,Description,Image URL
MON-001,Monstera Deliciosa,Monstera deliciosa,Indoor Plants,Large tropical plant with split leaves,https://example.com/monstera.jpg
SNA-001,Snake Plant,Dracaena trifasciata,Air Purifying Plants,Low-maintenance air purifier,https://example.com/snake.jpg
```

### Valid Categories

- Indoor Plants
- Outdoor Plants
- Flowering Plants
- Fruit Plants
- Vegetable Plants
- Medicinal Plants
- Herbal Plants
- Air Purifying Plants
- Succulents
- Cactus
- Bonsai
- Trees
- Shrubs
- Climbers
- Seeds
- Pots
- Planters
- Soil
- Fertilizers
- Gardening Tools
- Plant Care Products

## 🔐 Security Model

### Frontend (Browser)

- Uses only `anon` key (public, safe for frontend)
- All operations go through Supabase client
- RLS policies enforce access control on server
- No sensitive keys exposed in browser

### Backend (Supabase)

- Row Level Security (RLS) on all tables
- Policies check user role from `profiles` table
- Nurseries can only modify their own records
- Admins have full access to master catalogue
- All writes are validated and logged

### What Nurseries CAN Do

- ✅ View master plant catalogue
- ✅ Add plants to their listing
- ✅ Set their own selling prices
- ✅ Update their own prices
- ✅ Remove plants from their listing

### What Nurseries CANNOT Do

- ❌ Modify master plant names
- ❌ Change master plant images
- ❌ Edit master plant descriptions
- ❌ View other nurseries' prices
- ❌ Modify other nurseries' listings

## 🧪 Testing

Run the CSV validation tests:

```bash
npm test
```

Tests cover:
- CSV parsing and validation
- Required field validation
- Duplicate SKU detection
- Category validation
- Error reporting

## 📦 Build for Production

```bash
npm run build
```

Output will be in `dist/` directory. Deploy to:
- Vercel (recommended)
- Netlify
- Any static hosting

## 🔌 MCP Integration (Optional)

The project includes Apper.io MCP server configuration for AI-assisted development.

### Configuration

MCP is configured in `.qwen/settings.json`:

```json
{
  "mcpServers": {
    "apper": {
      "httpUrl": "https://mcp.apper.io/v1/connect"
    }
  }
}
```

### Setup (Qwen Code)

1. Open Qwen Code
2. Run `/mcp` command
3. Select "apper" server
4. Choose "Auth" action
5. Complete OAuth in browser

### What MCP Provides

- Database queries via natural language
- Code generation assistance
- Schema exploration
- Import troubleshooting

**Note**: MCP is optional. The app works fully without it.

## 🐛 Troubleshooting

### "Supabase credentials not configured"

- Check `.env` file exists
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
- Restart dev server after changing `.env`

### "Permission denied" errors

- Verify user has profile in `profiles` table
- Check user role is set correctly (admin/nursery/customer)
- RLS policies are enforced - check SQL policies

### CSV import fails

- Check CSV format matches template
- Verify all required fields are present
- Check category names match exactly
- Look at error log for specific row issues

### Images not loading

- Check image URLs are publicly accessible
- Verify URLs return valid image content
- Fallback image is used when URL is invalid

## 📚 API Reference

### Catalogue Service Functions

```typescript
// Admin operations
fetchMasterPlants(options?) // Get all master plants
upsertMasterPlants(rows, userId, filename) // Import from CSV
fetchImportHistory() // Get import logs

// Nursery operations
fetchAvailablePlantsForNursery(nurseryId) // Get plants to add
addPlantToNursery(nurseryId, plantId, price) // Add listing
updateNurseryPlantPrice(nurseryId, listingId, price) // Update price
removePlantFromNursery(nurseryId, listingId) // Remove listing
```

### CSV Validation Functions

```typescript
parseAndValidateCSV(file, existingSkus?) // Parse and validate CSV
validatePlantRow(row, rowNumber) // Validate single row
downloadCsvTemplate() // Download template file
```

## 🎨 Customization

### Add New Categories

Edit `src/lib/csv-import.ts`:

```typescript
export const VALID_CATEGORIES = [
  // ... existing categories
  'Your New Category',
];
```

Then update database:

```sql
-- No schema change needed, categories are just text values
```

### Customize Fallback Image

Edit `src/lib/csv-import.ts`:

```typescript
export const FALLBACK_IMAGE_URL = 'https://your-image-url.jpg';
```

### Modify RLS Policies

Edit `supabase/migrations/001_initial_schema.sql` and re-run migration.

## 📄 License

MIT

## 🤝 Support

For issues or questions:
1. Check this setup guide
2. Review error messages in browser console
3. Check Supabase logs in dashboard
4. Verify RLS policies are correct

---

**Built with React, TypeScript, Tailwind CSS, and Supabase**
