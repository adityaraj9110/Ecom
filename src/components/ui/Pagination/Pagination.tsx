import React from 'react';
import { Button } from '@components/ui/Button/Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '2rem' }}>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      
      <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-600)' }}>
        Page {currentPage} of {totalPages}
      </span>

      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
};
