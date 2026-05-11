export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAILS: '/products/:id',
  CATEGORIES: '/categories',
  COMPARE: '/compare',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDER_CONFIRMATION: '/order-confirmation',
  LOGIN: '/login',
  REGISTER: '/register',
  WISHLIST: '/wishlist',
  PROFILE: '/profile',
  ORDERS: '/orders',
  NOT_FOUND: '*',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = typeof ROUTES[RouteKey];

