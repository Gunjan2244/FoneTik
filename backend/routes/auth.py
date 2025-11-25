from fastapi import APIRouter, HTTPException, status, Depends
from models import User, UserLogin, Token
from database import user_collection
from auth import get_password_hash, verify_password, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES
from datetime import timedelta

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.post("/signup", response_model=Token)
async def signup(user: User):
    user_exists = await user_collection.find_one({"email": user.email})
    if user_exists:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    hashed_password = get_password_hash(user.password)
    user_dict = user.model_dump()
    user_dict["password"] = hashed_password
    await user_collection.insert_one(user_dict)
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email, "user_type": user.user_type}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/login", response_model=Token)
async def login(user_login: UserLogin):
    user = await user_collection.find_one({"email": user_login.email})
    if not user or not verify_password(user_login.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["email"], "user_type": user["user_type"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
