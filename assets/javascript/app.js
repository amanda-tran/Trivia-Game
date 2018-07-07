//TIMER 

var number = 60;
var intervalId;
var startbutton = document.getElementById("start");
var submitbutton = document.getElementById("submit");
var correctanswers = ["Teal"]


$("document").ready(function () {
    $("#questions").hide();
    $("#results").hide();


    startbutton.onclick = function() {
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
        $("#questions").show();
    }


    function decrement() {
        number--;

        $("#timer").html("<h2>" + number + "</h2>");

        if (number === 0) {
            stop();

        }
    }

    function stop() {
        clearInterval(intervalId);
        $("#results").show();
        checkanswers();

    }
    startbutton.onclick = function() {
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
        $("#questions").show();
    }
    $("#questions").submit(function (event) {
        stop();
        console.log(event)

    })

    function checkanswers() {

    }
})
