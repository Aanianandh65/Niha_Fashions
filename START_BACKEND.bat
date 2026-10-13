@echo off
cd /d "%~dp0config"
if not exist venv (
  echo Creating Python virtual environment...
  python -m venv venv
)
call venv\Scripts\activate.bat
python -m pip install --upgrade pip
pip install -r ..\requirements.txt
python manage.py migrate
python manage.py runserver 127.0.0.1:8000
pause
