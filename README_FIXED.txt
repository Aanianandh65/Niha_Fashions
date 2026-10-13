RIO ECOMMERCE - FIXED PROJECT

Fixes included:
1. Wishlist now works from product cards and product details.
2. Wishlist persists in browser localStorage.
3. Wishlist page shows only saved products.
4. Product details no longer crashes when Django returns snake_case fields such as original_price.
5. Product details safely handles numeric strings and missing values.
6. Product-not-found and loading states prevent blank pages.

Run:
- Backend: open config folder and run: python manage.py runserver
- Frontend: open frontend and run: npm install, then npm run dev
