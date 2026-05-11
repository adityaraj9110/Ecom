import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, User, Heart, X, Repeat } from 'lucide-react';
import { useComparisonStore } from '@features/products/store/comparisonStore';
import { Button } from '@components/ui/Button/Button';
import { useCartStore } from '@features/cart/store/cartStore';
import { useUiStore } from '@store/uiStore';
import { useAuthStore } from '@features/auth/store/authStore';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const cartCount = useCartStore((state) => state.getCartCount());
  const openCart = useUiStore((state) => state.openCart);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const compareCount = useComparisonStore((state) => state.items.length);
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchValue.trim())}`);
      setSearchOpen(false);
      setSearchValue('');
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <ShoppingBag size={22} />
          <span>ShopSphere</span>
        </Link>

        <nav className={styles.nav}>
          <NavLink to="/" end className={({ isActive }) => isActive ? styles.active : ''}>Home</NavLink>
          <NavLink to="/products" className={({ isActive }) => isActive ? styles.active : ''}>Products</NavLink>
          <NavLink to="/categories" className={({ isActive }) => isActive ? styles.active : ''}>Categories</NavLink>
        </nav>

        <div className={styles.actions}>
          {searchOpen ? (
            <form onSubmit={handleSearch} className={styles.searchForm}>
              <Search size={16} className={styles.searchFormIcon} />
              <input
                autoFocus
                placeholder="Search products..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className={styles.searchFormInput}
              />
              <button type="button" onClick={() => { setSearchOpen(false); setSearchValue(''); }} className={styles.searchClose}>
                <X size={16} />
              </button>
            </form>
          ) : (
            <Button variant="ghost" size="sm" aria-label="Search" onClick={() => setSearchOpen(true)}>
              <Search size={20} />
            </Button>
          )}
          <Button variant="ghost" size="sm" aria-label="Comparison" onClick={() => navigate('/compare')} className={styles.cartBtn}>
            <Repeat size={20} />
            {compareCount > 0 && <span className={styles.badge} style={{ background: 'var(--color-info)' }}>{compareCount}</span>}
          </Button>
          <Button variant="ghost" size="sm" aria-label="Wishlist" onClick={() => navigate('/wishlist')}>
            <Heart size={20} />
          </Button>
          <Button variant="ghost" size="sm" aria-label="Cart" onClick={openCart} className={styles.cartBtn}>
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </Button>
          {user ? (
            <div className={styles.userMenu}>
              <Button variant="ghost" size="sm" aria-label="Account" onClick={() => navigate('/profile')}>
                <User size={20} />
              </Button>
              <div className={styles.userDropdown}>
                <span className={styles.userName}>{user.name}</span>
                <Link to="/orders" className={styles.dropdownItem}>Order History</Link>
                <button className={styles.dropdownItem} onClick={() => { logout(); navigate('/'); }}>Sign Out</button>
              </div>
            </div>
          ) : (
            <Button variant="ghost" size="sm" aria-label="Account" onClick={() => navigate('/login')}>
              <User size={20} />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
