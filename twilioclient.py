import urllib2
import thread

from twilio.rest import TwilioRestClient

from config import *

client = TwilioRestClient(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

def change_tone_nonblocking(newtone):
    thread.start_new_thread(change_tone, (newtone,))

def change_tone(newtone):
    if TWILIO_SERVER_URL = '':
        return False
    response = urllib2.urlopen(TWILIO_SERVER_URL + '/changetone/' + str(newtone) + '/' + TWILIO_SERVER_SECRET).read()
    if response == 'True':
        return True
    else:
        return False

def make_call(to):
    client.calls.create(url=TWILIO_SERVER_URL + '/sound.xml',
        to=to,
        from_=TWILIO_FROM,
        method="GET")
