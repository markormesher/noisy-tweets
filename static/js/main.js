var graphLabels = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
var graphData =   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var pendingMoodQueue = [];
var lastMoodPushed = 0;

var soundsOn = true;

// set up graph
$("#moodChart").html("<canvas id=\"moodChart\" height=\"400\" width=\"710\"></canvas>");
var ctx = document.getElementById("moodChart").getContext("2d");

var data = {
    labels: graphLabels,
    datasets: [
        {
            fillColor: "transparent",
            strokeColor: "rgba(40,40,40,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#ffaaaa",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: graphData
        }
    ]
};

new Chart(ctx).Line(data, {
	animation: false,
	scaleShowGridLines: false,
	scaleShowLabels: false,
	showScale: true,
	scaleOverride: true,
	scaleStartValue: -100,
	scaleStepWidth: 10,
	scaleSteps: 20
});

redraw = function() {
    var ctx = document.getElementById("moodChart").getContext("2d");
    var data = {
        labels: graphLabels,
        datasets: [
            {
                fillColor: "transparent",
                strokeColor: "rgba(40,40,40,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#ffaaaa",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: graphData
            }
        ]
    };

    new Chart(ctx).Line(data, {
        animation: false,
        scaleShowGridLines: false,
        scaleShowLabels: false,
		showScale: true,
		scaleOverride: true,
		scaleStartValue: -100,
		scaleStepWidth: 10,
		scaleSteps: 20
    });
};

// add tweet
addTweet = function(tweet_message, mood) {
	// add mood to pending queue
    pendingMoodQueue.push(mood);

	// determine display
    var style;
    if(mood <= -60) {
        style = "super-danger";
    } else if (mood <= -20) {
        style = "danger";
    } else if (mood <= 20) {
        style = "";
    } else if (mood <= 60) {
        style = "success";
    } else {
        style = "super-success";
    }

	//$('<tr class="' + style + '"><td>' + tweet_message + '</td><td>' + mood + '</td></tr>').prependTo('tbody');
	$('tbody').find('tr').slice(50,1000).remove();
};

// add emoji
addEmoji = function(imgLink) {
    //$('<img src="static/emoji-data/img-hangouts-28/' + imgLink + '" />').prependTo('div#emojis-section p');
	$('div#emojis-section p').find('img').slice(50,1000).remove();
};

// process all moods that have arrived since the last cycle
processMoodQueue = function() {

	// calc average of latest moods
    var averageMood = lastMoodPushed;
    if(pendingMoodQueue.length != 0) {
        var sum = 0;
        for(var i = 0; i < pendingMoodQueue.length; ++i) {
            sum += pendingMoodQueue[i];
        }
        averageMood = Math.round(sum/pendingMoodQueue.length);
		pendingMoodQueue = [];
    }

	// play sound
	if (soundsOn) {
		playSound(averageMood);
	}

	// add to graph
    graphData.shift();
    graphData.push(averageMood);
    redraw();

	// store
    lastMoodPushed = averageMood;

	// repeat
    setTimeout(function() {
        processMoodQueue();
    }, 250);
};

processMoodQueue();

// play/pause button
$('#play-btn').click(function() {
	if ($(this).hasClass('glyphicon-play') ) {
		soundsOn = true;
		$(this).removeClass('glyphicon-play');
		$(this).addClass('glyphicon-pause');
	} else {
		soundsOn = false;
		$(this).removeClass('glyphicon-pause');
		$(this).addClass('glyphicon-play');
	}
});