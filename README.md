# FoneTik Project Setup

## Prerequisites
- Node.js & npm
- Python 3.8+
- MongoDB

## Running the Project

### 1. Database
Ensure MongoDB is running locally.
```bash
# Linux/macOS
sudo systemctl start mongod
# OR just run
mongod
```

### 2. Backend
Navigate to the backend directory and start the server:
```bash
cd backend
# Create virtual env if not exists
python3 -m venv venv
source venv/bin/activate
# Install dependencies
pip install -r requirements.txt
# Run server
uvicorn main:app --reload
```
Server runs at: `http://localhost:8000`

### 3. Frontend
Navigate to the frontend directory and start the dev server:
```bash
cd frontend
npm install
npm run dev
```
App runs at: `http://localhost:5173`
