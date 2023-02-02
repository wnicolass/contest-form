from pydantic import BaseModel

class Participant(BaseModel):
    name: str
    email: str
    phone: str
    birthdate: str
    password: str
    confirm_password: str
    level: str
    terms: str

    class Config:
        orm_mode = True