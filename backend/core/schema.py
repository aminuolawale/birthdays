import graphene
from graphene_django import DjangoObjectType
from birthdays.schema import BirthdayQuery, CreateBirthday


class Query(BirthdayQuery):
    """ """


class Mutation(graphene.ObjectType):
    """ """
    createBirthday = CreateBirthday.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
