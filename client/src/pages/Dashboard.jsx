import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Dashboard.css"; 

const Dashboard = () => {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState("overview");
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);

  // 1. DATA STATE (NOW EMPTY INITIALLY)
  const [courses, setCourses] = useState([]); 
  const [studentsList, setStudentsList] = useState([]);

  // 2. SETTINGS STATE (NEW)
  const [settings, setSettings] = useState({
    adminName: "Admin User",
    email: "admin@college.com",
    notifications: true
  });

  // 3. FORM STATE
  const [newCourse, setNewCourse] = useState({ title: "", students: "", status: "Active" });
  const [newStudent, setNewStudent] = useState({ name: "", email: "", enrolled: "" });

  // --- ACTIONS ---

  // Delete Handlers
  const handleDeleteCourse = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const handleDeleteStudent = (id) => {
    setStudentsList(studentsList.filter((student) => student.id !== id));
  };

  // Add Course Handler
  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!newCourse.title || !newCourse.students) return alert("Please fill in all fields");

    const courseToAdd = {
      id: Date.now(),
      title: newCourse.title,
      students: newCourse.students, // This is just 'Capacity' or 'Seats'
      status: newCourse.status
    };
    setCourses([...courses, courseToAdd]);
    setShowCourseModal(false);
    setNewCourse({ title: "", students: "", status: "Active" });
  };

  // Add Student Handler
  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.email || !newStudent.enrolled) return alert("Please fill in all fields");

    const studentToAdd = {
      id: Date.now(),
      name: newStudent.name,
      email: newStudent.email,
      enrolled: newStudent.enrolled
    };

    setStudentsList([...studentsList, studentToAdd]);
    setShowStudentModal(false);
    setNewStudent({ name: "", email: "", enrolled: "" });
  };

  // Settings Handler
  const handleSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    alert(`Settings Saved!\nName: ${settings.adminName}\nEmail: ${settings.email}\nNotifications: ${settings.notifications ? "On" : "Off"}`);
  };

  return (
    <div className="dashboard-container">
      {/* --- SIDEBAR --- */}
      <aside className="sidebar">
        <div className="sidebar-header">Admin Panel</div>
        <ul className="sidebar-menu">
          <li className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>Overview</li>
          <li className={activeTab === 'courses' ? 'active' : ''} onClick={() => setActiveTab('courses')}>My Courses</li>
          <li className={activeTab === 'students' ? 'active' : ''} onClick={() => setActiveTab('students')}>Students</li>
          <li className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>Settings</li>
        </ul>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="dashboard-content">
        
        {/* VIEW 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <>
            <header className="dashboard-header"><h2>Dashboard Overview</h2></header>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Courses</h3>
                <p>{courses.length}</p>
              </div>
              <div className="stat-card">
                <h3>Total Students</h3>
                <p>{studentsList.length}</p>
              </div>
            </div>
            {/* Empty State Message if no data */}
            {courses.length === 0 && (
              <div style={{ textAlign: 'center', marginTop: '50px', color: '#666' }}>
                <p>No courses found. Go to "My Courses" to add one!</p>
              </div>
            )}
          </>
        )}

        {/* VIEW 2: MY COURSES */}
        {activeTab === 'courses' && (
          <>
            <header className="dashboard-header">
              <h2>Manage Courses</h2>
              <button className="add-course-btn" onClick={() => setShowCourseModal(true)}>+ Add New Course</button>
            </header>
            <section className="course-list">
              <table>
                <thead>
                  <tr><th>Course Title</th><th>Capacity</th><th>Status</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {courses.length > 0 ? (
                    courses.map((course) => (
                      <tr key={course.id}>
                        <td><Link to={`/course/${course.id}`} className="course-link">{course.title}</Link></td>
                        <td>{course.students}</td>
                        <td><span className={`status ${course.status.toLowerCase()}`}>{course.status}</span></td>
                        <td><button className="delete-btn" onClick={() => handleDeleteCourse(course.id)}>Delete</button></td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="4" style={{textAlign:"center"}}>No courses added yet.</td></tr>
                  )}
                </tbody>
              </table>
            </section>
          </>
        )}

        {/* VIEW 3: STUDENTS */}
        {activeTab === 'students' && (
          <>
            <header className="dashboard-header">
              <h2>Enrolled Students</h2>
              <button className="add-course-btn" onClick={() => setShowStudentModal(true)}>+ Add New Student</button>
            </header>
            <section className="course-list">
              <table>
                <thead>
                  <tr><th>Name</th><th>Email</th><th>Enrolled In</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {studentsList.length > 0 ? (
                    studentsList.map((student) => (
                      <tr key={student.id}>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>{student.enrolled}</td>
                        <td><button className="delete-btn" onClick={() => handleDeleteStudent(student.id)}>Remove</button></td>
                      </tr>
                    ))
                  ) : (
                     <tr><td colSpan="4" style={{textAlign:"center"}}>No students enrolled yet.</td></tr>
                  )}
                </tbody>
              </table>
            </section>
          </>
        )}

        {/* VIEW 4: SETTINGS (NEW FUNCTIONALITY) */}
        {activeTab === 'settings' && (
          <>
             <header className="dashboard-header"><h2>Admin Settings</h2></header>
             <div style={{ background: 'white', padding: '30px', borderRadius: '8px', maxWidth: '600px' }}>
                <form onSubmit={handleSaveSettings}>
                  
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Admin Name</label>
                    <input 
                      type="text" 
                      name="adminName" 
                      value={settings.adminName} 
                      onChange={handleSettingsChange}
                      style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
                    />
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Email Address</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={settings.email} 
                      onChange={handleSettingsChange}
                      style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
                    />
                  </div>

                  <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                    <input 
                      type="checkbox" 
                      name="notifications" 
                      checked={settings.notifications} 
                      onChange={handleSettingsChange}
                      style={{ marginRight: '10px', width: '20px', height: '20px' }}
                    />
                    <label>Enable Email Notifications</label>
                  </div>

                  <button type="submit" className="save-btn">Save Settings</button>
                </form>
             </div>
          </>
        )}

        {/* --- MODAL 1: ADD COURSE --- */}
        {showCourseModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Add New Course</h3>
              <form onSubmit={handleAddCourse}>
                <input type="text" placeholder="Course Title" required onChange={(e) => setNewCourse({...newCourse, title: e.target.value})} />
                <input type="number" placeholder="Max Capacity" required onChange={(e) => setNewCourse({...newCourse, students: e.target.value})} />
                <select onChange={(e) => setNewCourse({...newCourse, status: e.target.value})}>
                  <option value="Active">Active</option>
                  <option value="Upcoming">Upcoming</option>
                </select>
                <div className="modal-actions">
                  <button type="submit" className="save-btn">Save Course</button>
                  <button type="button" className="cancel-btn" onClick={() => setShowCourseModal(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* --- MODAL 2: ADD STUDENT --- */}
        {showStudentModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Register New Student</h3>
              <form onSubmit={handleAddStudent}>
                <input type="text" placeholder="Student Name" required onChange={(e) => setNewStudent({...newStudent, name: e.target.value})} />
                <input type="email" placeholder="Student Email" required onChange={(e) => setNewStudent({...newStudent, email: e.target.value})} />
                
                <select required onChange={(e) => setNewStudent({...newStudent, enrolled: e.target.value})}>
                  <option value="">Select Course</option>
                  {courses.length > 0 ? (
                    courses.map(course => (
                      <option key={course.id} value={course.title}>{course.title}</option>
                    ))
                  ) : (
                    <option disabled>No courses available</option>
                  )}
                </select>

                <div className="modal-actions">
                  <button type="submit" className="save-btn" disabled={courses.length === 0}>Add Student</button>
                  <button type="button" className="cancel-btn" onClick={() => setShowStudentModal(false)}>Cancel</button>
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