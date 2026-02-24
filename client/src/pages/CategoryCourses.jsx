import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as courseService from '../services/course.service';
import './CategoryCourses.css';

const CategoryCourses = () => {
    const { categoryName } = useParams();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFilteredCourses();
    }, [categoryName]);

    const fetchFilteredCourses = async () => {
        try {
            setLoading(true);
            // Mapping display name to potential backend categories/keywords
            const categoryMap = {
                'learn-anywhere': 'Mobile',
                'expert-guidance': 'Advanced',
                'career-growth': 'Professional'
            };

            const targetCategory = categoryMap[categoryName] || categoryName;
            const data = await courseService.getAllCourses({ category: targetCategory });

            if (data.success) {
                setCourses(data.courses);
            }
        } catch (error) {
            console.error("Error fetching filtered courses:", error);
        } finally {
            setLoading(false);
        }
    };

    const getDisplayName = (name) => {
        return name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    return (
        <div className="category-container animate-fade-in">
            <header className="category-header">
                <Link to="/" className="back-link">← Back to Home</Link>
                <h1>Courses for <span>{getDisplayName(categoryName)}</span></h1>
                <p>Explore our handpicked selection of courses designed for your success.</p>
            </header>

            {loading ? (
                <div className="loader-container">
                    <div className="premium-loader"></div>
                    <p>Curating courses for you...</p>
                </div>
            ) : (
                <div className="courses-grid">
                    {courses.length > 0 ? (
                        courses.map((course) => (
                            <div key={course._id} className="course-card-premium hover-lift">
                                <div className="course-badge">{course.category}</div>
                                <h3 className="course-title">{course.title}</h3>
                                <p className="course-description">{course.description.substring(0, 100)}...</p>
                                <div className="course-footer">
                                    <span className="course-price">₹{course.price}</span>
                                    <Link to={`/course/${course._id}`} className="view-btn">View Details</Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-state">
                            <div className="empty-icon">📂</div>
                            <h3>No courses found in this category</h3>
                            <p>We're currently updating our catalog. Check back soon for new additions!</p>
                            <Link to="/dashboard" className="explore-btn">Explore All Courses</Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CategoryCourses;
