

var graphLabels = [""]

// GRAPH

// Get the context of the canvas element we want to select
var ctx = document.getElementById("moodChart").getContext("2d");

var data = {
    labels: ["", "", "", "", "", "", ""],
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
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

var myLineChart = new Chart(ctx).Line(data, {
    showScale: true
});

redraw = function() {
    var ctx = document.getElementById("moodChart").getContext("2d");

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
        showScale: true
    });
    
    $("#moodChart").html("<canvas id=\"moodChart\" height=\"400\" width=\"710\"></canvas>");
}

addTweets = function(tweet_message, mood) {
    
    if(mood < -50) {
        $( "tbody" ).append( "<tr class=\"danger\"><td>" + tweet_message + "</td><td>" + mood + "</td></tr>" );   
    } else if (mood > 50) {
        $( "tbody" ).append( "<tr class=\"success\"><td>" + tweet_message + "</td><td>" + mood + "</td></tr>" );   
    } else {
        $( "tbody" ).append( "<tr><td>" + tweet_message + "</td><td>" + mood + "</td></tr>" );   
    }
}