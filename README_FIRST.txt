NIHA ECOMMERCE - FINAL PROJECT

IMPORTANT:
The original project was missing frontend/index.html. That prevented Vite from loading.
This cleaned version includes it and uses versions compatible with Node 18+.

REQUIREMENTS:
- Node.js 18 or newer
- Python 3.10 or newer

RUN:
1. Double-click START_BACKEND.bat
2. Double-click START_FRONTEND.bat
3. Open the URL shown by Vite (normally http://localhost:5173)

If Windows blocks a .bat file, right-click it and choose Run.

MANUAL COMMANDS:
Backend:
  cd config
  python -m venv venv
  venv\Scripts\activate
  pip install -r ..\requirements.txt
  python manage.py migrate
  python manage.py runserver

Frontend:
  cd frontend
  npm install
  npm run dev

The frontend can still display the bundled local products if Django is not running.
