# DopeForChrist Collection

A React storefront backed by a small Django products API. The catalog currently
uses demo product names, images, and KES prices; replace these with the real
collection details when they are ready.

## Run locally

Start the Django API in one terminal:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py runserver
```

Start the React app in another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal. Vite proxies `/api` requests to
`http://127.0.0.1:8000`. The demo catalog is served at `/api/products/`.
