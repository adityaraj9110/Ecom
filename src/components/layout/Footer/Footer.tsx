import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ExternalLink } from 'lucide-react';
import { Button } from '@components/ui/Button/Button';
import { useToastStore } from '@store/toastStore';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const addToast = useToastStore((s) => s.addToast);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      addToast('Subscribed successfully!', 'success');
      setEmail('');
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <h3><ShoppingBag size={20} /> ShopSphere</h3>
            <p>A modern, production-ready e-commerce platform built with React, TypeScript, and love.</p>
          </div>

          <div className={styles.column}>
            <h4>Shop</h4>
            <ul>
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/categories">Categories</Link></li>
              <li><Link to="/wishlist">Wishlist</Link></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4>Account</h4>
            <ul>
              <li><Link to="/login">Sign In</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/orders">Order History</Link></li>
            </ul>
          </div>

          <div className={styles.newsletter}>
            <h4>Newsletter</h4>
            <p>Get updates on new products and sales.</p>
            <form className={styles.newsletterForm} onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" size="sm">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>&copy; {new Date().getFullYear()} ShopSphere. All rights reserved.</span>
          <div className={styles.socials}>
            <a href="#" aria-label="GitHub"><ExternalLink size={18} /></a>
            <a href="#" aria-label="Twitter"><ExternalLink size={18} /></a>
            <a href="#" aria-label="LinkedIn"><ExternalLink size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};
