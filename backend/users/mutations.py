import graphene
from .models import User
from .types import UserType
from django.contrib.auth import get_user_model
from graphql_jwt.decorators import login_required
from addresses.types import AddressRequestType
from .signals import user_changed


class CreateUser(graphene.Mutation):
    """ """

    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)
        username = graphene.String(required=False)
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)
        middle_name = graphene.String(required=False)
        phone = graphene.String(required=False)

    user = graphene.Field(UserType)

    @classmethod
    def mutate(cls, root, info, email, first_name, last_name, password):
        user = get_user_model()
        user = user.objects.create_user(email, first_name, last_name, password)
        return CreateUser(user=user)


class UpdateUser(graphene.Mutation):
    """ """

    class Arguments:
        username = graphene.String(required=False)
        first_name = graphene.String(required=False)
        last_name = graphene.String(required=False)
        middle_name = graphene.String(required=False)
        phone = graphene.String(required=False)
        address = AddressRequestType()

    user = graphene.Field(UserType)

    @classmethod
    @login_required
    def mutate(cls, root, info, **kwargs):
        user = info.context.user
        address = kwargs.pop("address")
        user = user.update_user(**kwargs)
        user_changed.send(
            sender=get_user_model(), instance=user, changed=True, address=address
        )
        return UpdateUser(user=user)