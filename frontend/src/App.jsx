import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SemesterGPA from './pages/SemesterGPA';
import OverallCGPA from './pages/OverallCGPA';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/semester-gpa" element={<SemesterGPA />} />
          <Route path="/overall-cgpa" element={<OverallCGPA />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
