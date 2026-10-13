# NIHA Ecommerce - Run Instructions

## Frontend

Open a terminal in `frontend`:

```bash
npm install
npm run dev
```

Then open the URL printed by Vite (normally http://localhost:5173).

## Backend

Open a second terminal in `config`:

```bash
python -m venv venv
# Windows PowerShell
.\venv\Scripts\Activate.ps1
# Windows CMD
# venv\Scripts\activate.bat

pip install -r ../requirements.txt
python manage.py migrate
python manage.py runserver
```

The frontend uses Vite's `/api` proxy, so the Django API is available at `/api/products/` without a browser CORS problem.

If the Django server is not running, the Shop page automatically uses the built-in local product data instead.
