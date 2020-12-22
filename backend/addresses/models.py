from django.db import models
from django.contrib.auth import get_user_model

user_model = get_user_model()
# Create your models here.


class Address(models.Model):
    user = models.OneToOneField(
        user_model, related_name="address", on_delete=models.CASCADE
    )
    street = models.CharField(max_length=100)
    city = models.CharField(max_length=20)
    state = models.CharField(max_length=20)
    country = models.CharField(max_length=20)
    lat = models.FloatField(null=True)
    lng = models.FloatField(null=True)

    def __str__(self):
        return f"{self.street}, {self.city}, {self.state}, {self.country}"