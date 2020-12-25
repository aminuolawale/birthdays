from django.contrib.auth.models import UserManager


class CustomUserManager(UserManager):
    """ This is the manager for the UserAccountModel"""

    def create_user(self, email, first_name, last_name, password):
        if not email:
            raise ValueError("Users must have an email address")
        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, last_name=last_name)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, first_name, last_name, password):
        """ """
        user = self.create_user(email, first_name, last_name, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user

    def update_user(self, user_id, **kwargs):
        user = self.get(id=user_id)
        for k, v in kwargs.items():
            setattr(user, k, v)
        user.save()
        return user