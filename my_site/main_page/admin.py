from django.contrib import admin
from django.utils.safestring import mark_safe

from .models import Product, Category

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_photo', 'name', 'description', 'price', 'count', 'category', 'color', "screen", "memory", "cpu", "orders")
    list_display_links = ('name', 'get_photo')
    search_fields = ('name', 'description')
    list_filter = ('category', 'memory', 'color', 'screen', 'cpu')

    def get_photo(self, obj):
        if obj.image:
            return mark_safe(f'<img src="{obj.image.url}" width="50"')
        else:
            return "Нет фото"

    # fieldsets = (
    #     (None, {
    #         'fields': ('name',)
    #     }),
    #     ('Advanced options', {
    #         'classes': ('collapse',),
    #         'fields': ('description', ),
    #     }),
    # )        

    get_photo.short_description = "Фото"

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('get_photo', 'name')
    list_display_links = ('name', 'get_photo')
    search_fields = ('name',)

    def get_photo(self, obj):
        if obj.image:
            return mark_safe(f'<img src="{obj.image.url}" width="100"')
        else:
            return "Нет фото"

    get_photo.short_description = "Фото"





admin.site.site_title = "Админка магазина техники"
admin.site.site_header = "Админка магазина техники"
