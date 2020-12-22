# Generated by Django 3.1.3 on 2020-12-22 18:02

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('street', models.CharField(max_length=100)),
                ('city', models.CharField(max_length=20)),
                ('state', models.CharField(max_length=20)),
                ('country', models.CharField(max_length=20)),
                ('lat', models.FloatField(null=True)),
                ('lng', models.FloatField(null=True)),
            ],
        ),
    ]
