from rest_framework.routers import DefaultRouter
from .views import BirthdayViewSet


router = DefaultRouter()
router.register("", BirthdayViewSet, "birthdays")


urlpatterns = router.urls
