from pydantic import BaseModel, ConfigDict

class EmployeeCreate(BaseModel):
    name: str
    email: str
    role: str
    skills: str
    availability: str

class EmployeeResponse(EmployeeCreate):
    id: int

    model_config = ConfigDict(from_attributes=True)
