from django.db import models
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin,BaseUserManager,UserManager,AbstractUser


class UserAuthManager(BaseUserManager):
    def create_user(self,email,first_name,last_name,password=None,**extrafields):
        if not email:
            raise ValueError('User must have an email address')
        
        email=self.normalize_email(email)
        user=self.model(email=email,first_name=first_name,last_name=last_name,**extrafields)

        user.set_password(password)
        user.save()

        return user
    

    def create_superuser(self,email,first_name,last_name,password,**extrafields):

        extrafields.setdefault("is_staff",True)
        extrafields.setdefault("is_superuser",True)
        extrafields.setdefault("is_active",True)
        

        if extrafields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=true")
        
        if extrafields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=true")
        
        if extrafields.get("is_active") is not True:
            raise ValueError("Superuser must have is_active=true")

        return self.create_user(email,first_name,last_name,password,**extrafields)

   


class UserAuth(AbstractUser,PermissionsMixin):
    username=None
    email=models.EmailField(max_length=255,unique=True)
    first_name=models.CharField(max_length=255)
    last_name=models.CharField(max_length=255)
    is_active=models.BooleanField(default=True)
    is_staff=models.BooleanField(default=False)
    is_superuser=models.BooleanField(default=False)

    USERNAME_FIELD='email'
    REQUIRED_FIELDS=['first_name','last_name']

    objects=UserAuthManager()

    def get_full_name(self):
        return self.first_name+self.last_name
    
    def __str__(self):
        return self.email