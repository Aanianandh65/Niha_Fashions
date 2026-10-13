# Run NIHA every day

Products added in Django Admin are stored in `config/db.sqlite3`, so they remain available after closing the website.

You must start **both** servers when using the website:

## Terminal 1 — Django backend
```powershell
cd C:\path\to\NIHA_Ecommerce_Final\config
python manage.py runserver
```

## Terminal 2 — React frontend
```powershell
cd C:\path\to\NIHA_Ecommerce_Final\frontend
npm install
npm run dev
```

Then open `http://localhost:5173`.

The Home, Shop, New Arrivals, and Product Details pages now load products from Django. Products added yesterday in Django Admin will therefore still appear today, as long as the same project folder/database is being used.
