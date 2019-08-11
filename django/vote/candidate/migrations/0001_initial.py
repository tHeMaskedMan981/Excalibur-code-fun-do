# Generated by Django 2.0.7 on 2019-06-05 07:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('constituency', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Candidate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('is_active', models.BooleanField(default=True)),
                ('candidate_name', models.CharField(blank=True, max_length=255, null=True)),
                ('party', models.CharField(blank=True, max_length=255, null=True)),
                ('age', models.IntegerField(blank=True, null=True)),
                ('constituency', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='candidates', to='constituency.Constituency')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
