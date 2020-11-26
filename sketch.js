var monkey, monkey_running;
var banana, bananaImage;
var obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var ground, invisibleground;
var score = 0,
  survivalTime = 0;
var x1, x2;
var backgroundSpeed = 4;
var play = 0;
var sound, Sound;
var stopmonkey;
var gameover;

function preload() {
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  Background = loadImage("jungle.jpg");
  sound1 = loadSound("Salam alaikum.mp3");
  sound2 = loadSound("alaikum asalam.mp3");
  stopmonkey = loadAnimation("sprite_0.png");
  gameOver = loadImage("gameover.jpg");
}

function setup() {
  createCanvas(600, 500);
  monkey = createSprite(80, height - 80, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.addAnimation("stop", stopmonkey);
  monkey.scale = 0.15;
  x1 = 0;
  x2 = width;
  invisibleground = createSprite(300, 500, 600, 70);
  invisibleground.visible = false;
  bananaGroup = new Group();
  obstacleGroup = new Group();
  sound1.play();
  gameover = createSprite(300, 250, 600, 500);
  gameover.addImage(gameOver);
  gameover.scale = 0.7;
  gameover.visible = false;
}

function draw() {
  background("red");
  if (backgroundSpeed > 0) {
    if (frameCount % 60 == 0) {
      survivalTime = survivalTime + 1;
    }
  }
  if (!sound1.isPlaying() && backgroundSpeed > 0) {
    sound1.play();
  }
  if (obstacleGroup.collide(monkey)) {
    monkey.velocityY = 0;
    backgroundSpeed = 0
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);
    sound1.stop();
    sound2.play();
    monkey.changeAnimation("stop");
    gameover.visible = true;

  }
  if (mousePressedOver(gameover) && backgroundSpeed == 0) {
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    score = 0;
    survivalTime = 0;
    backgroundSpeed = 4;
    gameover.visible = false;
    monkey.changeAnimation("moving");
  }

  if (monkey.overlap(bananaGroup, callback)) {
    score = score + 1;
  }
  if (keyDown("space") && monkey.y > 161) {
    monkey.velocityY = -16;
  }
  monkey.velocityY = monkey.velocityY + 0.5;
  image(Background, x1, 0, width, height);
  image(Background, x2, 0, width, height);
  x1 -= backgroundSpeed;
  x2 -= backgroundSpeed;
  if (x1 <= -width + 3) {
    x1 = width;
  }
  if (x2 < -width + 3) {
    x2 = width;
  }
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 480, 50);
  stroke("white");
  textSize(20);
  fill("white");
  text("Survival Time: " + survivalTime, 0, 50);
  monkey.collide(invisibleground);
  monkey.collide(obstacleGroup);
  drawSprites();
  if (backgroundSpeed > 0) {
    bananas();
    obstacles();
  }
}

function bananas() {
  if (frameCount % 80 == 0) {
    var bananas = createSprite(600, Math.round(random(120, 200)), 20, 20);
    bananas.velocityX = -5;
    bananas.lifetime = 600 / 5;
    bananas.addImage(bananaImage);
    bananas.scale = 0.1;
    bananaGroup.add(bananas);
    gameover.depth = bananas.depth + 1;
  }
}

function obstacles() {
  if (frameCount % 300 == 0) {
    var obstacles = createSprite(600, height - 80, 20, 20);
    obstacles.addImage(obstacleImage);
    obstacles.scale = 0.2;
    obstacles.velocityX = -5;
    obstacles.lifetime = 600 / 5;
    obstacleGroup.add(obstacles);
    gameover.depth = obstacles.depth + 1;
  }
}

function callback(sprite, sprite2) {
  sprite2.remove();
}