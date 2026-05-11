import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronRight } from 'lucide-react';

// Mock order data
const mockOrders = [
  { id: 'ORD-A1B2C3', date: '2026-05-10', status: 'Delivered', total: 149.97, items: 3 },
  { id: 'ORD-D4E5F6', date: '2026-05-08', status: 'Shipped', total: 79.99, items: 1 },
  { id: 'ORD-G7H8I9', date: '2026-05-01', status: 'Processing', total: 249.50, items: 5 },
];

const statusColor: Record<string, string> = {
  Delivered: 'var(--color-success)',
  Shipped: 'var(--color-info)',
  Processing: 'var(--color-warning)',
  Cancelled: 'var(--color-error)',
};

export const OrderHistoryPage: React.FC = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 1rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>Order History</h1>

      {mockOrders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-gray-500)' }}>
          <Package size={48} strokeWidth={1} style={{ marginBottom: '1rem' }} />
          <p>No orders yet.</p>
          <Link to="/products" style={{ color: 'var(--color-primary)', fontWeight: '500' }}>Start shopping</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {mockOrders.map((order) => (
            <div key={order.id} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem', border: '1px solid var(--border-color-base)', borderRadius: 'var(--border-radius-lg)', cursor: 'pointer' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--border-radius-md)', background: 'var(--color-gray-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gray-400)', flexShrink: 0 }}>
                <Package size={22} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontWeight: '600', fontSize: 'var(--font-size-sm)' }}>{order.id}</span>
                  <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: '500', color: statusColor[order.status] || 'var(--color-gray-500)', background: `${statusColor[order.status] || 'var(--color-gray-500)'}15`, padding: '2px 8px', borderRadius: 'var(--border-radius-full)' }}>
                    {order.status}
                  </span>
                </div>
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-gray-500)' }}>
                  {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} · {order.items} item{order.items > 1 ? 's' : ''}
                </div>
              </div>
              <span style={{ fontWeight: '600' }}>${order.total.toFixed(2)}</span>
              <ChevronRight size={18} color="var(--color-gray-400)" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
