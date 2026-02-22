# CGPA Calculator - Full Stack Web Application

A modern, student-friendly web application to calculate semester GPA and overall CGPA with an intuitive interface.

## 🎓 Features

- **Semester GPA Calculator**: Calculate GPA based on subjects, credits, and grades
- **Overall CGPA Calculator**: Calculate cumulative CGPA across multiple semesters
- **Grade Points System**: O(10), A+(9), A(8), B+(7), B(6), C(5), P(4), F(0)
- **Responsive Design**: Works seamlessly on mobile and desktop
- **Input Validation**: Client-side and server-side validation
- **Clean UI**: Modern, card-based interface with smooth animations
- **Error Handling**: Clear error messages for invalid inputs

## 🛠️ Tech Stack

### Frontend
- React 18 (Functional Components + Hooks)
- Vite (Build Tool)
- React Router DOM (Navigation)
- Axios (API Integration)
- CSS3 (Styling & Animations)

### Backend
- Python 3.8+
- FastAPI (REST API Framework)
- Pydantic (Data Validation)
- Uvicorn (ASGI Server)

## 📁 Project Structure

```
CGPA/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── requirements.txt     # Python dependencies
│   └── .env.example        # Environment variables template
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Home.jsx            # Home page
    │   │   ├── Home.css
    │   │   ├── SemesterGPA.jsx     # Semester GPA calculator
    │   │   ├── SemesterGPA.css
    │   │   ├── OverallCGPA.jsx     # Overall CGPA calculator
    │   │   └── OverallCGPA.css
    │   ├── services/
    │   │   └── api.js              # API integration
    │   ├── App.jsx                 # Main app component
    │   ├── App.css
    │   ├── main.jsx                # Entry point
    │   └── index.css               # Global styles
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## 🚀 Setup Instructions

### Backend Setup

1. **Navigate to backend directory**
   ```powershell
   cd backend
   ```

2. **Create virtual environment** (recommended)
   ```powershell
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```

3. **Install dependencies**
   ```powershell
   pip install -r requirements.txt
   ```

4. **Run the backend server**
   ```powershell
   python main.py
   ```

   Or using uvicorn directly:
   ```powershell
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

   Backend will be available at: `http://localhost:8000`

5. **Test the API**
   - API Documentation: `http://localhost:8000/docs`
   - Alternative Docs: `http://localhost:8000/redoc`

### Frontend Setup

1. **Navigate to frontend directory** (open new terminal)
   ```powershell
   cd frontend
   ```

2. **Install dependencies**
   ```powershell
   npm install
   ```

3. **Run the development server**
   ```powershell
   npm run dev
   ```

   Frontend will be available at: `http://localhost:5173`

## 📡 API Endpoints

### 1. Calculate Semester GPA
**POST** `/calculate/semester-gpa`

**Request Body:**
```json
{
  "subjects": [
    { "credits": 4, "grade": "A" },
    { "credits": 3, "grade": "B+" },
    { "credits": 3, "grade": "O" }
  ]
}
```

**Response:**
```json
{
  "gpa": 8.3,
  "total_credits": 10
}
```

### 2. Calculate Overall CGPA
**POST** `/calculate/cgpa`

**Request Body:**
```json
{
  "semesters": [
    { "gpa": 8.2, "credits": 24 },
    { "gpa": 7.9, "credits": 22 },
    { "gpa": 8.5, "credits": 26 }
  ]
}
```

**Response:**
```json
{
  "cgpa": 8.21,
  "total_credits": 72
}
```

## 🎯 Usage Guide

### Calculate Semester GPA
1. Click on "Current Semester GPA" card from home page
2. Add subjects with:
   - Subject name
   - Credits (positive number)
   - Grade (O, A+, A, B+, B, C, P, F)
3. Click "Add Subject" to add more subjects
4. Click "Calculate GPA" to see your result
5. Use "Reset" to clear all inputs

### Calculate Overall CGPA
1. Click on "Overall CGPA" card from home page
2. Add semesters with:
   - Semester GPA (0-10)
   - Semester Credits (positive number)
3. Click "Add Semester" to add more semesters
4. Click "Calculate CGPA" to see your result
5. Use "Reset" to clear all inputs

## ✅ Validation Rules

### Semester GPA Calculator
- All fields are required
- Credits must be positive numbers
- Valid grades: O, A+, A, B+, B, C, P, F
- At least one subject required

### Overall CGPA Calculator
- All fields are required
- GPA must be between 0 and 10
- Credits must be positive numbers
- At least one semester required

## 🎨 Features & UI Elements

- ✅ Responsive design (mobile & desktop)
- ✅ Card-based layout
- ✅ Smooth animations & transitions
- ✅ Loading indicators
- ✅ Error messages
- ✅ Input validation
- ✅ Grade legend
- ✅ Dynamic form fields
- ✅ Back navigation
- ✅ Clean, modern interface

## 🔧 Development

### Backend Development
```powershell
# Run with auto-reload
uvicorn main:app --reload

# Access API documentation
http://localhost:8000/docs
```

### Frontend Development
```powershell
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Grade Points Mapping

| Grade | Points |
|-------|--------|
| O     | 10     |
| A+    | 9      |
| A     | 8      |
| B+    | 7      |
| B     | 6      |
| C     | 5      |
| P     | 4      |
| F     | 0      |

## 🐛 Troubleshooting

### CORS Issues
- Ensure backend CORS middleware allows frontend origin
- Check frontend API base URL matches backend port

### Port Conflicts
- Backend: Change port in `main.py` or use `--port` flag
- Frontend: Modify port in `vite.config.js`

### Module Not Found
- Backend: Ensure virtual environment is activated and dependencies installed
- Frontend: Run `npm install` to install all dependencies

## 🤝 Contributing

This is a student project. Feel free to fork and enhance!

## 📄 License

This project is created for educational purposes.

## 👨‍🎓 Made for Students

Built with ❤️ to help students easily calculate their academic performance.

---

**Happy Calculating! 🎓📊**
