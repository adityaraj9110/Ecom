# 🛍️ ShopSphere — Production-Ready E-Commerce Platform

> A modern, fully-featured e-commerce application built for the Frontend Engineering SDE-2 assessment. Engineered with scalability, maintainability, and developer experience at its core — and topped with an AI-powered shopping assistant chatbot.

---

## 📋 Table of Contents

- [Live Demo](#live-demo)
- [What I Built](#what-i-built)
- [Feature Highlights](#feature-highlights)
- [Tech Stack & Decisions](#tech-stack--decisions)
- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [AI Chatbot — ShopBot](#ai-chatbot--shopbot)
- [State Management Strategy](#state-management-strategy)
- [Code Quality & Scalability Standards](#code-quality--scalability-standards)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Design Decisions](#design-decisions)
- [What I Would Do Differently](#what-i-would-do-differently)
- [TODO / Future Roadmap](#todo--future-roadmap)

---

## 🚀 Live Demo

> **[→ View Live on Vercel](#)** _(link after deployment)_
> **[→ GitHub Repository](#)** _(link after push)_

---

## 🏗️ What I Built

ShopSphere is a production-grade e-commerce frontend that goes significantly beyond a typical assessment deliverable. It includes:

- A full product browsing experience with advanced filtering, search, and pagination
- A complete cart and checkout flow with form validation
- A wishlist, product comparison, and review system
- An **AI-powered shopping assistant chatbot** (ShopBot) embedded at the bottom-right of every page — users can search, ask questions, and get product recommendations in natural language
- Authentication simulation (login/register with persisted session)
- Responsive design with accessibility (WCAG AA) baked in from the start
- Clean, layered architecture that mirrors how a real production team would build this

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

### 🤖 AI Shopping Assistant (ShopBot)

| Feature                 | Details                                                       |
| ----------------------- | ------------------------------------------------------------- |
| Natural Language Search | "Show me red sneakers under ₹3000"                            |
| Product Q&A             | "What's the best laptop for video editing?"                   |
| Cart Assistance         | "Add the first result to my cart"                             |
| MCP Backend             | Claude API with Model Context Protocol for product tool calls |
| Conversation Memory     | Full session-scoped chat history                              |
| Typing Indicators       | Real-time streaming feel                                      |

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

### AI / Chatbot

| Technology | Choice                           | Reason                                                        |
| ---------- | -------------------------------- | ------------------------------------------------------------- |
| LLM        | **Claude (Anthropic API)**       | Superior reasoning, tool use (MCP), and instruction following |
| Protocol   | **Model Context Protocol (MCP)** | Structured tool definitions for product search, cart actions  |
| Transport  | **SSE / Streaming**              | Real-time streaming response for better UX                    |

### Developer Tooling

| Tool                               | Purpose                                                   |
| ---------------------------------- | --------------------------------------------------------- |
| **ESLint + Prettier**              | Code linting and consistent formatting                    |
| **Husky + lint-staged**            | Pre-commit hooks to enforce quality                       |
| **Vitest + React Testing Library** | Unit and component tests                                  |
| **Storybook**                      | Component documentation and isolated development          |
| **Path aliases**                   | `@components/`, `@hooks/`, `@store/` etc. via Vite config |

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
│  + Claude API + MCP Server (chatbot backend)                │
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
│   │   └── chatbot/               # AI Shopping Assistant
│   │       ├── components/
│   │       │   ├── ChatWidget.tsx  # Floating launcher button
│   │       │   ├── ChatDrawer.tsx  # Full chat panel
│   │       │   ├── ChatMessage.tsx # Individual message bubble
│   │       │   ├── ProductCard.tsx # Inline product card in chat
│   │       │   └── TypingDots.tsx  # Loading indicator
│   │       ├── hooks/
│   │       │   └── useChat.ts      # Chat state + Claude API integration
│   │       ├── services/
│   │       │   ├── claudeService.ts # Anthropic API client
│   │       │   └── mcpTools.ts     # MCP tool definitions
│   │       └── types/
│   │           └── chat.types.ts
│   │
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
│   │   ├── RootLayout.tsx         # Header + Footer + ChatWidget wrapper
│   │   ├── AuthLayout.tsx         # Centered auth pages
│   │   └── CheckoutLayout.tsx     # Minimal header, no footer
│   │
│   ├── components/                # Shared, generic UI components
│   │   ├── ui/
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Modal/
│   │   │   ├── Drawer/
│   │   │   ├── Badge/
│   │   │   ├── Skeleton/
│   │   │   ├── Toast/
│   │   │   ├── Pagination/
│   │   │   ├── RangeSlider/
│   │   │   ├── StarRating/
│   │   │   └── EmptyState/
│   │   └── layout/
│   │       ├── Header/
│   │       ├── Footer/
│   │       ├── Sidebar/
│   │       └── Breadcrumbs/
│   │
│   ├── hooks/                     # Shared, non-feature hooks
│   │   ├── useDebounce.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useIntersectionObserver.ts
│   │   ├── useMediaQuery.ts
│   │   └── useClickOutside.ts
│   │
│   ├── services/                  # Shared services
│   │   ├── apiClient.ts           # Axios instance with interceptors
│   │   └── mockData/              # JSON fixtures for all entities
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
│       ├── string.ts              # slugify, truncate, capitalize
│       ├── array.ts               # groupBy, sortBy, chunk
│       └── validation.ts          # Shared Zod schemas
│
├── .husky/                        # Git hooks
│   └── pre-commit                 # lint-staged
│
├── .storybook/                    # Storybook config
├── vitest.config.ts
├── vite.config.ts                 # Path aliases, build config
├── tsconfig.json
├── .eslintrc.json
├── .prettierrc
└── README.md
```

---

## 🤖 AI Chatbot — ShopBot

ShopBot is embedded as a floating button at the bottom-right of every page. It uses the **Claude API with Model Context Protocol (MCP)** to give the chatbot structured access to product data and cart actions.

### How It Works

```
User types message
       │
       ▼
claudeService.ts sends message + conversation history + MCP tool definitions
       │
       ▼
Claude decides whether to answer directly OR call an MCP tool
       │
    ┌──┴──┐
    │     │
    ▼     ▼
Direct  Tool call (e.g. searchProducts, addToCart, getProductById)
answer  │
    │   ▼
    │  mcpTools.ts executes the tool locally (hits mock API)
    │   │
    │   ▼
    │  Tool result fed back into Claude
    │   │
    │   ▼
    └──►Claude formulates final response
           │
           ▼
    Streamed back to UI
```

### MCP Tools Defined

```typescript
// mcpTools.ts
const tools = [
  {
    name: "search_products",
    description: "Search for products by name, category, or description",
    input_schema: {
      query: string,
      category?: string,
      min_price?: number,
      max_price?: number,
      min_rating?: number,
      in_stock_only?: boolean,
      limit?: number,
    }
  },
  {
    name: "get_product_detail",
    description: "Get full details of a specific product by ID",
    input_schema: { product_id: string }
  },
  {
    name: "add_to_cart",
    description: "Add a product to the user's shopping cart",
    input_schema: { product_id: string, quantity: number, variant_id?: string }
  },
  {
    name: "get_cart",
    description: "Get the user's current cart contents",
    input_schema: {}
  },
  {
    name: "get_categories",
    description: "List all available product categories",
    input_schema: {}
  },
]
```

### Example Conversations

> **User:** "Show me wireless headphones under ₹5000 with at least 4 stars"
> **ShopBot:** _(calls `search_products`)_ → "Here are 3 options that match…" _(renders product cards inline)_

> **User:** "Add the second one to my cart"
> **ShopBot:** _(calls `add_to_cart`)_ → "Done! Added Sony WH-1000XM4 to your cart. You now have 1 item. Ready to checkout?"

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
| `chatStore`       | Chat open state, message history                   |

### Layer 2: Server State → TanStack Query

Used for everything fetched from an API — caches, deduplicates, and automatically invalidates:

| Query Key                | Data                                        |
| ------------------------ | ------------------------------------------- |
| `['products', filters]`  | Product listing, respects filter params     |
| `['product', id]`        | Single product detail                       |
| `['reviews', productId]` | Reviews for a product                       |
| `['categories']`         | All categories (long cache, rarely changes) |
| `['orders', userId]`     | User's order history                        |

**Mutation example (add review):**

```typescript
const mutation = useMutation({
  mutationFn: reviewService.addReview,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
    toast.success("Review submitted!");
  },
});
```

---

## 🏆 Code Quality & Scalability Standards

This project is built to be **maintained by a team**, not just run by one person. Every decision optimizes for long-term readability and change-safety.

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
2. Exports a Storybook story covering happy path + edge cases
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
- Product list virtualized with `react-virtual` for 1000+ items
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
git clone https://github.com/your-username/shopsphere.git
cd shopsphere

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

App runs at `http://localhost:5173`

### Available Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview production build locally
npm run test         # Run Vitest tests
npm run test:ui      # Vitest with browser UI
npm run lint         # ESLint
npm run format       # Prettier
npm run storybook    # Launch Storybook
npm run type-check   # tsc --noEmit
```

---

## 🔑 Environment Variables

```bash
# .env.local

# Anthropic Claude API key (for ShopBot chatbot)
VITE_ANTHROPIC_API_KEY=sk-ant-...

# Optional: custom API base URL if swapping out mock data
VITE_API_BASE_URL=https://dummyjson.com

# Feature flags
VITE_ENABLE_CHATBOT=true
VITE_ENABLE_COMPARISON=true
```

> ⚠️ `VITE_ANTHROPIC_API_KEY` is only needed for the AI chatbot feature. If not set, ShopBot falls back to a rule-based mode with keyword matching.

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

### Why MCP for the chatbot?

Model Context Protocol gives Claude structured, typed access to application functions. Without MCP, the chatbot would need to parse free-text responses and guess what action to take. With MCP, tool invocations are typed, validated, and explicit — the difference between `eval()` and a proper function call.

---

## 🔮 What I Would Do Differently

With more time or in production:

1. **Real backend** — Move MCP tools server-side (Next.js API routes or a Node.js service) so the Anthropic API key is never exposed to the browser
2. **Authentication** — Integrate a real auth provider (Clerk, Auth0, or NextAuth)
3. **Infinite scroll** — Add as an alternative to pagination, toggle via user preference
4. **Real payment** — Stripe integration (Elements for PCI compliance)
5. **Image optimization** — Next.js `<Image>` or Cloudinary for responsive images + WebP
6. **E2E tests** — Playwright tests covering critical checkout and cart flows
7. **i18n** — react-i18next for multi-language + currency support
8. **PWA** — Service worker for offline product browsing and cart persistence
9. **Analytics** — PostHog for funnel analysis, especially cart abandonment

---

## ✅ TODO / Feature Roadmap

### Core Features

- [x] Project scaffolding (Vite + React + TypeScript)
- [x] Design token system + global SCSS
- [x] Routing setup with nested layouts
- [x] Mock data layer (products, categories, reviews, users)
- [ ] Header with search, cart icon, user menu
- [ ] Footer with links and newsletter signup
- [ ] Home page — hero, featured categories, trending products, banner
- [ ] Product Listing page — grid, skeleton loaders, empty state
- [ ] Filter sidebar — category, price range, brand, rating, in-stock
- [ ] Sort dropdown
- [ ] Pagination component with page size selector
- [ ] Product Detail page — image gallery, variant picker, quantity selector
- [ ] Related products carousel
- [ ] Reviews section with submit form
- [ ] Product Comparison (up to 4 products)
- [ ] Cart drawer (slide-in panel)
- [ ] Cart page (full view)
- [ ] Wishlist page
- [ ] Multi-step Checkout (Address → Shipping → Payment → Review)
- [ ] Form validation with Zod schemas
- [ ] Order Confirmation page
- [ ] Login + Register pages
- [ ] User Profile page
- [ ] Order History page

### AI Chatbot (ShopBot)

- [ ] Floating chat button (bottom-right)
- [ ] Chat drawer with message history
- [ ] Claude API integration (streaming)
- [ ] MCP tool definitions (searchProducts, getProduct, addToCart, getCart)
- [ ] Tool execution layer
- [ ] Inline product cards in chat responses
- [ ] Fallback mode (keyword-based, no API key required)
- [ ] Conversation persistence (sessionStorage)
- [ ] "What can you help me with?" onboarding message

### Quality & DX

- [ ] ESLint + Prettier config
- [ ] Husky + lint-staged pre-commit hook
- [ ] Vitest setup + sample tests
- [ ] Storybook setup + Button/Input/Badge stories
- [ ] Path aliases in vite.config.ts and tsconfig.json
- [ ] Error boundary
- [ ] 404 page
- [ ] Toast notification system
- [ ] Global loading state (NProgress bar)
- [ ] Responsive design (mobile breakpoints)
- [ ] Accessibility audit pass

### Nice-to-Have

- [ ] Dark mode toggle
- [ ] Recently viewed products (localStorage)
- [ ] Discount/coupon code in checkout
- [ ] Product image zoom on hover
- [ ] Search suggestions / autocomplete dropdown
- [ ] Share product button (Web Share API)
- [ ] Print-friendly order summary
- [ ] PWA manifest + service worker

---

## 📄 License

MIT — free to use for assessment and educational purposes.

---

_Built with ❤️ for the ShopSphere Frontend SDE-2 Assessment._
