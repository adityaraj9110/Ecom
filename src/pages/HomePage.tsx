import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Tag, Truck, Shield } from 'lucide-react';
import { useProducts, useCategories } from '@features/products/hooks/useProducts';
import { ProductCard } from '@features/products/components/ProductCard';
import { ProductCardSkeleton } from '@components/ui/Skeleton/Skeleton';
import { Button } from '@components/ui/Button/Button';
import { ROUTES } from '@/constants/routes';
import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  const { data: productsData, isLoading: productsLoading } = useProducts(0, 8);
  const { data: heroProductsData } = useProducts(0, 5);
  const { data: categories } = useCategories();

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (heroProductsData?.products && heroProductsData.products.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroProductsData.products.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [heroProductsData]);

  const heroProducts = heroProductsData?.products || [];

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <h1>Discover Products That Define You</h1>
            <p>
              Curated collections of premium products, delivered to your door. 
              Browse thousands of items across every category.
            </p>
            <div className={styles.heroBtns}>
              <Link to={ROUTES.PRODUCTS}>
                <Button size="lg" rightIcon={<ArrowRight size={18} />}>Shop Now</Button>
              </Link>
              <Link to={ROUTES.CATEGORIES}>
                <Button variant="outline" size="lg">Browse Categories</Button>
              </Link>
            </div>
          </div>
          <div className={styles.heroImage}>
            {heroProducts.length > 0 ? (
              <div className={styles.carousel}>
                {heroProducts.map((product, index) => (
                  <Link 
                    key={product.id} 
                    to={`${ROUTES.PRODUCTS}/${product.id}`}
                    className={`${styles.carouselItem} ${index === currentSlide ? styles.active : ''}`}
                  >
                    <img src={product.thumbnail} alt={product.title} className={styles.carouselImage} />
                    <div className={styles.carouselInfo}>
                      <h3>{product.title}</h3>
                      <p>${product.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className={styles.heroImagePlaceholder}>
                <ShoppingBag size={80} strokeWidth={1} />
              </div>
            )}
          </div>
        </div>
      </section>


      {/* Featured Categories */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Shop by Category</h2>
          <Link to="/categories">View all &rarr;</Link>
        </div>
        <div className={styles.categoriesGrid}>
          {categories?.slice(0, 8).map((cat) => (
            <Link key={cat.slug} to={`/products?category=${cat.slug}`} className={styles.categoryCard}>
              <div className={styles.categoryIcon}>
                <Tag size={22} />
              </div>
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Trending Products</h2>
          <Link to="/products">View all &rarr;</Link>
        </div>
        <div className={styles.productsGrid}>
          {productsLoading
            ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : productsData?.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className={styles.banner}>
        <div className={styles.bannerInner}>
          <h2>Free Shipping on Orders Over $50</h2>
          <p>Shop our entire catalog with confidence. Easy returns within 30 days.</p>
          <Link to="/products">
            <Button variant="secondary" size="lg">Start Shopping</Button>
          </Link>
        </div>
      </section>

      {/* Trust Badges */}
      <section className={styles.section} style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
            <Truck size={32} strokeWidth={1.5} color="var(--color-gray-500)" />
            <h4 style={{ margin: 0, fontSize: 'var(--font-size-sm)' }}>Free Shipping</h4>
            <p style={{ margin: 0, fontSize: 'var(--font-size-xs)', color: 'var(--color-gray-500)' }}>On orders over $50</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
            <Shield size={32} strokeWidth={1.5} color="var(--color-gray-500)" />
            <h4 style={{ margin: 0, fontSize: 'var(--font-size-sm)' }}>Secure Payment</h4>
            <p style={{ margin: 0, fontSize: 'var(--font-size-xs)', color: 'var(--color-gray-500)' }}>256-bit SSL encryption</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
            <Tag size={32} strokeWidth={1.5} color="var(--color-gray-500)" />
            <h4 style={{ margin: 0, fontSize: 'var(--font-size-sm)' }}>Best Prices</h4>
            <p style={{ margin: 0, fontSize: 'var(--font-size-xs)', color: 'var(--color-gray-500)' }}>Guaranteed price matching</p>
          </div>
        </div>
      </section>
    </>
  );
};
