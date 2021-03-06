from secrets import token_hex
from django.conf import settings


def generate_token(length=24):
    return token_hex(length)


def build_confirmation_link(token):
    return f"{settings.EMAIL_PAGE_DOMAIN}/verify_account/{token}"


def translate(val, table):
    for key, value in table.items():
        if val == key:
            return value
    return val