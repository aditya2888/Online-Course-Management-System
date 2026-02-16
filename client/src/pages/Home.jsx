import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // We will create this CSS file next

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Master Your Future</h1>
        <p>
          Welcome to the Online Course Management System. 
          Manage courses, track progress, and learn at your own pace.
        </p>
        <div className="hero-buttons">
          <Link to="/login" className="btn btn-primary">Get Started</Link>
          <Link to="/dashboard" className="btn btn-secondary">Dashboard</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;