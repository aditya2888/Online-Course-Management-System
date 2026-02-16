import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // New: State to hold error messages
  const [errors, setErrors] = useState({});

  // New: The Validation Logic
  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    // Check if email contains '@'
    if (!email.includes("@")) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    // Check if password is at least 6 characters
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Only proceed if validation passes
    if (validateForm()) {
      console.log("Login Success:", { email, password });
      alert("Login Successful! (This is where we would redirect you)");
      setErrors({}); // Clear errors
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p>Please login to your account</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // Turn border red if there is an error
              style={{ borderColor: errors.email ? "red" : "#ddd" }}
              required 
            />
            {/* Show the error message in red text */}
            {errors.email && <span style={{color: "red", fontSize: "0.8rem", marginTop: "5px", display: "block"}}>{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ borderColor: errors.password ? "red" : "#ddd" }}
              required 
            />
            {errors.password && <span style={{color: "red", fontSize: "0.8rem", marginTop: "5px", display: "block"}}>{errors.password}</span>}
          </div>

          <button type="submit" className="login-btn">Login</button>
        </form>

        <p className="register-link">
            Don't have an account? <Link to="/register" style={{textDecoration: 'none', fontWeight: 'bold', color: '#007bff'}}>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;