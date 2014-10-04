NT = {
	socket: null,
	namespace: '/noisytweets',
	logMethods: [],
	emojiMethods: [],
	tweetMethods: [],
	registerLogMethod: function(f) {
		this.logMethods[this.logMethods.length] = f;
	},
	registerEmojiMethod: function(f) {
		this.emojiMethods[this.emojiMethods.length] = f;
	},
	registerTweetMethod: function(f) {
		this.tweetMethods[this.tweetMethods.length] = f;
	},
	setup: function() {
		this.runLogMethods('Connecting to http://' + document.domain + ':' + location.port + this.namespace);
		this.socket = io.connect('http://' + document.domain + ':' + location.port + this.namespace);
		this.socket.on('connect okay', function(msg) {
			NT.runLogMethods('Connected okay');
		});
		this.socket.on('log message', function(input) {
			NT.runLogMethods(input.msg);
		});
		this.socket.on('emoji event', function(input) {
			NT.runEmojiMethods(input.which);
		});
		this.socket.on('tweet event', function(input) {
			NT.runTweetMethods(input);
		});
	},
	runLogMethods: function(msg) {
		for (var i = 0; i < this.logMethods.length; ++i) {
			this.logMethods[i](msg);
		}
	},
	runEmojiMethods: function(which) {
		for (var i = 0; i < this.emojiMethods.length; ++i) {
			this.emojiMethods[i](which);
		}
	},
	runTweetMethods: function(tweet) {
		for (var i = 0; i < this.tweetMethods.length; ++i) {
			this.tweetMethods[i](tweet);
		}
	}
};