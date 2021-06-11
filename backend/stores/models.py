from django.db import models
from userauth.models import UserAuth

class CartProduct(models.Model):
    name=models.CharField(max_length=100)
    idproduct=models.IntegerField(default=-1)
    description=models.CharField(max_length=500,blank=True)
    price=models.FloatField(default=None)
    quantity=models.IntegerField(default=1)
    image=models.CharField(max_length=200)
    user=models.ForeignKey(UserAuth,on_delete=models.CASCADE)
    
    