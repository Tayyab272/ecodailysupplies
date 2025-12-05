# Codebase Index - Eco Daily Supplies / Volle Lux Catalog

**Generated:** January 2025  
**Project Type:** B2B/B2C E-commerce Platform  
**Framework:** Next.js 16 (App Router)  
**Status:** Active Development

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Directory Structure](#directory-structure)
4. [Key Components](#key-components)
5. [Services & Business Logic](#services--business-logic)
6. [API Routes](#api-routes)
7. [Data Layer](#data-layer)
8. [Type Definitions](#type-definitions)
9. [Configuration Files](#configuration-files)
10. [Documentation](#documentation)

---

## Project Overview

This is a premium B2B/B2C e-commerce platform for packaging supplies with the following key features:

- **Unified Storefront**: Single interface for both retail and wholesale customers
- **Dynamic Pricing Engine**: Automatic tiered pricing based on quantity
- **Hybrid CMS Architecture**: Sanity CMS for products/content, Supabase for transactions
- **Modern Stack**: Next.js 16, React 19, TypeScript, Tailwind CSS v4
- **Design Philosophy**: "Immersive Minimalism & Performant Luxury"

### Core Principles

- Server-first architecture with React Server Components
- Type-safe development with strict TypeScript
- Performance-optimized (LCP < 2.5s, CLS < 0.1)
- Mobile-first responsive design
- Accessibility-first (WCAG 2.1 AA)

---

## Technology Stack

### Frontend
- **Framework**: Next.js 16.0.0 (App Router)
- **React**: 19.2.0
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn UI + Radix UI
- **Icons**: Lucide React
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **Animations**: Framer Motion

### Backend & Services
- **Authentication**: Supabase Auth (@supabase/ssr)
- **Database**: Supabase (PostgreSQL)
- **CMS**: Sanity CMS v4
- **Payments**: Stripe
- **Email**: Resend + React Email
- **Monitoring**: Vercel Analytics

### Development Tools
- **Linting**: ESLint
- **Formatting**: Prettier
- **Type Checking**: TypeScript strict mode
- **Bundle Analysis**: @next/bundle-analyzer

---

## Directory Structure

```
eco-daily-supplies/
├── app/                          # Next.js App Router pages & routes
│   ├── (auth)/                   # Authentication pages
│   ├── (storefront)/             # Public storefront pages
│   ├── account/                  # User account pages (protected)
│   ├── admin/                    # Admin dashboard (protected)
│   ├── api/                      # API routes
│   ├── products/                 # Product listing & detail pages
│   ├── cart/                     # Shopping cart page
│   ├── checkout/                 # Checkout flow
│   ├── studio/                   # Sanity Studio integration
│   └── layout.tsx                # Root layout
│
├── components/                   # React components
│   ├── account/                  # Account-related components
│   ├── admin/                    # Admin dashboard components
│   ├── auth/                     # Authentication components
│   ├── b2b/                      # B2B request components
│   ├── cart/                     # Cart components
│   ├── checkout/                 # Checkout components
│   ├── common/                   # Shared layout components
│   ├── home/                     # Homepage components
│   ├── products/                 # Product-related components
│   └── ui/                       # Shadcn UI base components
│
├── services/                     # Business logic services
│   ├── admin/                    # Admin operations
│   ├── announcements/            # Announcement management
│   ├── auth/                     # Authentication services
│   ├── b2b/                      # B2B request handling
│   ├── banners/                  # Banner management
│   ├── cart/                     # Cart operations
│   ├── emails/                   # Email services
│   ├── orders/                   # Order management
│   ├── pricing/                  # Pricing calculations
│   ├── products/                 # Product services
│   ├── stripe/                   # Payment processing
│   └── users/                    # User management
│
├── lib/                          # Utilities & configurations
│   ├── dal/                      # Data access layer
│   ├── emails/                   # Email templates
│   ├── resend/                   # Resend configuration
│   ├── stores/                   # Zustand stores
│   ├── stripe/                   # Stripe configuration
│   ├── supabase/                 # Supabase clients
│   └── utils/                    # Utility functions
│
├── sanity/                       # Sanity CMS configuration
│   ├── lib/                      # Sanity utilities & queries
│   └── schemaTypes/              # Sanity schema definitions
│
├── supabase/                     # Supabase migrations
│   └── migrations/               # SQL migration files
│
├── types/                        # TypeScript type definitions
│   ├── b2b-request.ts
│   ├── cart.ts
│   ├── category.ts
│   ├── product.ts
│   └── shipping.ts
│
└── docs/                         # Project documentation
    ├── Architecture.md           # Technical architecture (v1.1)
    ├── Design.md                 # Design system (v2.1)
    ├── PRD.md                    # Product requirements (v1.1)
    └── Phase2-Backend-Integration.md
```

---

## Key Components

### Layout Components (`components/common/`)
- **header.tsx**: Main navigation with mega menu
- **footer.tsx**: Site footer with links
- **breadcrumbs.tsx**: Navigation breadcrumbs
- **website-layout-wrapper.tsx**: Conditional layout wrapper
- **ResponsiveSanityImage.tsx**: Optimized Sanity image component

### Product Components (`components/products/`)
- **product-card.tsx**: Product display card for grids
- **product-grid.tsx**: Responsive product grid layout
- **product-gallery.tsx**: Image gallery with thumbnails
- **product-filters.tsx**: Filter sidebar component
- **variant-selector.tsx**: Product variant selection
- **quantity-price-selector.tsx**: Quantity input with dynamic pricing
- **pricing-table.tsx**: Tiered pricing display table
- **add-to-cart-button.tsx**: Add to cart functionality

### Cart Components (`components/cart/`)
- **mini-cart.tsx**: Slide-out cart drawer
- **cart-item.tsx**: Individual cart item display
- **cart-provider.tsx**: Cart context provider
- **order-summary.tsx**: Order summary with calculations
- **order-summary-with-vat.tsx**: VAT-inclusive summary

### Homepage Components (`components/home/`)
- **hero-section.tsx**: Hero banner/carousel
- **category-grid.tsx**: Category navigation grid
- **featured-products.tsx**: Featured products carousel
- **new-arrivals.tsx**: New products section
- **sustainability-block.tsx**: Sustainability information
- **b2b-banner.tsx**: B2B promotional banner

### Admin Components (`components/admin/`)
- **admin-dashboard-client.tsx**: Main admin dashboard
- **admin-layout.tsx**: Admin page layout
- **orders-table.tsx**: Orders management table
- **customer-table.tsx**: Customer management
- **b2b-requests-table.tsx**: B2B request management
- **revenue-chart.tsx**: Revenue analytics chart
- **orders-status-chart.tsx**: Order status visualization

---

## Services & Business Logic

### Product Services (`services/products/`)
- **product.service.ts**: Product fetching, filtering, searching
  - Fetches from Sanity CMS
  - Handles category filtering
  - Search functionality

### Cart Services (`services/cart/`)
- **cart.service.ts**: Cart persistence & synchronization
  - Supabase cart storage for authenticated users
  - localStorage for guest users
  - Cart item management

### Pricing Services (`services/pricing/`)
- **pricing.service.ts**: Dynamic pricing calculations
  - Tiered pricing based on quantity
  - Quantity option pricing
  - Discount calculations
  - VAT calculations (UK)

### Order Services (`services/orders/`)
- **order.service.ts**: Order creation & management
  - Order creation from cart
  - Order status tracking
  - Order history

### Auth Services (`services/auth/`)
- **auth.service.ts**: Client-side auth operations
- **auth-server.service.ts**: Server-side auth operations
  - Supabase Auth integration
  - Session management
  - Profile creation

### Admin Services (`services/admin/`)
- **admin-server.service.ts**: Admin operations
- **analytics.service.ts**: Analytics data fetching
- **customer.service.ts**: Customer management
- **order.service.ts**: Order management

---

## API Routes

### Product APIs (`app/api/products/`)
- **GET /api/products**: List products with filters
  - Query params: category, search, page, limit, sortBy

### Cart APIs
- Cart operations handled via Zustand store with Supabase sync
- Guest cart uses localStorage

### Order APIs (`app/api/orders/`)
- **GET /api/orders/by-session/[sessionId]**: Get order by session
- Order creation handled in checkout flow

### Checkout API (`app/api/checkout/`)
- **POST /api/checkout**: Create checkout session
  - Creates order
  - Creates Stripe Payment Intent
  - Returns client secret

### Payment APIs (`app/api/verify-payment/`)
- **GET /api/verify-payment/[sessionId]**: Verify payment status

### Webhooks (`app/api/webhooks/`)
- **POST /api/webhooks/stripe**: Stripe webhook handler
  - Payment confirmation
  - Order status updates
  - Email notifications

### Admin APIs (`app/api/admin/`)
- **GET /api/admin/orders**: List all orders
- **GET /api/admin/customers**: List customers
- **GET /api/admin/b2b-requests**: List B2B requests
- **GET /api/admin/stats**: Dashboard statistics
- **GET /api/admin/analytics**: Analytics data
- **GET /api/admin/orders/export**: Export orders to CSV

### Auth APIs (`app/api/auth/`)
- **POST /api/auth/create-profile**: Create user profile

---

## Data Layer

### Sanity CMS (`sanity/`)

**Schema Types** (`sanity/schemaTypes/`):
- **product.ts**: Product schema with variants, pricing tiers
- **category.ts**: Product category schema
- **productVariant.ts**: Variant schema with quantity options
- **pricingTier.ts**: Pricing tier configuration
- **banner.ts**: Promotional banners
- **announcement.ts**: Site announcements
- **blog-post.ts**: Blog content

**Queries** (`sanity/lib/queries.ts`):
- `PRODUCT_QUERY`: Full product data
- `PRODUCT_LISTING_QUERY`: Simplified product listing
- `CATEGORY_QUERY`: Category data
- `BANNER_QUERY`: Banner content
- `ANNOUNCEMENT_QUERY`: Announcement content

**Client** (`sanity/lib/client.ts`):
- Sanity client configuration
- Server-side data fetching
- Image URL builder

### Supabase (`lib/supabase/`)

**Clients**:
- **client.ts**: Browser client (`createBrowserClient`)
- **server.ts**: Server client (`createServerClient`)
- **service-role.ts**: Service role client (admin operations)

**Database Schema** (see `supabase/migrations/`):
- **profiles**: User profiles
- **addresses**: User addresses
- **carts**: Shopping carts
- **cart_items**: Cart line items
- **orders**: Orders
- **order_items**: Order line items
- **b2b_requests**: B2B quote requests
- **admin_users**: Admin user roles

**Key Migrations**:
- `001_create_tables.sql`: Core table structure
- `002_create_indexes.sql`: Performance indexes
- `003_create_triggers.sql`: Auto-update timestamps
- `004_verify_rls_policies.sql`: Row Level Security
- `010_add_admin_role.sql`: Admin role system
- `011_create_b2b_requests.sql`: B2B request system
- `20250111000000_add_shipping_and_vat.sql`: Shipping & VAT support
- `20250111120000_enable_guest_checkout.sql`: Guest checkout

---

## Type Definitions

### Product Types (`types/product.ts`)
```typescript
- Product: Core product interface
- ProductVariant: Variant with quantity options
- PricingTier: Tiered pricing configuration
- QuantityOption: Quantity-based pricing option
```

### Cart Types (`types/cart.ts`)
```typescript
- CartItem: Individual cart item
- Cart: Cart summary
```

### Shipping Types (`types/shipping.ts`)
```typescript
- ShippingOption: Available shipping methods
- ShippingCalculation: Shipping cost calculation
```

### B2B Request Types (`types/b2b-request.ts`)
```typescript
- B2BRequest: Custom quote request
```

---

## Configuration Files

### Next.js (`next.config.ts`)
- Image optimization settings
- Remote image patterns (Sanity CDN, R2)
- Bundle analyzer configuration

### TypeScript (`tsconfig.json`)
- Strict mode enabled
- Path aliases (`@/*`)
- React JSX configuration

### Tailwind CSS (`app/globals.css`)
- Tailwind v4 configuration
- Custom color scheme (neutral palette)
- CSS variables for theming
- Dark mode support

### Sanity (`sanity.config.ts`)
- Sanity Studio configuration
- Structure definition
- Vision tool (GROQ queries)
- Schema import

### Shadcn UI (`components.json`)
- Component configuration
- Path aliases
- Style: "new-york"
- Icon library: Lucide

---

## State Management

### Cart Store (`lib/stores/cart-store.ts`)
Zustand store for cart management:
- **Items**: Cart items array
- **addItem**: Add product to cart
- **removeItem**: Remove from cart
- **updateQuantity**: Update item quantity
- **clearCart**: Empty cart
- **getCartSummary**: Calculate totals
- **syncCart**: Sync to Supabase/localStorage

Features:
- Guest cart (localStorage)
- Authenticated cart (Supabase)
- Dynamic pricing on quantity changes
- Quantity option support

---

## Key Features Implementation

### Dynamic Pricing Engine
1. **Base Price**: Product base price + variant adjustment
2. **Quantity Options**: Variant-specific quantity-based pricing
3. **Pricing Tiers**: Product-level tiered discounts
4. **Priority**: Quantity Options > Pricing Tiers > Base Price

### Cart Persistence
- **Guest Users**: localStorage with key `volle-cart-guest`
- **Authenticated Users**: Supabase `carts` and `cart_items` tables
- **Auto-sync**: Cart syncs on every change

### Checkout Flow
1. Cart review
2. Address collection (shipping & billing)
3. Shipping method selection
4. Payment via Stripe Payment Intent
5. Order creation
6. Payment confirmation
7. Email notification

### Admin Dashboard
- Order management
- Customer management
- B2B request handling
- Analytics & reporting
- CSV export

---

## Performance Optimizations

1. **Server Components**: Default to RSC for data fetching
2. **Image Optimization**: Next.js Image component with Sanity CDN
3. **Code Splitting**: Dynamic imports for admin components
4. **Caching**: ISR for product pages, revalidation via webhooks
5. **Bundle Analysis**: Webpack bundle analyzer configured
6. **Font Optimization**: Inter font with `display: swap`

---

## Environment Variables

Required environment variables (`.env.local`):
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Resend
RESEND_API_KEY=

# App
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_SITE_NAME=

```

---

## Documentation

- **Architecture.md** (v1.1): Technical architecture and system design
- **Design.md** (v2.1): Design system and UI guidelines
- **PRD.md** (v1.1): Product requirements and features
- **Phase2-Backend-Integration.md**: Backend integration roadmap

---

## Development Workflow

### Getting Started
```bash
npm install
npm run dev
```

### Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Production build
- `npm run start`: Start production server
- `npm run lint`: Run ESLint
- `npm run analyze`: Analyze bundle size

### Key Development Principles
1. **Design-First**: Complete UI before backend integration
2. **Type Safety**: No `any` types without justification
3. **Server Components**: Default to RSC, use client only when needed
4. **Mobile-First**: Responsive design from mobile up
5. **Performance**: Optimize for Core Web Vitals

---

## Next Steps & TODOs

1. Complete backend integration (Phase 2)
2. Implement full test coverage
3. Add E2E tests for critical flows
4. Performance monitoring setup
5. SEO optimization (structured data)
6. Accessibility audit
7. Multi-language support (if needed)

---

**Last Updated**: January 2025  
**Maintained By**: Development Team

