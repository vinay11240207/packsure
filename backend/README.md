# PackSure AI — FastAPI Backend

AI-assisted preliminary packaging compliance screening backend.

## 🚀 Quick Start (Local Demo)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a Python virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the FastAPI development server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

5. Access the interactive API docs at:
   - **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
   - **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## 🗄️ Connecting your Hostinger MySQL Database

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and set your `DATABASE_URL`:
   ```env
   DATABASE_URL=mysql+pymysql://<user>:<password>@<hostinger-mysql-host>:3306/<database_name>
   ```

   **Hostinger tips:**
   - In your Hostinger hPanel, go to **Databases** → **Management**.
   - Ensure **Remote MySQL** is enabled if connecting from your local machine, and whitelist your current IP address (or `%` for all IPs).
   - The models in `models/db_models.py` will automatically create the tables:
     - `users`
     - `scans`
     - `ocr_results`
     - `compliance_results`

---

## 🔌 API Endpoints

| Method | Route | Description |
|---|---|---|
| `GET` | `/` | Root health check & API status |
| `POST` | `/api/scan` | Upload packaging image(s) for screening |
| `GET` | `/api/scan/{id}` | Get scan results & heatmap bounding boxes |
| `GET` | `/api/scan/history` | Get list of previous screenings |
| `GET` | `/api/analytics` | Get aggregate compliance stats |
| `POST` | `/api/auth/login` | User login session |
| `POST` | `/api/auth/register` | Workspace registration |
