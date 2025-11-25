from fastapi import APIRouter, HTTPException, status, Depends
from typing import List
from models import Complaint, User
from database import complaint_collection
from auth import get_current_user
from bson import ObjectId

router = APIRouter(
    prefix="/complaints",
    tags=["Complaints"]
)

@router.post("/", response_model=Complaint)
async def create_complaint(complaint: Complaint, current_user: User = Depends(get_current_user)):
    complaint_dict = complaint.model_dump(by_alias=True, exclude=["id"])
    complaint_dict["user_email"] = current_user["email"]
    new_complaint = await complaint_collection.insert_one(complaint_dict)
    created_complaint = await complaint_collection.find_one({"_id": new_complaint.inserted_id})
    return created_complaint

@router.get("/", response_model=List[Complaint])
async def get_complaints(current_user: User = Depends(get_current_user)):
    complaints = []
    if current_user["user_type"] == "technician":
        cursor = complaint_collection.find({})
    else:
        cursor = complaint_collection.find({"user_email": current_user["email"]})
    
    async for document in cursor:
        complaints.append(Complaint(**document))
    return complaints

@router.put("/{complaint_id}", response_model=Complaint)
async def resolve_complaint(complaint_id: str, current_user: User = Depends(get_current_user)):
    if current_user["user_type"] != "technician":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    await complaint_collection.update_one(
        {"_id": ObjectId(complaint_id)},
        {"$set": {"status": "resolved"}}
    )
    
    updated_complaint = await complaint_collection.find_one({"_id": ObjectId(complaint_id)})
    return updated_complaint
