import web

from config import *

urls = ('/sound.xml', 'soundxml',
    '/changetone/([0-9]+)/(.+)', 'changetone')
app = web.application(urls, globals())

tone = 50

class changetone:

    def GET(self, newtone, secret):
        if TWILIO_SERVER_SECRET != secret:
            return False
        global tone
        tone = newtone
        return True

class soundxml:

    def GET(self):
        web.header('Content-Type', 'text/xml')

        response = ''
        response += '<?xml version="1.0" encoding="UTF-8"?>'
        response += '<Response>'
        response += '<Play>' + TWILIO_SERVER_URL + '/static/sound/' + str(tone) + '.mp3</Play>'
        response += '<Redirect method="GET">' + TWILIO_SERVER_URL + '/sound.xml</Redirect>'
        response += '</Response>'
        
        return response

if __name__ == '__main__':
    app.run()
