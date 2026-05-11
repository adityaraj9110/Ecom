import React from 'react';
import { useComparisonStore } from '@features/products/store/comparisonStore';
import { Button } from '@components/ui/Button/Button';
import { X, ShoppingCart, Star } from 'lucide-react';
import { useCartStore } from '@features/cart/store/cartStore';
import { useToastStore } from '@store/toastStore';

export const ComparisonPage: React.FC = () => {
  const { items, removeItem, clear } = useComparisonStore();
  const addItemToCart = useCartStore((s) => s.addItem);
  const addToast = useToastStore((s) => s.addToast);

  if (items.length === 0) {
    return (
      <div style={{ maxWidth: '600px', margin: '8rem auto', textAlign: 'center' }}>
        <h2>Comparison list is empty</h2>
        <p style={{ color: 'var(--color-gray-500)', marginBottom: '2rem' }}>Add up to 4 products to compare their features.</p>
        <Button onClick={() => window.history.back()}>Go Back</Button>
      </div>
    );
  }

  const features = [
    { label: 'Price', key: 'price', format: (v: number) => `$${v.toFixed(2)}` },
    { label: 'Rating', key: 'rating', format: (v: number) => <><Star size={14} fill="currentColor" /> {v}</> },
    { label: 'Brand', key: 'brand' },
    { label: 'Category', key: 'category' },
    { label: 'Availability', key: 'availabilityStatus' },
    { label: 'Shipping', key: 'shippingInformation' },
    { label: 'Warranty', key: 'warrantyInformation' },
    { label: 'Return Policy', key: 'returnPolicy' },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <h1>Product Comparison</h1>
        <Button variant="outline" size="sm" onClick={clear}>Clear All</Button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed', minWidth: '800px' }}>
          <thead>
            <tr>
              <th style={{ width: '200px', borderBottom: '1px solid var(--border-color-base)' }}></th>
              {items.map((product) => (
                <th key={product.id} style={{ padding: '2rem', borderBottom: '1px solid var(--border-color-base)', verticalAlign: 'top' }}>
                  <div style={{ position: 'relative' }}>
                    <button 
                      onClick={() => removeItem(product.id)}
                      style={{ position: 'absolute', top: '-1rem', right: '-1rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-gray-400)' }}
                    >
                      <X size={20} />
                    </button>
                    <img src={product.thumbnail} alt={product.title} style={{ width: '100%', height: '150px', objectFit: 'contain', marginBottom: '1rem', background: 'var(--color-gray-50)', borderRadius: 'var(--border-radius-md)' }} />
                    <h3 style={{ fontSize: '1rem', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{product.title}</h3>
                    <Button 
                      size="sm" 
                      fullWidth 
                      leftIcon={<ShoppingCart size={16} />}
                      onClick={() => { addItemToCart(product); addToast('Added to cart', 'success'); }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </th>
              ))}
              {Array.from({ length: 4 - items.length }).map((_, i) => (
                <th key={`empty-${i}`} style={{ borderBottom: '1px solid var(--border-color-base)' }}></th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature) => (
              <tr key={feature.label}>
                <td style={{ padding: '1.5rem', fontWeight: '600', color: 'var(--color-gray-500)', borderBottom: '1px solid var(--border-color-base)', background: 'var(--color-gray-50)' }}>
                  {feature.label}
                </td>
                {items.map((product) => (
                  <td key={product.id} style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color-base)', textAlign: 'center' }}>
                    {feature.format ? feature.format((product as any)[feature.key]) : (product as any)[feature.key] || '-'}
                  </td>
                ))}
                {Array.from({ length: 4 - items.length }).map((_, i) => (
                  <td key={`empty-td-${i}`} style={{ borderBottom: '1px solid var(--border-color-base)' }}></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
