import sqlalchemy
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

engine = sqlalchemy.create_engine("mysql+pymysql://root:@localhost:3306/form_proj?charset=utf8mb4", echo=True)

async def connect_database(query: str):
    with engine.connect() as connection:
        result = connection.execute(sqlalchemy.text(query))
        connection.commit()
        return result.all()

app = FastAPI()

origins = [
    "http://127.0.0.1:5500",
    "http://127.0.0.1:5501",
    "http://127.0.0.1:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Participant(BaseModel):
    email: str
    name: str
    phone: str
    birthdate: str
    password: str
    confirm_password: str
    terms: str
#:

async def participant_already_exists(participant: Participant) -> Participant:
    participant = await connect_database(f"SELECT * FROM participants WHERE email = '{participant.email}'")
    return participant

@app.post('/inscrever')
async def subscribe(participant: Participant):
    exists = await participant_already_exists(participant)
    if exists:
        return 'false'
    else:
        with engine.connect() as con:
            con.execute(sqlalchemy.text(f"""INSERT INTO participants(name, email, phone, birthdate, password, confirm_password, terms) VALUES
            ('{participant.name}', '{participant.email}', '{participant.phone}','{participant.birthdate}', '{participant.password}', '{participant.confirm_password}', '{participant.terms}')"""))
            con.commit()
            return 'ok'