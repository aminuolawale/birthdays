from rest_framework import serializers
from .models import Birthday
from datetime import datetime


class BirthdaySerializer(serializers.ModelSerializer):
    """ """
    class Meta:
        model = Birthday
        fields = "__all__"

    def to_internal_value(self, data):
        date = data.get("date")
        date = datetime.strptime(date, "%Y-%m-%d")
        data.update(date=date)
        return data

    def handle_images(self, data):
        processed_images = {}
        cover_image = data.get("cover_image")
        if cover_image:
            cover_image = upload_image(cover_image)
            processed_images.update(cover_image=cover_image)
        extra_images = data.get("extra_images", [])
        extra_images = upload_images(extra_images)
        processed_images.update(extra_images=extra_images)
        return processed_images
