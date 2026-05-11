import React from 'react';
import { useWishlistStore } from '@features/wishlist/store/wishlistStore';
import { ProductCard } from '@features/products/components/ProductCard';

export const WishlistPage: React.FC = () => {
  const { items } = useWishlistStore();

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>My Wishlist</h1>
      
      {items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-gray-500)' }}>
          <p>Your wishlist is currently empty.</p>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
          gap: '2rem' 
        }}>
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
