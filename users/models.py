from django.db import models
from django.contrib.auth.models import AbstractUser
from .manager import CustomUserManager
from django.conf import settings
from secrets import token_hex


class User(AbstractUser):
    """"""

    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=255)
    username = models.CharField(max_length=100, null=True)
    middle_name = models.CharField(max_length=100, null=True)
    nickname = models.CharField(max_length=100, null=True)
    phone = models.CharField(max_length=20, null=True)
    avatar = models.URLField(
        max_length=255,
        default=settings.DEFAULT_USER_AVATAR,
    )
    banner = models.URLField(
        max_length=255,
        default=settings.DEFAULT_USER_BANNER,
    )
    date_of_birth = models.DateTimeField(null=True)
    bio = models.TextField(null=True)
    verified = models.BooleanField(default=False)
    last_updated = models.DateTimeField(auto_now=True)

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


class UserToken(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=255)
