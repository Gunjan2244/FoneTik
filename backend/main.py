from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth, orders, complaints

app = FastAPI()

origins = [
    "https://fone-tik.vercel.app/"
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    "http://127.0.0.1:34432",
    "http://127.0.0.1:52310"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(orders.router)
app.include_router(complaints.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Phone Repair API"}

@app.get("/health")
def health_check():
    return {"status": "ok"}
