var level = 0;
var isStarted = false;
$("#start-btn").click(function () {
    if (!isStarted) {
        isStarted = true;
        setTimeout(nextSequence,500);
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

var index = 0;
$(".btn").on("click", function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    // console.log(userChosenColour + " got clicked");
    // console.log(userClickedPattern);
    playSound(userChosenColour);

    if (checkAnswer(index)) {
        index++;
        if (index === level) {
            index = 0;
            userClickedPattern=[];
            setTimeout(nextSequence,1500);
        }
    } else {
        //gameover
        index = 0;
        userClickedPattern=[];
        gamePattern=[];
        $("h1").text("Game Over. Press the Start Game button to start again.");
        level=0;
        isStarted = false;
    }
});

function checkAnswer(index) {
    if (userClickedPattern[index] === gamePattern[index]) {
        return true;
    } else {
        return false;
    }
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

var bubblyButtons = document.querySelectorAll(".btn");
for (var i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener('click', animateButton, false);
}

