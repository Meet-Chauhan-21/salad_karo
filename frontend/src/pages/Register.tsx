import React, { useState } from 'react';
import Header from '../components/Header';
import ModernFooter from '../components/ModernFooter';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '@/components/ui/sonner';
import { Leaf, Heart, Star } from 'lucide-react';

const Register: React.FC = () => {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; city?: string; address?: string; email?: string; password?: string; accepted?: string }>({});

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="relative overflow-hidden container mx-auto px-4 py-10 min-h-[70vh] flex items-center justify-center">
        {/* Floating Background Elements */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute top-8 left-8 animate-float opacity-20">
            <Leaf className="w-16 h-16 text-primary" />
          </div>
          <div className="absolute top-20 right-12 animate-float-delayed opacity-20">
            <Heart className="w-12 h-12 text-accent" />
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float opacity-20">
            <Star className="w-10 h-10 text-primary-glow" />
          </div>
        </div>
        <div className="w-full max-w-4xl relative">
          <h1 className="relative z-10 text-3xl font-bold mb-8 text-center">Create Account</h1>
          {/* Vertical divider */}
          <div className="hidden md:block absolute left-1/2 top-[72px] bottom-0 w-px bg-border" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left column */}
            <div className="relative z-10 space-y-4">
              <div>
                <input
                  className={`w-full px-3 py-2 border rounded-md bg-background transition-[var(--transition-smooth)] focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-200' : 'border-border focus:ring-primary/30 hover:border-primary'}`}
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>
              <div>
                <input
                  className={`w-full px-3 py-2 border rounded-md bg-background transition-[var(--transition-smooth)] focus:outline-none focus:ring-2 ${errors.phone ? 'border-red-500 focus:ring-red-200' : 'border-border focus:ring-primary/30 hover:border-primary'}`}
                  placeholder="Phone number"
                  inputMode="numeric"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>
              <div>
                <input
                  className={`w-full px-3 py-2 border rounded-md bg-background transition-[var(--transition-smooth)] focus:outline-none focus:ring-2 ${errors.city ? 'border-red-500 focus:ring-red-200' : 'border-border focus:ring-primary/30 hover:border-primary'}`}
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
              </div>
              <div>
                <textarea
                  className={`w-full px-3 py-2 border rounded-md bg-background transition-[var(--transition-smooth)] focus:outline-none focus:ring-2 ${errors.address ? 'border-red-500 focus:ring-red-200' : 'border-border focus:ring-primary/30 hover:border-primary'}`}
                  placeholder="Address"
                  rows={4}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
              </div>
            </div>
            {/* Right column */}
            <div className="relative z-10 space-y-4">
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
              <label className="flex items-start gap-2 text-sm text-muted-foreground">
                <input type="checkbox" className={`mt-1 ${errors.accepted ? 'outline outline-1 outline-red-500 rounded' : ''}`} checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
                <span>
                  I agree to the <a href="#" className="underline">Privacy Policy</a> and <a href="#" className="underline">Terms & Conditions</a>.
                </span>
              </label>
              {errors.accepted && <p className="-mt-2 text-sm text-red-600">{errors.accepted}</p>}
              <button
                className="w-full bg-primary text-primary-foreground py-2 rounded-md font-medium hover:bg-primary-glow hover:shadow-[var(--shadow-button)] active:scale-95 transition-[var(--transition-smooth)]"
                onClick={() => {
                  const next: any = {};
                  if (!name.trim()) next.name = 'Full name is required';
                  if (!phone.trim()) next.phone = 'Phone number is required';
                  else if (!/^\d{10}$/.test(phone.trim())) next.phone = 'Phone must be 10 digits';
                  if (!city.trim()) next.city = 'City is required';
                  if (!address.trim()) next.address = 'Address is required';
                  if (!email.trim()) next.email = 'Email is required';
                  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = 'Enter a valid email';
                  if (!password) next.password = 'Password is required';
                  else if (password.length < 6) next.password = 'Password must be at least 6 characters';
                  if (!accepted) next.accepted = 'You must accept the policy and terms';
                  setErrors(next);
                  if (Object.keys(next).length) return;

                  const res = register({ email: email.trim(), password, name: name.trim(), phone: phone.trim(), city: city.trim(), address: address.trim() });
                  if (!res.ok) {
                    const errorMsg = 'error' in res ? res.error : 'Registration failed';
                    setErrors({ email: errorMsg, password: errorMsg });
                    return;
                  }
                  toast.success('Account created!');
                  window.location.href = '/';
                }}
              >
                Create Account
              </button>
              <div className="text-sm text-muted-foreground text-center">Already have an account? <a href="/login" className="text-primary underline">Login</a></div>
            </div>
          </div>
        </div>
      </main>
      <ModernFooter />
    </div>
  );
};

export default Register;


