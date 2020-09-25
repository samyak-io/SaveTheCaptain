var cap, capIdleImg, capRunImg;
var ground, groundImg;
var backgr, backgroundImg;
var spikes, spikesImg, boulders, bouldersImg, bouldersGroup;
var spikesGroup;

var PLAY = 1;
var END  = 0;
var gameState = PLAY;

function preload(){
    // capIdleImg = loadAnimation("sprites/idle-0.png","sprites/idle-1.png","sprites/idle-2.png");
    capIdleImg = loadImage("sprites/idle-0.png");
    groundImg = loadImage("sprites/groundImg.png");
    backgroundImg = loadImage("sprites/bg.png");
    spikesImg = loadImage("sprites/spikes.png");
    capRunImg = loadAnimation("sprites/run-0.png","sprites/run-1.png","sprites/run-3.png","sprites/run-4.png","sprites/run-5.png","sprites/run-6.png","sprites/run-7.png");
    // bouldersImg = loadImage("sprites/boulder.png");
}

function setup(){
    var canvas = createCanvas(windowWidth,windowHeight);

    //create background
    backgr = createSprite(windowWidth,windowHeight/2,windowWidth,windowHeight);
    backgr.addImage(backgroundImg);
    backgr.x = backgr.width/2;
    backgr.scale = 2;

    //create player
    cap = createSprite(windowWidth/8 - 30,windowHeight - 50);
    cap.scale = 2;
    cap.addAnimation("running",capRunImg);
    // console.log(windowWidth);


    //create ground
    ground = createSprite(0,windowHeight-15,windowWidth,10);
    // ground.addImage(groundImg);
    // ground.scale = 0.5;
    ground.x = ground.width/2;
    ground.velocityX = -3;

    spikesGroup = new Group();
    bouldersGroup = new Group();
}

function draw(){
    background("white");

  if(gameState === PLAY){
    if(ground.x < windowWidth/2){
      ground.x = ground.width/2;
    }

    if(backgr.x > 400){
      backgr.x = backgr.width/2;
    }

    spikeObstacles();
    // boulderObstacles();
    jump();
    if(spikesGroup.isTouching(cap)){
     gameState = END;
   }
  } 
  else if(gameState === END){
    ground.velocityX = 0;
    spikesGroup.setVelocityXEach(0);
    // bouldersGroup.setVelocityXEach(0);
    cap.addImage(capIdleImg);
  }
    //collide captain with ground
    cap.collide(ground);

    console.log(cap.y);
    drawSprites();
}

function spikeObstacles(){
    if(frameCount % 60 === 0){
    spikes = createSprite(windowWidth, ground.y - 28, 20, 20);
    spikes.addImage(spikesImg);
    spikes.scale = 0.1;
    spikes.velocityX = -8;
    spikes.lifetime = 400;
    spikesGroup.add(spikes);
  }
}

// function boulderObstacles(){
//    if(frameCount %80 === 0){
//      boulders = createSprite(random(80,windowWidth/2), 0, 20, 20);
//      boulders.addImage(boulderImg);
//      boulders.scale = 0.13;
//      boulders.velocityY = 5;
//      boulders.lifetime = 400;
//      bouldersGroup.add(boulder);
//    }
// }

//jump function
function jump(){
  if(keyDown("space") && cap.y >= 732){
    cap.velocityY = - 10;
  }

  //add gravity to the captain
  cap.velocityY = cap.velocityY + 0.5;
}