import graphene
from graphene_django.types import DjangoObjectType
from .models import Birthday, Picture, Celebrant
from .types import (
    BirthdayType,
    PictureType,
    CelebrantType,
    ImageRequestType,
    BirthdayResponseType,
)


class BirthdayQuery(graphene.ObjectType):
    """ """

    all_birthdays = graphene.Field(BirthdayResponseType)
    birthday_by_id = graphene.Field(BirthdayResponseType, id=graphene.String())
    private_birthday_by_id = graphene.Field(BirthdayResponseType, id=graphene.String())

    def resolve_all_birthdays(root, info):
        """ """
        birthdays = Birthday.objects.filter(visible=True)
        return BirthdayResponseType(results=birthdays, ok=True, errors=[])

    def resolve_birthday_by_id(root, info, id):
        try:
            birthday = Birthday.objects.get(id=id, visible=True)
        except:
            return BirthdayResponseType(
                results=None,
                ok=False,
                errors=[{"message": f"No record found for Birthday with id {id}"}],
            )
        return BirthdayResponseType(result=birthday, ok=True, errors=[])

    def resolve_private_birthday_by_id(root, info, id):
        try:
            birthday = Birthday.objects.get(id=id)
        except:
            return BirthdayResponseType(
                results=None,
                ok=False,
                errors=[{"message": f"No record found for Birthday with id {id}"}],
            )
        return BirthdayResponseType(result=birthday, ok=True, errors=[])