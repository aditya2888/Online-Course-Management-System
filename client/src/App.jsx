import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CourseDetails from './pages/CourseDetails';
import ProtectedRoute from './components/ProtectedRoute'; // <--- Import this!

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* PROTECTED ROUTE: User MUST be logged in to see Dashboard */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* PROTECTED ROUTE: User MUST be logged in to see Course Details */}
          <Route 
            path="/course/:id" 
            element={
              <ProtectedRoute>
                <CourseDetails />
              </ProtectedRoute>
            } 
          /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;