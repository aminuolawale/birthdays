from django.contrib.auth import get_user_model
from django.dispatch import receiver
from users.signals import user_changed
from .models import Address


@receiver(user_changed, sender=get_user_model())
def create_user_address(sender, instance, changed, **kwargs):
    """ """
    if changed:
        address_data = kwargs.get("address")
        Address.objects.create(user=instance, **address_data)
