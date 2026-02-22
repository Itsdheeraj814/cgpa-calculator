from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, validator
from typing import List

app = FastAPI(title="CGPA Calculator API")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Grade to points mapping
GRADE_POINTS = {
    "O": 10,
    "A+": 9,
    "A": 8,
    "B+": 7,
    "B": 6,
    "C": 5,
    "P": 4,
    "F": 0
}

# Request/Response Models
class Subject(BaseModel):
    credits: float = Field(..., gt=0, description="Credits must be positive")
    grade: str
    
    @validator('grade')
    def validate_grade(cls, v):
        if v not in GRADE_POINTS:
            raise ValueError(f"Invalid grade. Must be one of: {', '.join(GRADE_POINTS.keys())}")
        return v

class SemesterGPARequest(BaseModel):
    subjects: List[Subject]
    
    @validator('subjects')
    def validate_subjects(cls, v):
        if not v:
            raise ValueError("Subjects list cannot be empty")
        return v

class SemesterGPAResponse(BaseModel):
    gpa: float
    total_credits: float

class Semester(BaseModel):
    gpa: float = Field(..., ge=0, le=10, description="GPA must be between 0 and 10")
    credits: float = Field(..., gt=0, description="Credits must be positive")

class CGPARequest(BaseModel):
    semesters: List[Semester]
    
    @validator('semesters')
    def validate_semesters(cls, v):
        if not v:
            raise ValueError("Semesters list cannot be empty")
        return v

class CGPAResponse(BaseModel):
    cgpa: float
    total_credits: float

# API Endpoints
@app.get("/")
def read_root():
    return {
        "message": "CGPA Calculator API",
        "endpoints": [
            "/calculate/semester-gpa",
            "/calculate/cgpa"
        ]
    }

@app.post("/calculate/semester-gpa", response_model=SemesterGPAResponse)
def calculate_semester_gpa(request: SemesterGPARequest):
    """
    Calculate GPA for a single semester based on subjects, credits, and grades.
    
    GPA = sum(credits * grade_points) / sum(credits)
    """
    try:
        total_points = 0
        total_credits = 0
        
        for subject in request.subjects:
            grade_point = GRADE_POINTS[subject.grade]
            total_points += subject.credits * grade_point
            total_credits += subject.credits
        
        if total_credits == 0:
            raise HTTPException(status_code=400, detail="Total credits cannot be zero")
        
        gpa = total_points / total_credits
        
        return SemesterGPAResponse(
            gpa=round(gpa, 2),
            total_credits=round(total_credits, 2)
        )
    
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.post("/calculate/cgpa", response_model=CGPAResponse)
def calculate_cgpa(request: CGPARequest):
    """
    Calculate overall CGPA across multiple semesters.
    
    CGPA = sum(semester_gpa * semester_credits) / sum(credits)
    """
    try:
        total_weighted_gpa = 0
        total_credits = 0
        
        for semester in request.semesters:
            total_weighted_gpa += semester.gpa * semester.credits
            total_credits += semester.credits
        
        if total_credits == 0:
            raise HTTPException(status_code=400, detail="Total credits cannot be zero")
        
        cgpa = total_weighted_gpa / total_credits
        
        return CGPAResponse(
            cgpa=round(cgpa, 2),
            total_credits=round(total_credits, 2)
        )
    
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
