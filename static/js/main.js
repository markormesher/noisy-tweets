

var graphLabels = ["", "", "", "", "", "", "", ""];
var graphData = [65, 59, 80, 81, 56, 55, 40, -13];

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
            // TODO: Assign array of data here
            data: graphData
        }
    ]
};

var myLineChart = new Chart(ctx).Line(data, {
    showScale: true
});

redraw = function() {
    var ctx = document.getElementById("moodChart").getContext("2d");
    // TODO Remove animation
    var data = {
        // TODO: Assign graphLabels to this
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "Live Mood Dataset",
                fillColor: "rgba(20,150,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#ffaaaa",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 80, 81, 56, 55, 40]
            }
        ]
    };

    var myLineChart = new Chart(ctx).Line(data, {
        animation: false,
        scaleShowGridLines: false,
        scaleShowLabels: false
    });
    
    $("#moodChart").html("<canvas id=\"moodChart\" height=\"400\" width=\"710\"></canvas>");
}

// Add a tweet to the table

// -100 ~ -60
// -60 ~ -20
// -20 - 20
// 20 ~ 60
// 60 ~ 100
addTweets = function(tweet_message, mood) {
    
    if(mood < -60) {
        $( "tbody" ).append( "<tr class=\"super-danger\"><td>" + tweet_message + "</td><td>" + mood + "</td></tr>" );   
    } else if (mood >= -59 && mood <= -20) {
        $( "tbody" ).append( "<tr class=\"danger\"><td>" + tweet_message + "</td><td>" + mood + "</td></tr>" );   
    } else if (mood >= -19 && mood <= 20) {
        $( "tbody" ).append( "<tr><td>" + tweet_message + "</td><td>" + mood + "</td></tr>" );   
    } else if (mood >= 21 && mood <= 60) {
        $( "tbody" ).append( "<tr class=\"success\"><td>" + tweet_message + "</td><td>" + mood + "</td></tr>" );   
    } else if (mood > 60) {
        $( "tbody" ).append( "<tr class=\"super-success\"><td>" + tweet_message + "</td><td>" + mood + "</td></tr>" );   
    }
}

// Add emojis
addEmojis = function(imgLink) {
    $( "emojis-section p" ).append( "<img src=" + imgLink + ">" );   
}

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