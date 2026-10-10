/**
 * PlantConnect Data Service
 * 
 * Uses the Apper.io MCP server as the backend for all data operations.
 * Falls back to local data when MCP is unavailable (offline mode).
 * 
 * MCP Tools used:
 * - list_records: Query products, vendors, categories, orders
 * - get_record: Fetch single records by ID
 * - insert_record: Create new records
 * - update_record: Modify existing records
 * - delete_record: Remove records
 * - count_records: Get record counts
 * - run_query: Complex queries
 */

import { mcpClient } from './mcp-client';
import {
  products as localProducts,
  vendors as localVendors,
  categories as localCategories,
  services as localServices,
  reviews as localReviews,
  type Product,
  type Vendor,
  type Category,
  type Service,
  type Review,
} from '../data';

// Connection state
let mcpAvailable = false;
let connectionAttempted = false;

/**
 * Attempt to connect to MCP server
 */
export async function ensureMcpConnection(): Promise<boolean> {
  if (mcpAvailable) return true;
  if (connectionAttempted) return false;

  connectionAttempted = true;

  try {
    await mcpClient.initialize();
    mcpAvailable = true;
    return true;
  } catch {
    console.warn('⚠️ MCP server unavailable — running in offline mode with local data');
    mcpAvailable = false;
    return false;
  }
}

/**
 * Check if MCP backend is connected
 */
export function isMcpConnected(): boolean {
  return mcpAvailable;
}

// ============================================
// PRODUCTS
// ============================================

export async function fetchProducts(filters?: {
  category?: string;
  vendorId?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
}): Promise<Product[]> {
  if (mcpAvailable) {
    try {
      const query: Record<string, unknown> = { table: 'products' };
      if (filters?.category) query.category = filters.category;
      if (filters?.vendorId) query.vendorId = filters.vendorId;
      if (filters?.search) query.search = filters.search;
      if (filters?.minPrice !== undefined) query.minPrice = filters.minPrice;
      if (filters?.maxPrice !== undefined) query.maxPrice = filters.maxPrice;
      if (filters?.featured !== undefined) query.featured = filters.featured;

      return await mcpClient.callToolJson<Product[]>('list_records', query);
    } catch (error) {
      console.warn('MCP fetch products failed, using local data:', error);
    }
  }

  // Fallback to local data
  let result = [...localProducts];
  if (filters?.category) {
    const cat = localCategories.find(c => c.slug === filters.category);
    if (cat) result = result.filter(p => p.categoryId === cat.id);
  }
  if (filters?.vendorId) result = result.filter(p => p.vendorId === filters.vendorId);
  if (filters?.search) {
    const s = filters.search.toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(s) ||
      p.description.toLowerCase().includes(s) ||
      p.tags.some(t => t.includes(s))
    );
  }
  if (filters?.minPrice !== undefined) result = result.filter(p => p.price >= filters.minPrice!);
  if (filters?.maxPrice !== undefined) result = result.filter(p => p.price <= filters.maxPrice!);
  if (filters?.featured !== undefined) result = result.filter(p => p.isFeatured === filters.featured);

  return result;
}

export async function fetchProductBySlug(slug: string): Promise<Product | undefined> {
  if (mcpAvailable) {
    try {
      const results = await mcpClient.callToolJson<Product[]>('list_records', {
        table: 'products',
        filters: { slug },
        limit: 1,
      });
      return results[0];
    } catch (error) {
      console.warn('MCP fetch product failed:', error);
    }
  }
  return localProducts.find(p => p.slug === slug);
}

export async function fetchProductById(id: string): Promise<Product | undefined> {
  if (mcpAvailable) {
    try {
      return await mcpClient.callToolJson<Product>('get_record', {
        table: 'products',
        id,
      });
    } catch (error) {
      console.warn('MCP fetch product by ID failed:', error);
    }
  }
  return localProducts.find(p => p.id === id);
}

// ============================================
// VENDORS / NURSERIES
// ============================================

export async function fetchVendors(filters?: {
  search?: string;
  city?: string;
  verified?: boolean;
}): Promise<Vendor[]> {
  if (mcpAvailable) {
    try {
      const query: Record<string, unknown> = { table: 'vendors' };
      if (filters?.search) query.search = filters.search;
      if (filters?.city) query.city = filters.city;
      if (filters?.verified !== undefined) query.verified = filters.verified;
      return await mcpClient.callToolJson<Vendor[]>('list_records', query);
    } catch (error) {
      console.warn('MCP fetch vendors failed:', error);
    }
  }

  let result = [...localVendors];
  if (filters?.search) {
    const s = filters.search.toLowerCase();
    result = result.filter(v =>
      v.businessName.toLowerCase().includes(s) ||
      v.city.toLowerCase().includes(s) ||
      v.specialties.some(sp => sp.toLowerCase().includes(s))
    );
  }
  if (filters?.city) result = result.filter(v => v.city.toLowerCase() === filters.city!.toLowerCase());
  if (filters?.verified !== undefined) result = result.filter(v => v.verified === filters.verified);

  return result;
}

export async function fetchVendorBySlug(slug: string): Promise<Vendor | undefined> {
  if (mcpAvailable) {
    try {
      const results = await mcpClient.callToolJson<Vendor[]>('list_records', {
        table: 'vendors',
        filters: { slug },
        limit: 1,
      });
      return results[0];
    } catch (error) {
      console.warn('MCP fetch vendor failed:', error);
    }
  }
  return localVendors.find(v => v.slug === slug);
}

// ============================================
// CATEGORIES
// ============================================

export async function fetchCategories(): Promise<Category[]> {
  if (mcpAvailable) {
    try {
      return await mcpClient.callToolJson<Category[]>('list_records', { table: 'categories' });
    } catch (error) {
      console.warn('MCP fetch categories failed:', error);
    }
  }
  return localCategories;
}

// ============================================
// SERVICES
// ============================================

export async function fetchServices(filters?: {
  vendorId?: string;
  area?: string;
}): Promise<Service[]> {
  if (mcpAvailable) {
    try {
      const query: Record<string, unknown> = { table: 'services' };
      if (filters?.vendorId) query.vendorId = filters.vendorId;
      if (filters?.area) query.area = filters.area;
      return await mcpClient.callToolJson<Service[]>('list_records', query);
    } catch (error) {
      console.warn('MCP fetch services failed:', error);
    }
  }

  let result = [...localServices];
  if (filters?.vendorId) result = result.filter(s => s.vendorId === filters.vendorId);
  if (filters?.area) result = result.filter(s => s.serviceArea.toLowerCase().includes(filters.area!.toLowerCase()));
  return result;
}

// ============================================
// REVIEWS
// ============================================

export async function fetchReviews(productId?: string): Promise<Review[]> {
  if (mcpAvailable) {
    try {
      const query: Record<string, unknown> = { table: 'reviews' };
      if (productId) query.productId = productId;
      return await mcpClient.callToolJson<Review[]>('list_records', query);
    } catch (error) {
      console.warn('MCP fetch reviews failed:', error);
    }
  }
  return localReviews;
}

export async function createReview(review: Omit<Review, 'id'>): Promise<Review> {
  if (mcpAvailable) {
    try {
      return await mcpClient.callToolJson<Review>('insert_record', {
        table: 'reviews',
        data: review,
      });
    } catch (error) {
      console.warn('MCP create review failed:', error);
    }
  }
  // Fallback: create locally
  return { ...review, id: `r_${Date.now()}` } as Review;
}

// ============================================
// ORDERS
// ============================================

export interface OrderData {
  customerId: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  shippingFee: number;
  total: number;
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: string;
}

export async function createOrder(order: OrderData): Promise<{ orderId: string; orderNumber: string }> {
  if (mcpAvailable) {
    try {
      const result = await mcpClient.callToolJson<{ orderId: string; orderNumber: string }>('insert_record', {
        table: 'orders',
        data: {
          ...order,
          status: 'confirmed',
          paymentStatus: order.paymentMethod === 'cod' ? 'pending' : 'paid',
          createdAt: new Date().toISOString(),
        },
      });
      return result;
    } catch (error) {
      console.warn('MCP create order failed:', error);
    }
  }
  // Fallback: generate order locally
  const orderId = `ord_${Date.now()}`;
  const orderNumber = `PC${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
  return { orderId, orderNumber };
}

export async function fetchOrders(customerId: string): Promise<Array<{
  id: string;
  orderNumber: string;
  total: number;
  status: string;
  createdAt: string;
  items: number;
}>> {
  if (mcpAvailable) {
    try {
      return await mcpClient.callToolJson('list_records', {
        table: 'orders',
        filters: { customerId },
        sort: { createdAt: 'desc' },
      });
    } catch (error) {
      console.warn('MCP fetch orders failed:', error);
    }
  }
  // Fallback mock orders
  return [
    { id: '1', orderNumber: 'PC8X2K9M', total: 1847, status: 'Delivered', createdAt: '2024-01-15', items: 3 },
    { id: '2', orderNumber: 'PC5N7P3Q', total: 899, status: 'In Transit', createdAt: '2024-01-08', items: 1 },
    { id: '3', orderNumber: 'PC2R4T6W', total: 2345, status: 'Delivered', createdAt: '2024-01-02', items: 4 },
  ];
}

// ============================================
// VENDOR REGISTRATION
// ============================================

export interface VendorRegistration {
  businessName: string;
  email: string;
  phone: string;
  description: string;
  city: string;
  state: string;
  address: string;
  pincode: string;
  deliveryRadius: number;
  categories: string[];
  bankDetails?: {
    accountHolder: string;
    accountNumber: string;
    ifsc: string;
    bankName: string;
  };
}

export async function registerVendor(data: VendorRegistration): Promise<{ vendorId: string; status: string }> {
  if (mcpAvailable) {
    try {
      return await mcpClient.callToolJson('insert_record', {
        table: 'vendor_applications',
        data: {
          ...data,
          status: 'pending_review',
          submittedAt: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.warn('MCP vendor registration failed:', error);
    }
  }
  // Fallback
  return {
    vendorId: `v_${Date.now()}`,
    status: 'Application submitted! Our team will review and get back to you within 48 hours.',
  };
}

// ============================================
// AUTH
// ============================================

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'vendor' | 'admin';
  avatar?: string;
}

export async function loginUser(email: string, password: string): Promise<AuthUser | null> {
  if (mcpAvailable) {
    try {
      return await mcpClient.callToolJson<AuthUser>('login', { email, password });
    } catch (error) {
      console.warn('MCP login failed:', error);
    }
  }
  // Fallback: demo login
  if (email === 'customer@example.com') {
    return { id: 'u1', name: 'Rahul Sharma', email, role: 'customer' };
  }
  if (email === 'vendor@example.com') {
    return { id: 'u2', name: 'Green Valley Nursery', email, role: 'vendor' };
  }
  if (email === 'admin@example.com') {
    return { id: 'u3', name: 'Admin', email, role: 'admin' };
  }
  return null;
}

export async function registerUser(data: { name: string; email: string; phone: string; password: string }): Promise<AuthUser> {
  if (mcpAvailable) {
    try {
      return await mcpClient.callToolJson<AuthUser>('signup', data);
    } catch (error) {
      console.warn('MCP registration failed:', error);
    }
  }
  // Fallback
  return {
    id: `u_${Date.now()}`,
    name: data.name,
    email: data.email,
    phone: data.phone,
    role: 'customer',
  };
}

// ============================================
// WISHLIST
// ============================================

export async function fetchWishlist(userId: string): Promise<string[]> {
  if (mcpAvailable) {
    try {
      const items = await mcpClient.callToolJson<Array<{ productId: string }>>('list_records', {
        table: 'wishlists',
        filters: { userId },
      });
      return items.map(i => i.productId);
    } catch (error) {
      console.warn('MCP fetch wishlist failed:', error);
    }
  }
  return [];
}

export async function addToWishlist(userId: string, productId: string): Promise<void> {
  if (mcpAvailable) {
    try {
      await mcpClient.callTool('insert_record', {
        table: 'wishlists',
        data: { userId, productId, createdAt: new Date().toISOString() },
      });
    } catch (error) {
      console.warn('MCP add to wishlist failed:', error);
    }
  }
}

export async function removeFromWishlist(userId: string, productId: string): Promise<void> {
  if (mcpAvailable) {
    try {
      await mcpClient.callTool('delete_record', {
        table: 'wishlists',
        filters: { userId, productId },
      });
    } catch (error) {
      console.warn('MCP remove from wishlist failed:', error);
    }
  }
}
