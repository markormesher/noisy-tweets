import json
import flaskserver
from textblob import TextBlob
import twilioclient

class TweetAnalyser:

    def __init__(self):
        self._emojidata = json.load(open('static/emoji-data/emoji.json'))

    def _extract_emojis(self, tweet):
        emojis = []
        for character in tweet:
            codepoint_dec = ord(character)
            codepoint = format(codepoint_dec, 'x').upper()
            if codepoint_dec < 255:
                continue
            for emoji in self._emojidata:
                codepoints = [emoji['unified'], emoji['docomo']]
                if codepoint in codepoints:
                    emojis.append(emoji)
        return emojis

    def incoming_tweet(self, tweet):
        emojis = self._extract_emojis(tweet)
        for e in emojis:
            flaskserver.send_emoji_event(e['image'])
        mood = int(TextBlob(tweet).sentiment.polarity * 100)
        twilioclient.change_tone_nonblocking(int((((mood + 100)/200)*86)) + 1)
        flaskserver.send_tweet_event({
            'text': tweet,
            'mood': mood
        })
