# Generated by Django 2.0.7 on 2019-06-05 04:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kyc', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='kycinfo',
            name='uuid',
            field=models.IntegerField(blank=True, editable=False, null=True, unique=True),
        ),
    ]
