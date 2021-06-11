from rest_framework import permissions
from rest_framework.generics import ListCreateAPIView,RetrieveUpdateDestroyAPIView
from stores.models import CartProduct
from .serializers import CartProductSerializer
from rest_framework.permissions import IsAuthenticated

    
class CartProductView(ListCreateAPIView):
    queryset = CartProduct.objects.all()
    serializer_class =CartProductSerializer
    permission_classes = [IsAuthenticated,]
 

    
class ProductView(RetrieveUpdateDestroyAPIView):
    queryset = CartProduct.objects.all()
    serializer_class =CartProductSerializer
    permission_classes = [IsAuthenticated,]


    
    