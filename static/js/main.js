var graphLabels = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
var graphData =   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var pendingMoodQueue = [];
var lastMoodPushed = 0;

// GRAPH

// Get the context of the canvas element we want to select
var ctx = document.getElementById("moodChart").getContext("2d");

var data = {
    labels: graphLabels,
    datasets: [
        {
            label: "Live Mood Dataset",
            fillColor: "rgba(20,150,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#ffaaaa",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: graphData
        }
    ]
};

var myLineChart = new Chart(ctx).Line(data, {
    showScale: true
});

redraw = function() {
    var ctx = document.getElementById("moodChart").getContext("2d");
    var data = {
        labels: graphLabels,
        datasets: [
            {
                label: "Live Mood Dataset",
                fillColor: "rgba(20,150,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#ffaaaa",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: graphData
            }
        ]
    };

    var myLineChart = new Chart(ctx).Line(data, {
        animation: false,
        scaleShowGridLines: false,
        scaleShowLabels: false
    });

    $("#moodChart").html("<canvas id=\"moodChart\" height=\"400\" width=\"710\"></canvas>");
};

// Add a tweet to the table

addTweet = function(tweet_message, mood) {

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

    pendingMoodQueue.push(mood);

	$('<tr class="' + style + '"><td>' + tweet_message + '</td><td>' + mood + '</td></tr>').prependTo('tbody');
};

// Add emojis
addEmoji = function(imgLink) {
    $('<img src="static/emoji-data/img-hangouts-28/' + imgLink + '" />').prependTo('div#emojis-section p');
};

processMoodQueue = function() {

    var averageMood = lastMoodPushed;

    if(pendingMoodQueue.length != 0) {
        var sum = 0;
        for(var i = 0; i < pendingMoodQueue.length; ++i) {
            sum += pendingMoodQueue[i];
        }

        averageMood = Math.round(sum/pendingMoodQueue.length);
		pendingMoodQueue = [];
    }

	playSound(averageMood);

    graphLabels.shift();
    graphData.shift();

    graphLabels.push("");
    graphData.push(averageMood);

    redraw();

    lastMoodPushed = averageMood;

    setTimeout(function() {
        processMoodQueue();
    }, 250);
};

processMoodQueue();

$(function () {
    $('.tltp').tooltip();
});

$('#play-btn').click(function() {
    if ($(this).hasClass('glyphicon-play') ) {

            $(this).removeClass('glyphicon-play');
            $(this).addClass('glyphicon-pause');
            $(this).attr('title', 'Click to play music')
                      .tooltip('fixTitle')
                      .data('bs.tooltip')
                      .$tip.find('.tooltip-inner')
                      .text('Click to play music');

    } else if ($(this).hasClass('glyphicon-pause')) {

        $(this).removeClass('glyphicon-pause');
        $(this).addClass('glyphicon-play');
        $(this).attr('title', 'Click to stop music')
                      .tooltip('fixTitle')
                      .data('bs.tooltip')
                      .$tip.find('.tooltip-inner')
                      .text('Click to stop music');
    }
});