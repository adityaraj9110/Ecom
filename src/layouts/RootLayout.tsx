import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@components/layout/Header/Header';
import { Footer } from '@components/layout/Footer/Footer';
import { CartDrawer } from '@features/cart/components/CartDrawer';
import { ToastContainer } from '@components/ui/Toast/Toast';

export const RootLayout: React.FC = () => {
  return (
    <>
      <Header />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <ToastContainer />
    </>
  );
};
