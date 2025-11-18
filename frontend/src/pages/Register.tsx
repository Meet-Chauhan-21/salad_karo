import React, { useState } from "react";
import Header from "../components/Header";
import ModernFooter from "../components/ModernFooter";
import axios from "axios";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";
import { Leaf, Heart, Star } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    const next: any = {};
    if (!name.trim()) next.name = "Full name is required";
    if (!phone.trim()) next.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(phone.trim())) next.phone = "Phone must be 10 digits";
    if (!city.trim()) next.city = "City is required";
    if (!address.trim()) next.address = "Address is required";
    if (!email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email";
    if (!password) next.password = "Password is required";
    else if (password.length < 6) next.password = "Password must be at least 6 characters";
    if (!accepted) next.accepted = "You must accept the terms";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submitHandler = async () => {
    if (!validate()) return;

    try {
      // helpful to inspect request in console during dev
      console.log('Sending signup:', { name, email, phone, city, address, password });

      const response = await axios.post("http://localhost:3030/auth/signup", {
        name : name,
        phone : phone,
        city : city,
        address : address,
        email : email,
        password : password
      });

      console.log('Signup response:', response);
      // be defensive — some servers wrap message differently
      const msg = response.data?.message || response.statusText;

      if (response.status === 201 && response.data.success) {
        // Store auth token
        if (response.data.jwtToken) {
          localStorage.setItem('authToken', response.data.jwtToken);
        }
        
        // Register user in AuthContext using backend response data
        const authResult = registerUser({
          email: response.data.email,
          password: password,
          name: response.data.name,
          phone: response.data.phone,
          city: response.data.city,
          address: response.data.address
        });
        
        if (authResult.ok) {
          toast.success('Account created successfully! Welcome ' + response.data.name + '!');
          navigate('/');
        } else {
          toast.error('Registration successful but login failed. Please login manually.');
          navigate('/login');
        }
      } else {
        toast.error(msg || 'Registration failed');
      }
    } catch (err: any) {
      console.error('Signup error:', err);
      // If server responded with JSON:
      if (err.response) {
        console.error('Server Response:', err.response.status, err.response.data);
        toast.error(err.response.data?.message || `Server error ${err.response.status}`);
      } else if (err.request) {
        // request sent but no response
        console.error('No response received:', err.request);
        toast.error('No response from server. Is the backend running?');
      } else {
        // something happened setting up request
        toast.error(err.message || 'Registration error');
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10 min-h-[70vh] flex items-center justify-center relative">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-20">
          <Leaf className="absolute top-8 left-8 w-16 h-16 text-primary animate-float" />
          <Heart className="absolute top-20 right-12 w-12 h-12 text-accent animate-float-delayed" />
          <Star className="absolute bottom-8 left-1/2 -translate-x-1/2 w-10 h-10 text-primary-glow animate-float" />
        </div>

        <div className="w-full max-w-4xl relative z-10">
          <h1 className="text-3xl font-bold mb-8 text-center">Create Account</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <input className={`w-full px-3 py-2 border rounded-md ${errors.name ? "border-red-500" : "border-border"}`}
                  placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
                {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
              </div>
              <div>
                <input className={`w-full px-3 py-2 border rounded-md ${errors.phone ? "border-red-500" : "border-border"}`}
                  placeholder="Phone number" maxLength={10} value={phone} onChange={(e) => setPhone(e.target.value)} />
                {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
              </div>
              <div>
                <input className={`w-full px-3 py-2 border rounded-md ${errors.city ? "border-red-500" : "border-border"}`}
                  placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                {errors.city && <p className="text-sm text-red-600">{errors.city}</p>}
              </div>
              <div>
                <textarea className={`w-full px-3 py-2 border rounded-md ${errors.address ? "border-red-500" : "border-border"}`}
                  placeholder="Address" rows={4} value={address} onChange={(e) => setAddress(e.target.value)} />
                {errors.address && <p className="text-sm text-red-600">{errors.address}</p>}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <input className={`w-full px-3 py-2 border rounded-md ${errors.email ? "border-red-500" : "border-border"}`}
                  placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
              </div>
              <div>
                <input className={`w-full px-3 py-2 border rounded-md ${errors.password ? "border-red-500" : "border-border"}`}
                  placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
              </div>
              <label className="flex gap-2 text-sm text-muted-foreground">
                <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)}
                  className={`${errors.accepted ? "outline outline-red-500" : ""}`} />
                I agree to the <a className="underline">Privacy Policy</a> & <a className="underline">Terms & Conditions</a>
              </label>
              {errors.accepted && <p className="text-sm text-red-600">{errors.accepted}</p>}

              <button className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-glow transition active:scale-95"
                onClick={submitHandler}>Create Account</button>

              <p className="text-center text-sm">Already have an account? <a href="/login" className="text-primary underline">Login</a></p>
            </div>
          </div>
        </div>
      </main>
      <ModernFooter />
    </div>
  );
};

export default Register;
