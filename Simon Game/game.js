

var buttonColors=["red","blue","green","yellow"];
var userClickedPattern = [];
var gamePattern=[];

var started=false;

// #start
var level=0;
$(document).on('keydown',function(){
     if(!started){
          $("#level-title").text("Level "+level);
          nextSequence();
          started=true;
     }
} );

$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);

});


function nextSequence(){
     userClickedPattern=[];
     level++;
     $("#level-title").text("Level " + level);
     var randomNumber=Math.floor(Math.random()*4);
     var randomChosenColor=buttonColors[randomNumber];
     gamePattern.push(randomChosenColor);

     // animation to flash the chosen color button
     $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
     // play sound
     playSound(randomChosenColor);

}

// play sound
function playSound(name){
     var audio = new Audio('sounds/'+name+'.mp3');
     audio.play(); 
}




//animation
function animatePress(currentColor){
     $("#"+currentColor).addClass("pressed");
     setTimeout(function(){
          $("#"+currentColor).removeClass("pressed");
     },100);
     
}


function checkAnswer(currentLevel){
     if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
          console.log("Success");
          if(userClickedPattern.length==gamePattern.length){
               setTimeout(function () {
                    nextSequence();
                  }, 400);
          }
     }
     else{
          console.log("Failure");
          var wrongAudio=new Audio('sounds/wrong.mp3');
          wrongAudio.play();
          $("body").addClass('game-over');
          setTimeout(function() {
               $("body").removeClass("game-over");
          },300);
          $("h1").text("Game Over, Press Any Key to Restart");
           startOver();
     }
}

function startOver(){
 level=0;
 gamePattern=[];
 userClickedPattern=[];
 started=false;
 
}
