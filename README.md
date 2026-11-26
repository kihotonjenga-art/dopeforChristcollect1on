# DopeForChrist Collection

A React storefront backed by a small Django products API. The catalog currently
uses demo product details and KES prices, alongside supplied Milele, Maono,
Visions, and Eternal tee photos; replace the remaining placeholders with the
rest of the collection.

Product cards can show both sides when a product has `image` and `back_image`
URLs (with matching `image_alt` and `back_image_alt` descriptions). Product
details are in `backend/config/views.py` and `frontend/src/App.jsx`; frontend
images can be stored under `frontend/public/` and referenced by their root URL.
The card's **See back** control flips between the images.

Choose a size (S, M, L, or XL) on a product card before adding it to the bag.
The cart keeps separate entries for different sizes and includes each size in
the WhatsApp order message.

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
