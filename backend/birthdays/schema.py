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


class CreateBirthday(graphene.Mutation):
    """ """

    class Arguments:
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)
        nickname = graphene.String(required=False)
        cover_image = ImageRequestType()
        date = graphene.String(required=True)
        extra_images = graphene.List(ImageRequestType, required=False)
        date_of_birth = graphene.String(required=False)

    birthday = graphene.Field(BirthdayType)

    @classmethod
    def mutate(
        cls,
        root,
        info,
        first_name,
        last_name,
        cover_image,
        date,
        nickname=None,
        extra_images=[],
        date_of_birth=None,
    ):
        birthday = Birthday(date=date)
        birthday.save()
        celebrant = Celebrant(
            birthday_id=birthday.id,
            first_name=first_name,
            last_name=last_name,
            nickname=nickname,
            date_of_birth=date_of_birth,
        )
        celebrant.save()
        image = Picture(birthday_id=birthday.id, is_cover=True, **cover_image)
        image.save()
        return CreateBirthday(birthday=birthday)


# schema = graphene.Schema(query=Query)
