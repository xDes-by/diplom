from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from main_page import views as mp
from shop_page import views as sp



urlpatterns = [
    path('admin/', admin.site.urls),
   
    path('', mp.index),
    path('shop/', sp.ProductsView.as_view()),
    # path('filter/', sp.FilterProductsView.as_view(), name='filter'),
    path("jfilter/", sp.JsonFilterProductsView.as_view(), name='jfilter'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
