from django.db import models
from django.contrib.postgres.fields import ArrayField


class Book(models.Model):

    title = models.CharField(max_length=512)
    authors = ArrayField(
        models.CharField(max_length=256)
    )
    cover = models.ImageField(null=True, blank=True)
    notes = models.TextField(default="")

    RATING_CHOICES = [(i,i) for i in range(6)]
    rating = models.PositiveSmallIntegerField(choices=RATING_CHOICES, null=True, blank=True)

    UNSTARTED = 0
    STARTED = 1
    FINISHED = 2
    READING_STATUS_CHOICES = (
        (UNSTARTED, "Unstarted"),
        (STARTED, "Started"),
        (FINISHED, "Finished"),
    )
    reading_status = models.PositiveSmallIntegerField(choices=READING_STATUS_CHOICES, default=UNSTARTED)
