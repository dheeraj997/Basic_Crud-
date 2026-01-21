from fastapi import FastAPI, Depends, HTTPException
from fastapi.responses import RedirectResponse
# from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .database import SessionLocal, engine , Base
from .schemas import EmployeeCreate, EmployeeResponse
from .crud import (
    create_employee,
    get_all_employees,
    get_employee,
    update_employee,
    delete_employee
)

app = FastAPI(title="Team Resource API")
#fast api


#creating table
@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine) # Creates all tables in models.py using engine where Base i parent class

# CORS (important for frontend)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

"""Declare a FastAPI dependency.It takes a single "dependable" callable (like a function).Don't call it directly, FastAPI will call it for you."""
@app.get("/", include_in_schema=False)
def root():
    return RedirectResponse(url="/docs")

@app.post("/employees", response_model=EmployeeResponse)
def add_employee(emp: EmployeeCreate, db: Session = Depends(get_db)):
    return create_employee(db, emp)

@app.get("/employees", response_model=list[EmployeeResponse])
def list_employees(db: Session = Depends(get_db)):
    return get_all_employees(db)

@app.get("/employees/{emp_id}", response_model=EmployeeResponse)
def get_single_employee(emp_id: int, db: Session = Depends(get_db)):
    emp = get_employee(db, emp_id)
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")
    return emp

@app.put("/employees/{emp_id}", response_model=EmployeeResponse)
def update_single_employee(emp_id: int, emp: EmployeeCreate, db: Session = Depends(get_db)):
    updated = update_employee(db, emp_id, emp)
    if not updated:
        raise HTTPException(status_code=404, detail="Employee not found")
    return updated

@app.delete("/employees/{emp_id}")
def delete_single_employee(emp_id: int, db: Session = Depends(get_db)):
    deleted = delete_employee(db, emp_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Employee not found")
    return {"message": "Employee deleted successfully"}
