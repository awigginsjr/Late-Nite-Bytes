

import React, { useState } from 'react';

function Homepage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleLoginClick = (e) => {
    e.preventDefault();
    setShowLogin(true);
    setShowSignup(false);
  };

  const handleSignupClick = (e) => {
    e.preventDefault();
    setShowSignup(true);
    setShowLogin(false);
  };

  return (
    <div>
      <div className="hero">
        <h1>Late Nite Bytes</h1>
      </div>
      <div className="navbar">
        <a href="/login" id="login-signup-btn" onClick={handleLoginClick}>Log in</a>
        <br />
        <a href="/signup" id="login-signup-btn" onClick={handleSignupClick}>Sign up</a>
        <a href="#">About Us</a>
      </div>
      <div className="intro">
        <h2>Welcome to Late Nite Bytes</h2>
        <p>
          At Late Nite Bytes, we are dedicated to bringing you the best late-night food recommendations. Whether you are looking for a quick bite or a full meal, our platform connects you to the top restaurants open late in your area. Enjoy seamless browsing and discover new favorites right from the comfort of your home.
        </p>
      </div>
      {showLogin && (
        <div className="container login-container" id="login-container">
          <h2>Login</h2>
          <form>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
            <button type="submit">Login</button>
          </form>
          <div className="signup-link">
            <p>Don't have an account? <a href="#" onClick={handleSignupClick}>Sign up</a></p>
          </div>
        </div>
      )}
      {showSignup && (
        <div className="container signup-container" id="signup-container">
          <h2>Sign Up</h2>
          <form>
            <label htmlFor="signup-email">Email:</label>
            <input type="email" id="signup-email" name="signup-email" required />
            <label htmlFor="signup-password">Password:</label>
            <input type="password" id="signup-password" name="signup-password" required />
            <button type="submit">Sign Up</button>
          </form>
          <div className="login-link">
            <p>Already have an account? <a href="#" onClick={handleLoginClick}>Log in</a></p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Homepage;
