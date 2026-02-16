import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'; // <--- Import the new Dashboard!

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          
          {/* NOW we use the real Dashboard component */}
          <Route path="/dashboard" element={<Dashboard />} /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;