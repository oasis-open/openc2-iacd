# Generated by Django 2.2.7 on 2019-12-20 13:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('device', '0003_device_multi_actuator'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='device',
            name='multi_actuator',
        ),
    ]
