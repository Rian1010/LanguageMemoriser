from django.db import models

class userWordList(models.Model):
    word = models.CharField(max_length=240, null=False, blank=False)
    definition = models.CharField(max_length=240, null=False, blank=False)

    verbose_name_plural = 'User Word Lists'

    def __str__(self):
        return self.word + " - " + self.definition
