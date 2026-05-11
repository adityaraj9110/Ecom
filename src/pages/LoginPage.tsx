import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@features/auth/store/authStore';
import { useToastStore } from '@store/toastStore';
import { Button } from '@components/ui/Button/Button';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const LoginPage: React.FC = () => {
  const login = useAuthStore(state => state.login);
  const addToast = useToastStore((s) => s.addToast);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    login({ id: '1', name: 'Demo User', email: data.email }, 'fake-jwt-token');
    addToast('Signed in successfully!', 'success');
    navigate('/');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem', border: '1px solid var(--border-color-base)', borderRadius: 'var(--border-radius-lg)', background: 'var(--color-white)' }}>
      <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: 'var(--font-size-sm)', fontWeight: '500' }}>Email Address</label>
          <input {...register('email')} type="email" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color-base)' }} />
          {errors.email && <span style={{ color: 'var(--color-error)', fontSize: 'var(--font-size-sm)' }}>{errors.email.message}</span>}
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: 'var(--font-size-sm)', fontWeight: '500' }}>Password</label>
          <input {...register('password')} type="password" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color-base)' }} />
          {errors.password && <span style={{ color: 'var(--color-error)', fontSize: 'var(--font-size-sm)' }}>{errors.password.message}</span>}
        </div>
        <Button type="submit" fullWidth>Sign In</Button>
      </form>
      <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-600)' }}>
        Don't have an account? <Link to="/register" style={{ color: 'var(--color-primary)', fontWeight: '500' }}>Register here</Link>
      </p>
    </div>
  );
};
