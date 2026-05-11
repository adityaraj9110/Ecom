import React from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '@features/products/hooks/useProducts';
import { Tag, ArrowRight } from 'lucide-react';
import { Skeleton } from '@components/ui/Skeleton/Skeleton';

export const CategoriesPage: React.FC = () => {
  const { data: categories, isLoading, error } = useCategories();

  if (error) return <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--color-error)' }}>Error loading categories</div>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1rem' }}>
      <h1 style={{ marginBottom: '1rem' }}>Browse by Category</h1>
      <p style={{ color: 'var(--color-gray-500)', marginBottom: '3rem' }}>
        Discover our wide range of products across {categories?.length || 0} categories.
      </p>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {isLoading ? (
          Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} height="120px" borderRadius="var(--border-radius-lg)" />
          ))
        ) : (
          categories?.map((cat) => (
            <Link 
              key={cat.slug} 
              to={`/products?category=${cat.slug}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '2rem',
                background: 'var(--color-gray-50)',
                borderRadius: 'var(--border-radius-lg)',
                textDecoration: 'none',
                color: 'var(--color-gray-900)',
                transition: 'var(--transition-base)',
                border: '1px solid transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color-base)';
                e.currentTarget.style.background = 'var(--color-white)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.background = 'var(--color-gray-50)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <div style={{ 
                  width: '48px', height: '48px', background: 'var(--color-white)', 
                  borderRadius: 'var(--border-radius-full)', display: 'flex', 
                  alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' 
                }}>
                  <Tag size={24} />
                </div>
                <span style={{ fontWeight: '600', textTransform: 'capitalize', fontSize: '1.1rem' }}>
                  {cat.name}
                </span>
              </div>
              <ArrowRight size={20} color="var(--color-gray-400)" />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};
