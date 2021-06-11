from django.contrib import admin

# Register your models here.
from .models import CartProduct

admin.site.register(CartProduct)