import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, Printer } from 'lucide-react';
import { Button } from '@components/ui/Button/Button';

export const OrderConfirmationPage: React.FC = () => {
  const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;

  return (
    <div style={{ maxWidth: '600px', margin: '6rem auto', textAlign: 'center', padding: '0 1rem' }}>
      <CheckCircle size={64} color="var(--color-success)" strokeWidth={1.5} style={{ marginBottom: '1.5rem' }} />
      <h1 style={{ marginBottom: '0.75rem' }}>Order Confirmed!</h1>
      <p style={{ color: 'var(--color-gray-600)', fontSize: 'var(--font-size-lg)', marginBottom: '0.5rem' }}>
        Thank you for your purchase.
      </p>
      <p style={{ color: 'var(--color-gray-500)', fontSize: 'var(--font-size-sm)', marginBottom: '2rem' }}>
        Order ID: <strong>{orderId}</strong>
      </p>

      <div style={{ background: 'var(--color-gray-50)', borderRadius: 'var(--border-radius-lg)', padding: '2rem', marginBottom: '2rem', textAlign: 'left' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <Package size={24} color="var(--color-gray-500)" />
          <div>
            <h4 style={{ margin: 0, fontSize: 'var(--font-size-sm)' }}>Estimated Delivery</h4>
            <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-500)' }}>3-5 business days</p>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: 'var(--font-size-sm)' }}>
          {['Order Placed', 'Processing', 'Shipped', 'Delivered'].map((step, idx) => (
            <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: idx === 0 ? 'var(--color-success)' : 'var(--color-gray-400)' }}>
              <div style={{
                width: '24px', height: '24px', borderRadius: '50%',
                background: idx === 0 ? 'var(--color-success)' : 'var(--color-gray-200)',
                color: idx === 0 ? 'white' : 'var(--color-gray-400)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 'bold'
              }}>
                {idx === 0 ? '✓' : idx + 1}
              </div>
              <span style={{ fontWeight: idx === 0 ? '600' : '400' }}>{step}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }} className="no-print">
        <Link to="/products"><Button variant="outline" rightIcon={<ArrowRight size={16} />}>Continue Shopping</Button></Link>
        <Button variant="outline" leftIcon={<Printer size={16} />} onClick={() => window.print()}>Print Receipt</Button>
        <Link to="/"><Button>Back to Home</Button></Link>
      </div>
    </div>
  );
};

