import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Dashboard.css"; 

const Dashboard = () => {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState("overview"); // Tracks the current sidebar tab
  const [showModal, setShowModal] = useState(false);
  
  // Courses Data
  const [courses, setCourses] = useState([
    { id: 1, title: "Full Stack Web Development", students: 120, status: "Active" },
    { id: 2, title: "Python for Data Science", students: 85, status: "Active" },
    { id: 3, title: "Introduction to DevOps", students: 40, status: "Upcoming" },
  ]);

  // Students Data (Fake data for the Students tab)
  const studentsList = [
    { id: 101, name: "Rahul Sharma", email: "rahul@example.com", enrolled: "Full Stack" },
    { id: 102, name: "Priya Verma", email: "priya@example.com", enrolled: "DevOps" },
    { id: 103, name: "Amit Singh", email: "amit@example.com", enrolled: "Python" },
  ];

  const [newCourse, setNewCourse] = useState({ title: "", students: "", status: "Active" });

  // --- ACTIONS ---
  const handleDelete = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!newCourse.title || !newCourse.students) return alert("Please fill in all fields");
    const courseToAdd = {
      id: Date.now(),
      title: newCourse.title,
      students: newCourse.students,
      status: newCourse.status
    };
    setCourses([...courses, courseToAdd]);
    setShowModal(false);
    setNewCourse({ title: "", students: "", status: "Active" });
  };

  return (
    <div className="dashboard-container">
      {/* --- SIDEBAR --- */}
      <aside className="sidebar">
        <div className="sidebar-header">Admin Panel</div>
        <ul className="sidebar-menu">
          <li 
            className={activeTab === 'overview' ? 'active' : ''} 
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </li>
          <li 
            className={activeTab === 'courses' ? 'active' : ''} 
            onClick={() => setActiveTab('courses')}
          >
            My Courses
          </li>
          <li 
            className={activeTab === 'students' ? 'active' : ''} 
            onClick={() => setActiveTab('students')}
          >
            Students
          </li>
          <li 
            className={activeTab === 'settings' ? 'active' : ''} 
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </li>
        </ul>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="dashboard-content">
        
        {/* VIEW: OVERVIEW */}
        {activeTab === 'overview' && (
          <>
            <header className="dashboard-header">
              <h2>Dashboard Overview</h2>
            </header>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Courses</h3>
                <p>{courses.length}</p>
              </div>
              <div className="stat-card">
                <h3>Total Students</h3>
                <p>{courses.reduce((acc, curr) => acc + Number(curr.students), 0)}</p>
              </div>
            </div>
            {/* Show a preview of courses in Overview */}
            <section className="course-list">
              <h3>Recent Activity</h3>
              <table>
                <thead>
                  <tr><th>Course Title</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {courses.slice(0, 3).map((course) => (
                    <tr key={course.id}>
                      <td>{course.title}</td>
                      <td><span className={`status ${course.status.toLowerCase()}`}>{course.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </>
        )}

        {/* VIEW: MY COURSES */}
        {activeTab === 'courses' && (
          <>
            <header className="dashboard-header">
              <h2>Manage Courses</h2>
              <button className="add-course-btn" onClick={() => setShowModal(true)}>+ Add New Course</button>
            </header>
            <section className="course-list">
              <table>
                <thead>
                  <tr>
                    <th>Course Title</th>
                    <th>Students</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.id}>
                      <td>
                        <Link to={`/course/${course.id}`} className="course-link">{course.title}</Link>
                      </td>
                      <td>{course.students}</td>
                      <td><span className={`status ${course.status.toLowerCase()}`}>{course.status}</span></td>
                      <td>
                        <button className="delete-btn" onClick={() => handleDelete(course.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </>
        )}

        {/* VIEW: STUDENTS */}
        {activeTab === 'students' && (
          <>
            <header className="dashboard-header">
              <h2>Enrolled Students</h2>
            </header>
            <section className="course-list">
              <table>
                <thead>
                  <tr><th>Name</th><th>Email</th><th>Enrolled In</th></tr>
                </thead>
                <tbody>
                  {studentsList.map((student) => (
                    <tr key={student.id}>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.enrolled}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </>
        )}

        {/* VIEW: SETTINGS */}
        {activeTab === 'settings' && (
          <>
            <header className="dashboard-header">
              <h2>Admin Settings</h2>
            </header>
            <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
              <h3>Profile Settings</h3>
              <form>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Admin Name</label>
                  <input type="text" defaultValue="Aaditya" style={{ width: '100%', padding: '8px', border: '1px solid #ddd' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
                  <input type="email" defaultValue="admin@college.com" style={{ width: '100%', padding: '8px', border: '1px solid #ddd' }} />
                </div>
                <button type="button" className="save-btn">Update Profile</button>
              </form>
            </div>
          </>
        )}

        {/* --- MODAL FOR ADDING COURSES (Same as before) --- */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Add New Course</h3>
              <form onSubmit={handleAddCourse}>
                <input type="text" placeholder="Course Title" required onChange={(e) => setNewCourse({...newCourse, title: e.target.value})} />
                <input type="number" placeholder="Students" required onChange={(e) => setNewCourse({...newCourse, students: e.target.value})} />
                <select onChange={(e) => setNewCourse({...newCourse, status: e.target.value})}>
                  <option value="Active">Active</option>
                  <option value="Upcoming">Upcoming</option>
                </select>
                <div className="modal-actions">
                  <button type="submit" className="save-btn">Save</button>
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