import json

class TweetAnalyser:

    def __init__(self):
        self._emojidata = json.load(open('emoji-data/emoji.json'))

    def _extract_emojis(self, tweet):
        emojis = []

        for character in tweet:
            codepoint = format(ord(character), 'x').upper()
            for emoji in self._emojidata:
                codepoints = [emoji['unified'], emoji['docomo']]
                if codepoint in codepoints:
                    emojis.append(emoji)
                    print emoji

        return emojis

    def incoming_tweet(self, tweet):
        emojis = self._extract_emojis(tweet)
