import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@features/cart/store/cartStore';
import { useUiStore } from '@store/uiStore';
import { Button } from '@components/ui/Button/Button';
import styles from './CartDrawer.module.scss';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, closeCart } = useUiStore();
  const { items, removeItem, updateQuantity, getCartTotal } = useCartStore();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={closeCart} />
      <div className={styles.drawer}>
        <div className={styles.header}>
          <div className={styles.title}>
            <ShoppingBag size={20} />
            <h2>Your Cart ({items.length})</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={closeCart} aria-label="Close cart">
            <X size={20} />
          </Button>
        </div>

        <div className={styles.content}>
          {items.length === 0 ? (
            <div className={styles.emptyState}>
              <ShoppingBag size={48} className={styles.emptyIcon} />
              <p>Your cart is empty</p>
              <Button onClick={() => { closeCart(); navigate('/products'); }}>Start Shopping</Button>
            </div>
          ) : (
            <div className={styles.itemList}>
              {items.map((item) => (
                <div key={item.product.id} className={styles.item}>
                  <img src={item.product.thumbnail} alt={item.product.title} className={styles.itemImage} />
                  <div className={styles.itemInfo}>
                    <h4>{item.product.title}</h4>
                    <span className={styles.itemPrice}>${item.product.price.toFixed(2)}</span>
                    <div className={styles.itemActions}>
                      <div className={styles.quantityControls}>
                        <button onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))} disabled={item.quantity <= 1}>
                          <Minus size={14} />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, Math.min(item.product.stock, item.quantity + 1))} disabled={item.quantity >= item.product.stock}>
                          <Plus size={14} />
                        </button>
                      </div>
                      <button className={styles.removeBtn} onClick={() => removeItem(item.product.id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span className={styles.totalPrice}>${getCartTotal().toFixed(2)}</span>
            </div>
            <p className={styles.taxesInfo}>Taxes and shipping calculated at checkout</p>
            <Button size="lg" fullWidth onClick={() => { closeCart(); navigate('/checkout'); }}>
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
