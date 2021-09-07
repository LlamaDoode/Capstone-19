var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleGroup, invisible;
var gameState = "play"
var score = 20000 ;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImgS = loadImage("ghost-standing.png");
  ghostImgJ = loadImage("ghost-jumping.png") ;
   spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300,300) ;
  ghost.addImage(ghostImgJ) ;  
  ghost.scale = 0.35 ;

  doorsGroup = createGroup() ;
  climbersGroup = createGroup() ;
  invisibleGroup = createGroup() ;
}

function draw() {
  background(200);
  if (gameState == "play") {
  ghost.setCollider("rectangle",0,40,300,225)
  if(tower.y > 400){
      tower.y = 300
    }

  ghost.velocityY = ghost.velocityY + 0.6 ;

  if (keyDown("space")) {
    ghost.velocityY = -10 ;
  }

  if (keyDown("right_arrow")) {
    ghost.x = ghost.x+6 ;
  }
  
  if (keyDown("left_arrow")) {
    ghost.x = ghost.x-6 ;
  }

  if (ghost.isTouching(climbersGroup)) {
    ghost.velocityY = 0
  }

  if (ghost.isTouching(invisibleGroup)||(ghost.y>600)||score<1) {
    ghost.destroy() ;
    gameState = "end" ;
  }

    spawnDoors() 
    score = score-1;
    drawSprites() ;
    fill ("yellow") 
    textSize(20) ;
    text("Time left: "+score,460,30)
}
  if (gameState== "end") {
    fill("red") ;
    textSize(25) ;
    text("GAME OVER",200,300)
   }
}


function spawnDoors() {
  if (frameCount%300==0) {
  door = createSprite(200,-40)
  door.x = Math.round(random(150,450)) 
  door.addImage(doorImg)
  door.velocityY = 1 ;
  doorsGroup.add(door) ;

  climber = createSprite(200,10)
  climber.x = door.x
  climber.addImage(climberImg)
  climber.velocityY = 1 ;
  climbersGroup.add(climber) ;
  ghost.depth = door.depth ;
  ghost.depth = ghost.depth+1

  invisible = createSprite(200,15)
  invisible.width = climber.width
  invisible.height = 15 ;
  invisible.x = climber.x
  invisible.velocityY = 1 ;
  invisibleGroup.add(invisible) ;
  invisible.debug = true ;
  }
}
