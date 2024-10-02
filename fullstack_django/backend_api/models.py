from django.db import models


class Video(models.Model):
    title = models.CharField(max_length=100)
    channel = models.CharField(max_length=100)
