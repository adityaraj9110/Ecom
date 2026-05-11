import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@components/ui/Button/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div style={{ maxWidth: '500px', margin: '8rem auto', textAlign: 'center', padding: '0 1rem' }}>
      <h1 style={{ fontSize: '6rem', fontWeight: 'bold', color: 'var(--color-gray-200)', lineHeight: 1, marginBottom: '1rem' }}>404</h1>
      <h2 style={{ marginBottom: '0.5rem' }}>Page Not Found</h2>
      <p style={{ color: 'var(--color-gray-500)', marginBottom: '2rem' }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/"><Button>Back to Home</Button></Link>
    </div>
  );
};
