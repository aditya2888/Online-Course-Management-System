import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as courseService from '../services/course.service';
import "./CourseDetails.css";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourseDetails();
  }, [id]);

  const fetchCourseDetails = async () => {
    try {
      setLoading(true);
      const data = await courseService.getCourse(id);
      if (data.success) {
        setCourse(data.course);
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="details-container"><div className="loader">Loading...</div></div>;
  if (!course) return <div className="details-container"><div className="error">Course not found</div></div>;

  return (
    <div className="details-container">
      <div className="details-card animate-fade-in">
        <Link to="/dashboard" className="back-btn">← Back to Dashboard</Link>

        <div className="course-header">
          <h1>{course.title}</h1>
          <span className="badge">{course.status}</span>
        </div>

        <div className="course-info">
          <p><strong>Instructor:</strong> {course.instructor?.name}</p>
          <p><strong>Category:</strong> {course.category}</p>
          <p><strong>Price:</strong> ₹{course.price}</p>
          <p><strong>Max Capacity:</strong> {course.capacity} students</p>
        </div>

        <div className="course-description">
          <h3>About this Course</h3>
          <p>{course.description}</p>
        </div>

        <div className="course-actions">
          <button className="enroll-btn-premium">View Syllabus</button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;