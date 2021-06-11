from stores.models import CartProduct
from rest_framework import serializers



class CartProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=CartProduct
        fields=['id','idproduct','name','description','image','price','quantity','user']
