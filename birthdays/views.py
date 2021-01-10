from rest_framework.viewsets import ModelViewSet
from .models import Birthday
from .serializers import BirthdaySerializer
from datetime import datetime
from rest_framework import status
from rest_framework.response import Response


class BirthdayViewSet(ModelViewSet):
    queryset = Birthday.objects.all()
    serializer_class = BirthdaySerializer
