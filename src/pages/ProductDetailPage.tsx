import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '@features/products/hooks/useProducts';
import { useCartStore } from '@features/cart/store/cartStore';
import { useWishlistStore } from '@features/wishlist/store/wishlistStore';
import { useToastStore } from '@store/toastStore';
import { Button } from '@components/ui/Button/Button';
import { Star, ArrowLeft, ShoppingBag, Heart, Repeat } from 'lucide-react';
import { useComparisonStore } from '@features/products/store/comparisonStore';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading, error } = useProduct(Number(id));
  const addItem = useCartStore((state) => state.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { addItem: addToCompare, isInComparison, items: compareItems } = useComparisonStore();
  const addToast = useToastStore((s) => s.addToast);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Charcoal');

  if (isLoading) return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading product details...</div>;
  if (error || !product) return <div style={{ padding: '4rem', textAlign: 'center', color: 'red' }}>Product not found</div>;

  const currentImage = product.images[activeImage] || product.thumbnail;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
      <Button variant="ghost" leftIcon={<ArrowLeft size={16} />} onClick={() => navigate(-1)} style={{ marginBottom: '2rem' }}>
        Back
      </Button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
        {/* Image Gallery */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ background: 'var(--color-gray-50)', padding: '2rem', borderRadius: 'var(--border-radius-lg)', display: 'flex', justifyContent: 'center' }}>
            <img src={currentImage} alt={product.title} style={{ width: '100%', maxHeight: '500px', objectFit: 'contain', mixBlendMode: 'multiply' }} />
          </div>
          {product.images.length > 1 && (
            <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto' }}>
              {product.images.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImage(idx)}
                  style={{ 
                    width: '80px', height: '80px', padding: '0.5rem', background: 'var(--color-gray-50)', 
                    border: activeImage === idx ? '2px solid var(--color-primary)' : '1px solid var(--color-gray-200)',
                    borderRadius: 'var(--border-radius-md)', cursor: 'pointer'
                  }}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            {product.brand && <p style={{ color: 'var(--color-gray-500)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: 'var(--font-size-sm)', marginBottom: '0.5rem' }}>{product.brand}</p>}
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{product.title}</h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-warning)' }}>
                <Star size={18} fill="currentColor" />
                <span style={{ color: 'var(--color-gray-700)', fontWeight: '500' }}>{product.rating.toFixed(1)}</span>
              </div>
              <span style={{ color: 'var(--color-gray-400)' }}>|</span>
              <span style={{ color: 'var(--color-gray-600)' }}>{product.reviews?.length || 0} reviews</span>
            </div>

            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
              ${product.price.toFixed(2)}
            </p>
            {product.discountPercentage > 0 && (
              <p style={{ color: 'var(--color-success)', fontSize: 'var(--font-size-sm)', fontWeight: '500' }}>
                {product.discountPercentage}% OFF
              </p>
            )}
          </div>

          <p style={{ color: 'var(--color-gray-700)', lineHeight: 1.6 }}>
            {product.description}
          </p>

          <div style={{ borderTop: '1px solid var(--border-color-base)', borderBottom: '1px solid var(--border-color-base)', padding: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-gray-500)' }}>Availability</span>
              <span style={{ fontWeight: '500', color: product.stock > 0 ? 'var(--color-success)' : 'var(--color-error)' }}>
                {product.availabilityStatus} ({product.stock} in stock)
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-gray-500)' }}>Shipping</span>
              <span style={{ fontWeight: '500' }}>{product.shippingInformation}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-gray-500)' }}>Warranty</span>
              <span style={{ fontWeight: '500' }}>{product.warrantyInformation}</span>
            </div>
          </div>

          {/* Variants */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: '600', textTransform: 'uppercase', color: 'var(--color-gray-500)', display: 'block', marginBottom: '0.75rem' }}>Size</span>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {['S', 'M', 'L', 'XL'].map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      width: '44px', height: '44px', borderRadius: 'var(--border-radius-md)', border: '1px solid',
                      borderColor: selectedSize === size ? 'var(--color-primary)' : 'var(--border-color-base)',
                      background: selectedSize === size ? 'var(--color-primary)' : 'white',
                      color: selectedSize === size ? 'white' : 'var(--color-gray-700)',
                      fontWeight: '600', cursor: 'pointer', transition: 'var(--transition-base)'
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: '600', textTransform: 'uppercase', color: 'var(--color-gray-500)', display: 'block', marginBottom: '0.75rem' }}>Color: {selectedColor}</span>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {[
                  { name: 'Charcoal', value: '#333333' },
                  { name: 'Silver', value: '#E5E5E5' },
                  { name: 'Navy', value: '#1A365D' }
                ].map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    style={{
                      width: '32px', height: '32px', borderRadius: 'var(--border-radius-full)', border: '2px solid',
                      borderColor: selectedColor === color.name ? 'var(--color-primary)' : 'transparent',
                      background: color.value, cursor: 'pointer', transition: 'var(--transition-base)',
                      boxShadow: 'inset 0 0 0 2px white'
                    }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color-base)', borderRadius: 'var(--border-radius-md)', padding: '0.25rem' }}>
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{ background: 'none', border: 'none', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                -
              </button>
              <span style={{ width: '40px', textAlign: 'center', fontWeight: '600' }}>{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                style={{ background: 'none', border: 'none', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                +
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button size="lg" style={{ flex: 1 }} leftIcon={<ShoppingBag size={20} />} onClick={() => { 
              // Add multiple if quantity > 1
              for(let i=0; i<quantity; i++) addItem(product); 
              addToast(`${quantity} x ${product.title} added to cart`, 'success'); 
            }}>
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
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color-base)' }}>
        <h2 style={{ marginBottom: '2rem' }}>Customer Reviews</h2>
        {product.reviews && product.reviews.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {product.reviews.map((review, idx) => (
              <div key={idx} style={{ padding: '1.5rem', border: '1px solid var(--border-color-base)', borderRadius: 'var(--border-radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ fontWeight: '600' }}>{review.reviewerName}</span>
                  <span style={{ color: 'var(--color-gray-500)', fontSize: 'var(--font-size-sm)' }}>
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <div style={{ display: 'flex', color: 'var(--color-warning)', marginBottom: '1rem' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < review.rating ? 'currentColor' : 'none'} />
                  ))}
                </div>
                <p style={{ color: 'var(--color-gray-700)', fontSize: 'var(--font-size-sm)' }}>{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--color-gray-500)' }}>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};
