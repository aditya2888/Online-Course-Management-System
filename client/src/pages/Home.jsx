import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container animate-fade-in">
      <section className="hero-section">
        <h1 className="hero-title">Elevate Your <span>Knowledge</span></h1>
        <p className="hero-subtitle">
          Join thousands of learners and instructors in the most advanced
          Online Course Management System.
        </p>
        <div className="hero-actions">
          <Link to="/register" className="btn btn-primary shadow-lg">Get Started</Link>
          <Link to="/login" className="btn btn-outline">Sign In</Link>
        </div>
      </section>

      <div className="features-grid">
        <Link to="/category/learn-anywhere" className="feature-card hover-lift">
          <div className="feature-icon">🎓</div>
          <h3>Learn Anywhere</h3>
          <p>Experience true flexibility with our mobile-first platform. Access lectures, assignments, and study materials on the go from any device.</p>
        </Link>
        <Link to="/category/expert-guidance" className="feature-card hover-lift">
          <div className="feature-icon">👨‍🏫</div>
          <h3>Expert Guidance</h3>
          <p>Gain insights from world-class instructors with years of industry experience. Get personalized feedback and mentorship to master any topic.</p>
        </Link>
        <Link to="/category/career-growth" className="feature-card hover-lift">
          <div className="feature-icon">🚀</div>
          <h3>Career Growth</h3>
          <p>Unlock new opportunities with industry-recognized certifications. Join a community of achievers and accelerate your professional journey.</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;