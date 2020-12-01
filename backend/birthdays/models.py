from django.db import models
from django.contrib.postgres.fields import ArrayField, HStoreField


class Birthday(models.Model):
    """ """

    date = models.DateTimeField()
    date_created = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.date}"

    def __repr__(self):
        return f"{self.date}"


class Celebrant(models.Model):
    """ """

    birthday = models.OneToOneField(
        Birthday, related_name="celebrant", on_delete=models.CASCADE
    )
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    nickname = models.CharField(max_length=100, default="")
    date_of_birth = models.DateTimeField(null=True)

    def __str__(self):
        return f"{self.last_name}, {self.first_name} - {self.birthday.date}"

    def __repr__(self):
        return f"{self.last_name}, {self.first_name} - {self.birthday.date}"


class Picture(models.Model):
    """ """

    birthday = models.ForeignKey(
        Birthday, related_name="images", on_delete=models.CASCADE
    )
    is_cover = models.BooleanField(default=False)
    name = models.CharField(max_length=100, default="")
    caption = models.CharField(max_length=100, default="")
    file = models.CharField(max_length=255)
    date_created = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.birthday.date} - {self.name}"

    def __repr__(self):
        return f"{self.birthday.date} - {self.name}"
