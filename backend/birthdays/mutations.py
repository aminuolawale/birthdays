import graphene
from graphene_django.types import DjangoObjectType
from .models import Birthday, Picture, Celebrant
from graphql_jwt.decorators import login_required
from .types import BirthdayType, PictureType, CelebrantType, ImageRequestType
from datetime import datetime
from django.contrib.auth import get_user_model


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
    @login_required
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
        date = datetime.strptime(date, "%Y-%m-%d")
        user = info.context.user
        birthday = Birthday(date=date, creator=user)
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


class LinkBirthdayToUser(graphene.Mutation):
    """ """

    class Arguments:
        birthday_id = graphene.String(required=True)
        user_id = graphene.String(required=True)

    birthday = graphene.Field(BirthdayType)
    ok = graphene.String()
    errors = graphene.List(graphene.String)

    @classmethod
    @login_required
    def mutate(
        cls,
        root,
        info,
        birthday_id,
        user_id,
    ):
        birthday = Birthday.objects.get(id=birthday_id)
        creator = birthday.creator
        user = info.context.user
        if user != creator:
            return LinkBirthdayToUser(
                birthday=None,
                ok=False,
                errors=[{"message": "You are not authorized to update this object"}],
            )
        birthday_user = get_user_model().objects.get(id=user_id)
        birthday.user = birthday_user
        birthday.save()
        return LinkBirthdayToUser(birthday=birthday)