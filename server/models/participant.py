from sqlalchemy import Column, Integer, String
from config.database import Base

class Participant(Base):
    __tablename__ = "participants"

    id = Column(Integer, primary_key=True)
    name = Column(String(255))
    email = Column(String(255))
    phone = Column(String(255))
    birthdate = Column(String(255))
    password = Column(String(255))
    confirm_password = Column(String(255))
    level = Column(String(255))
    terms = Column(String(255))

