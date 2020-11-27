import graphene
from graphene_django.types import DjangoObjectType
from .models import Birthday, ImageModel
from graphene_file_upload.scalars import Upload


class ImageRequestType(graphene.InputObjectType):
    """ """
    name = graphene.String()
    file = graphene.String(required=True)
    caption = graphene.String()


class DateRequestType(graphene.InputObjectType):
    """ """
    day = graphene.Int(required=True)
    month = graphene.Int(required=True)
    year = graphene.Int(required=True)

class ImageType(DjangoObjectType):
    """ """
    class Meta:
        model = ImageModel
        fields = ("id", "is_cover", "name",
                  "caption", "file", "date_created", "last_updated")


class BirthdayType(DjangoObjectType):
    """ """
    class Meta:
        model = Birthday
        fields = ("id", "celebrant", "images",
                  "date", "date_created", "last_updated")

  

class BirthdayQuery(graphene.ObjectType):
    """ """
    all_birthdays = graphene.List(BirthdayType)

    def resolve_all_birthdays(root, info):
        """ """
        return Birthday.objects.all()


class CreateBirthday(graphene.Mutation):
    """ """

    class Arguments:
        celebrant = graphene.String(required=True)
        cover_image = ImageRequestType()
        extra_images = graphene.List(graphene.String, required=False)
        date = graphene.String(required=True)

    birthday = graphene.Field(BirthdayType)

    @classmethod
    def mutate(cls, root, info, celebrant, cover_image, date=None, extra_images=[]):
        birthday = Birthday(
            celebrant=celebrant, date=date)
        birthday.save()
        image = ImageModel(birthday_id=birthday.id,is_cover=True, **cover_image)
        image.save()
        return CreateBirthday(birthday=birthday)


# schema = graphene.Schema(query=Query)
