import graphene
import graphql_jwt
from graphene_django import DjangoObjectType
from users.mutations import (
    CreateUser,
    UpdateUser,
    LoginUser,
    VerifyUser,
    ResendVerification,
    UpdateMedia,
)
from users.queries import UsersQuery, MeQuery
from birthdays.mutations import (
    CreateBirthday,
    LinkBirthdayToUser,
    UnlinkBirthday,
    DeleteBirthday,
    ToggleBirthdayVisibility,
)
from birthdays.queries import BirthdayQuery


class Query(BirthdayQuery, UsersQuery, MeQuery):
    """ """


class Mutation(graphene.ObjectType):
    """ """

    createUser = CreateUser.Field()
    updateUser = UpdateUser.Field()
    verify_user = VerifyUser.Field()
    resend_verification = ResendVerification.Field()
    update_media = UpdateMedia.Field()
    createBirthday = CreateBirthday.Field()
    linkBirthdayToUser = LinkBirthdayToUser.Field()
    unlinkBirthday = UnlinkBirthday.Field()
    toggleBirthdayVisibility = ToggleBirthdayVisibility.Field()
    deleteBirthday = DeleteBirthday.Field()
    token_auth = LoginUser.Field()
    # verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)