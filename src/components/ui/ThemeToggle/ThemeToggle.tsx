import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useUiStore } from '@store/uiStore';
import { Button } from '../Button/Button';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useUiStore();

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleTheme} 
      aria-label="Toggle theme"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </Button>
  );
};
