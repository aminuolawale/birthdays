from django.db import models
from django.contrib.auth.models import AbstractUser
from .manager import CustomUserManager


class User(AbstractUser):
    """ """

    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=255)
    username = models.CharField(max_length=100, null=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100, null=True)
    phone = models.CharField(max_length=2, null=True)
    avatar = models.CharField(max_length=100, null=True)

    USERNAME_FIELD = "email"
    EMAIL_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    objects = CustomUserManager()

    def update_user(self, **kwargs):
        for k, v in kwargs.items():
            setattr(self, k, v)
        self.save()
        return self

    def __str__(self):
        return self.email
