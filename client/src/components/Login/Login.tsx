import './login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate()
  return (
    <div className="login-container">
      <div className="login-image">
        <div className="login-image-overlay">
          <h2>Welcome Back!</h2>
          <p>Sign in to access your personalized travel recommendations and saved itineraries.</p>
        </div>
      </div>
      
      <div className="login-form-container">
        <div className="login-form">
          <h1>Sign In</h1>
          
          <div className="form-group-login">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Enter your email" 
              required 
            />
          </div>
          
          <div className="form-group-login">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Enter your password" 
              required 
            />
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>
          
          <button type="submit" className="login-btn">Sign In</button>
          
          <div className="signup-link">
            Don't have an account? <a onClick={()=>navigate('/signup')}>Sign up</a>
          </div>
        
        </div>
      </div>
    </div>
  );
}

export default Login;