import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Dashboard.css"; 

const Dashboard = () => {
  // 1. STATE: We move the data into 'useState' so we can change it
  const [courses, setCourses] = useState([
    { id: 1, title: "Full Stack Web Development", students: 120, status: "Active" },
    { id: 2, title: "Python for Data Science", students: 85, status: "Active" },
    { id: 3, title: "Introduction to DevOps", students: 40, status: "Upcoming" },
  ]);

  // 2. STATE: Controls if the "Add Course" popup is visible
  const [showModal, setShowModal] = useState(false);
  
  // 3. STATE: Holds the data for the new course being typed
  const [newCourse, setNewCourse] = useState({ title: "", students: "", status: "Active" });

  // FUNCTION: Delete a course
  const handleDelete = (id) => {
    // Keep only the courses that do NOT match the ID we want to delete
    setCourses(courses.filter((course) => course.id !== id));
  };

  // FUNCTION: Handle typing in the form
  const handleInputChange = (e) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };

  // FUNCTION: Add the new course to the list
  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!newCourse.title || !newCourse.students) return alert("Please fill in all fields");

    const courseToAdd = {
      id: courses.length + 1, // Simple ID generation
      title: newCourse.title,
      students: newCourse.students,
      status: newCourse.status
    };

    setCourses([...courses, courseToAdd]); // Add to list
    setShowModal(false); // Close popup
    setNewCourse({ title: "", students: "", status: "Active" }); // Reset form
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar Section */}
      <aside className="sidebar">
        <div className="sidebar-header">Admin Panel</div>
        <ul className="sidebar-menu">
          <li className="active">Overview</li>
          <li>My Courses</li>
          <li>Students</li>
          <li>Settings</li>
        </ul>
      </aside>

      {/* Main Content Section */}
      <main className="dashboard-content">
        <header className="dashboard-header">
          <h2>Dashboard Overview</h2>
          {/* Button now opens the modal */}
          <button className="add-course-btn" onClick={() => setShowModal(true)}>
            + Add New Course
          </button>
        </header>

        {/* Stats Cards (Dynamic: they update when you add courses!) */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Courses</h3>
            <p>{courses.length}</p>
          </div>
          <div className="stat-card">
            <h3>Total Students</h3>
            {/* Calculate total students automatically */}
            <p>{courses.reduce((acc, curr) => acc + Number(curr.students), 0)}</p>
          </div>
        </div>

        {/* Course List Table */}
        <section className="course-list">
          <h3>Recent Courses</h3>
          <table>
            <thead>
              <tr>
                <th>Course Title</th>
                <th>Students Enrolled</th>
                <th>Status</th>
                <th>Action</th> {/* New Column */}
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td>
                    <Link to={`/course/${course.id}`} style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>
                      {course.title}
                    </Link>
                  </td>
                  <td>{course.students}</td>
                  <td>
                    <span className={`status ${course.status.toLowerCase()}`}>
                      {course.status}
                    </span>
                  </td>
                  <td>
                    {/* New Delete Button */}
                    <button className="delete-btn" onClick={() => handleDelete(course.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* POPUP MODAL (Only shows when showModal is true) */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Add New Course</h3>
              <form onSubmit={handleAddCourse}>
                <input 
                  type="text" 
                  name="title" 
                  placeholder="Course Title" 
                  value={newCourse.title}
                  onChange={handleInputChange} 
                  required
                />
                <input 
                  type="number" 
                  name="students" 
                  placeholder="Students Enrolled" 
                  value={newCourse.students}
                  onChange={handleInputChange}
                  required
                />
                <select name="status" value={newCourse.status} onChange={handleInputChange}>
                  <option value="Active">Active</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Completed">Completed</option>
                </select>
                
                <div className="modal-buttons">
                  <button type="submit" className="save-btn">Save Course</button>
                  <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default Dashboard;