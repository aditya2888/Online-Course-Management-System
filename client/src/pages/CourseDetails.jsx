import React from 'react';
import { useParams, Link } from 'react-router-dom';
import "./CourseDetails.css";

const CourseDetails = () => {
  const { id } = useParams(); // Get the ID from the URL (e.g., 1, 2, or 3)

  // Fake database of courses
  const courseData = {
    1: { title: "Full Stack Web Development", instructor: "Dr. Angela Yu", duration: "12 Weeks", description: "Learn React, Node.js, and MongoDB from scratch. Perfect for beginners." },
    2: { title: "Python for Data Science", instructor: "Prof. Andrew Ng", duration: "8 Weeks", description: "Master Python libraries like Pandas, NumPy, and Scikit-Learn." },
    3: { title: "Introduction to DevOps", instructor: "Jane Doe", duration: "6 Weeks", description: "Understand CI/CD pipelines, Docker, Kubernetes, and Cloud Architecture." }
  };

  // Select the course based on the ID, or show a default message if not found
  const course = courseData[id] || { title: "Course Not Found", instructor: "N/A", description: "This course does not exist." };

  return (
    <div className="details-container">
      <div className="details-card">
        <Link to="/dashboard" className="back-btn">← Back to Dashboard</Link>
        
        <div className="course-header">
          <h1>{course.title}</h1>
          <span className="badge">Active</span>
        </div>

        <div className="course-info">
          <p><strong>Instructor:</strong> {course.instructor}</p>
          <p><strong>Duration:</strong> {course.duration}</p>
        </div>

        <div className="course-description">
          <h3>About this Course</h3>
          <p>{course.description}</p>
        </div>

        <button className="enroll-btn">View Syllabus</button>
      </div>
    </div>
  );
};

export default CourseDetails;