import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">CGPA Calculator</h1>
        <p className="home-subtitle">Calculate your semester GPA or overall CGPA easily</p>
        
        <div className="cards-container">
          <div className="card" onClick={() => navigate('/semester-gpa')}>
            <div className="card-icon">📚</div>
            <h2 className="card-title">Current Semester GPA</h2>
            <p className="card-description">
              Calculate your GPA for the current semester based on subject grades and credits
            </p>
            <button className="card-button">Calculate GPA →</button>
          </div>

          <div className="card" onClick={() => navigate('/overall-cgpa')}>
            <div className="card-icon">🎓</div>
            <h2 className="card-title">Overall CGPA</h2>
            <p className="card-description">
              Calculate your cumulative CGPA across all semesters
            </p>
            <button className="card-button">Calculate CGPA →</button>
          </div>
        </div>

        <div className="grade-legend">
          <h3>Grade Points Legend</h3>
          <div className="legend-items">
            <span className="legend-item">O: 10</span>
            <span className="legend-item">A+: 9</span>
            <span className="legend-item">A: 8</span>
            <span className="legend-item">B+: 7</span>
            <span className="legend-item">B: 6</span>
            <span className="legend-item">C: 5</span>
            <span className="legend-item">P: 4</span>
            <span className="legend-item">F: 0</span>
          </div>
        </div>

        <footer className="home-footer">
          Made for students 🎓
        </footer>
      </div>
    </div>
  );
}

export default Home;
