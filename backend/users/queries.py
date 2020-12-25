import graphene
from graphene_django.types import DjangoObjectType
from .models import User
from .types import UserType, UserResponseType
from django.contrib.auth import get_user_model
from graphql_jwt.decorators import login_required
from addresses.types import AddressRequestType


class UsersQuery(graphene.ObjectType):
    """ """

    all_users = graphene.List(UserResponseType)
    user = graphene.Field(UserResponseType, id=graphene.String())

    def resolve_all_users(root, info):
        """ """
        users = User.objects.all()
        return UserResponseType(results=users, ok=True, errors=[])

    def resolve_user(root, info, id):
        """ """
        try:
            user = User.objects.get(id=id)
        except:
            return UserResponseType(
                result=None,
                ok=False,
                errors=[{"message": f"No User record with id {id} found"}],
            )
        return UserResponseType(result=user, ok=True, errors=[])


class MeQuery(graphene.ObjectType):
    """ """

    me = graphene.Field(UserResponseType)

    @login_required
    def resolve_me(root, info):
        """ """
        return UserResponseType(result=info.context.user, ok=True, errors=[])