import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@features/auth/store/authStore';
import { useCartStore } from '@features/cart/store/cartStore';
import { useWishlistStore } from '@features/wishlist/store/wishlistStore';
import { useToastStore } from '@store/toastStore';
import { Button } from '@components/ui/Button/Button';
import { User, ShoppingBag, Heart, LogOut, Package } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuthStore();
  const cartCount = useCartStore((s) => s.getCartCount());
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const addToast = useToastStore((s) => s.addToast);
  const navigate = useNavigate();

  if (!isAuthenticated() || !user) {
    return (
      <div style={{ maxWidth: '400px', margin: '6rem auto', textAlign: 'center', padding: '0 1rem' }}>
        <User size={48} strokeWidth={1} color="var(--color-gray-300)" style={{ marginBottom: '1rem' }} />
        <h2>Sign in to view your profile</h2>
        <p style={{ color: 'var(--color-gray-500)', marginBottom: '2rem' }}>Access your orders, wishlist, and account settings.</p>
        <Button onClick={() => navigate('/login')}>Sign In</Button>
      </div>
    );
  }

  const stats = [
    { icon: <ShoppingBag size={20} />, label: 'Cart Items', value: cartCount },
    { icon: <Heart size={20} />, label: 'Wishlist', value: wishlistCount },
    { icon: <Package size={20} />, label: 'Orders', value: 3 },
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 1rem' }}>
      {/* Profile Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3rem', padding: '2rem', background: 'var(--color-gray-50)', borderRadius: 'var(--border-radius-lg)' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2rem', fontWeight: 'bold', flexShrink: 0 }}>
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: '0 0 0.25rem 0', fontSize: 'var(--font-size-2xl)' }}>{user.name}</h1>
          <p style={{ margin: 0, color: 'var(--color-gray-500)', fontSize: 'var(--font-size-sm)' }}>{user.email}</p>
        </div>
        <Button variant="outline" size="sm" leftIcon={<LogOut size={16} />} onClick={() => { logout(); addToast('Signed out', 'info'); navigate('/'); }}>
          Sign Out
        </Button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
        {stats.map((stat) => (
          <div key={stat.label} style={{ padding: '1.5rem', border: '1px solid var(--border-color-base)', borderRadius: 'var(--border-radius-lg)', textAlign: 'center' }}>
            <div style={{ color: 'var(--color-gray-400)', marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}>{stat.icon}</div>
            <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: '0.25rem' }}>{stat.value}</div>
            <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-500)' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Quick Links</h3>
        {[
          { label: 'Order History', path: '/orders' },
          { label: 'My Wishlist', path: '/wishlist' },
          { label: 'Shopping Cart', path: '/cart' },
        ].map((link) => (
          <button
            key={link.path}
            onClick={() => navigate(link.path)}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', border: '1px solid var(--border-color-base)', borderRadius: 'var(--border-radius-md)', background: 'none', cursor: 'pointer', fontSize: 'var(--font-size-sm)', fontWeight: '500', color: 'var(--color-gray-700)', textAlign: 'left', width: '100%' }}
          >
            {link.label}
            <span style={{ color: 'var(--color-gray-400)' }}>&rarr;</span>
          </button>
        ))}
      </div>
    </div>
  );
};
