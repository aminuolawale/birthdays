import graphene
from graphene_django.types import DjangoObjectType
from .models import User
from .types import UserType
from django.contrib.auth import get_user_model
from graphql_jwt.decorators import login_required
from addresses.types import AddressRequestType


class UsersQuery(graphene.ObjectType):
    """ """

    all_users = graphene.List(UserType)

    def resolve_all_users(root, info):
        """ """
        return User.objects.all()


class MeQuery(graphene.ObjectType):
    """ """

    user = graphene.Field(UserType)

    # @login_required
    def resolve_user(root, info):
        """ """
        return info.context.user