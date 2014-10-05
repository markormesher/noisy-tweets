import json
import thread
import sys

from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream

from config import *
from flaskserver import start_server
from flaskserver import mate
from tweetanalyser import TweetAnalyser
import twilioclient

class StreamHandler(StreamListener):

    def __init__(self, analyser):
        self._analyser = analyser

    def on_data(self, data):
        datadict = json.loads(data)
        self._analyser.incoming_tweet(datadict['text'])
        return True

    def on_error(self, status):
        print status

class NoisyTweets:

    def __init__(self, auth, keyword):
        mate.set_keyword(keyword)
        stream = Stream(auth, StreamHandler(TweetAnalyser()))
        stream.filter(track=[keyword])

try:
    if __name__ == '__main__':
        auth = OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
        auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)

        thread.start_new_thread(start_server, ())
        if len(sys.argv) > 2:
            twilioclient.make_call(sys.argv[2])
        NoisyTweets(auth, sys.argv[1])
except KeyboardInterrupt:
    print 'Bye bye!'
