import json
import flaskserver
from random import randrange

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
        flaskserver.send_mood_event(randrange(-100, 100))