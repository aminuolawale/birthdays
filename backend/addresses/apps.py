from django.apps import AppConfig


class AddressesConfig(AppConfig):
    name = "addresses"

    def ready(self):
        """ """
        import addresses.signals
