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
		this.log('Connecting to http://' + document.domain + ':' + location.port + this.namespace);
		this.socket = io.connect('http://' + document.domain + ':' + location.port + this.namespace);
		this.socket.on('connect okay', function(msg) {
			NT.log('Connected okay');
		});
		this.socket.on('log event', function(input) {
			NT.log(input.msg);
		});
		this.socket.on('emoji event', function(input) {
			NT.emoji(input.which);
		});
		this.socket.on('mood event', function(input) {
			NT.mood(input.mood);
		});
	},
	log: function(msg) {
		for (var i = 0; i < this.logMethods.length; ++i) {
			this.logMethods[i](msg);
		}
	},
	emoji: function(which) {
		for (var i = 0; i < this.emojiMethods.length; ++i) {
			this.emojiMethods[i](which);
		}
	},
	mood: function(mood) {
		for (var i = 0; i < this.moodMethods.length; ++i) {
			this.moodMethods[i](mood);
		}
	}
};