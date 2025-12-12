import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ModernFooter from '../components/ModernFooter';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '@/components/ui/sonner';
import { Leaf, Heart, Star } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

import GoogleInfoModal from '../components/GoogleInfoModal';

const Login: React.FC = () => {
  const { login, googleLogin, googleRegister, setUser } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  // Google Flow State
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [googleTempData, setGoogleTempData] = useState<any>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Modal for Google Info */}
      <GoogleInfoModal
        isOpen={showGoogleModal}
        onClose={async () => {
          // Allow skipping - save partial data to database
          if (googleTempData) {
            try {
              // Save to database with empty fields
              const res = await googleRegister({
                email: googleTempData.email,
                name: googleTempData.name,
                picture: googleTempData.picture || '',
                phone: '',
                city: '',
                address: '',
                token: googleTempData.token
              });

              if (res.ok) {
                toast.success(`Welcome ${googleTempData.name}!`);
                setShowGoogleModal(false);
                navigate('/');
              } else {
                // Fallback to local storage only
                const userData: any = {
                  email: googleTempData.email,
                  name: googleTempData.name,
                };
                setUser(userData);
                localStorage.setItem('skfb_auth_user_v1', JSON.stringify(userData));
                localStorage.setItem('authToken', googleTempData.token);
                localStorage.setItem('isLoggedIn', 'true');
                toast.success(`Welcome ${googleTempData.name}!`);
                setShowGoogleModal(false);
                navigate('/');
              }
            } catch (e) {
              // Fallback to local storage only
              const userData: any = {
                email: googleTempData.email,
                name: googleTempData.name,
              };
              setUser(userData);
              localStorage.setItem('skfb_auth_user_v1', JSON.stringify(userData));
              localStorage.setItem('authToken', googleTempData.token);
              localStorage.setItem('isLoggedIn', 'true');
              toast.success(`Welcome ${googleTempData.name}!`);
              setShowGoogleModal(false);
              navigate('/');
            }
          }
        }}
        onSubmit={async (formData) => {
          try {
            const res = await googleRegister({
              ...formData,
              email: googleTempData.email,
              name: googleTempData.name,
              picture: googleTempData.picture,
              token: googleTempData.token
            });
            if (res.ok) {
              toast.success(`Welcome ${googleTempData.name}!`);
              setShowGoogleModal(false);
              navigate('/');
            } else {
              toast.error('Registration failed: ' + (res as any).error);
            }
          } catch (e) {
            toast.error('Something went wrong');
          }
        }}
        initialData={googleTempData?.currentData}
      />

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
                  email: 'admin@saladkaro.pvt.in',
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

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="w-full">
            <div className="w-full [&>div]:w-full [&_iframe]:w-full">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  if (credentialResponse.credential) {
                    try {
                      const token = credentialResponse.credential;
                      const res = await googleLogin(token);

                      if (res.ok) {
                        toast.success('Logged in successfully!');
                        navigate('/');
                      } else if ((res as any).requiresInfo) {
                        setGoogleTempData({
                          ...((res as any).googleData),
                          currentData: (res as any).currentData,
                          token: token
                        });
                        setShowGoogleModal(true);
                      } else {
                        toast.error((res as any).error || 'Login failed');
                      }
                    } catch (error) {
                      console.error('Google Auth Error', error);
                      toast.error('Failed to process Google Login');
                    }
                  }
                }}
                onError={() => {
                  console.error('Google Login Failed');
                  toast.error('Google connection failed');
                }}
                useOneTap
                width="100%"
                size="large"
              />
            </div>
          </div>
          <div className="text-sm text-muted-foreground">Don't have an account? <a href="/register" className="text-primary underline">Register</a></div>
        </div>
      </main>
      <ModernFooter />
    </div>
  );
};

export default Login;


