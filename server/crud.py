from sqlalchemy.orm import Session
from schemas.participant import Participant as participant_schema
from models.participant import Participant as participant_model

def get_user_by_email(db: Session, email: str):
    return db.query(participant_model).filter(participant_model.email == email).first()

def create_participant(db: Session, participant: participant_schema):
    db_participant = participant_model(
        name=participant.name,
        email=participant.email, 
        phone=participant.phone, 
        birthdate=participant.birthdate, 
        password=participant.password, 
        confirm_password=participant.confirm_password, level=participant.level, 
        terms=participant.terms)
    db.add(db_participant)
    db.commit()
    db.refresh(db_participant)
    return db_participant