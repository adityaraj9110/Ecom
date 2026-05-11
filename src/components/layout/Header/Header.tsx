import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, User, Heart, X, Repeat, Menu } from 'lucide-react';
import { useComparisonStore } from '@features/products/store/comparisonStore';
import { Button } from '@components/ui/Button/Button';
import { useCartStore } from '@features/cart/store/cartStore';
import { useUiStore } from '@store/uiStore';
import { useAuthStore } from '@features/auth/store/authStore';
import { ROUTES } from '@/constants/routes';
import { ThemeToggle } from '@components/ui/ThemeToggle/ThemeToggle';
import { productApi } from '@features/products/services/productApi';
import styles from './Header.module.scss';



export const Header: React.FC = () => {
  const cartCount = useCartStore((state) => state.getCartCount());
  const openCart = useUiStore((state) => state.openCart);
  const { toggleMenu, isMenuOpen } = useUiStore();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const compareCount = useComparisonStore((state) => state.items.length);
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    if (searchValue.length > 2) {
      const timeoutId = setTimeout(async () => {
        try {
          const response = await productApi.searchProducts(searchValue);
          setSuggestions(response.products.slice(0, 5));
        } catch (error) {
          console.error('Failed to fetch suggestions', error);
        }
      }, 300);
      return () => clearTimeout(timeoutId);
    } else {
      setSuggestions([]);
    }
  }, [searchValue]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`${ROUTES.PRODUCTS}?q=${encodeURIComponent(searchValue.trim())}`);
      setSearchOpen(false);
      setSearchValue('');
      setSuggestions([]);
    }
  };


  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <Button 
            variant="ghost" 
            size="sm" 
            className={styles.menuBtn} 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
          
          <Link to={ROUTES.HOME} className={styles.logo}>
            <ShoppingBag size={22} />
            <span>ShopSphere</span>
          </Link>
        </div>

        {!searchOpen && (
          <nav className={styles.nav}>
            <NavLink to={ROUTES.HOME} end className={({ isActive }) => isActive ? styles.active : ''}>Home</NavLink>
            <NavLink to={ROUTES.PRODUCTS} className={({ isActive }) => isActive ? styles.active : ''}>Products</NavLink>
            <NavLink to={ROUTES.CATEGORIES} className={({ isActive }) => isActive ? styles.active : ''}>Categories</NavLink>
          </nav>
        )}

        {searchOpen && (
          <div className={styles.inlineSearch}>
            <form onSubmit={handleSearch} className={styles.searchForm}>
              <Search size={16} className={styles.searchFormIcon} />
              <input
                autoFocus
                placeholder="Search products..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className={styles.searchFormInput}
              />
              <button type="button" onClick={() => { setSearchOpen(false); setSearchValue(''); setSuggestions([]); }} className={styles.searchClose}>
                <X size={16} />
              </button>
            </form>
            {suggestions.length > 0 && (
              <div className={styles.suggestions}>
                {suggestions.map((p) => (
                  <Link 
                    key={p.id} 
                    to={`${ROUTES.PRODUCTS}/${p.id}`} 
                    className={styles.suggestionItem}
                    onClick={() => { setSearchOpen(false); setSearchValue(''); setSuggestions([]); }}
                  >
                    <img src={p.thumbnail} alt="" />
                    <span>{p.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        <div className={styles.actions}>
          {!searchOpen && (
            <Button variant="ghost" size="sm" aria-label="Search" onClick={() => setSearchOpen(true)} className={styles.searchBtn}>
              <Search size={20} />
            </Button>
          )}

          <div className={styles.desktopActions}>
            <Button variant="ghost" size="sm" aria-label="Comparison" onClick={() => navigate(ROUTES.COMPARE)} className={styles.cartBtn}>
              <Repeat size={20} />
              {compareCount > 0 && <span className={styles.badge} style={{ background: 'var(--color-info)' }}>{compareCount}</span>}
            </Button>
            <Button variant="ghost" size="sm" aria-label="Wishlist" onClick={() => navigate(ROUTES.WISHLIST)}>
              <Heart size={20} />
            </Button>
            <ThemeToggle />
          </div>

          <Button variant="ghost" size="sm" aria-label="Cart" onClick={openCart} className={styles.cartBtn}>
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </Button>

          {user ? (
            <div className={styles.userMenu}>
              <Button variant="ghost" size="sm" aria-label="Account" onClick={() => navigate(ROUTES.PROFILE)}>
                <User size={20} />
              </Button>
              <div className={styles.userDropdown}>
                <span className={styles.userName}>{user.name}</span>
                <Link to={ROUTES.ORDERS} className={styles.dropdownItem}>Order History</Link>
                <button className={styles.dropdownItem} onClick={() => { logout(); navigate(ROUTES.HOME); }}>Sign Out</button>
              </div>
            </div>
          ) : (
            <Button variant="ghost" size="sm" aria-label="Account" onClick={() => navigate(ROUTES.LOGIN)}>
              <User size={20} />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};




