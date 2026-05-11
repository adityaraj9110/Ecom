import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Repeat } from 'lucide-react';
import { Product } from '@appTypes/api.types';
import { useWishlistStore } from '@features/wishlist/store/wishlistStore';
import { useComparisonStore } from '@features/products/store/comparisonStore';
import { useToastStore } from '@store/toastStore';
import styles from './ProductCard.module.scss';

export interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { addItem: addToCompare, isInComparison, items: compareItems } = useComparisonStore();
  const addToast = useToastStore((s) => s.addToast);
  const isWished = isInWishlist(product.id);
  const isCompared = isInComparison(product.id);

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isCompared) {
      addToast('Product already in comparison', 'info');
    } else if (compareItems.length >= 4) {
      addToast('Comparison limit reached (max 4)', 'warning');
    } else {
      addToCompare(product);
      addToast('Added to comparison', 'success');
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Link to={`/products/${product.id}`} style={{ display: 'block', width: '100%', height: '100%' }}>
          <img src={product.thumbnail} alt={product.title} loading="lazy" />
        </Link>
        <button 
          className={styles.wishlistBtn} 
          onClick={(e) => { e.preventDefault(); toggleItem(product); }}
          aria-label="Toggle wishlist"
        >
          <Heart size={20} fill={isWished ? 'var(--color-error)' : 'none'} color={isWished ? 'var(--color-error)' : 'currentColor'} />
        </button>
        <button 
          className={styles.compareBtn} 
          onClick={handleCompare}
          aria-label="Add to comparison"
          style={{ 
            top: 'auto', bottom: 'var(--spacing-3)', 
            color: isCompared ? 'var(--color-primary)' : 'var(--color-gray-400)',
            borderColor: isCompared ? 'var(--color-primary)' : 'var(--border-color-base)'
          }}
        >
          <Repeat size={20} />
        </button>
      </div>
      <Link to={`/products/${product.id}`} className={styles.content}>
        {product.brand && <span className={styles.brand}>{product.brand}</span>}
        <h3 className={styles.title}>{product.title}</h3>
        
        <div className={styles.priceRow}>
          <span className={styles.price}>${product.price.toFixed(2)}</span>
          <div className={styles.rating}>
            <Star size={14} fill="currentColor" />
            <span>{product.rating.toFixed(1)}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};
