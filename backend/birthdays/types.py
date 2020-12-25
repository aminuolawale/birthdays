import graphene
from graphene_django.types import DjangoObjectType
from .models import Birthday, Picture, Celebrant
from core.types import response_type_factory


class ImageRequestType(graphene.InputObjectType):
    """ """

    name = graphene.String()
    file = graphene.String(required=True)
    caption = graphene.String()


class DateRequestType(graphene.InputObjectType):
    """ """

    day = graphene.Int(required=True)
    month = graphene.Int(required=True)
    year = graphene.Int(required=True)


class BirthdayType(DjangoObjectType):
    """ """

    class Meta:
        model = Birthday
        fields = (
            "id",
            "celebrant",
            "images",
            "user",
            "creator",
            "date",
            "visible",
            "date_created",
            "last_updated",
        )


class PictureType(DjangoObjectType):
    """ """

    class Meta:
        model = Picture
        fields = (
            "id",
            "is_cover",
            "name",
            "caption",
            "file",
            "date_created",
            "last_updated",
        )


class CelebrantType(DjangoObjectType):
    """ """

    class Meta:
        model = Celebrant
        fields = ("birthday", "first_name", "last_name", "nickname", "date_of_birth")


class BirthdayResponseType(response_type_factory(BirthdayType)):
    """ """