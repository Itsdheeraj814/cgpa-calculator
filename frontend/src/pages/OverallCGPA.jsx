import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { calculateCGPA } from '../services/api';
import './OverallCGPA.css';

function OverallCGPA() {
  const navigate = useNavigate();
  const [semesters, setSemesters] = useState([
    { gpa: '', credits: '' }
  ]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addSemester = () => {
    setSemesters([...semesters, { gpa: '', credits: '' }]);
    setResult(null);
    setError('');
  };

  const removeSemester = (index) => {
    if (semesters.length > 1) {
      const newSemesters = semesters.filter((_, i) => i !== index);
      setSemesters(newSemesters);
      setResult(null);
      setError('');
    }
  };

  const updateSemester = (index, field, value) => {
    const newSemesters = [...semesters];
    newSemesters[index][field] = value;
    setSemesters(newSemesters);
    setResult(null);
    setError('');
  };

  const validateInputs = () => {
    for (let i = 0; i < semesters.length; i++) {
      const semester = semesters[i];
      const gpa = parseFloat(semester.gpa);
      const credits = parseFloat(semester.credits);

      if (!semester.gpa || isNaN(gpa)) {
        setError(`Semester ${i + 1}: GPA is required`);
        return false;
      }
      if (gpa < 0 || gpa > 10) {
        setError(`Semester ${i + 1}: GPA must be between 0 and 10`);
        return false;
      }
      if (!semester.credits || isNaN(credits) || credits <= 0) {
        setError(`Semester ${i + 1}: Credits must be a positive number`);
        return false;
      }
    }
    return true;
  };

  const handleCalculate = async () => {
    setError('');
    setResult(null);

    if (!validateInputs()) {
      return;
    }

    setLoading(true);
    try {
      const semestersData = semesters.map(s => ({
        gpa: parseFloat(s.gpa),
        credits: parseFloat(s.credits)
      }));

      const data = await calculateCGPA(semestersData);
      setResult(data);
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Failed to calculate CGPA. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSemesters([{ gpa: '', credits: '' }]);
    setResult(null);
    setError('');
  };

  const isFormValid = semesters.every(s => {
    const gpa = parseFloat(s.gpa);
    const credits = parseFloat(s.credits);
    return s.gpa && !isNaN(gpa) && gpa >= 0 && gpa <= 10 && s.credits && !isNaN(credits) && credits > 0;
  });

  return (
    <div className="page-container">
      <div className="page-content">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back to Home
        </button>

        <h1 className="page-title">Overall CGPA Calculator</h1>
        <p className="page-description">Enter your semester GPAs and credits to calculate your overall CGPA</p>

        {error && <div className="error-message">{error}</div>}
        {result && (
          <div className="result-card">
            <h2>Your Overall CGPA</h2>
            <div className="result-value">{result.cgpa}</div>
            <p className="result-credits">Total Credits: {result.total_credits}</p>
          </div>
        )}

        <div className="semesters-container">
          {semesters.map((semester, index) => (
            <div key={index} className="semester-card">
              <div className="semester-header">
                <h3>Semester {index + 1}</h3>
                {semesters.length > 1 && (
                  <button
                    className="remove-button"
                    onClick={() => removeSemester(index)}
                    type="button"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label>Semester GPA</label>
                  <input
                    type="number"
                    placeholder="8.5"
                    min="0"
                    max="10"
                    step="0.01"
                    value={semester.gpa}
                    onChange={(e) => updateSemester(index, 'gpa', e.target.value)}
                  />
                  <span className="input-hint">Range: 0 - 10</span>
                </div>

                <div className="input-group">
                  <label>Semester Credits</label>
                  <input
                    type="number"
                    placeholder="24"
                    min="0"
                    step="0.5"
                    value={semester.credits}
                    onChange={(e) => updateSemester(index, 'credits', e.target.value)}
                  />
                  <span className="input-hint">Total credits earned</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="button-group">
          <button className="add-button" onClick={addSemester} type="button">
            + Add Semester
          </button>
          <button className="reset-button" onClick={handleReset} type="button">
            Reset
          </button>
          <button
            className="calculate-button"
            onClick={handleCalculate}
            disabled={!isFormValid || loading}
            type="button"
          >
            {loading ? 'Calculating...' : 'Calculate CGPA'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default OverallCGPA;
