import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '@features/products/hooks/useProducts';
import { useCartStore } from '@features/cart/store/cartStore';
import { useWishlistStore } from '@features/wishlist/store/wishlistStore';
import { useToastStore } from '@store/toastStore';
import { Button } from '@components/ui/Button/Button';
import { Star, ArrowLeft, ShoppingBag, Heart, Repeat, Share2, Plus, Minus } from 'lucide-react';

import { useComparisonStore } from '@features/products/store/comparisonStore';
import { useRecentlyViewedStore } from '@features/products/store/recentlyViewedStore';
import { ImageZoom } from '@components/ui/ImageZoom/ImageZoom';
import styles from './ProductDetailPage.module.scss';



export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading, error } = useProduct(Number(id));
  const addItemToRecentlyViewed = useRecentlyViewedStore((state) => state.addItem);
  const addItem = useCartStore((state) => state.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { addItem: addToCompare, isInComparison, items: compareItems } = useComparisonStore();
  const addToast = useToastStore((s) => s.addToast);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Charcoal');

  React.useEffect(() => {
    if (product) {
      addItemToRecentlyViewed(product);
    }
  }, [product, addItemToRecentlyViewed]);


  if (isLoading) return <div className={styles.loading}>Loading product details...</div>;
  if (error || !product) return <div className={styles.error}>Product not found</div>;

  const currentImage = product.images[activeImage] || product.thumbnail;

  return (
    <div className={styles.page}>
      <Button 
        variant="ghost" 
        leftIcon={<ArrowLeft size={16} />} 
        onClick={() => navigate(-1)} 
        className={styles.backBtn}
      >
        Back
      </Button>

      <div className={styles.layout}>
        {/* Image Gallery */}
        <div className={styles.gallery}>
          <ImageZoom src={currentImage} alt={product.title} />

          {product.images.length > 1 && (
            <div className={styles.thumbnails}>
              {product.images.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImage(idx)}
                  className={`${styles.thumbBtn} ${activeImage === idx ? styles.active : ''}`}
                >
                  <img src={img} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className={styles.info}>
          <div>
            {product.brand && <p className={styles.brand}>{product.brand}</p>}
            <h1 className={styles.title}>{product.title}</h1>
            
            <div className={styles.meta}>
              <div className={styles.rating}>
                <Star size={18} fill="currentColor" />
                <span>{product.rating.toFixed(1)}</span>
              </div>
              <span className={styles.separator}>|</span>
              <span className={styles.reviewsCount}>{product.reviews?.length || 0} reviews</span>
            </div>

            <div className={styles.priceSection}>
              <p className={styles.price}>${product.price.toFixed(2)}</p>
              {product.discountPercentage > 0 && (
                <p className={styles.discount}>{product.discountPercentage}% OFF</p>
              )}
            </div>
          </div>

          <p className={styles.description}>{product.description}</p>

          <div className={styles.details}>
            <div className={styles.detailRow}>
              <span>Availability</span>
              <span style={{ color: product.stock > 0 ? 'var(--color-success)' : 'var(--color-error)' }}>
                {product.availabilityStatus} ({product.stock} in stock)
              </span>
            </div>
            <div className={styles.detailRow}>
              <span>Shipping</span>
              <span>{product.shippingInformation}</span>
            </div>
            <div className={styles.detailRow}>
              <span>Warranty</span>
              <span>{product.warrantyInformation}</span>
            </div>
          </div>

          {/* Variants */}
          <div className={styles.variants}>
            <div className={styles.variantGroup}>
              <label>Size</label>
              <div className={styles.sizeGrid}>
                {['S', 'M', 'L', 'XL'].map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`${styles.sizeBtn} ${selectedSize === size ? styles.active : ''}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.variantGroup}>
              <label>Color: {selectedColor}</label>
              <div className={styles.colorGrid}>
                {[
                  { name: 'Charcoal', value: '#333333' },
                  { name: 'Silver', value: '#E5E5E5' },
                  { name: 'Navy', value: '#1A365D' }
                ].map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`${styles.colorBtn} ${selectedColor === color.name ? styles.active : ''}`}
                    style={{ background: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className={styles.quantityActions}>
            <div className={styles.quantitySelector}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity">
                <Minus size={16} />
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity">
                <Plus size={16} />
              </button>
            </div>

            <div className={styles.mainActions}>
              <Button 
                size="lg" 
                className={styles.addToCartBtn} 
                leftIcon={<ShoppingBag size={20} />} 
                onClick={() => { 
                  for(let i=0; i<quantity; i++) addItem(product); 
                  addToast(`${quantity} x ${product.title} added to cart`, 'success'); 
                }}
              >
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant={isInWishlist(product.id) ? 'primary' : 'outline'}
                onClick={() => { toggleItem(product); addToast(isInWishlist(product.id) ? 'Removed from wishlist' : 'Added to wishlist', 'info'); }}
                aria-label="Toggle wishlist"
              >
                <Heart size={20} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
              </Button>
              <Button
                size="lg"
                variant={isInComparison(product.id) ? 'primary' : 'outline'}
                onClick={() => {
                  if (isInComparison(product.id)) {
                    addToast('Already in comparison', 'info');
                  } else if (compareItems.length >= 4) {
                    addToast('Comparison limit reached (max 4)', 'warning');
                  } else {
                    addToCompare(product);
                    addToast('Added to comparison', 'success');
                  }
                }}
                aria-label="Add to comparison"
              >
                <Repeat size={20} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: product.title,
                      text: product.description,
                      url: window.location.href,
                    }).catch(console.error);
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    addToast('Link copied to clipboard', 'success');
                  }
                }}
                aria-label="Share product"
              >
                <Share2 size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className={styles.reviewsSection}>
        <h2>Customer Reviews</h2>
        {product.reviews && product.reviews.length > 0 ? (
          <div className={styles.reviewsGrid}>
            {product.reviews.map((review, idx) => (
              <div key={idx} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <span className={styles.reviewer}>{review.reviewerName}</span>
                  <span className={styles.date}>
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <div className={styles.reviewStars}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < review.rating ? 'currentColor' : 'none'} />
                  ))}
                </div>
                <p className={styles.reviewComment}>{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.noReviews}>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

