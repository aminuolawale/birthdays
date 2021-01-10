import graphene
from graphene_django.types import DjangoObjectType
from .models import Address


class AddressType(DjangoObjectType):
    """ """

    class Meta:
        model = Address
        fields = ("id", "user", "street", "state", "city", "country", "lat", "lng")


class AddressRequestType(graphene.InputObjectType):
    """ """

    street = graphene.String(required=True)
    city = graphene.String(required=False)
    state = graphene.String(required=True)
    country = graphene.String(required=True)
    lat = graphene.Float(required=True)
    lng = graphene.Float(required=True)
