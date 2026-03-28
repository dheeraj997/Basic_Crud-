# ⚡ TeamPulse — Employee Dashboard (FastAPI + React + MySQL)

A modern, production-style **Full-Stack Application** to easily manage employee and team resources. 

Built with a lightning-fast python **FastAPI** backend and a stunning **Vite + React** frontend.

🔗 **Live API:**
[https://simple-crud-one-roan.vercel.app/](https://simple-crud-one-roan.vercel.app/)

📖 **Swagger Documentation:**
[https://simple-crud-one-roan.vercel.app/docs](https://simple-crud-one-roan.vercel.app/docs)

---

## 🚀 Features

- **Full-Stack Architecture**: Clean separation between a React SPA (frontend) and REST APIs (backend).
- **Modern UI**: A premium dark-mode dashboard with interactive stat counters, glassmorphism elements, micro-animations, and responsive cards (`frontend` folder).
- **CRUD Operations**: Create, Read, Update, Delete team members with real-time feedback and toast notifications.
- **SQLAlchemy ORM**: No raw SQL; strict request validation via Pydantic.
- **MySQL on AWS RDS**: Persistent, free-tier relational database hosting.
- **Vercel Serverless**: Backend runs serverlessly via Vercel Functions.

---

## 🧱 Tech Stack

| Layer             | Technology          |
| ----------------- | ------------------- |
| **Frontend**      | React, Vite, CSS    |
| **Backend API**   | FastAPI             |
| **ORM**           | SQLAlchemy          |
| **Validation**    | Pydantic            |
| **Database**      | MySQL               |
| **Cloud Hosting** | Vercel (API), AWS RDS (DB) |

---

## 📂 Project Structure

```text
simple_crud/
│
├── app/                  # FastAPI Backend Application
│   ├── main.py           # Application routes & CORS configuration
│   ├── database.py       # SQLAlchemy MySQL connection
│   ├── models.py         # DB schemas/models
│   ├── schemas.py        # Pydantic validation schemas
│   ├── crud.py           # Database operations
│
├── frontend/             # React SPA (Vite)
│   ├── src/
│   │   ├── components/   # UI components (Cards, Modals, Navbar)
│   │   ├── App.jsx       # Main Dashboard orchestrator 
│   │   ├── api.js        # Axios/Fetch wrapper for REST API calls
│   │   ├── index.css     # Complete design system & tokens
│   ├── vite.config.js    # Vite config (proxies /employees to FastAPI)
│
├── api/                  
│   └── index.py          # Vercel Serverless Entrypoint for the backend
│
├── .env                  # Environment Variables (Not checked into Git)
└── requirements.txt      # Python dependencies
```

---

## ▶️ Getting Started Locally (For Developers)

To run this application locally, you need two terminals: one for the **FastAPI backend** and one for the **React frontend**. 

### 1. Setup Environment Variables
Create a `.env` file in the root directory and configure your AWS RDS MySQL credentials:
```env
DB_USER=admin
DB_PASSWORD=yourpassword
DB_HOST=your-rds-endpoint.amazonaws.com
DB_PORT=3306
DB_NAME=employee_db
```

### 2. Start the FastAPI Backend
Open a terminal in the root `simple_crud` folder.

```bash
# Install Python dependencies
pip install -r requirements.txt

# Start the local uvicorn server
uvicorn app.main:app --reload --port 8000
```
> The API will run on `http://127.0.0.1:8000/`. Going to this URL redirects to the swagger docs (`/docs`).

### 3. Start the React Frontend
Open **another terminal** and navigate to the `frontend` folder.

```bash
cd frontend

# Install Node dependencies
npm install

# Start the Vite development server
npm run dev
```
> The UI will run on `http://localhost:3000/` and automatically proxies API requests to your local Python backend.

---

## ☁️ Deployment (Vercel)

This application is built to leverage **Vercel Serverless Functions**. The `api/index.py` file exposes the FastAPI application to Vercel's runtime environment.

- Add your database environment variables securely in your Vercel Project Settings.
- Connect your GitHub repository, and any push will automatically trigger a build, deploying your API.
- Your frontend React codebase should be configured as a Vercel project, and you can map API rewrites in `vercel.json` to seamlessly integrate them.

---

## 👨‍💻 Author

**Dheeraj**  
*Backend / Data Engineer*

---

## ⭐ Support

If you found this project useful, consider giving the repository a **star ⭐ on GitHub**.
