from django.contrib.auth import get_user_model
from django.dispatch import receiver
from users.signals import user_changed
from .models import Address


@receiver(user_changed, sender=get_user_model())
def create_user_address(sender, instance, changed, **kwargs):
    """ """
    address_data = kwargs.get("address")
    if changed and address_data:
        address_data = kwargs.get("address")
        existing_address = Address.objects.get(user=instance)
        if (
            existing_address
            and existing_address.lat == address_data.get("lat")
            and existing_address.lng == address_data.get("lng")
        ):
            return
        exiting_address.delete()
        Address.objects.create(user=instance, **address_data)
