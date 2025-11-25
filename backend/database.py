from dotenv import load_dotenv
import motor.motor_asyncio
import os

load_dotenv()

MONGO_DETAILS = os.getenv("MONGO_DETAILS", "mongodb://localhost:27017")

# ...existing code...
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

database = client.fonetik

user_collection = database.get_collection("users_collection")
order_collection = database.get_collection("orders_collection")
complaint_collection = database.get_collection("complaints_collection")
