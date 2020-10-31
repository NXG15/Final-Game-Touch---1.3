var ball1, ball2;
var spike1, spike2;
var center;
var randNumber;

//image variables
var centerImage;
var ball1Image, ball2Image;
var spike1Image, spike2Image;

var newVar=[];
var newVar2 = [];

//captured value
var newChange;
var newChange2;

//Changing numbers
var up = true;
var value = 0;

//gamestate
var gameState = "play";

function preload(){
  //center
  centerImage = loadImage("images/blackball.png");

  //balls
  ball1Image = loadImage("images/blackball.png");
  ball2Image = loadImage("images/blackball.png");

  //spikes
  spike1Image = loadImage("images/spike.png");
  spike2Image = loadImage("images/spike.png");
}

function setup() {
  createCanvas(500,700);

  //spikes
  spike1 = createSprite(240,height-30,40,40);
  spike1.addImage("spike1",spike1Image);
  spike1Image.resize(50,40);

  spike2 = createSprite(290,height-30,40,40);
  spike2.addImage("spike1",spike2Image);
  spike2Image.resize(50,40);

  //balls
  ball1 = createSprite(240,height-250,20,20);
  ball1.addImage("ball1", ball1Image);
  ball1Image.resize(20,20);

  ball2 = createSprite(270,height-250,20,20);
  ball2.addImage("ball2", ball2Image);
  ball2Image.resize(20,20);

  //flashing ball
  center = createSprite(250,height-550,75,75);
  center.addImage("center",centerImage);
  centerImage.resize(75,75);
  
  //random number corner
  randNumber = round(random(50,150));
}

function draw() {
 
  background("white");


  if(gameState =="play"){

    //ball velocity
    ball1Touch = touches.length;
    if(keyDown(UP_ARROW) || ball1Touch>0){
      ball1.velocityY = -30;
      ball1Touch = [];
    }

    //balls touching center
    if(ball1.collide(center)){
      ball1.velocityY = 0;
      ball1.velocityX = 0; 
      gameState = "middle";
         
    }

    //Save first number
    newVar = changeNumber();
    
    if(ball1.velocityY==0 && ball1.y <200){
      newChange = newVar;
      console.log(newChange);

      fill("black");
      textSize(12);
      textFont('Georgia');
      text(newChange,50,200);
    }
  }

  if(gameState == "middle"){
      fill("black");
      textSize(12);
      textFont('Georgia');
      text(newChange,50,200);

      ball2Touch = touches.length;
      if(ball1.y <=250 && (keyDown(UP_ARROW) || ball2Touch>0)){
        ball2.velocityY = -30;
        ball2Touch = [];
      }

      ball1.width = 20;
      center.width = 75;

      if((ball1.width/2 + center.width/2 == ball1.y - center.y) && 
        ball2.collide(center)){
        ball2.velocityY = 0;
        gameState = "end";
      }

      //Save second number
      newVar2 = changeNumber();
      newChange2 = newVar2;

      if(ball2.velocityY==0 && ball2.y <200){
        console.log(newChange2);

        fill("black");
        textSize(12);
        textFont('Georgia');
        text(newChange2,50,230);
      }
  }

  if(gameState =="end"){
    fill("black");
    textSize(12);
    textFont('Georgia');

    text(newChange,50,200);
    text(newChange2,50,230);

    //clear evertything
    center.visible = false;
    value = newChange+newChange2;
    spike1.visible = false;
    spike2.visible = false;
    ball1.visible = false;
    ball2.visible = false;
    
    if(newChange+newChange2==randNumber){
      text("You won!",335,300);
      text("Tap anywhere on the screen to restart",290,340);
    }

    else{
      text("You lost! Try again",335,300);
      text("Tap anywhere on the screen to restart",290,340);
    }

    resetGame();
  }

    //out of gamestates
    if(spike1.y== (height-250) && spike2.y== (height-250)){
      spike1.velocityY=0;
      spike2.velocityY=0;
    }
  
    //spike velocity
    spike1.velocityY = -2;
    spike2.velocityY = -2;

    if(spike1.collide(ball1) || spike1.collide(ball2) || 
      spike2.collide(ball1) || spike2.collide(ball2)
    ){
      value = "None";
      gameState="end";
    }

    //goal number
    fill("black");
    textSize(20);
    textFont('Georgia');
    text(randNumber,50,50);

    drawSprites();

    //changing center number
    fill("white");
    text(value,245,height-540);
}
//restarting

function resetGame(){

  resetTouch = touches.length;
  if(resetTouch>0 && gameState=="end"){
        center.visible = true;
        value = 0;
        resetTouch = [];
        
        //spike position
        spike1.visible = true;
        spike1.y = height-30;

        spike2.visible = true;
        spike2.y = height-30;
        
        //ball positions
        ball1.visible = true;
        ball1.y = height-250;

        ball2.visible = true;
        ball2.y = height-250;

        //change random number
        randNumber = round(random(50,150));

        gameState="play";
  }
}
//Changing number in center
function changeNumber() {
  
  frameRate(10);

  if (up == true && value <= 100) {
    value += 1;
    
    if (value == 100 ) {
      up = false;  
    }
  } else {
      value -= 1;
     
      if (value == 0) {
        up = true;
      }
  }

  return value;
}

