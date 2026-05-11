import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { productApi } from '@features/products/services/productApi';
import { useCategories } from '@features/products/hooks/useProducts';
import { useDebounce } from '@hooks/useDebounce';
import { ProductCard } from '@features/products/components/ProductCard';
import { ProductCardSkeleton } from '@components/ui/Skeleton/Skeleton';
import { Pagination } from '@components/ui/Pagination/Pagination';
import { Product } from '@appTypes/api.types';
import styles from './ProductListingPage.module.scss';

const ITEMS_PER_PAGE = 12;

export const ProductListingPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(searchQuery, 400);

  const { data: categories } = useCategories();

  // Fetch products: by category, search, or all
  const { data, isLoading } = useQuery({
    queryKey: ['products', 'listing', selectedCategory, debouncedSearch, currentPage],
    queryFn: async () => {
      if (debouncedSearch) {
        return productApi.searchProducts(debouncedSearch);
      }
      if (selectedCategory) {
        return productApi.getProductsByCategory(selectedCategory);
      }
      const skip = (currentPage - 1) * ITEMS_PER_PAGE;
      return productApi.getProducts({ skip, limit: ITEMS_PER_PAGE });
    },
  });

  // Client-side sorting
  const sortedProducts = useMemo(() => {
    if (!data?.products) return [];
    const products = [...data.products];
    switch (sortBy) {
      case 'price-asc':
        return products.sort((a: Product, b: Product) => a.price - b.price);
      case 'price-desc':
        return products.sort((a: Product, b: Product) => b.price - a.price);
      case 'rating':
        return products.sort((a: Product, b: Product) => b.rating - a.rating);
      case 'title':
        return products.sort((a: Product, b: Product) => a.title.localeCompare(b.title));
      default:
        return products;
    }
  }, [data?.products, sortBy]);

  const totalPages = data ? Math.ceil(data.total / ITEMS_PER_PAGE) : 1;

  const handleCategoryClick = (slug: string) => {
    const next = selectedCategory === slug ? '' : slug;
    setSelectedCategory(next);
    setCurrentPage(1);
    if (next) {
      setSearchParams({ category: next });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>{selectedCategory ? selectedCategory.replace(/-/g, ' ') : 'All Products'}</h1>
        <div className={styles.controls}>
          <div className={styles.searchWrapper}>
            <Search size={16} className={styles.searchIcon} />
            <input
              className={styles.searchInput}
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            />
          </div>
          <select className={styles.sortSelect} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Sort by</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="title">Name: A-Z</option>
          </select>
        </div>
      </div>

      <div className={styles.layout}>
        {/* Sidebar Filters - Desktop */}
        <aside className={styles.sidebar}>
          <div className={styles.filterGroup}>
            <h3>Categories</h3>
            <ul className={styles.filterList}>
              <li>
                <button
                  className={selectedCategory === '' ? styles.filterItemActive : styles.filterItem}
                  onClick={() => handleCategoryClick('')}
                >
                  All
                </button>
              </li>
              {categories?.map((cat) => (
                <li key={cat.slug}>
                  <button
                    className={selectedCategory === cat.slug ? styles.filterItemActive : styles.filterItem}
                    onClick={() => handleCategoryClick(cat.slug)}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <div className={styles.mainContent}>
          {/* Mobile Category Select */}
          <div className={styles.mobileFilters}>
            <label htmlFor="category-select">Category:</label>
            <select 
              id="category-select"
              className={styles.mobileSelect} 
              value={selectedCategory} 
              onChange={(e) => handleCategoryClick(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories?.map((cat) => (
                <option key={cat.slug} value={cat.slug}>{cat.name}</option>
              ))}
            </select>
          </div>

          {data && !isLoading && (
            <p className={styles.resultInfo}>
              Showing {sortedProducts.length} of {data.total} products
              {debouncedSearch && <> for "<strong>{debouncedSearch}</strong>"</>}
            </p>
          )}


          <div className={styles.productsGrid}>
            {isLoading
              ? Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => <ProductCardSkeleton key={i} />)
              : sortedProducts.length > 0
                ? sortedProducts.map((product) => <ProductCard key={product.id} product={product} />)
                : (
                  <div className={styles.emptyState}>
                    <h3>No products found</h3>
                    <p>Try adjusting your search or filters.</p>
                  </div>
                )
            }
          </div>

          {!debouncedSearch && !selectedCategory && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          )}
        </div>
      </div>
    </div>
  );
};
