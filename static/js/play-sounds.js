var readyToPlay = false;

function playSound(sentiment) {
	if (!readyToPlay) return;
	var songNr = Math.round(((sentiment + 100)/200)*86) + 1;
	console.log(songNr);
	var mySound = soundManager.createSound({
		url: '/static/sound/' + songNr + '.mp3'
	});
	mySound.play();
}

soundManager.setup({
	onready: function() {
		readyToPlay = true;
	}
});