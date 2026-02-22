import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { calculateSemesterGPA } from '../services/api';
import './SemesterGPA.css';

const GRADES = ['O', 'A+', 'A', 'B+', 'B', 'C', 'P', 'F'];

function SemesterGPA() {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([
    { name: '', credits: '', grade: '' }
  ]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addSubject = () => {
    setSubjects([...subjects, { name: '', credits: '', grade: '' }]);
    setResult(null);
    setError('');
  };

  const removeSubject = (index) => {
    if (subjects.length > 1) {
      const newSubjects = subjects.filter((_, i) => i !== index);
      setSubjects(newSubjects);
      setResult(null);
      setError('');
    }
  };

  const updateSubject = (index, field, value) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = value;
    setSubjects(newSubjects);
    setResult(null);
    setError('');
  };

  const validateInputs = () => {
    for (let i = 0; i < subjects.length; i++) {
      const subject = subjects[i];
      if (!subject.name.trim()) {
        setError(`Subject ${i + 1}: Name is required`);
        return false;
      }
      if (!subject.credits || parseFloat(subject.credits) <= 0) {
        setError(`Subject ${i + 1}: Credits must be a positive number`);
        return false;
      }
      if (!subject.grade) {
        setError(`Subject ${i + 1}: Grade is required`);
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
      const subjectsData = subjects.map(s => ({
        credits: parseFloat(s.credits),
        grade: s.grade
      }));

      const data = await calculateSemesterGPA(subjectsData);
      setResult(data);
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Failed to calculate GPA. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubjects([{ name: '', credits: '', grade: '' }]);
    setResult(null);
    setError('');
  };

  const isFormValid = subjects.every(s => s.name.trim() && s.credits && parseFloat(s.credits) > 0 && s.grade);

  return (
    <div className="page-container">
      <div className="page-content">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back to Home
        </button>

        <h1 className="page-title">Semester GPA Calculator</h1>
        <p className="page-description">Enter your subjects, credits, and grades to calculate your semester GPA</p>

        {error && <div className="error-message">{error}</div>}
        {result && (
          <div className="result-card">
            <h2>Your Semester GPA</h2>
            <div className="result-value">{result.gpa}</div>
            <p className="result-credits">Total Credits: {result.total_credits}</p>
          </div>
        )}

        <div className="subjects-container">
          {subjects.map((subject, index) => (
            <div key={index} className="subject-card">
              <div className="subject-header">
                <h3>Subject {index + 1}</h3>
                {subjects.length > 1 && (
                  <button
                    className="remove-button"
                    onClick={() => removeSubject(index)}
                    type="button"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="input-group">
                <label>Subject Name</label>
                <input
                  type="text"
                  placeholder="e.g., Data Structures"
                  value={subject.name}
                  onChange={(e) => updateSubject(index, 'name', e.target.value)}
                />
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label>Credits</label>
                  <input
                    type="number"
                    placeholder="4"
                    min="0"
                    step="0.5"
                    value={subject.credits}
                    onChange={(e) => updateSubject(index, 'credits', e.target.value)}
                  />
                </div>

                <div className="input-group">
                  <label>Grade</label>
                  <select
                    value={subject.grade}
                    onChange={(e) => updateSubject(index, 'grade', e.target.value)}
                  >
                    <option value="">Select Grade</option>
                    {GRADES.map(grade => (
                      <option key={grade} value={grade}>{grade}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="button-group">
          <button className="add-button" onClick={addSubject} type="button">
            + Add Subject
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
            {loading ? 'Calculating...' : 'Calculate GPA'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SemesterGPA;
