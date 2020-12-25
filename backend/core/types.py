import graphene


class ErrorType(graphene.ObjectType):
    """ """

    message = graphene.String()


def response_type_factory(response_type, many=False):
    """ """

    class ResponseType(graphene.ObjectType):
        """ """

        results = graphene.List(response_type)
        result = graphene.Field(response_type)
        ok = graphene.String()
        errors = graphene.List(ErrorType)

    return ResponseType