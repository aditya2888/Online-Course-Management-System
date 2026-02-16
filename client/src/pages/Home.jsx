import React from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>Streamline Your College <br /> <span className="highlight">Course Management</span></h1>
          <p>
            The ultimate admin tool for managing courses, tracking student enrollments, 
            and organizing academic data in one secure dashboard.
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-primary">Get Started</Link>
            <Link to="/login" className="btn btn-secondary">Admin Login</Link>
          </div>
        </div>
        <div className="hero-image">
           {/* You can replace this with a screenshot of your actual dashboard later */}
           <div className="placeholder-dashboard">
              <div className="screen-header"></div>
              <div className="screen-body">
                <div className="bar"></div>
                <div className="bar short"></div>
                <div className="grid">
                  <div className="box"></div>
                  <div className="box"></div>
                  <div className="box"></div>
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features">
        <h2>Why Use This System?</h2>
        <div className="feature-grid">
          
          <div className="feature-card">
            <div className="icon">📚</div>
            <h3>Course Management</h3>
            <p>Easily create, update, and delete courses. Set status to Active or Upcoming with a single click.</p>
          </div>

          <div className="feature-card">
            <div className="icon">👨‍🎓</div>
            <h3>Student Tracking</h3>
            <p>Register new students, assign them to courses, and manage their enrollment data efficiently.</p>
          </div>

          <div className="feature-card">
            <div className="icon">🔍</div>
            <h3>Instant Search</h3>
            <p>Find any student or course in seconds with our real-time search and filter functionality.</p>
          </div>

          <div className="feature-card">
            <div className="icon">⚙️</div>
            <h3>Admin Control</h3>
            <p>Full administrative control over platform settings, user data, and system configurations.</p>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>&copy; 2026 Online Course Management System. All rights reserved.</p>
      </footer>

    </div>
  );
};

export default Home;