const buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var toggle=true;
function nextSequence(){//only called at the beginning of the game
    level=level+1;
    $("h1").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    animatePress(randomChosenColour);
    playSound(randomChosenColour);
    userClickedPattern=[];
}

function playSound(name){//function to play the sound
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){//function to change the button colour when pressed
    var curr=$("#"+currentColour);
    curr.addClass("pressed");
    setTimeout(function (){
        curr.removeClass("pressed");
    },100);
}
function startOver(){
    toggle=true;
    level=0;
    gamePattern=[];
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
         var audio=new Audio("sounds/wrong.mp3");
         audio.play();
         $("body").addClass("game-over");
         setTimeout(function(){
            $("body").removeClass("game-over");
         },200);
         $("h1").text("Game Over, Press Any Key to Restart");
         startOver();
    }

}

$(".btn").click(function(){//activated whenever a button is clicked
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})
$(document).keydown(function(){
    if(toggle==true){
        nextSequence();
        toggle=false;    
    }
})
 

