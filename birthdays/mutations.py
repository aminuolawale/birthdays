import graphene
from graphene_django.types import DjangoObjectType
from .models import Birthday, Picture, Celebrant
from graphql_jwt.decorators import login_required
from .types import BirthdayType, PictureType, CelebrantType, ImageRequestType
from datetime import datetime
from django.contrib.auth import get_user_model
from core.tasks import send_linked_birthday_email
from core.types import ErrorType


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

    result = graphene.Field(BirthdayType)

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
        auth_user = info.context.user
        birthday = Birthday(date=date, creator=auth_user)
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
        return CreateBirthday(result=birthday, ok=True, errors=[])


class LinkBirthdayToUser(graphene.Mutation):
    """ """

    class Arguments:
        birthday_id = graphene.String(required=True)
        user_id = graphene.String(required=True)

    result = graphene.Field(BirthdayType)
    ok = graphene.Boolean()
    errors = graphene.List(ErrorType)

    @classmethod
    @login_required
    def mutate(
        cls,
        root,
        info,
        birthday_id,
        user_id,
    ):
        try:
            birthday = Birthday.objects.get(id=birthday_id)
        except:
            return LinkBirthdayToUser(
                result=None,
                ok=False,
                errors=[{"message": f"No Birthday record found with id {birthday_id}"}],
            )
        creator = birthday.creator
        auth_user = info.context.user
        if auth_user != creator:
            return LinkBirthdayToUser(
                result=None,
                ok=False,
                errors=[{"message": "You are not authorized to access this record"}],
            )
        if birthday.user and str(birthday.user.id) == user_id:
            return LinkBirthdayToUser(result=birthday, ok=True, errors=[])
        birthday_user = get_user_model().objects.get(id=user_id)
        birthday.user = birthday_user
        birthday.save()
        send_linked_birthday_email.delay(birthday.id)
        return LinkBirthdayToUser(result=birthday)


class UnlinkBirthday(graphene.Mutation):
    """ """

    class Arguments:
        birthday_id = graphene.String(required=True)

    result = graphene.Field(BirthdayType)
    ok = graphene.Boolean()
    errors = graphene.List(ErrorType)

    @classmethod
    @login_required
    def mutate(
        cls,
        root,
        info,
        birthday_id,
    ):
        birthday = Birthday.objects.get(id=birthday_id)
        auth_user = info.context.user
        creator = birthday.creator
        birthday_user = birthday.user
        if birthday_user:
            if auth_user != birthday_user:
                return DeleteBirthday(
                    result=None,
                    ok=False,
                    errors=[
                        {"message": "You are not authorized to access this record"}
                    ],
                )
        elif auth_user != creator:
            return DeleteBirthday(
                result=None,
                ok=False,
                errors=[{"message": "You are not authorized to access this record"}],
            )
        birthday.user = None
        birthday.save()
        return UnlinkBirthday(result=birthday, ok=True, errors=[])


class ToggleBirthdayVisibility(graphene.Mutation):
    """ """

    class Arguments:
        birthday_id = graphene.String(required=True)

    result = graphene.Field(BirthdayType)
    ok = graphene.Boolean()
    errors = graphene.List(ErrorType)

    @classmethod
    @login_required
    def mutate(
        cls,
        root,
        info,
        birthday_id,
    ):
        try:
            birthday = Birthday.objects.get(id=birthday_id)
        except:
            return ToggleBirthdayVisibility(
                result=None,
                ok=False,
                errors=[
                    {"message": f"No record found for Birthday with id: {birthday_id}"}
                ],
            )

        auth_user = info.context.user
        creator = birthday.creator
        birthday_user = birthday.user
        if birthday_user:
            if auth_user != birthday_user:
                return DeleteBirthday(
                    result=None,
                    ok=False,
                    errors=[
                        {"message": "You are not authorized to access this record"}
                    ],
                )
        elif auth_user != creator:
            return DeleteBirthday(
                result=None,
                ok=False,
                errors=[{"message": "You are not authorized to access this record"}],
            )
        birthday.visible = not birthday.visible
        birthday.save()
        return ToggleBirthdayVisibility(result=birthday, ok=True, errors=[])


class DeleteBirthday(graphene.Mutation):
    """ """

    class Arguments:
        birthday_id = graphene.String(required=True)

    result = graphene.Field(BirthdayType)
    ok = graphene.Boolean()
    errors = graphene.List(ErrorType)

    @classmethod
    @login_required
    def mutate(
        cls,
        root,
        info,
        birthday_id,
    ):
        try:
            birthday = Birthday.objects.get(id=birthday_id)
        except:
            return DeleteBirthday(
                result=None,
                ok=False,
                errors=[
                    {"message": f"No record found for Birthday with id: {birthday_id}"}
                ],
            )

        auth_user = info.context.user
        creator = birthday.creator
        birthday_user = birthday.user
        if birthday_user:
            if auth_user != birthday_user:
                return DeleteBirthday(
                    result=None,
                    ok=False,
                    errors=[
                        {"message": "You are not authorized to access this record"}
                    ],
                )
        elif auth_user != creator:
            return DeleteBirthday(
                result=None,
                ok=False,
                errors=[{"message": "You are not authorized to access this record"}],
            )
        birthday.delete()
        return DeleteBirthday(result=None, ok=True, errors=[])