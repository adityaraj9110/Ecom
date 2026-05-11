import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@components/layout/Header/Header';
import { Footer } from '@components/layout/Footer/Footer';
import { CartDrawer } from '@features/cart/components/CartDrawer';
import { ToastContainer } from '@components/ui/Toast/Toast';
import { useUiStore } from '@store/uiStore';

export const RootLayout: React.FC = () => {
  const theme = useUiStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

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
