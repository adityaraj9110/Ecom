import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from '@layouts/RootLayout';
import { ErrorBoundary } from './ErrorBoundary';
import { ROUTES } from '@/constants/routes';

// Lazy load components
const HomePage = lazy(() => import('@pages/HomePage').then(m => ({ default: m.HomePage })));
const ProductListingPage = lazy(() => import('@pages/ProductListingPage').then(m => ({ default: m.ProductListingPage })));
const ProductDetailPage = lazy(() => import('@pages/ProductDetailPage').then(m => ({ default: m.ProductDetailPage })));
const CartPage = lazy(() => import('@pages/CartPage').then(m => ({ default: m.CartPage })));
const CheckoutPage = lazy(() => import('@pages/CheckoutPage').then(m => ({ default: m.CheckoutPage })));
const OrderConfirmationPage = lazy(() => import('@pages/OrderConfirmationPage').then(m => ({ default: m.OrderConfirmationPage })));
const LoginPage = lazy(() => import('@pages/LoginPage').then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('@pages/RegisterPage').then(m => ({ default: m.RegisterPage })));
const WishlistPage = lazy(() => import('@pages/WishlistPage').then(m => ({ default: m.WishlistPage })));
const CategoriesPage = lazy(() => import('@pages/CategoriesPage').then(m => ({ default: m.CategoriesPage })));
const ComparisonPage = lazy(() => import('@pages/ComparisonPage').then(m => ({ default: m.ComparisonPage })));
const NotFoundPage = lazy(() => import('@pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));


const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', color: 'var(--color-gray-400)' }}>
    Loading...
  </div>
);

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: (
      <ErrorBoundary>
        <RootLayout />
      </ErrorBoundary>
    ),
    children: [
      { index: true, element: <Suspense fallback={<PageLoader />}><HomePage /></Suspense> },
      { path: ROUTES.PRODUCTS, element: <Suspense fallback={<PageLoader />}><ProductListingPage /></Suspense> },
      { path: ROUTES.PRODUCT_DETAILS, element: <Suspense fallback={<PageLoader />}><ProductDetailPage /></Suspense> },
      { path: ROUTES.CATEGORIES, element: <Suspense fallback={<PageLoader />}><CategoriesPage /></Suspense> },
      { path: ROUTES.COMPARE, element: <Suspense fallback={<PageLoader />}><ComparisonPage /></Suspense> },
      { path: ROUTES.CART, element: <Suspense fallback={<PageLoader />}><CartPage /></Suspense> },
      { path: ROUTES.CHECKOUT, element: <Suspense fallback={<PageLoader />}><CheckoutPage /></Suspense> },
      { path: ROUTES.ORDER_CONFIRMATION, element: <Suspense fallback={<PageLoader />}><OrderConfirmationPage /></Suspense> },
      { path: ROUTES.LOGIN, element: <Suspense fallback={<PageLoader />}><LoginPage /></Suspense> },
      { path: ROUTES.REGISTER, element: <Suspense fallback={<PageLoader />}><RegisterPage /></Suspense> },
      { path: ROUTES.WISHLIST, element: <Suspense fallback={<PageLoader />}><WishlistPage /></Suspense> },
      { path: ROUTES.NOT_FOUND, element: <Suspense fallback={<PageLoader />}><NotFoundPage /></Suspense> },
    ],
  },
]);

export const Router = () => <RouterProvider router={router} />;


