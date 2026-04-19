# 📱 FoneTik - Professional Phone Repair Service Platform

<div align="center">

![FoneTik Logo](https://img.shields.io/badge/FoneTik-Phone%20Repair-1a1a1a?style=for-the-badge)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

*Fast, reliable, and secure phone repair services at your doorstep*

[Live Demo](https://fone-tik.vercel.app) · [Report Bug](https://github.com/yourusername/fonetik/issues) · [Request Feature](https://github.com/yourusername/fonetik/issues)

</div>

---

## 📋 Table of Contents

- [About The Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 🎯 About The Project

**FoneTik** is a comprehensive web application that connects customers with professional phone repair technicians. The platform streamlines the entire repair process from booking to completion, with features like real-time order tracking, complaint management, and doorstep service location sharing.

### Why FoneTik?

- 🚀 **Fast Service**: Most repairs completed within hours
- 🔒 **Secure**: JWT-based authentication and role-based access control
- 📍 **Convenient**: Doorstep service with geolocation integration
- 💎 **Quality**: Only genuine parts and certified technicians
- 📱 **Responsive**: Works seamlessly on all devices

---

## ✨ Features

### For Customers 👥

- ✅ Create and manage repair orders
- ✅ Real-time order status tracking
- ✅ Share service location via GPS
- ✅ Submit and track complaints
- ✅ Delete pending orders
- ✅ View repair history

### For Technicians 🔧

- ✅ View all customer orders
- ✅ Update order status (Pending → In Progress → Completed)
- ✅ Manage customer complaints
- ✅ Resolve complaints
- ✅ Access customer location details

### General Features 🌟

- ✅ Secure user authentication (JWT)
- ✅ Role-based access control
- ✅ Responsive design for all devices
- ✅ Modern and intuitive UI
- ✅ RESTful API architecture

---

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - UI library
- **React Router DOM 7.9.6** - Client-side routing
- **Axios 1.13.2** - HTTP client
- **Vite 7.2.4** - Build tool
- **CSS3** - Custom styling

### Backend
- **FastAPI** - Modern Python web framework
- **MongoDB** - NoSQL database
- **Motor** - Async MongoDB driver
- **PyJWT** - JSON Web Token implementation
- **Bcrypt** - Password hashing
- **Python-Jose** - JWT encoding/decoding

### Deployment
- **Vercel** - Frontend & Backend hosting
- **MongoDB Atlas** - Cloud database

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20.19.0 or higher)
- **Python** (v3.8 or higher)
- **MongoDB** (Local installation or MongoDB Atlas account)
- **Git**

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/yourusername/fonetik.git
cd fonetik
```

#### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Edit .env with your MongoDB connection string
```

#### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Create .env file (optional)
cp .env.example .env
```

### Environment Variables

#### Backend `.env`
```env
MONGO_DETAILS=mongodb://localhost:27017
# or for MongoDB Atlas:
# MONGO_DETAILS=mongodb+srv://username:password@cluster.mongodb.net/fonetik

SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

#### Frontend `.env` (Optional)
```env
VITE_API_URL=http://localhost:8000
```

---

## 💻 Usage

### Running Locally

#### 1. Start the Backend Server
```bash
cd backend
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`

#### 2. Start the Frontend Development Server
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173`

#### 3. Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:5173
- **API Documentation**: http://localhost:8000/docs (Swagger UI)

### User Roles

#### Customer Account
- Register as a "Customer"
- Book repair services
- Track orders
- Submit complaints

#### Technician Account
- Register as a "Technician"
- View all orders
- Update order status
- Resolve complaints

---

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | Register new user |
| POST | `/auth/login` | User login |

### Order Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/orders/` | Create new order | ✅ |
| GET | `/orders/` | Get user orders | ✅ |
| PUT | `/orders/{order_id}` | Update order status | ✅ (Technician) |
| DELETE | `/orders/{order_id}` | Delete order | ✅ (Customer) |
| PUT | `/orders/{order_id}/details` | Update order details | ✅ (Customer) |

### Complaint Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/complaints/` | Create complaint | ✅ |
| GET | `/complaints/` | Get complaints | ✅ |
| PUT | `/complaints/{complaint_id}` | Resolve complaint | ✅ (Technician) |

### Interactive API Documentation

Once the backend is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

---

## 📁 Project Structure
```
fonetik/
├── backend/
│   ├── auth.py                 # Authentication logic
│   ├── database.py             # Database connection
│   ├── main.py                 # FastAPI app entry point
│   ├── models.py               # Pydantic models
│   ├── requirements.txt        # Python dependencies
│   └── routes/
│       ├── auth.py            # Auth routes
│       ├── orders.py          # Order routes
│       └── complaints.py      # Complaint routes
│
├── frontend/
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── UserSelection.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/             # Page components
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── NewOrder.jsx
│   │   │   ├── Complaints.jsx
│   │   │   └── Contact.jsx
│   │   ├── api.js             # Axios configuration
│   │   ├── App.jsx            # Main app component
│   │   ├── index.css          # Global styles
│   │   └── main.jsx           # React entry point
│   ├── package.json           # Node dependencies
│   └── vite.config.js         # Vite configuration
│
└── README.md
```

---

## 📸 Screenshots

### Home Page
![Home Page](https://via.placeholder.com/800x400?text=Home+Page)

### Dashboard
![Dashboard](https://via.placeholder.com/800x400?text=Dashboard)

### New Order Form
![New Order](https://via.placeholder.com/800x400?text=New+Order+Form)

---

## 🌐 Deployment

### Backend Deployment (Vercel)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
cd backend
vercel
```

3. Configure environment variables in Vercel dashboard

### Frontend Deployment (Vercel)

1. Deploy:
```bash
cd frontend
vercel
```

2. Set environment variables:
   - `VITE_API_URL`: Your backend URL

### MongoDB Atlas Setup

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Add database user
4. Whitelist IP addresses
5. Get connection string
6. Update `MONGO_DETAILS` in backend environment variables

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📧 Contact

**Project Team**

- **Backend Developer** - [Email](mailto:backend@fonetik.com)
- **Frontend Developer** - [Email](mailto:frontend@fonetik.com)
- **Project Manager** - [Email](mailto:pm@fonetik.com)

**Project Link**: [https://github.com/yourusername/fonetik](https://github.com/yourusername/fonetik)

**Live Demo**: [https://fone-tik.vercel.app](https://fone-tik.vercel.app)

---

## 🙏 Acknowledgments

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Vercel](https://vercel.com/)
- [Font Awesome](https://fontawesome.com/)

---

<div align="center">

Made with ❤️ by the Gunjan, Harshit and Ashutosh

⭐ Star us on GitHub if you like this project!

</div>
