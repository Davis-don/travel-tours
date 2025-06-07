import './signup.css';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Toaster, toast } from 'sonner';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    password: '',
    confirmPassword: ''
  });

  const apiUrl = import.meta.env.VITE_travel;

  // Signup mutation
  const signupMutation = useMutation({
    mutationFn: async (newUser: typeof formData) => {
      const res = await fetch(`${apiUrl}/client/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to create account');
      }
      return res.json();
    },
    onSuccess: (data) => {
      toast.success(data.message || 'Account created successfully!');

      // Reset form data
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        contact: '',
        password: '',
        confirmPassword: ''
      });

      // Delay navigation by 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Error creating account');
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
    if (!formData.firstName || !formData.lastName || !formData.email || 
        !formData.contact || !formData.password || !formData.confirmPassword) {
      toast.error('All fields are required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Invalid email format');
      return;
    }

    if (!/^\+?\d{10,15}$/.test(formData.contact)) {
      toast.error('Invalid contact number (10-15 digits, + optional)');
      return;
    }

    signupMutation.mutate(formData);
  };

  return (
    <div className="signup-container">
      <Toaster richColors position="top-center" />
      
      <div className="signup-card">
        <div className="signup-header">
          <h2>Create Your Account</h2>
          <p>Join our community of travelers</p>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input 
                type="text" 
                id="firstName" 
                placeholder="Enter your first name" 
                value={formData.firstName}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input 
                type="text" 
                id="lastName" 
                placeholder="Enter your last name" 
                value={formData.lastName}
                onChange={handleInputChange}
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              placeholder="your.email@example.com" 
              value={formData.email}
              onChange={handleInputChange}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact">Contact Number</label>
            <input 
              type="tel" 
              id="contact" 
              placeholder="+1234567890" 
              pattern="^\+?\d{10,15}$"
              title="10-15 digits, + optional"
              value={formData.contact}
              onChange={handleInputChange}
              required 
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password (min 8 chars)</label>
              <input 
                type="password" 
                id="password" 
                placeholder="Create a password" 
                minLength={8}
                value={formData.password}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input 
                type="password" 
                id="confirmPassword" 
                placeholder="Confirm your password" 
                minLength={8}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required 
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="signup-button"
            disabled={signupMutation.isPending}
          >
            {signupMutation.isPending ? 'Creating Account...' : 'Sign Up'}
          </button>

          <div className="signup-footer">
            <p>Already have an account? <a onClick={() => navigate("/login")}>Log in</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
