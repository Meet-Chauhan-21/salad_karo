import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ModernFooter from '../components/ModernFooter';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '@/components/ui/sonner';
import { Leaf, Heart, Star } from 'lucide-react';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="relative overflow-hidden container mx-auto px-4 py-10 max-w-md">
        {/* Floating Background Elements */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute -top-4 -left-6 animate-float opacity-20">
            <Leaf className="w-14 h-14 text-primary" />
          </div>
          <div className="absolute top-10 -right-4 animate-float-delayed opacity-20">
            <Heart className="w-10 h-10 text-accent" />
          </div>
          <div className="absolute bottom-6 left-6 animate-float opacity-20">
            <Star className="w-8 h-8 text-primary-glow" />
          </div>
        </div>
        <h1 className="relative z-10 text-3xl font-bold mb-6 text-center">Login</h1>
        <div className="relative z-10 space-y-4 bg-card p-6 rounded-xl border border-border">
          <div>
            <input
              className={`w-full px-3 py-2 border rounded-md bg-background transition-[var(--transition-smooth)] focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-border focus:ring-primary/30 hover:border-primary'}`}
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>
          <div>
            <input
              className={`w-full px-3 py-2 border rounded-md bg-background transition-[var(--transition-smooth)] focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-200' : 'border-border focus:ring-primary/30 hover:border-primary'}`}
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>
          <button
            className="w-full bg-primary text-primary-foreground py-2 rounded-md font-medium hover:bg-primary-glow hover:shadow-[var(--shadow-button)] active:scale-95 transition-[var(--transition-smooth)]"
            onClick={async () => {
              const nextErrors: { email?: string; password?: string } = {};
              
              // Check for admin credentials first (before validation)
              if (email.trim() === 'admin@saladkaro.pvt.in' && password === 'saladKaro@9915/sk') {
                console.log('Admin credentials matched, setting localStorage');
                localStorage.setItem('isAdmin', 'true');
                localStorage.setItem('adminUser', JSON.stringify({
                  email: 'admin@123',
                  name: 'Admin',
                  role: 'admin'
                }));
                console.log('localStorage set:', {
                  isAdmin: localStorage.getItem('isAdmin'),
                  adminUser: localStorage.getItem('adminUser')
                });
                toast.success('Welcome Admin!');
                console.log('Navigating directly to /admin/orders');
                navigate('/admin/orders');
                return;
              }

              // Regular validation for non-admin users
              if (!email.trim()) nextErrors.email = 'Email is required';
              else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) nextErrors.email = 'Enter a valid email';
              if (!password) nextErrors.password = 'Password is required';
              setErrors(nextErrors);
              if (Object.keys(nextErrors).length) return;

              // Normal user login
              if (password.length < 6) {
                setErrors({ password: 'Password must be at least 6 characters' });
                return;
              }
              
              try {
                const res = await login(email.trim(), password);
                if (!res.ok) {
                  const errorMsg = 'error' in res ? res.error : 'Login failed';
                  setErrors({ email: errorMsg, password: errorMsg });
                  toast.error(errorMsg);
                  return;
                }
                toast.success('Welcome back!');
                navigate('/');
              } catch (error) {
                console.error('Login error:', error);
                setErrors({ email: 'Login failed', password: 'Login failed' });
                toast.error('Login failed. Please try again.');
              }
            }}
          >
            Continue
          </button>
          <div className="text-sm text-muted-foreground">Don't have an account? <a href="/register" className="text-primary underline">Register</a></div>
        </div>
      </main>
      <ModernFooter />
    </div>
  );
};

export default Login;


