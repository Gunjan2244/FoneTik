from pydantic import BaseModel, Field, EmailStr, BeforeValidator, ConfigDict
from typing import Optional, List, Annotated
from datetime import datetime
from bson import ObjectId

# Helper for ObjectId
PyObjectId = Annotated[str, BeforeValidator(str)]

class User(BaseModel):
    fullname: str = Field(...)
    email: EmailStr = Field(...)
    password: str = Field(...)
    user_type: str = Field(..., pattern="^(customer|technician)$")

class UserLogin(BaseModel):
    email: EmailStr = Field(...)
    password: str = Field(...)

class Order(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    user_email: Optional[EmailStr] = Field(default=None)
    device_model: str = Field(...)
    issue_description: str = Field(...)
    location: Optional[str] = Field(default=None)
    status: str = Field(default="pending") # pending, in_progress, completed
    created_at: datetime = Field(default_factory=datetime.utcnow)

    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
    )

class Complaint(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    user_email: Optional[EmailStr] = Field(default=None)
    order_id: str = Field(...)
    description: str = Field(...)
    status: str = Field(default="open") # open, resolved
    created_at: datetime = Field(default_factory=datetime.utcnow)

    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
    )

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
