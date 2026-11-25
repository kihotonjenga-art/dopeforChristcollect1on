from django.http import JsonResponse
from django.views.decorators.http import require_GET


DEMO_PRODUCTS = [
    {
        "id": 1,
        "name": "Made New heavyweight tee",
        "category": "Tees",
        "price": 2400,
        "badge": "Best seller",
        "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
        "image_alt": "Cream heavyweight t-shirt",
        "back_image": "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",
        "back_image_alt": "Demo back-view image for heavyweight tee",
    },
    {
        "id": 2,
        "name": "Walk by Faith hoodie",
        "category": "Hoodies",
        "price": 4800,
        "badge": "New drop",
        "image": "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85",
        "image_alt": "Relaxed fit hoodie",
        "back_image": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",
        "back_image_alt": "Demo back-view image for hoodie",
    },
    {
        "id": 3,
        "name": "Grace oversized tee",
        "category": "Tees",
        "price": 2200,
        "badge": "",
        "image": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=85",
        "image_alt": "Minimal streetwear t-shirt",
        "back_image": "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=85",
        "back_image_alt": "Demo back-view image for oversized tee",
    },
    {
        "id": 4,
        "name": "Kingdom cargo pants",
        "category": "Bottoms",
        "price": 3900,
        "badge": "Limited",
        "image": "https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=900&q=85",
        "image_alt": "Relaxed utility trousers",
        "back_image": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
        "back_image_alt": "Demo back-view image for cargo pants",
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
