var userClickedPattern=[];
var arr=["red", "blue", "green", "yellow"];
var gamePattern=[];

function nextseq()
{
  var randomNumber=Math.floor(Math.random()*4);
  var randomColorChoosen=arr[randomNumber];
  gamePattern.push(randomColorChoosen);
  animatePress(randomColorChoosen);
  level++;
  $("h1").html("LEVEL "+level);


  $("#"+randomColorChoosen).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColorChoosen);
  userClickedPattern=[];

}

$(".btn").click(function(){
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor)
{
    $("."+currentColor).addClass("pressed");
    setTimeout(function(){
      $("."+currentColor).removeClass("pressed");
    },100);
}
var started=false;
var level=0;
$(document).keydown(function(){
  if(started===false){
    $("#level-title").text("Level " + level);
    nextseq();
    started=true;
  }
});

function checkAnswer(currentLevel)
{
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
  {
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextseq();
      },1000);
    }

  }
  else{
    var audio2 = new Audio("sounds/wrong.mp3");
    audio2.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").html("GAME OVER,Press Any Key To Restart");
    startOver();
  }
}

function startOver()
{

    level=0;
    started=false;
    gamePattern=[];

}
