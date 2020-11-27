from django.db import models
from django.contrib.postgres.fields import ArrayField, HStoreField

class Birthday(models.Model):
    """ """
    celebrant = models.CharField(max_length=100)
    date = models.DateTimeField()
    date_created = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)


    def __str__(self):
        return f"{self.celebrant} - {self.date}"

    def __repr__(self):
        return f"{self.celebrant} - {self.date}"






class ImageModel(models.Model):
    """ """
    birthday = models.ForeignKey(Birthday, related_name="images", on_delete=models.CASCADE)
    is_cover = models.BooleanField(default=False)
    name = models.CharField(max_length=100, default="")
    caption = models.CharField(max_length=100, default="")
    file = models.CharField(max_length=255)
    date_created = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)


