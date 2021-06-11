from django.urls import path
from .views import CartProductView,ProductView

urlpatterns = [
    
    path('cartproducts/',CartProductView.as_view(),name="api"),
    path('cartproducts/<int:pk>/',ProductView.as_view(),name="api_product")

]
