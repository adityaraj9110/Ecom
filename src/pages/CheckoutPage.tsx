import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@features/cart/store/cartStore';
import { useToastStore } from '@store/toastStore';
import { Button } from '@components/ui/Button/Button';

// Schemas
const addressSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  zipCode: z.string().min(4, 'Valid ZIP is required'),
});

const paymentSchema = z.object({
  cardNumber: z.string().min(16, 'Card number must be 16 digits').max(16),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Invalid expiry (MM/YY)'),
  cvv: z.string().length(3, 'CVV must be 3 digits'),
});

type CheckoutStep = 'address' | 'payment' | 'review';

export const CheckoutPage: React.FC = () => {
  const [step, setStep] = useState<CheckoutStep>('address');
  const { items, getCartTotal, clearCart } = useCartStore();
  const addToast = useToastStore((s) => s.addToast);
  const navigate = useNavigate();

  const addressForm = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
  });

  const paymentForm = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
  });

  const onAddressSubmit = () => setStep('payment');
  const onPaymentSubmit = () => setStep('review');
  const onFinalSubmit = () => {
    clearCart();
    addToast('Order placed successfully!', 'success');
    navigate('/order-confirmation');
  };

  if (items.length === 0) {
    return (
      <div style={{ maxWidth: '600px', margin: '4rem auto', textAlign: 'center' }}>
        <h2>Your cart is empty</h2>
        <p style={{ marginBottom: '2rem' }}>Add some items before checking out.</p>
        <Button onClick={() => navigate('/products')}>Browse Products</Button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 1rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>Checkout</h1>
      
      {/* Stepper Header */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', borderBottom: '1px solid var(--border-color-base)', paddingBottom: '1rem' }}>
        <span style={{ fontWeight: step === 'address' ? 'bold' : 'normal', color: step === 'address' ? 'var(--color-primary)' : 'var(--color-gray-500)' }}>1. Address</span>
        <span style={{ color: 'var(--color-gray-300)' }}>&gt;</span>
        <span style={{ fontWeight: step === 'payment' ? 'bold' : 'normal', color: step === 'payment' ? 'var(--color-primary)' : 'var(--color-gray-500)' }}>2. Payment</span>
        <span style={{ color: 'var(--color-gray-300)' }}>&gt;</span>
        <span style={{ fontWeight: step === 'review' ? 'bold' : 'normal', color: step === 'review' ? 'var(--color-primary)' : 'var(--color-gray-500)' }}>3. Review</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '4rem' }}>
        <div>
          {step === 'address' && (
            <form onSubmit={addressForm.handleSubmit(onAddressSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: 'var(--font-size-sm)', fontWeight: '500' }}>Full Name</label>
                <input {...addressForm.register('fullName')} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color-base)' }} />
                {addressForm.formState.errors.fullName && <span style={{ color: 'var(--color-error)', fontSize: 'var(--font-size-sm)' }}>{addressForm.formState.errors.fullName.message}</span>}
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: 'var(--font-size-sm)', fontWeight: '500' }}>Address</label>
                <input {...addressForm.register('address')} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color-base)' }} />
                {addressForm.formState.errors.address && <span style={{ color: 'var(--color-error)', fontSize: 'var(--font-size-sm)' }}>{addressForm.formState.errors.address.message}</span>}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: 'var(--font-size-sm)', fontWeight: '500' }}>City</label>
                  <input {...addressForm.register('city')} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color-base)' }} />
                  {addressForm.formState.errors.city && <span style={{ color: 'var(--color-error)', fontSize: 'var(--font-size-sm)' }}>{addressForm.formState.errors.city.message}</span>}
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: 'var(--font-size-sm)', fontWeight: '500' }}>ZIP Code</label>
                  <input {...addressForm.register('zipCode')} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color-base)' }} />
                  {addressForm.formState.errors.zipCode && <span style={{ color: 'var(--color-error)', fontSize: 'var(--font-size-sm)' }}>{addressForm.formState.errors.zipCode.message}</span>}
                </div>
              </div>
              <Button type="submit" style={{ marginTop: '1rem' }}>Continue to Payment</Button>
            </form>
          )}

          {step === 'payment' && (
            <form onSubmit={paymentForm.handleSubmit(onPaymentSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: 'var(--font-size-sm)', fontWeight: '500' }}>Card Number</label>
                <input {...paymentForm.register('cardNumber')} placeholder="0000 0000 0000 0000" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color-base)' }} />
                {paymentForm.formState.errors.cardNumber && <span style={{ color: 'var(--color-error)', fontSize: 'var(--font-size-sm)' }}>{paymentForm.formState.errors.cardNumber.message}</span>}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: 'var(--font-size-sm)', fontWeight: '500' }}>Expiry Date</label>
                  <input {...paymentForm.register('expiry')} placeholder="MM/YY" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color-base)' }} />
                  {paymentForm.formState.errors.expiry && <span style={{ color: 'var(--color-error)', fontSize: 'var(--font-size-sm)' }}>{paymentForm.formState.errors.expiry.message}</span>}
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: 'var(--font-size-sm)', fontWeight: '500' }}>CVV</label>
                  <input {...paymentForm.register('cvv')} placeholder="123" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color-base)' }} />
                  {paymentForm.formState.errors.cvv && <span style={{ color: 'var(--color-error)', fontSize: 'var(--font-size-sm)' }}>{paymentForm.formState.errors.cvv.message}</span>}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <Button type="button" variant="outline" onClick={() => setStep('address')}>Back</Button>
                <Button type="submit">Review Order</Button>
              </div>
            </form>
          )}

          {step === 'review' && (
            <div>
              <div style={{ background: 'var(--color-gray-50)', padding: '2rem', borderRadius: 'var(--border-radius-lg)', marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem' }}>Shipping Address</h3>
                <p>{addressForm.getValues('fullName')}</p>
                <p>{addressForm.getValues('address')}</p>
                <p>{addressForm.getValues('city')}, {addressForm.getValues('zipCode')}</p>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Button type="button" variant="outline" onClick={() => setStep('payment')}>Back</Button>
                <Button onClick={onFinalSubmit}>Place Order (${getCartTotal().toFixed(2)})</Button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div style={{ background: 'var(--color-gray-50)', padding: '2rem', borderRadius: 'var(--border-radius-lg)', height: 'fit-content' }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: 'var(--font-size-lg)' }}>Order Summary</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            {items.map(item => (
              <div key={item.product.id} style={{ display: 'flex', gap: '1rem' }}>
                <img src={item.product.thumbnail} alt="" style={{ width: '50px', height: '50px', objectFit: 'contain', background: 'white', borderRadius: 'var(--border-radius-sm)', padding: '4px' }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: '500', margin: 0, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.product.title}</p>
                  <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-gray-500)', margin: '0.25rem 0' }}>Qty: {item.quantity}</p>
                  <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: '600' }}>${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid var(--border-color-base)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-lg)', fontWeight: 'bold' }}>
            <span>Total</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
