import React from 'react';
import "./Dashboard.css"; // We will style this next

const Dashboard = () => {
  // Fake data to simulate a database response
  const courses = [
    { id: 1, title: "Full Stack Web Development", students: 120, status: "Active" },
    { id: 2, title: "Python for Data Science", students: 85, status: "Active" },
    { id: 3, title: "Introduction to DevOps", students: 40, status: "Upcoming" },
  ];

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
          <button className="add-course-btn">+ Add New Course</button>
        </header>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Courses</h3>
            <p>3</p>
          </div>
          <div className="stat-card">
            <h3>Total Students</h3>
            <p>245</p>
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
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.title}</td>
                  <td>{course.students}</td>
                  <td>
                    <span className={`status ${course.status.toLowerCase()}`}>
                      {course.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;