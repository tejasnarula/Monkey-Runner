var monkey , monkey_running, monkey_out, monkey2;
var banana ,bananaImage, obstacle, obstacleImage

var FoodGroup, obstaclesGroup, food = 0;
var ground;

var score;

var PLAY = 1
var END = 0
var gameState = PLAY

function preload(){
  
  
  monkey_running = loadAnimation ("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey2Image = loadImage("sprite_8.png")
    
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
  groundImage = loadImage("ground.png")
}

function setup() {
  createCanvas(600, 500);
  
  monkey = createSprite(200,200,10,10)
  monkey.addAnimation("moving",monkey_running)
  monkey.scale = 0.1
  
  monkey2 = createSprite(200,200,10,10)
  monkey2.addImage(monkey2Image)
  monkey2.scale = 0.1
  monkey2.visible = false;
  
  ground = createSprite(200,450,700,10)
  ground.velocityX = -8
  ground.addImage(groundImage)
  ground.setCollider("rectangle", ground.widht,105)
  
  obstaclesGroup = new Group
  bannanaGroup = new Group
  
}

function draw() {
  background(220);
  
  if (gameState === 1){
    
    if (ground.x < 225){
      ground.x = ground.width/2
    }
  
    if (keyDown("space") && monkey.y  > 400){
      monkey.velocityY = -17
    }
  
    monkey.velocityY = monkey.velocityY + 1
  
    createBannana();
    createObstacles();
    
    score = frameCount/1.5
    
    if(bannanaGroup.isTouching(monkey)){
      food = food + 1
      bannanaGroup.destroyEach();
    }
    
    if (obstaclesGroup.isTouching(monkey)){
      gameState = END
      monkey2.y = monkey.y
      monkey2.visible = true;
      monkey.visible = false
    }
    
  }else if(gameState === 0){
    bannana.velocityX = 0;
    bannana.lifetime = -1
    
    ground.velocityX = 0;
    
    obstacle.velocityX = 0;
    obstacle.lifetime = -1;
    
    monkey.velocityY = 0;
  }
  
  
  text("survival Time: "+Math.round(score), 150,50)
  monkey.collide(ground)
  
  text("bannanas eaten: "+ food, 300,50)
  monkey.collide(ground)
        
  drawSprites();
}

function createBannana(){
  if (frameCount % 100 === 0){
    bannana = createSprite(600,Math.round(random(250,400)),10,10)
    bannana.addImage(bananaImage)
    bannana.scale = 0.1
    bannana.velocityX = -10
    bannana.setLifetime = 100
    
    bannanaGroup.add(bannana)
  }
}

function createObstacles(){
 if (frameCount % 80 === 0){
   obstacle = createSprite(600,ground.y - 60,10,40);
   obstacle.addImage(obstaceImage)
   obstacle.scale = 0.2
   obstacle.velocityX = ground.velocityX;         
   obstacle.lifetime = 300;
   
   ground.depth = obstacle.depth
   ground.depth = obstacle.depth + 1
   
   obstacle.setCollider("circle",0,0,150)
   
   //add each obstacle to the group
  obstaclesGroup.add(obstacle);
 }
}