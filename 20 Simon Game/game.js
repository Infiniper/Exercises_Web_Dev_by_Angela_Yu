// Improvement needed: before playing audio, need to interact with the document.

var level = 0;
var isStarted = false;
$(document).keydown(function () {
    if (!isStarted) {
        isStarted = true;
        nextSequence();
        game();
    }
});

var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence() {
    if (isStarted) {
        $("h1").text("Level:" + level);
    }
    level++;
    var randomChosenColour = buttonColours[Math.floor(Math.random() * 4)];
    gamePattern.push(randomChosenColour);
    var select = $("#" + randomChosenColour);
    select.fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
}

function game() {
    var gameOver = false;
    while (!gameOver) {
        for (var i = 0; i < level; i++) {
            $(".btn").on("click", function () {
                var userChosenColour = this.id;
                userClickedPattern.push(userChosenColour);
                // console.log(userChosenColour + " got clicked");
                // console.log(userClickedPattern);
                playSound(userChosenColour);
            });
        }
        gameOver = isGameOver(level);
        nextSequence();
    }
}



function isGameOver(currentLevel) {
    for (var i = 0; i < currentLevel; i++) {
        if (userClickedPattern[i] != gamePattern[i]) {
            $("h1").text("Game Over");
            return true;
        }
    }
    userClickedPattern = [];
    return false;
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}











// To add animation on the buttons  
function animateButton(e) {
    e.preventDefault();
    //reset animation
    e.target.classList.remove('animate');
    e.target.classList.add('animate');
    setTimeout(function () {
        e.target.classList.remove('animate');
    }, 700);
}

var bubblyButtons = document.querySelectorAll(".bubbly-button-green, .bubbly-button-red, .bubbly-button-yellow, .bubbly-button-blue");
for (var i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener('click', animateButton, false);
}

