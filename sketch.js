var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ground
var bunny,bunnyImg,bunny1Img,bunny3Img;
var background1,background1Img;
var bush,bushG;
var gameover,gameoverImg;
var reset,resetImg;
var finishline,finishlineImg;
var win,winImg
var carrot,carrotImg
var score = 0;
var carrotCollect = 0;
function preload() {
  bunnyImg= loadAnimation("bunny.png");
   bunny3Img= loadAnimation("happybunny3.png");
  bunny1Img= loadAnimation ("bunny1.png","bunny2.png","bunny3.png");
 background1Img= loadImage ("background2.png");
  bushImg= loadImage ("obstacles.png");
   gameoverImg= loadImage ("gameover.png");
   resetImg= loadImage ("reset.png");
  winImg= loadImage ("win.png");
  carrotImg= loadImage ("carrot.png");
  finishlineImg= loadImage ("flag.png");
}
function setup() {
  createCanvas(600,200);
  ground=createSprite(300,180,600,10);
  ground.visible = false;
  background1=createSprite(1200,100,10,10);
  background1.addImage(background1Img)
background1.scale=9.9;
  
  background1.x = background1.width /2;
  background1.scale = 1.3
  bunny =createSprite(70,30,10,10);
  
  bunny.addAnimation("bunny",bunny1Img)

      ; 
  bunny.scale = 0.3; 

  bushG=createGroup();
   carrotG=createGroup();
  
  gameover = createSprite(300,100);
  gameover.addImage(gameoverImg);
gameover.scale=0.5
  gameover.visible = false;
  
   win = createSprite(300,100);
  win.addImage(winImg);
win.scale=0.5
  win.visible = false;

  reset = createSprite(300,140);
  reset.addImage(resetImg);
 reset.visible = false;
    reset.scale = 0.1;
  
    finishline = createSprite(500,150);
  finishline.addImage(finishlineImg);
finishline.scale=0.5
  finishline.visible = false;
}

function draw() {
 // background(230);
  
  if(gameState===PLAY){
    
   score = score + Math.round(frameRate()/60)
      background1.velocityX=-(4+score/100);
  if(keyDown(UP_ARROW)&& bunny.y >=80){
    bunny.velocityY  = -18;    
  }

 if(score>=5000){
   finishline.visible = true
   finishline.velocityX=-3
 }
    if(bunny.isTouching(finishline)){
       bunny.velocityY=0
    background1.velocityX = 0;
     bushG.setVelocityXEach(0);
   finishline.velocityX = 0;
    bushG.setLifetimeEach(-1)
      score=0
      win.visible=true
         bunny.addAnimation("bunny",bunny3Img)
      bunny.changeAnimation("bunny",bunny3Img)
       
      reset.visible = true;
      
    }
  bunny.velocityY +=0.8
    
    if (background1.x < 0){
      background1.x = background1.width/9;
    }
    bunny.setCollider("rectangle",0,0,220,220);
  bunny.debug = false
      bushObstacle()
     carrotCollection()
    
  if(bunny.isTouching(bushG)){
       bunny.addAnimation("bunny",bunnyImg)
      bunny.changeAnimation("bunny",bunnyImg)
     gameState = END;
  }
    if(carrotG.isTouching(bunny)){
      carrotG.destroyEach()
      carrotCollect=carrotCollect+20
    }
    
  }
  else if (gameState === END) {
      gameover.visible = true;
 
  finishline.visible = false;
      reset.visible = true;
    
   bunny.velocityY=0
    background1.velocityX = 0;
     bushG.setVelocityXEach(0);
   
    bushG.setLifetimeEach(-1)
     carrotG.setVelocityXEach(0);
   
    carrotG.setLifetimeEach(-1)
  }
  bunny.collide(ground);
  if(mousePressedOver(reset)) {
      restart();
    }
  drawSprites()
fill("red");
  textSize(40)
  text("Score:" +score,320,50)
  fill("rgb(254,97,32)");
  text("carrots:" +carrotCollect,100,50)
}

function restart(){
  gameState = PLAY;  
   bunny.addAnimation("bunny",bunny1Img)
    bunny.changeAnimation("bunny", bunny1Img);
 score=0;
  carrotCollect=0;
  gameover.visible = false;
  reset.visible = false;
  win.visible = false;
  finishline.visible = false;
  finishline.x=500
 bushG.destroyEach();
 carrotG.destroyEach();

}
function bushObstacle() {
 
  if (frameCount % 150 === 0) {
    var bush = createSprite(640,170,40,10);
    bush.addImage(bushImg);
    bush.scale = 0.2;
    bush.velocityX = -6;
    bush.lifetime = 200;
    bush.depth = bunny.depth;
    bunny.depth = bunny.depth + 1;
   
    bushG.add(bush);
  }
}
function carrotCollection() {
 
  if (frameCount % 230 === 0) {
    var carrot = createSprite(640,170,40,10);
    carrot.addImage(carrotImg);
    carrot.scale = 0.2;
    carrot.velocityX = -6;
    carrot.lifetime = 200;
    carrot.depth = bunny.depth;
    bunny.depth = bunny.depth + 1;
   
    carrotG.add(carrot);
  }
}