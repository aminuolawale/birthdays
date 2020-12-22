import graphene
from graphene_django.types import DjangoObjectType
from .models import User


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
            "email",
            "phone",
            "avatar",
            "address",
            "created_birthdays",
        )

    def resolve_full_name(self, info):
        """ """
        return f"{self.first_name} {self.last_name}"
