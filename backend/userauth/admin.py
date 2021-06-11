from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from django.contrib.auth.models import User
from .models import UserAuth


class CustomUserAdmin(UserAdmin):
    
    model=UserAuth
    list_display=('email','first_name','last_name','is_staff','is_active')
    list_filter=('email','is_staff','is_active')
    fieldsets=(
        (None,{'fields':('email','first_name','last_name','password')}),
    )
    add_fieldsets=(
        (None,{
            'classes':('wide',),
            'fields':('email','first_name','last_name','password1','password2','is_staff','is_active')
        }),
    )
    search_fields=('email',)
    ordering=('email',)

admin.site.register(UserAuth,CustomUserAdmin)