# 🛍️ ShopSphere — Production-Ready E-Commerce Platform

> A modern, fully-featured e-commerce application built for the Frontend Engineering SDE-2 assessment. Engineered with scalability, maintainability, and developer experience at its core.

---

## 📋 Table of Contents

- [Live Demo](#live-demo)
- [What I Built](#what-i-built)
- [Feature Highlights](#feature-highlights)
- [Tech Stack & Decisions](#tech-stack--decisions)
- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)

- [State Management Strategy](#state-management-strategy)
- [Code Quality & Scalability Standards](#code-quality--scalability-standards)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Design Decisions](#design-decisions)
- [What I Would Do Differently](#what-i-would-do-differently)
- [TODO / Future Roadmap](#todo--future-roadmap)

---

## 🚀 Live Demo

> **[→ View Live on Netlify](#)** _(https://shopsphereeee.netlify.app/)_
> **[→ GitHub Repository](#)** _(https://github.com/adityaraj9110/Ecom)_

---

## 🏗️ What I Built

ShopSphere is a production-grade e-commerce frontend that goes significantly beyond a typical assessment deliverable. It includes:

- A full product browsing experience with advanced filtering, search, and pagination
- A complete cart and checkout flow with form validation
- A wishlist, product comparison, and review system

- Authentication simulation (login/register with persisted session)
- Responsive design with accessibility (WCAG AA) baked in from the start
- Clean, layered architecture

---

## ✨ Feature Highlights

### 🛒 Core Shopping Experience

| Feature          | Details                                                                      |
| ---------------- | ---------------------------------------------------------------------------- |
| Product Listing  | Grid/List toggle, image lazy-loading, skeleton loaders                       |
| Advanced Filters | Category, price range, brand, rating, in-stock toggle — all composable       |
| Search           | Debounced search with instant results and highlighted matches                |
| Sorting          | Price (asc/desc), popularity, newest, rating                                 |
| Pagination       | Server-style pagination with page size control                               |
| Product Detail   | Image gallery, variant selector (size/color), stock status, related products |
| Reviews          | Star ratings, written reviews, review summary                                |
| Compare          | Side-by-side comparison of up to 4 products                                  |

### 🧺 Cart & Checkout

| Feature         | Details                                                               |
| --------------- | --------------------------------------------------------------------- |
| Cart            | Add/remove/update quantity, persistent across sessions (localStorage) |
| Wishlist        | Save for later, move to cart, persisted                               |
| Checkout        | Multi-step flow: Address → Shipping → Payment → Review → Confirmation |
| Form Validation | Field-level validation with react-hook-form + Zod schemas             |
| Order Summary   | Live price calculations, discount codes, estimated tax                |

### 👤 User Features

| Feature        | Details                                                      |
| -------------- | ------------------------------------------------------------ |
| Auth           | Login, Register, Guest checkout (simulated with mock tokens) |
| User Profile   | Order history, saved addresses, account settings             |
| Order Tracking | Mock order status timeline                                   |
| Notifications  | Toast system for all user actions                            |

---

## 🧰 Tech Stack & Decisions

### Core

| Technology       | Choice                           | Reason                                                             |
| ---------------- | -------------------------------- | ------------------------------------------------------------------ |
| Framework        | **React 18** (Vite)              | Fast HMR, modern features (Suspense, concurrent), wide ecosystem   |
| Language         | **TypeScript**                   | Type safety eliminates entire classes of bugs; essential for scale |
| Routing          | **React Router v6**              | Nested layouts, data loaders, code splitting                       |
| State Management | **Zustand**                      | Lightweight, minimal boilerplate, easy to slice per domain         |
| Server State     | **TanStack Query (React Query)** | Caching, background refetch, loading/error states out of the box   |
| Forms            | **React Hook Form + Zod**        | Performant, schema-driven validation with excellent DX             |

### Styling

| Technology    | Choice                    | Reason                                                 |
| ------------- | ------------------------- | ------------------------------------------------------ |
| Styling       | **CSS Modules + SCSS**    | Scoped styles, no runtime cost, full SCSS power        |
| Design Tokens | **CSS Custom Properties** | Single source of truth for colors, spacing, typography |
| Animation     | **Framer Motion**         | Declarative, powerful, accessible animations           |
| Icons         | **Lucide React**          | Tree-shakeable, consistent icon set                    |

### Developer Tooling

| Tool             | Purpose                                                   |
| ---------------- | --------------------------------------------------------- |
| **ESLint**       | Code linting and consistency                              |
| **Path aliases** | `@components/`, `@hooks/`, `@store/` etc. via Vite config |

---

## 🏛️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        UI LAYER                             │
│  Pages → Layouts → Feature Components → UI Components       │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                   STATE LAYER                               │
│  Zustand Stores (cart, auth, ui, wishlist, comparison)      │
│  TanStack Query (products, orders, user, reviews)           │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                  SERVICE LAYER                              │
│  API clients, mock data adapters, transformers              │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                   DATA LAYER                                │
│  Mock JSON / FakeStore API / DummyJSON API                  │
│  + External API Integrations (DummyJSON, etc.)              │
└─────────────────────────────────────────────────────────────┘
```

### Layering Rules (strictly enforced)

- **UI components** have zero business logic — they receive props and emit events
- **Feature components** orchestrate hooks and compose UI components
- **Hooks** are the only place that talks to stores and services
- **Services** are pure functions — no React, no state, just data transformation
- **Stores** contain only state + actions, never async logic (that lives in query hooks)

---

## 📁 Project Structure

```
shopsphere/
├── public/
│   └── assets/                    # Static assets, favicon, OG images
│
├── src/
│   ├── app/
│   │   ├── App.tsx                # Root component, provider tree
│   │   ├── Router.tsx             # All route definitions
│   │   └── providers/             # QueryClient, ThemeProvider, ToastProvider
│   │
│   ├── features/                  # Feature-sliced architecture
│   │   ├── products/
│   │   │   ├── components/        # ProductCard, ProductGrid, ProductDetail
│   │   │   ├── hooks/             # useProducts, useProduct, useProductFilters
│   │   │   ├── services/          # productApi, productTransformers
│   │   │   ├── store/             # filterStore (Zustand)
│   │   │   ├── types/             # Product, ProductVariant, Review types
│   │   │   └── index.ts           # Public API of this feature
│   │   │
│   │   ├── cart/
│   │   │   ├── components/        # CartDrawer, CartItem, CartSummary
│   │   │   ├── hooks/             # useCart
│   │   │   ├── store/             # cartStore (Zustand + localStorage persist)
│   │   │   └── types/
│   │   │
│   │   ├── checkout/
│   │   │   ├── components/        # CheckoutStepper, AddressForm, PaymentForm
│   │   │   ├── hooks/             # useCheckout, useOrderSubmit
│   │   │   └── schemas/           # Zod validation schemas
│   │   │
│   │   ├── auth/
│   │   │   ├── components/        # LoginForm, RegisterForm, AuthGuard
│   │   │   ├── hooks/             # useAuth, useUser
│   │   │   └── store/             # authStore (Zustand)
│   │   │
│   │   ├── wishlist/
│   │   │   ├── components/
│   │   │   └── store/
│   │   │

│   ├── pages/                     # Route-level page components
│   │   ├── HomePage.tsx
│   │   ├── ProductListingPage.tsx
│   │   ├── ProductDetailPage.tsx
│   │   ├── CartPage.tsx
│   │   ├── CheckoutPage.tsx
│   │   ├── OrderConfirmationPage.tsx
│   │   ├── WishlistPage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── OrderHistoryPage.tsx
│   │   └── NotFoundPage.tsx
│   │
│   ├── layouts/
│   │   ├── RootLayout.tsx         # Header + Footer wrapper
│   │   ├── AuthLayout.tsx         # Centered auth pages
│   │   └── CheckoutLayout.tsx     # Minimal header, no footer

│   │
│   ├── components/                # Shared, generic UI components
│   │   ├── ui/
│   │   │   ├── Button/
│   │   │   ├── Modal/
│   │   │   ├── Drawer/
│   │   │   ├── Badge/
│   │   │   ├── Skeleton/
│   │   │   ├── Toast/
│   │   │   ├── Pagination/
│   │   │   └── EmptyState/
│   │   └── layout/
│   │       ├── Header/
│   │       ├── Footer/
│   │       ├── Sidebar/
│   │
│   ├── hooks/                     # Shared, non-feature hooks
│   │   ├── useDebounce.ts
│   │   └── useClickOutside.ts
│   │
│   ├── services/                  # Shared services
│   │   ├── apiClient.ts           # Axios instance with interceptors
│   │
│   ├── store/                     # Global app-level Zustand store
│   │   └── uiStore.ts             # Sidebar open, theme, modal state
│   │
│   ├── styles/                    # Global SCSS
│   │   ├── _tokens.scss           # Design tokens (maps to CSS vars)
│   │   ├── _reset.scss
│   │   ├── _typography.scss
│   │   ├── _animations.scss
│   │   └── main.scss              # Entry point
│   │
│   ├── types/                     # Global TypeScript types
│   │   ├── api.types.ts
│   │   └── common.types.ts
│   │
│   └── utils/                     # Pure utility functions
│       ├── currency.ts            # formatPrice, convertCurrency
│
├── vite.config.ts                 # Path aliases, build config
├── tsconfig.json
├── .eslintrc.json
└── README.md

```

---

## 🗄️ State Management Strategy

The app uses a **two-layer state strategy** to separate concerns cleanly:

### Layer 1: Client State → Zustand

Used for state that belongs to the client and never needs server synchronization:

| Store             | Responsibility                                     |
| ----------------- | -------------------------------------------------- |
| `cartStore`       | Cart items, quantities — persisted to localStorage |
| `authStore`       | Current user, token — persisted to localStorage    |
| `wishlistStore`   | Saved products — persisted                         |
| `uiStore`         | Drawer open/close, active modal, theme             |
| `filterStore`     | Active filter values (resets on navigation)        |
| `comparisonStore` | Products in comparison tray                        |

### Layer 2: Server State → TanStack Query

Used for everything fetched from an API — caches, deduplicates, and automatically invalidates:

| Query Key                | Data                                        |
| ------------------------ | ------------------------------------------- |
| `['products', filters]`  | Product listing, respects filter params     |
| `['product', id]`        | Single product detail                       |
| `['reviews', productId]` | Reviews for a product                       |
| `['categories']`         | All categories (long cache, rarely changes) |
| `['orders', userId]`     | User's order history                        |

## 🏆 Code Quality & Scalability Standards

This project is built to be **maintained by me**. Every decision optimizes for long-term readability and change-safety.

### TypeScript Strictness

```jsonc
// tsconfig.json
{
  "strict": true,
  "noUncheckedIndexedAccess": true,
  "noImplicitOverride": true,
  "exactOptionalPropertyTypes": true,
}
```

Zero `any` types allowed. All API responses validated with Zod at the boundary.

### Linting & Formatting

```jsonc
// .eslintrc.json — enforced rules
{
  "rules": {
    "no-console": "warn",
    "import/order": "error", // Consistent import grouping
    "@typescript-eslint/no-explicit-any": "error",
    "react/prop-types": "off", // TypeScript handles this
    "react-hooks/exhaustive-deps": "error",
  },
}
```

Prettier enforces formatting. Husky + lint-staged runs both on every commit — bad code cannot be committed.

### Component Contracts

Every non-trivial component:

1. Has explicit TypeScript `Props` interface
2. Has clear responsibility and focused functionality
3. Follows single responsibility — one clear job

### Custom Hook Pattern

All business logic lives in custom hooks:

```typescript
// ✅ Feature component — clean, no logic
function ProductCard({ productId }: Props) {
  const { product, isLoading } = useProduct(productId);
  const { addToCart } = useCart();
  const { isWishlisted, toggle } = useWishlist(productId);

  if (isLoading) return <ProductCard.Skeleton />;
  return <ProductCardView product={product} onAddToCart={addToCart} isWishlisted={isWishlisted} onWishlistToggle={toggle} />;
}
```

### Feature Encapsulation

Each feature exports only through its `index.ts`. No cross-feature deep imports:

```typescript
// ✅ Correct
import { ProductCard } from "@features/products";

// ❌ Forbidden
import { ProductCard } from "@features/products/components/ProductCard/ProductCard";
```

This means internals can be freely refactored without touching other features.

### Performance Budget

- Route-level code splitting with `React.lazy` + `Suspense`
- All images lazy-loaded with `loading="lazy"` and explicit `width`/`height`
- Debounced search, memoized selectors, stable references

### Accessibility

- Semantic HTML throughout (`<nav>`, `<main>`, `<article>`, `<section>`)
- All interactive elements keyboard-navigable
- Focus trapping in modals and drawers
- ARIA labels on icon-only buttons
- Color contrast meets WCAG AA
- Reduced motion respected via `prefers-reduced-motion`

### Error Handling

- Global error boundary catches rendering crashes
- API errors surfaced as typed `ApiError` objects
- React Query's `onError` handlers show contextual toast messages
- 404, 500 fallback pages
- Form errors shown inline, never as alerts

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm 10+ or pnpm 9+

### Installation

```bash
# Clone the repo
git clone https://github.com/adityaraj9110/Ecom.git
cd Ecom

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local (not needed)

# Start development server
npm run dev
```

App runs at `http://localhost:5173`

### Available Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview production build locally
npm run lint         # ESLint

```

---

## 🔑 Environment Variables

```bash
# .env.local



---

## 🎨 Design Decisions

### Why Zustand over Redux?

Redux Toolkit is excellent but introduces significant ceremony — slices, reducers, selectors, thunks. For a frontend-only app without a large team needing strict action-logging discipline, Zustand gives 90% of the structure with 30% of the boilerplate. Each store is a self-contained module, easy to unit-test.

### Why TanStack Query for server state?

Managing async state manually (loading, error, data, refetching, caching) is a known footgun. React Query makes these problems disappear declaratively. Combined with Zustand for client state, there's a clear mental model: _"Is this data fetched from somewhere? Use Query. Is this local UI state? Use Zustand."_

### Why CSS Modules + SCSS instead of Tailwind?

Tailwind is excellent for prototyping but produces verbose JSX, couples styling to markup, and makes complex responsive layouts harder to read. CSS Modules offer full encapsulation with zero runtime cost. SCSS adds mixins, nesting, and the token system. The styling is also easier for interviewers to read and understand intent.

### Why Feature-Sliced Architecture?

Flat `components/` folders collapse under complexity. Feature-sliced keeps everything related to "products" in one place — easy to onboard new engineers ("all product stuff is in `/features/products`") and safe to delete an entire feature without hunting across the codebase.


---

## 📄 License

MIT — free to use for assessment and educational purposes.

---

_Built with ❤️ for the ShopSphere Frontend SDE-2 Assessment._
```
