from unicodedata import category
from django.shortcuts import render
from .models import Product, Category
from django.http import HttpResponse
from django.db.models import Count


def index(request):
    products = Product.objects.all()
    categories = Category.objects.all()
    
    top =[]
    for i in categories:
       product_category = products.filter(category=i).order_by('-orders')[:3]
       top.append(product_category)

    context ={
        "top": top,
        "products": products,
        "categories": categories,
        "title": "Магазин техники"
    }
    
    return render(request, 'main_page/index.html', context)