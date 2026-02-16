import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Dashboard.css"; 

const Dashboard = () => {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState("overview");
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);

  // 1. DATA STATE (Starts Empty)
  const [courses, setCourses] = useState([]); 
  const [studentsList, setStudentsList] = useState([]);

  // 2. SEARCH STATE
  const [searchTerm, setSearchTerm] = useState("");

  // 3. SETTINGS & ROLE STATE (New!)
  const [settings, setSettings] = useState({
    adminName: "Admin User",
    email: "admin@college.com",
    notifications: true,
    isAdmin: true // <--- NEW: Controls if you are Admin or User
  });

  // 4. FORM STATE
  const [newCourse, setNewCourse] = useState({ title: "", students: "", status: "Active" });
  const [newStudent, setNewStudent] = useState({ name: "", email: "", enrolled: "" });

  // --- ACTIONS ---

  // Delete Handlers (Only work if isAdmin is true)
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
      students: newCourse.students,
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
    alert(`Settings Saved!\nRole: ${settings.isAdmin ? "Admin" : "User"}\nNotifications: ${settings.notifications ? "On" : "Off"}`);
  };

  return (
    <div className="dashboard-container">
      {/* --- SIDEBAR --- */}
      <aside className="sidebar">
        <div className="sidebar-header">
           {settings.isAdmin ? "Admin Panel" : "Student Panel"}
        </div>
        <ul className="sidebar-menu">
          <li className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>Overview</li>
          <li className={activeTab === 'courses' ? 'active' : ''} onClick={() => setActiveTab('courses')}>My Courses</li>
          <li className={activeTab === 'students' ? 'active' : ''} onClick={() => setActiveTab('students')}>Students</li>
          <li className={activeTab === 'reports' ? 'active' : ''} onClick={() => setActiveTab('reports')}>Reports</li>
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
              {/* Only Admin can see Add Button */}
              {settings.isAdmin && (
                  <button className="add-course-btn" onClick={() => setShowCourseModal(true)}>+ Add New Course</button>
              )}
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
                        <td>
                            {/* Only Admin can see Delete Button */}
                            {settings.isAdmin ? (
                                <button className="delete-btn" onClick={() => handleDeleteCourse(course.id)}>Delete</button>
                            ) : (
                                <span style={{color: '#999', fontSize: '0.8rem'}}>View Only</span>
                            )}
                        </td>
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
              {settings.isAdmin && (
                  <button className="add-course-btn" onClick={() => setShowStudentModal(true)}>+ Add New Student</button>
              )}
            </header>

            <div style={{ marginBottom: '20px' }}>
                <input 
                    type="text" 
                    placeholder="Search students..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ padding: '12px', width: '100%', maxWidth: '400px', border: '1px solid #ddd', borderRadius: '5px' }}
                />
            </div>

            <section className="course-list">
              <table>
                <thead>
                  <tr><th>Name</th><th>Email</th><th>Enrolled In</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {studentsList.filter(student => student.name.toLowerCase().includes(searchTerm.toLowerCase())).length > 0 ? (
                    studentsList
                        .filter(student => student.name.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((student) => (
                        <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.enrolled}</td>
                            <td>
                                {settings.isAdmin ? (
                                    <button className="delete-btn" onClick={() => handleDeleteStudent(student.id)}>Remove</button>
                                ) : (
                                    <span style={{color: '#999', fontSize: '0.8rem'}}>View Only</span>
                                )}
                            </td>
                        </tr>
                    ))
                  ) : (
                     <tr><td colSpan="4" style={{textAlign:"center"}}>No students found.</td></tr>
                  )}
                </tbody>
              </table>
            </section>
          </>
        )}

        {/* VIEW 4: REPORTS (NEW MODULE) */}
        {activeTab === 'reports' && (
          <>
             <header className="dashboard-header"><h2>System Reports</h2></header>
             <div className="reports-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                
                <div className="stat-card" style={{ textAlign: 'left' }}>
                    <h3>📊 Enrollment Report</h3>
                    <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '15px' }}>Download a detailed list of all students.</p>
                    <button className="save-btn" onClick={() => alert("Downloading Enrollment_Report.csv...")}>Download CSV</button>
                </div>

                <div className="stat-card" style={{ textAlign: 'left' }}>
                    <h3>📈 Course Analytics</h3>
                    <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '15px' }}>Top Performing Courses:</p>
                    <div style={{ display: 'flex', alignItems: 'flex-end', height: '60px', gap: '10px', marginBottom: '10px' }}>
                        <div style={{ width: '30%', height: '60%', background: '#007bff', borderRadius: '4px' }}></div>
                        <div style={{ width: '30%', height: '80%', background: '#28a745', borderRadius: '4px' }}></div>
                        <div style={{ width: '30%', height: '40%', background: '#ffc107', borderRadius: '4px' }}></div>
                    </div>
                </div>

                <div className="stat-card" style={{ textAlign: 'left' }}>
                    <h3>🛡️ Audit Logs</h3>
                    <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem', color: '#555' }}>
                        <li style={{ borderBottom: '1px solid #eee', padding: '5px 0' }}>• Admin logged in (Just now)</li>
                        <li style={{ borderBottom: '1px solid #eee', padding: '5px 0' }}>• System check complete</li>
                    </ul>
                </div>

             </div>
          </>
        )}

        {/* VIEW 5: SETTINGS (With Role Toggle) */}
        {activeTab === 'settings' && (
          <>
             <header className="dashboard-header"><h2>System Settings</h2></header>
             <div style={{ background: 'white', padding: '30px', borderRadius: '8px', maxWidth: '600px' }}>
                <form onSubmit={handleSaveSettings}>
                  
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Admin Name</label>
                    <input type="text" name="adminName" value={settings.adminName} onChange={handleSettingsChange}
                      style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }} />
                  </div>

                  {/* ROLE TOGGLE (For Demo) */}
                  <div style={{ marginBottom: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '5px', border: '1px solid #e9ecef' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#dc3545' }}>⚠️ Role Simulation (For Demo)</label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input type="checkbox" name="isAdmin" checked={settings.isAdmin} onChange={handleSettingsChange}
                        style={{ marginRight: '10px', width: '20px', height: '20px' }} />
                        <label>Simulate Admin Mode (Uncheck to view as Student)</label>
                    </div>
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