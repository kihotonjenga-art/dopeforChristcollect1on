from django.http import JsonResponse
from django.views.decorators.http import require_GET


DEMO_PRODUCTS = [
    {
        "id": 1,
        "name": "Milele graphic tee",
        "category": "Tees",
        "price": 1500,
        "sizes": ["S", "M", "L", "XL"],
        "badge": "Best seller",
        "image": "/products/milele-graphic-tee-front.jpeg",
        "image_alt": "Black graphic tee with blue MILELE lettering on the front",
        "back_image": "/products/milele-graphic-tee-back.jpeg",
        "back_image_alt": "Black graphic tee with Mwana wa Yesu and dove print on the back",
    },
    {
        "id": 2,
        "name": "Walk by Faith hoodie",
        "category": "Hoodies",
        "price": 4800,
        "sizes": ["S", "M", "L", "XL"],
        "badge": "New drop",
        "image": "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85",
        "image_alt": "Relaxed fit hoodie",
        "back_image": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",
        "back_image_alt": "Demo back-view image for hoodie",
    },
    {
        "id": 3,
        "name": "Maono graphic tee",
        "category": "Tees",
        "price": 1500,
        "sizes": ["S", "M", "L", "XL"],
        "badge": "",
        "image": "/products/maono-graphic-tee-front.jpeg",
        "image_alt": "Red graphic tee with white MAONO lettering",
        "back_image": "/products/maono-graphic-tee-back.jpeg",
        "back_image_alt": "Red graphic tee with KUJA KWA YESU KUNA URADI print on the back",
    },
    {
        "id": 4,
        "name": "Eternal graphic tee",
        "category": "Tees",
        "price": 1500,
        "sizes": ["S", "M", "L", "XL"],
        "badge": "New drop",
        "image": "/products/eternal-graphic-tee-front.jpeg",
        "image_alt": "White graphic tee with blue ETERNAL lettering on the front",
        "back_image": "/products/eternal-graphic-tee-back.jpeg",
        "back_image_alt": "White tee with blue He Was Brought to Earth to Give Us Eternal Life print on the back",
    },
    {
        "id": 5,
        "name": "Visions graphic tee",
        "category": "Tees",
        "price": 1500,
        "sizes": ["S", "M", "L", "XL"],
        "badge": "New drop",
        "image": "/products/visions-graphic-tee-front.jpeg",
        "image_alt": "White graphic tee with black VISIONS lettering on the front",
        "back_image": "/products/visions-graphic-tee-back.jpeg",
        "back_image_alt": "White tee with Kenya, Nairobi, and Proverbs 29:18 print on the back",
    },
    {
        "id": 6,
        "name": "Visions green graphic tee",
        "category": "Tees",
        "price": 1500,
        "sizes": ["S", "M", "L", "XL"],
        "badge": "New drop",
        "image": "/products/visions-green-graphic-tee-front.jpeg",
        "image_alt": "Green graphic tee with yellow VISIONS lettering on the front",
        "back_image": "/products/visions-green-graphic-tee-back.jpeg",
        "back_image_alt": "Green graphic tee with GOD GAVE ME THOSE VISIONS print on the back",
    },
    {
        "id": 7,
        "name": "Milele and Maombi graphic tee",
        "category": "Tees",
        "price": 1500,
        "sizes": ["S", "M", "L", "XL"],
        "badge": "New drop",
        "image": "/products/milele-maombi-graphic-tee-front.jpeg",
        "image_alt": "White graphic tee with red MILELE lettering on the front",
        "back_image": "/products/milele-maombi-graphic-tee-back.jpeg",
        "back_image_alt": "White graphic tee with MAOMBI prayer illustration on the back",
    },
    {
        "id": 8,
        "name": "Kuja Kwa Yesu graphic tee",
        "category": "Tees",
        "price": 1500,
        "sizes": ["S", "M", "L", "XL"],
        "badge": "New drop",
        "image": "/products/kuja-kwa-yesu-tee-front.jpeg",
        "image_alt": "Charcoal tee with gold MILELE lettering and stars on the front",
        "back_image": "/products/kuja-kwa-yesu-tee-back.jpeg",
        "back_image_alt": "Charcoal tee with gold KUJA KWA YESU lettering on the back",
    },
]


@require_GET
def health(request):
    return JsonResponse({"status": "ok", "service": "DopeForChrist Collection API"})


@require_GET
def products(request):
    category = request.GET.get("category")
    items = DEMO_PRODUCTS
    if category and category.lower() != "all":
        items = [item for item in items if item["category"].lower() == category.lower()]
    return JsonResponse({"results": items, "demo": True})
