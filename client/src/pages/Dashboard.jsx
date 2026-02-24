import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as courseService from '../services/course.service';
import { getCurrentUser, logout } from '../services/auth.service';
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState("overview");
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. DATA STATE
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [studentsList, setStudentsList] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  // 2. SEARCH STATE
  const [searchTerm, setSearchTerm] = useState("");

  // 3. SETTINGS & ROLE STATE
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [settings, setSettings] = useState({
    adminName: currentUser?.name || "User",
    email: currentUser?.email || "",
    notifications: true,
    isAdmin: currentUser?.role === 'admin',
    isInstructor: currentUser?.role === 'instructor'
  });

  // 4. FORM STATE
  const [newCourse, setNewCourse] = useState({ title: "", description: "", category: "", price: 0, capacity: 50 });
  const [newStudent, setNewStudent] = useState({ name: "", email: "", enrolled: "" });

  // --- FETCH DATA ---
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    fetchCourses();
  }, [currentUser]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await courseService.getAllCourses();
      if (data.success) {
        setCourses(data.courses);
        // If student, filter enrolled courses
        if (currentUser?.role === 'student') {
          setEnrolledCourses(data.courses.filter(c => c.studentsEnrolled?.includes(currentUser.id)));
        }
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- ACTIONS ---

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDeleteCourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await courseService.deleteCourse(id);
      setCourses(courses.filter((course) => course._id !== id));
    } catch (error) {
      alert(error.message || "Failed to delete course");
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      const data = await courseService.createCourse(newCourse);
      if (data.success) {
        setCourses([...courses, data.course]);
        setShowCourseModal(false);
        setNewCourse({ title: "", description: "", category: "", price: 0, capacity: 50 });
        showToast("Course created successfully!");
      }
    } catch (error) {
      showToast(error.message || "Failed to add course", "error");
    }
  };

  const handleEnroll = async (id) => {
    try {
      const data = await courseService.enrollInCourse(id);
      if (data.success) {
        setEnrolledCourses([...enrolledCourses, courses.find(c => c._id === id)]);
        showToast("Successfully enrolled in the course!");
        // Refresh local course state to show "Enrolled" instead of button
        setCourses(courses.map(c => c._id === id ? { ...c, studentsEnrolled: [...(c.studentsEnrolled || []), currentUser.id] } : c));
      }
    } catch (error) {
      showToast(error.message || "Failed to enroll", "error");
    }
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    alert(`Settings Saved!`);
  };

  return (
    <div className="dashboard-container animate-fade-in">
      {/* --- SIDEBAR --- */}
      <aside className="sidebar">
        <div className="sidebar-header">
          {settings.isAdmin ? "Admin Panel" : settings.isInstructor ? "Instructor Panel" : "Student Panel"}
        </div>
        <ul className="sidebar-menu">
          <li className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>Overview</li>
          <li className={activeTab === 'courses' ? 'active' : ''} onClick={() => setActiveTab('courses')}>All Courses</li>
          {currentUser?.role === 'student' && (
            <li className={activeTab === 'enrolled' ? 'active' : ''} onClick={() => setActiveTab('enrolled')}>Enrolled Courses</li>
          )}
          {(settings.isAdmin || settings.isInstructor) && (
            <li className={activeTab === 'students' ? 'active' : ''} onClick={() => setActiveTab('students')}>Students</li>
          )}
          <li className={activeTab === 'reports' ? 'active' : ''} onClick={() => setActiveTab('reports')}>Reports</li>
          <li className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>Settings</li>
          <li onClick={handleLogout} style={{ color: '#dc3545', marginTop: '20px', cursor: 'pointer' }}>Logout</li>
        </ul>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="dashboard-content">

        {loading ? (
          <div style={{ textAlign: 'center', marginTop: '100px' }}><h3>Loading...</h3></div>
        ) : (
          <>
            {/* VIEW 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <>
                <header className="dashboard-header"><h2>Dashboard Overview</h2></header>
                <div className="stats-grid">
                  <div className="stat-card">
                    <h3>{currentUser?.role === 'student' ? 'Available Courses' : 'Total Courses'}</h3>
                    <p>{courses.length}</p>
                  </div>
                  {currentUser?.role === 'student' && (
                    <div className="stat-card">
                      <h3>Enrolled Courses</h3>
                      <p>{enrolledCourses.length}</p>
                    </div>
                  )}
                  <div className="stat-card">
                    <h3>Role</h3>
                    <p style={{ textTransform: 'capitalize' }}>{currentUser?.role}</p>
                  </div>
                </div>
                {courses.length === 0 && (
                  <div style={{ textAlign: 'center', marginTop: '50px', color: '#666' }}>
                    <p>No courses found.</p>
                  </div>
                )}
              </>
            )}

            {/* VIEW 2: COURSES */}
            {activeTab === 'courses' && (
              <>
                <header className="dashboard-header">
                  <h2>Available Courses</h2>
                  {(settings.isAdmin || settings.isInstructor) && (
                    <button className="add-course-btn" onClick={() => setShowCourseModal(true)}>+ Add New Course</button>
                  )}
                </header>
                <section className="course-list">
                  <table>
                    <thead>
                      <tr><th>Course Title</th><th>Instructor</th><th>Price</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                      {courses.length > 0 ? (
                        courses.map((course) => {
                          const isEnrolled = course.studentsEnrolled?.includes(currentUser?.id);
                          return (
                            <tr key={course._id}>
                              <td><Link to={`/course/${course._id}`} className="course-link">{course.title}</Link></td>
                              <td>{course.instructor?.name || 'N/A'}</td>
                              <td>₹{course.price}</td>
                              <td>
                                {(settings.isAdmin || (settings.isInstructor && course.instructor?._id === currentUser?.id)) ? (
                                  <button className="delete-btn" onClick={() => handleDeleteCourse(course._id)}>Delete</button>
                                ) : (
                                  <button
                                    className={isEnrolled ? "enrolled-btn" : "save-btn"}
                                    onClick={() => !isEnrolled && handleEnroll(course._id)}
                                    disabled={isEnrolled}
                                  >
                                    {isEnrolled ? "✓ Enrolled" : "Enroll Now"}
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr><td colSpan="4" style={{ textAlign: "center" }}>No courses added yet.</td></tr>
                      )}
                    </tbody>
                  </table>
                </section>
              </>
            )}

            {/* VIEW 3: ENROLLED COURSES */}
            {activeTab === 'enrolled' && (
              <>
                <header className="dashboard-header"><h2>My Enrolled Courses</h2></header>
                <div className="courses-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                  {enrolledCourses.length > 0 ? (
                    enrolledCourses.map((course) => (
                      <div key={course._id} className="course-card-premium hover-lift" style={{ padding: '20px', background: 'white', borderRadius: '12px', boxShadow: 'var(--shadow-md)' }}>
                        <div className="course-badge">{course.category}</div>
                        <h3 style={{ marginTop: '30px' }}>{course.title}</h3>
                        <p style={{ color: '#666', fontSize: '0.9rem', margin: '10px 0' }}>{course.description.substring(0, 80)}...</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                          <span style={{ fontWeight: 'bold' }}>Instructor: {course.instructor?.name}</span>
                          <Link to={`/course/${course._id}`} className="view-btn" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>Go to Course</Link>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '100px 0' }}>
                      <p>You haven't enrolled in any courses yet.</p>
                      <button onClick={() => setActiveTab('courses')} className="save-btn" style={{ marginTop: '20px' }}>Explore Courses</button>
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        )}

        {/* --- MODAL 1: ADD COURSE --- */}
        {showCourseModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Add New Course</h3>
              <form onSubmit={handleAddCourse}>
                <input type="text" placeholder="Course Title" required onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })} />
                <textarea placeholder="Description" required onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })} style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}></textarea>
                <input type="text" placeholder="Category" required onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })} />
                <input type="number" placeholder="Price" required onChange={(e) => setNewCourse({ ...newCourse, price: Number(e.target.value) })} />
                <input type="number" placeholder="Max Capacity" required onChange={(e) => setNewCourse({ ...newCourse, capacity: Number(e.target.value) })} />
                <div className="modal-actions">
                  <button type="submit" className="save-btn">Save Course</button>
                  <button type="button" className="cancel-btn" onClick={() => setShowCourseModal(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* --- TOAST NOTIFICATION --- */}
        {toast.show && (
          <div className={`toast-notification ${toast.type}`}>
            {toast.message}
          </div>
        )}

      </main>
    </div>
  );
};

export default Dashboard;