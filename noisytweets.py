import json
import sys

from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream

from config import *
from tweetanalyser import TweetAnalyser

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
        stream = Stream(auth, StreamHandler(TweetAnalyser()))
        stream.filter(track=[keyword])

if __name__ == '__main__':
    auth = OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
    auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)

    NoisyTweets(auth, sys.argv[1])
