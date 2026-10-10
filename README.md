# PlantConnect - India's #1 Plant Marketplace

A production-ready multi-vendor e-commerce marketplace connecting customers with verified nurseries, plant sellers, gardeners, landscapers and plantation service providers across India.

## 🌿 Features

- **Multi-vendor marketplace** with 500+ verified nurseries
- **Plant catalog** with 10,000+ varieties across 12+ categories
- **Plantation services** booking (garden setup, landscaping, tree plantation)
- **Multi-vendor checkout** - buy from multiple nurseries in one order
- **Commission system** with vendor payouts
- **Location-based** nursery discovery
- **Wishlist, reviews, and ratings**
- **Vendor registration** and approval workflow
- **Responsive design** - works on all devices

## 🔌 MCP Integration (Apper.io)

PlantConnect is connected to **Apper.io's MCP server** for backend infrastructure:

```
MCP Server: https://mcp.apper.io/v1/connect
Protocol:   JSON-RPC 2.0 over HTTP POST
```

### What the MCP Server Provides

| Capability | Description |
|-----------|-------------|
| **Database** | PostgreSQL with managed tables for all models |
| **Authentication** | Email/password, Google OAuth, Phone OTP |
| **Authorization** | Role-Based Access Control (Customer, Vendor, Admin) |
| **Payments** | Razorpay integration (UPI, Cards, Net Banking, COD) |
| **API** | Auto-generated REST API with real keys |
| **Webhooks** | Event triggers for orders, payments, signups |
| **Connectors** | Zapier, Make, n8n, Slack, Gmail integrations |

### Connection Status

The app shows a real-time connection indicator in the bottom-right corner:
- 🟢 **Connected** — MCP server is available, all data operations go through the backend
- 🟡 **Connecting** — Attempting to establish connection
- ⚪ **Offline Mode** — Falls back to local demo data (app still fully functional)

### MCP Client Architecture

```
src/
├── lib/
│   ├── mcp-client.ts      # JSON-RPC 2.0 MCP protocol client
│   └── data-service.ts    # Data access layer (MCP → local fallback)
├── hooks/
│   └── useMcpConnection.ts # React hook for connection state
└── components/
    └── McpStatusIndicator.tsx # Live connection status UI
```

### MCP Protocol Flow

1. **Initialize** → `POST /v1/connect` with `initialize` JSON-RPC method
2. **Discover** → `tools/list` to get available server tools
3. **Operate** → `tools/call` for database queries, auth, orders, etc.

### Available MCP Tools

- `list_records` — Query products, vendors, orders, reviews
- `get_record` — Fetch single record by ID
- `insert_record` — Create orders, reviews, vendor applications
- `update_record` — Modify records
- `delete_record` — Remove records
- `login` / `signup` — Authentication
- `create_table` — Database schema management
- `run_query` — Complex data operations

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS 4 |
| Routing | React Router v6 |
| Animation | Framer Motion |
| Icons | Lucide React |
| Charts | Recharts |
| Backend | Apper.io MCP Server |
| Database | PostgreSQL (via MCP) |
| Auth | Email + Google OAuth + Phone OTP |
| Payments | Razorpay (UPI, Cards, COD) |

## 📦 Data Models

- **User** — Customers, vendors, admins
- **Vendor** — Nursery profiles with verification
- **Product** — Plants with care info, images, pricing
- **Category** — 12+ plant categories
- **Order** — Multi-vendor parent orders
- **VendorOrder** — Per-vendor order splits
- **Payment** — Razorpay payment records
- **Review** — Customer ratings and reviews
- **Cart / CartItem** — Shopping cart
- **Wishlist** — Saved products
- **Coupon** — Discount codes
- **Commission** — Platform commission tracking
- **Payout** — Vendor earnings payouts
- **Service** — Plantation service listings
- **ServiceBooking** — Service booking records
- **Notification** — In-app notifications

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Authenticate |
| GET | `/api/products` | List products |
| GET | `/api/products/:slug` | Product details |
| GET | `/api/vendors` | List nurseries |
| POST | `/api/cart/items` | Add to cart |
| POST | `/api/orders` | Place order |
| POST | `/api/payments/create-order` | Razorpay order |
| POST | `/api/payments/verify` | Verify payment |
| POST | `/api/reviews` | Submit review |
| POST | `/api/services/book` | Book service |

## 🎨 Design System

- **Primary**: `#2E7D32` (Forest Green)
- **Secondary**: `#66BB6A` (Light Green)
- **Accent**: `#A5D6A7` (Mint)
- **Background**: `#F7FAF5` (Off-white green)
- **Font**: Inter

## 📄 License

MIT
