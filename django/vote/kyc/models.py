from __future__ import unicode_literals

from django.db import models

from common.models import LifeTimeTrackingModel, ActiveModel
from constituency.models import Constituency
from polling_booth.models import PollingBooth

class KycInfo(ActiveModel):
    
    uuid = models.IntegerField(unique=True, null=True, blank=True)
    name = models.CharField(max_length=80, blank=True, null=True)
    email = models.EmailField(max_length=254, blank=True, null=True)
    mobile = models.IntegerField(blank=True, null=True)
    age = models.IntegerField(blank=True,
                             null=True)
    address = models.CharField(max_length=80,
                                blank=True,
                                null=True)
    constituency = models.ForeignKey(Constituency,
                             related_name='voters',
                             on_delete=models.SET_NULL,
                             blank=True,
                             null=True)
    polling_booth = models.ForeignKey(PollingBooth,
                             related_name='booth_voters',
                             on_delete=models.SET_NULL,
                             blank=True,
                             null=True)

    kyc_done = models.BooleanField(default=False)
    # secret_key = models.CharField(max_length=16)
    # status = models.IntegerField(blank=True, null=True)

    # class Meta:
    #     db_table = 'user'

    def __str__(self):
        return "%s__%s" % (str(self.uuid),
                                   str(self.constituency))

