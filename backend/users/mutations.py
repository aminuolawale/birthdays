import graphene
from .types import UserType
from django.contrib.auth import get_user_model
from graphql_jwt.decorators import login_required
from addresses.types import AddressRequestType
from .signals import user_changed
from core.types import ErrorType
import graphql_jwt


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

    result = graphene.Field(UserType)
    ok = graphene.Boolean()
    errors = graphene.List(ErrorType)

    @classmethod
    def mutate(cls, root, info, email, first_name, last_name, password):
        user = get_user_model()
        existing_user = user.objects.filter(email=email)
        if existing_user.count():
            print("so here")
            return CreateUser(
                result=None, ok=False, errors=[{"message": "Email already registered"}]
            )
        user = user.objects.create_user(email, first_name, last_name, password)
        return CreateUser(result=user, ok=True, errors=[])


class UpdateUser(graphene.Mutation):
    """ """

    class Arguments:
        username = graphene.String(required=False)
        first_name = graphene.String(required=False)
        last_name = graphene.String(required=False)
        middle_name = graphene.String(required=False)
        phone = graphene.String(required=False)
        address = AddressRequestType()

    result = graphene.Field(UserType)
    ok = graphene.Boolean()
    errors = graphene.List(ErrorType)

    @classmethod
    @login_required
    def mutate(cls, root, info, **kwargs):
        user = info.context.user
        address = kwargs.pop("address", None)
        user = get_user_model().objects.update_user(user.id, **kwargs)
        user_changed.send(
            sender=get_user_model(), instance=user, changed=True, address=address
        )
        return UpdateUser(result=user, ok=True, errors=[])


class LoginUser(graphql_jwt.JSONWebTokenMutation):
    """ """

    result = graphene.Field(UserType)
    ok = graphene.Boolean()
    errors = graphene.List(ErrorType)

    @classmethod
    def resolve(cls, root, info, **kwargs):
        return cls(result=info.context.user, ok=True, errors=[])
