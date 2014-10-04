NT = {
	socket: null,
	namespace: '/noisytweets',
	logMethods: [],
	emojiMethods: [],
	moodMethods: [],
	registerLogMethod: function(f) {
		this.logMethods[this.logMethods.length] = f;
	},
	registerEmojiMethod: function(f) {
		this.emojiMethods[this.emojiMethods.length] = f;
	},
	registerMoodMethod: function(f) {
		this.moodMethods[this.moodMethods.length] = f;
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
		this.socket.on('mood event', function(input) {
			NT.runMoodMethods(input.mood);
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
	runMoodMethods: function(mood) {
		for (var i = 0; i < this.moodMethods.length; ++i) {
			this.moodMethods[i](mood);
		}
	}
};