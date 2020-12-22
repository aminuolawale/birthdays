import graphene
from graphene_django.types import DjangoObjectType
from .models import Birthday, Picture, Celebrant
from .types import BirthdayType, PictureType, CelebrantType, ImageRequestType


class BirthdayQuery(graphene.ObjectType):
    """ """

    all_birthdays = graphene.List(BirthdayType)

    def resolve_all_birthdays(root, info):
        """ """
        return Birthday.objects.all()
