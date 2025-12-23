from sqlalchemy.orm import Session
from .models import Employee
from .schemas import EmployeeCreate

def create_employee(db: Session, emp: EmployeeCreate):
    employee = Employee(**emp.dict())
    db.add(employee)
    db.commit()
    db.refresh(employee)
    return employee

def get_all_employees(db: Session):
    return db.query(Employee).all()

def get_employee(db: Session, emp_id: int):
    return db.query(Employee).filter(Employee.id == emp_id).first()

def update_employee(db: Session, emp_id: int, emp: EmployeeCreate):
    employee = get_employee(db, emp_id)
    if not employee:
        return None

    for key, value in emp.dict().items():
        setattr(employee, key, value)

    db.commit()
    db.refresh(employee)
    return employee

def delete_employee(db: Session, emp_id: int):
    employee = get_employee(db, emp_id)
    if not employee:
        return None

    db.delete(employee)
    db.commit()
    return employee
