from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from config.database import SessionLocal, engine
from models.participant import Base
from crud import get_user_by_email, create_participant
from schemas.participant import Participant

Base.metadata.create_all(bind=engine)

participant = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@participant.post("/inscrever")
def create_user(participant: Participant, db: Session = Depends(get_db)):
    db_user = get_user_by_email(db, email=participant.email)
    if db_user:
        return "failed"
    return create_participant(db=db, participant=participant)
