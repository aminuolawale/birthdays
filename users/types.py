import graphene
from graphene_django.types import DjangoObjectType
from .models import User
from core.types import response_type_factory


class UserType(DjangoObjectType):
    """ """

    full_name = graphene.String()

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "first_name",
            "last_name",
            "middle_name",
            "nickname",
            "bio",
            "email",
            "phone",
            "avatar",
            "banner",
            "address",
            "date_of_birth",
            "date_joined",
            "verified",
            "created_birthdays",
        )

    def resolve_full_name(self, info):
        """ """
        return f"{self.first_name} {self.last_name}"


class UserResponseType(response_type_factory(UserType)):
    """ """
