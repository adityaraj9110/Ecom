import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@features/cart/store/cartStore';
import { Button } from '@components/ui/Button/Button';
import { useToastStore } from '@store/toastStore';

export const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, getCartTotal, clearCart } = useCartStore();
  const addToast = useToastStore((s) => s.addToast);
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div style={{ maxWidth: '600px', margin: '6rem auto', textAlign: 'center', padding: '0 1rem' }}>
        <ShoppingBag size={64} strokeWidth={1} color="var(--color-gray-300)" style={{ marginBottom: '1.5rem' }} />
        <h2 style={{ marginBottom: '0.5rem' }}>Your cart is empty</h2>
        <p style={{ color: 'var(--color-gray-500)', marginBottom: '2rem' }}>Looks like you haven't added anything yet.</p>
        <Link to="/products"><Button size="lg">Browse Products</Button></Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
      <Button variant="ghost" leftIcon={<ArrowLeft size={16} />} onClick={() => navigate(-1)} style={{ marginBottom: '1.5rem' }}>
        Continue Shopping
      </Button>

      <h1 style={{ marginBottom: '2rem' }}>Shopping Cart ({items.length} items)</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '3rem', alignItems: 'start' }}>
        {/* Cart Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {items.map((item) => (
            <div key={item.product.id} style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem', border: '1px solid var(--border-color-base)', borderRadius: 'var(--border-radius-lg)' }}>
              <Link to={`/products/${item.product.id}`}>
                <img src={item.product.thumbnail} alt={item.product.title} style={{ width: '120px', height: '120px', objectFit: 'contain', background: 'var(--color-gray-50)', borderRadius: 'var(--border-radius-md)', padding: '0.5rem' }} />
              </Link>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <Link to={`/products/${item.product.id}`} style={{ fontWeight: '500', color: 'var(--color-gray-900)' }}>{item.product.title}</Link>
                  <button onClick={() => { removeItem(item.product.id); addToast('Item removed from cart', 'info'); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-gray-400)', padding: '4px' }}>
                    <Trash2 size={18} />
                  </button>
                </div>
                {item.product.brand && <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-gray-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.product.brand}</span>}
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', border: '1px solid var(--border-color-base)', borderRadius: 'var(--border-radius-sm)', padding: '0.25rem 0.5rem' }}>
                    <button onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))} disabled={item.quantity <= 1} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-gray-600)', display: 'flex' }}><Minus size={16} /></button>
                    <span style={{ fontWeight: '500', minWidth: '24px', textAlign: 'center' }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-gray-600)', display: 'flex' }}><Plus size={16} /></button>
                  </div>
                  <span style={{ fontWeight: '600', fontSize: 'var(--font-size-lg)' }}>${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div style={{ background: 'var(--color-gray-50)', padding: '2rem', borderRadius: 'var(--border-radius-lg)', position: 'sticky', top: '100px' }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: 'var(--font-size-lg)' }}>Order Summary</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem', fontSize: 'var(--font-size-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-gray-600)' }}>Subtotal ({items.length} items)</span>
              <span style={{ fontWeight: '500' }}>${getCartTotal().toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-gray-600)' }}>Shipping</span>
              <span style={{ fontWeight: '500', color: 'var(--color-success)' }}>{getCartTotal() >= 50 ? 'Free' : '$4.99'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-gray-600)' }}>Estimated Tax</span>
              <span style={{ fontWeight: '500' }}>${(getCartTotal() * 0.08).toFixed(2)}</span>
            </div>
          </div>
          <div style={{ borderTop: '1px solid var(--border-color-base)', paddingTop: '1rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-xl)', fontWeight: 'bold' }}>
            <span>Total</span>
            <span>${(getCartTotal() + (getCartTotal() >= 50 ? 0 : 4.99) + getCartTotal() * 0.08).toFixed(2)}</span>
          </div>
          <Button size="lg" fullWidth onClick={() => navigate('/checkout')} style={{ marginBottom: '0.75rem' }}>
            Proceed to Checkout
          </Button>
          <Button variant="outline" size="sm" fullWidth onClick={() => { clearCart(); addToast('Cart cleared', 'info'); }}>
            Clear Cart
          </Button>
        </div>
      </div>
    </div>
  );
};
