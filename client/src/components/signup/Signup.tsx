import './signup.css';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate()
  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h2>Create Your Account</h2>
          <p>Join our community of travelers</p>
        </div>

        <form className="signup-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input 
                type="text" 
                id="firstName" 
                placeholder="Enter your first name" 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input 
                type="text" 
                id="lastName" 
                placeholder="Enter your last name" 
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
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact">Contact Number</label>
            <input 
              type="tel" 
              id="contact" 
              placeholder="+1 (123) 456-7890" 
              required 
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                placeholder="Create a password" 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input 
                type="password" 
                id="confirmPassword" 
                placeholder="Confirm your password" 
                required 
              />
            </div>
          </div>

          <button type="submit" className="signup-button">Sign Up</button>

          <div className="signup-footer">
            <p>Already have an account? <a onClick={()=>navigate("/login")}>Log in</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;