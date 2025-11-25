from fastapi import APIRouter, HTTPException, status, Depends
from typing import List
from models import Order, User
from pydantic import BaseModel
from typing import Optional
from database import order_collection
from auth import get_current_user
from bson import ObjectId

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)

@router.post("/", response_model=Order)
async def create_order(order: Order, current_user: User = Depends(get_current_user)):
    order_dict = order.model_dump(by_alias=True, exclude=["id"])
    order_dict["user_email"] = current_user["email"]
    new_order = await order_collection.insert_one(order_dict)
    created_order = await order_collection.find_one({"_id": new_order.inserted_id})
    return created_order

@router.get("/", response_model=List[Order])
async def get_orders(current_user: User = Depends(get_current_user)):
    orders = []
    if current_user["user_type"] == "technician":
        # Technician sees all orders
        cursor = order_collection.find({})
    else:
        # Customer sees only their orders
        cursor = order_collection.find({"user_email": current_user["email"]})
    
    async for document in cursor:
        orders.append(Order(**document))
    return orders

@router.put("/{order_id}", response_model=Order)
async def update_order_status(order_id: str, status_update: str, current_user: User = Depends(get_current_user)):
    if current_user["user_type"] != "technician":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    if status_update not in ["pending", "in_progress", "completed"]:
        raise HTTPException(status_code=400, detail="Invalid status")

    await order_collection.update_one(
        {"_id": ObjectId(order_id)},
        {"$set": {"status": status_update}}
    )
    
    updated_order = await order_collection.find_one({"_id": ObjectId(order_id)})
    return updated_order

@router.delete("/{order_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_order(order_id: str, current_user: User = Depends(get_current_user)):
    order = await order_collection.find_one({"_id": ObjectId(order_id)})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    if order["user_email"] != current_user["email"]:
        raise HTTPException(status_code=403, detail="Not authorized to delete this order")
    
    if order["status"] != "pending":
        raise HTTPException(status_code=400, detail="Cannot delete order that is not pending")
    
    await order_collection.delete_one({"_id": ObjectId(order_id)})
    return None

class OrderUpdate(BaseModel):
    device_model: Optional[str] = None
    issue_description: Optional[str] = None
    location: Optional[str] = None

@router.put("/{order_id}/details", response_model=Order)
async def update_order_details(order_id: str, update_data: OrderUpdate, current_user: User = Depends(get_current_user)):
    order = await order_collection.find_one({"_id": ObjectId(order_id)})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    if order["user_email"] != current_user["email"]:
        raise HTTPException(status_code=403, detail="Not authorized to update this order")
    
    if order["status"] != "pending":
        raise HTTPException(status_code=400, detail="Cannot update order that is not pending")
    
    update_dict = {k: v for k, v in update_data.model_dump().items() if v is not None}
    
    if update_dict:
        await order_collection.update_one(
            {"_id": ObjectId(order_id)},
            {"$set": update_dict}
        )
    
    updated_order = await order_collection.find_one({"_id": ObjectId(order_id)})
    return updated_order
