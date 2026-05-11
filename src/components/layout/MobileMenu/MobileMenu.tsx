import React from 'react';
import { NavLink } from 'react-router-dom';
import { X, Home, ShoppingBag, Grid, Heart, Repeat, User } from 'lucide-react';
import { useUiStore } from '@store/uiStore';
import { useAuthStore } from '@features/auth/store/authStore';
import { ROUTES } from '@/constants/routes';
import styles from './MobileMenu.module.scss';

export const MobileMenu: React.FC = () => {
  const { isMenuOpen, closeMenu } = useUiStore();
  const user = useAuthStore((state) => state.user);

  if (!isMenuOpen) return null;

  return (
    <div className={styles.overlay} onClick={closeMenu}>
      <div className={styles.menu} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>Menu</h3>
          <button onClick={closeMenu} className={styles.closeBtn}>
            <X size={24} />
          </button>
        </div>

        <nav className={styles.nav}>
          <NavLink to={ROUTES.HOME} onClick={closeMenu} className={({ isActive }) => isActive ? styles.active : ''}>
            <Home size={20} />
            <span>Home</span>
          </NavLink>
          <NavLink to={ROUTES.PRODUCTS} onClick={closeMenu} className={({ isActive }) => isActive ? styles.active : ''}>
            <ShoppingBag size={20} />
            <span>All Products</span>
          </NavLink>
          <NavLink to={ROUTES.CATEGORIES} onClick={closeMenu} className={({ isActive }) => isActive ? styles.active : ''}>
            <Grid size={20} />
            <span>Categories</span>
          </NavLink>
          <NavLink to={ROUTES.WISHLIST} onClick={closeMenu} className={({ isActive }) => isActive ? styles.active : ''}>
            <Heart size={20} />
            <span>Wishlist</span>
          </NavLink>
          <NavLink to={ROUTES.COMPARE} onClick={closeMenu} className={({ isActive }) => isActive ? styles.active : ''}>
            <Repeat size={20} />
            <span>Comparison</span>
          </NavLink>
          
          <hr className={styles.divider} />
          
          {user ? (
            <>
              <NavLink to={ROUTES.PROFILE} onClick={closeMenu} className={({ isActive }) => isActive ? styles.active : ''}>
                <User size={20} />
                <span>My Profile</span>
              </NavLink>
              <NavLink to={ROUTES.ORDERS} onClick={closeMenu} className={({ isActive }) => isActive ? styles.active : ''}>
                <ShoppingBag size={20} />
                <span>Order History</span>
              </NavLink>
            </>
          ) : (
            <NavLink to={ROUTES.LOGIN} onClick={closeMenu} className={({ isActive }) => isActive ? styles.active : ''}>
              <User size={20} />
              <span>Login / Register</span>
            </NavLink>
          )}
        </nav>
      </div>
    </div>
  );
};
