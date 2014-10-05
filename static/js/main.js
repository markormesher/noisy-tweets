// settings
var graphSize = 50;

var graphLabels = [];
var graphData = [];
var graphBaseLine = [];
for (var i = 0; i < graphSize; ++i) {
	graphLabels[i] = "";
	graphData[i] = 0;
	graphBaseLine[i] = 0;
}

var pendingMoodQueue = [];

var playing = true;

// set up graph
$("#moodChart").html("<canvas id=\"moodChart\" height=\"400\" width=\"710\"></canvas>");
var ctx = document.getElementById("moodChart").getContext("2d");

var data = {
    labels: graphLabels,
    datasets: [
        {
            data: graphData
        },
		{
			data: graphBaseLine
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
	scaleStepWidth: 100,
	scaleSteps: 2,
	scaleLabel: "<%=value%>"
});

redraw = function() {
    var ctx = document.getElementById("moodChart").getContext("2d");
    var data = {
        labels: graphLabels,
        datasets: [
			{
				fillColor: "transparent",
				strokeColor: "#c0c0c0",
				data: graphBaseLine
			},
            {
				fillColor: "transparent",
				strokeColor: "#333333",
                data: graphData
            }
        ]
    };

    new Chart(ctx).Line(data, {
        animation: false,
        scaleShowGridLines: false,
        scaleShowLabels: true,
		showTooltips: false,
		showScale: true,
		scaleOverride: true,
		scaleStartValue: -100,
		scaleStepWidth: 25,
		scaleSteps: 8,
		scaleLabel: "<%=(value==100?'☀':(value==-100?'☂':(value==0?'☁':'')))%>",
		scaleFontSize: 32,
		scaleFontStyle: "bold",
		pointDot: false
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

	$('<tr class="' + style + '"><td>' + tweet_message + '</td><td style="text-align: center;">' + mood + '</td></tr>').prependTo('#tweets-table tbody');
	$('#tweets-table').find('tbody').find('tr').slice(20,1000).remove();
};

// add emoji
addEmoji = function(imgLink) {
    $('<img src="static/emoji-data/img-hangouts-28/' + imgLink + '" />&nbsp;&nbsp;&nbsp;').prependTo('div#emojis-section p');
	$('div#emojis-section p').find('img').slice(40,42).remove();
};

// process all moods that have arrived since the last cycle
processMoodQueue = function() {

	// calc average of latest moods
    var averageMood = 0;
	var newSound = false;
    if(pendingMoodQueue.length != 0) {
		newSound = true;
        var sum = 0;
        for(var i = 0; i < pendingMoodQueue.length; ++i) {
            sum += pendingMoodQueue[i];
        }
        averageMood = Math.round(sum/pendingMoodQueue.length);
		pendingMoodQueue = [];
    }

	if (playing) {
		// play sound
		if (newSound) playSound(averageMood);

		// add to graph
		graphData.shift();
		graphData.push(averageMood);
		redraw();
	}

	// repeat
    setTimeout(function() {
        processMoodQueue();
    }, 100);
};

processMoodQueue();

// play/pause button
$('#play-btn').click(function() {
	if ($(this).hasClass('glyphicon-play') ) {
		playing = true;
		$(this).removeClass('glyphicon-play');
		$(this).addClass('glyphicon-pause');
	} else {
		playing = false;
		$(this).removeClass('glyphicon-pause');
		$(this).addClass('glyphicon-play');
	}
});

// change keyword
changeKeyword = function (new_keyword) {
	NT.changeKeyword(new_keyword);
};

$('#change-btn').click(function (){
	changeKeyword(prompt("New keyword?"));
});