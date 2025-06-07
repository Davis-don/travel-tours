import './login.css';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Toaster, toast } from 'sonner';
import { useAuthStore } from '../../Store/useauthstore';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { setAuth } = useAuthStore(); // ✅ Updated to use setAuth
  const apiUrl = import.meta.env.VITE_travel;

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const res = await fetch(`${apiUrl}/client/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Login failed');
      }
      return res.json();
    },
    onSuccess: (data) => {
      // ✅ Use single setAuth function
      setAuth(data.token, data.user, data.role);

      toast.success('Login successful!');

      setTimeout(() => {
        // Role-based navigation
        if (data.role === 'client') {
          navigate('/client');
        } else if (data.role === 'admin') {
          navigate('/admin');
        } else if (data.role === 'senior-agent') {
          navigate('/agent', { state: { role: 'senior-agent' } });
        } else if (data.role === 'agent') {
          navigate('/agent', { state: { role: 'agent' } });
        }
      }, 2000);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Login failed. Please try again.');
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    loginMutation.mutate(formData);
  };

  return (
    <div className="login-container">
      <Toaster richColors position="top-center" />

      <div className="login-image">
        <div className="login-image-overlay">
          <h2>Welcome Back!</h2>
          <p>Sign in to access your personalized travel recommendations and saved itineraries.</p>
        </div>
      </div>

      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Sign In</h1>

          <div className="form-group-login">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group-login">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <a onClick={() => navigate('/get-help')} className="forgot-password">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? 'Signing In...' : 'Sign In'}
          </button>

          <div className="signup-link">
            Don't have an account? <a onClick={() => navigate('/signup')}>Sign up</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
