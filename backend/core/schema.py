import graphene
import graphql_jwt
from graphene_django import DjangoObjectType
from users.mutations import CreateUser, UpdateUser
from users.queries import UsersQuery
from birthdays.mutations import CreateBirthday, LinkBirthdayToUser
from birthdays.queries import BirthdayQuery


class Query(BirthdayQuery, UsersQuery):
    """ """


class Mutation(graphene.ObjectType):
    """ """

    createUser = CreateUser.Field()
    updateUser = UpdateUser.Field()
    createBirthday = CreateBirthday.Field()
    linkBirthdayToUser = LinkBirthdayToUser.Field()
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
