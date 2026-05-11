import React from 'react';
import styles from './Skeleton.module.scss';

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ width = '100%', height = '1rem', borderRadius }) => {
  return <div className={styles.skeleton} style={{ width, height, borderRadius }} />;
};

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div style={{ border: '1px solid var(--border-color-base)', borderRadius: 'var(--border-radius-lg)', overflow: 'hidden' }}>
      <Skeleton height="240px" borderRadius="0" />
      <div style={{ padding: 'var(--spacing-4)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Skeleton width="40%" height="0.75rem" />
        <Skeleton width="80%" height="1rem" />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
          <Skeleton width="30%" height="1.25rem" />
          <Skeleton width="20%" height="1rem" />
        </div>
      </div>
    </div>
  );
};
