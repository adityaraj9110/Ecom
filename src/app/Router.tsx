import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from '@layouts/RootLayout';
import { HomePage } from '@pages/HomePage';
import { ProductListingPage } from '@pages/ProductListingPage';
import { ProductDetailPage } from '@pages/ProductDetailPage';
import { CartPage } from '@pages/CartPage';
import { CheckoutPage } from '@pages/CheckoutPage';
import { OrderConfirmationPage } from '@pages/OrderConfirmationPage';
import { LoginPage } from '@pages/LoginPage';
import { RegisterPage } from '@pages/RegisterPage';
import { WishlistPage } from '@pages/WishlistPage';
import { CategoriesPage } from '@pages/CategoriesPage';
import { ComparisonPage } from '@pages/ComparisonPage';
import { NotFoundPage } from '@pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductListingPage /> },
      { path: 'products/:id', element: <ProductDetailPage /> },
      { path: 'categories', element: <CategoriesPage /> },
      { path: 'compare', element: <ComparisonPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'order-confirmation', element: <OrderConfirmationPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'wishlist', element: <WishlistPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export const Router = () => <RouterProvider router={router} />;
