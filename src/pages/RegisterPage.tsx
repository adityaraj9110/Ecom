import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@features/auth/store/authStore';
import { Button } from '@components/ui/Button/Button';
import { useToastStore } from '@store/toastStore';

const registerSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const RegisterPage: React.FC = () => {
  const login = useAuthStore((s) => s.login);
  const addToast = useToastStore((s) => s.addToast);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    login({ id: '1', name: data.name, email: data.email }, 'fake-jwt-token');
    addToast('Account created successfully!', 'success');
    navigate('/');
  };

  const inputStyle = { width: '100%', padding: '0.75rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color-base)' };
  const labelStyle: React.CSSProperties = { display: 'block', marginBottom: '0.5rem', fontSize: 'var(--font-size-sm)', fontWeight: '500' };
  const errorStyle: React.CSSProperties = { color: 'var(--color-error)', fontSize: 'var(--font-size-sm)', marginTop: '0.25rem' };

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem', border: '1px solid var(--border-color-base)', borderRadius: 'var(--border-radius-lg)', background: 'var(--color-white)' }}>
      <h1 style={{ marginBottom: '2rem', textAlign: 'center', fontSize: 'var(--font-size-2xl)' }}>Create Account</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <label style={labelStyle}>Full Name</label>
          <input {...register('name')} style={inputStyle} />
          {errors.name && <span style={errorStyle}>{errors.name.message}</span>}
        </div>
        <div>
          <label style={labelStyle}>Email Address</label>
          <input {...register('email')} type="email" style={inputStyle} />
          {errors.email && <span style={errorStyle}>{errors.email.message}</span>}
        </div>
        <div>
          <label style={labelStyle}>Password</label>
          <input {...register('password')} type="password" style={inputStyle} />
          {errors.password && <span style={errorStyle}>{errors.password.message}</span>}
        </div>
        <div>
          <label style={labelStyle}>Confirm Password</label>
          <input {...register('confirmPassword')} type="password" style={inputStyle} />
          {errors.confirmPassword && <span style={errorStyle}>{errors.confirmPassword.message}</span>}
        </div>
        <Button type="submit" fullWidth>Create Account</Button>
      </form>
      <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-600)' }}>
        Already have an account? <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: '500' }}>Sign in</Link>
      </p>
    </div>
  );
};
