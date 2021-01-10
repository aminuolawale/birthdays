from core import celery_app
from templated_email import send_templated_mail
from birthdays.models import Birthday
from users.models import User
from django.conf import settings
from core.utils import build_confirmation_link


@celery_app.task
def send_email(template_name, sender, recipients, payload):
    print("the payload", payload)
    send_templated_mail(
        template_name=template_name,
        from_email=sender,
        recipient_list=recipients,
        context=payload,
    )


@celery_app.task
def send_linked_birthday_email(birthday_id, *args, **kwargs):
    birthday = Birthday.objects.get(id=birthday_id)
    template_name = "linked_birthday"
    sender = settings.EMAIL_FROM_ADDRESS
    # recipients = [birthday.user.email]
    recipients = ["ammodadeveloper@gmail.com"]
    payload = {
        "username": birthday.user.first_name,
        "creator_username": birthday.creator.first_name,
    }
    send_email(template_name, sender, recipients, payload)


@celery_app.task
def send_confirmation_email(user_id, token):
    """ """
    user = User.objects.get(id=user_id)
    template_name = "email_confirmation"
    sender = settings.EMAIL_FROM_ADDRESS
    recipients = [user.email]
    payload = {
        "first_name": user.first_name,
        "link": build_confirmation_link(token),
    }
    send_email(template_name, sender, recipients, payload)
