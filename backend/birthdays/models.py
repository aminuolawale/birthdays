from django.db import models
from django.contrib.postgres.fields import ArrayField


class Birthday(models.Model):
    """ """
    celebrant = models.CharField(max_length=100)
    cover_image = models.CharField(max_length=100)
    extra_images = ArrayField(models.CharField(max_length=100))
    date = models.DateTimeField()
    date_created = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.celebrant} - {self.date}"

    def __repr__(self):
        return f"{self.celebrant} - {self.date}"
