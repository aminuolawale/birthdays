import graphene
from .types import UserType
from django.contrib.auth import get_user_model
from graphql_jwt.decorators import login_required
from addresses.types import AddressRequestType
from .signals import user_changed
from core.types import ErrorType
import graphql_jwt
from .models import UserToken
from core.utils import generate_token
from core.tasks import send_confirmation_email


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
            return CreateUser(
                result=None, ok=False, errors=[{"message": "Email already registered"}]
            )
        user = user.objects.create_user(email, first_name, last_name, password)
        token = UserToken.objects.create(user=user, token=generate_token())
        send_confirmation_email.delay(user.id, token.token)
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


class VerifyUser(graphene.Mutation):

    """ """

    class Arguments:
        token = graphene.String(required=True)

    result = graphene.Field(UserType)
    ok = graphene.Boolean()
    errors = graphene.List(ErrorType)

    @classmethod
    def mutate(cls, root, info, token):
        """ """
        tokens = UserToken.objects.filter(token=token)
        if not tokens.count():
            return VerifyUser(
                result=None,
                ok=False,
                errors=[{"message": "Invalid verification token"}],
            )
        token = tokens.first()
        user = get_user_model().objects.get(id=token.user.id)
        user.verified = True
        user.save()
        tokens.delete()
        return VerifyUser(result=user, ok=True, errors=[])


class ResendVerification(graphene.Mutation):
    """ """

    result = graphene.Field(UserType)
    ok = graphene.Boolean()
    errors = graphene.List(ErrorType)

    @classmethod
    @login_required
    def mutate(
        cls,
        root,
        info,
    ):
        """ """
        user = get_user_model().objects.get(id=info.context.user.id)
        tokens = UserToken.objects.filter(user=user.id)
        tokens.delete()
        token = UserToken.objects.create(user=user, token=generate_token())
        send_confirmation_email.delay(user.id, token.token)
        return ResendVerification(result=user, ok=True, errors=[])