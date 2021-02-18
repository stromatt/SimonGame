var Gamepattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour;
var started = false;
var level = 0;

$(document).keypress(function (e) {
    if (started === false) {
        nextSequence();
        started = true;
    }
});
var userChosenColour = 0;
$(".btn").click(function (e) {
    userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    var btnAudio = new Audio("sounds/" + userChosenColour + ".mp3");
    btnAudio.play();
    var index;
    switch (userChosenColour) {
        case "red":
            index = 0;
            break;
        case "blue":
            index = 1;
            break;
        case "green":
            index = 2;
            break;
        case "yellow":
            index = 3;
            break;
        default:
            break;
    }

    $(this).addClass("pressed");
    setTimeout(() => {
        $(this).removeClass("pressed");
    }, 100);

    checkAnswer(userChosenColour);
});

var levelFive = 5;

function nextSequence() {
    userClickedPattern = [];
    $("#level-title").text("level " + level);
    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    Gamepattern.push(randomChosenColour);
    var audio;
    var i = 0; //  set your counter
    function myLoop() { //  create a loop function
        setTimeout(function () { //  call a setTimeout when the loop is called
            sequence(i); //  your code here
            i++; //  increment the counter
            if (i < Gamepattern.length) { //  if the counter < 10, call the loop function
                myLoop(); //  ..  again which will trigger another
            } //  ..  setTimeout()
        }, 700);
    }

    if (level < 5 && level != 0) {
        myLoop();
    } else if (level >= 5) {
        setTimeout(function(){
            sequence(levelFive);
            levelFive++;
        },700);
    } else if (level === 0) {
        sequence(0);
    }
    level++;
}

function sequence(i) {
    $("#" + Gamepattern[i]).fadeOut();
    $("#" + Gamepattern[i]).fadeIn();
    audio = new Audio("sounds/" + Gamepattern[i] + ".mp3");
    audio.play();
}

// Is not used. Makes sound inside click function

// function playSound(name) {
//     var audioPlay = new Audio("sounds/" + randomChosenColour + ".mp3");
//     audioPlay.play();
// }

// Is not used. Gives class in click function

// function animatePress(currentColour) {
//     $(".btn").click(function (e) {
//         $(this).addClass("pressed");
//     });
//     setTimeout(() => {
//         $(this).removeClass("pressed");
//     }, 100);
// }

var answerCheck = 0;
var gameOver = new Audio("sounds/wrong.mp3");

function checkAnswer(currentLevel) {
    if (currentLevel === Gamepattern[answerCheck]) {
        answerCheck++;
        if (userClickedPattern.length === Gamepattern.length) {
            setTimeout(() => nextSequence(), 1000);
            answerCheck = 0;
        } else {
            // console.log("Sequence too short");
        }
    } else {
        gameOver.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {

    answerCheck = 0;
    started = false;
    Gamepattern = [];
    userClickedPattern = [];
    level = 0;
    randomChosenColour = 0;
    levelFive=5;
}