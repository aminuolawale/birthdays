from core import celery_app
from templated_email import send_templated_mail
from birthdays.models import Birthday


@celery_app.task
def send_email(template_name, sender, recipients, payload):
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
    sender = "riceevng@gmail.com"
    # recipients = [birthday.user.email]
    recipients = ["ammodadeveloper@gmail.com"]
    payload = {
        "username": birthday.user.first_name,
        "creator_username": birthday.creator.first_name,
    }
    send_email(template_name, sender, recipients, payload)