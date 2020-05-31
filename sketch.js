var gamestate = "serve";
var score = 0;
function preload(){
  groundImage= loadImage("mars2.jpeg");
  playerImage= loadImage("player.png");
  cometImage=loadImage("comet2.png");
  roverImage=loadImage("rover.png");
  blockImage=loadImage("blocks.jpg");
  coinImage=loadImage("download.png");
}
function setup() {
canvas= createCanvas(displayWidth-30,displayHeight-70);
  ground= createSprite(displayWidth/2,displayHeight/2,displayWidth*3,displayHeight*4);
  ground.addImage("ground",groundImage);
  ground.scale=3;
  player= createSprite(displayWidth/6,displayHeight/2);
  player.addImage("player",playerImage);
  invisibleground =createSprite(displayWidth/2,displayHeight-130,displayWidth,50);
  invisibleground.visible=false;
  upButton= createButton('↑');
  downButton= createButton(' ↓ ');
  upButton.position(50,displayHeight/2+100);
  downButton.position(50,displayHeight/2+170);
 
   roverGroup=createGroup();
   cometGroup=createGroup();
   blocksGroup=createGroup();
   coinGroup=createGroup();
   player.debug=true;
   (player).setCollider("rectangle");
}

function draw() {
  background(groundImage);
  //if(keyIsDown(UP_ARROW)){
   // player.velocityY=-12;
  //}
  if(gamestate==="serve"){
    textSize(22);
    var text1 =createElement('h2');
    text1.html("use buttons to make the astronaut jump and duck down")
    text1.position(displayWidth/3,displayHeight/3);

    var text2=createElement('h2');
    text2.html("avoid the comets and rovers and use the blocks");
    text2.position(displayWidth/3,displayHeight/3+100);

    var startButton=createButton("start");
    startButton.position(displayWidth/2,displayHeight/2+100);
    startButton.mousePressed(()=>{
    gamestate="play";
 startButton.hide();
 text1.hide();
 text2.hide();
    })
  }
  if(gamestate==="play"){
    
    if(ground.x<0){
      ground.x=ground.width/2;
    }
   

    upButton.mousePressed(()=>{
      player.velocityY=-15
    })

    downButton.mousePressed(()=>{
      player.velocityY=15
    })

    player.velocityY+=1;
    console.log(player.velocityY);
   
    ground.velocityX=-6;
    spawnobsticles();
    spawnblocks();
    spawncoins();
    
  player.collide(blocksGroup);
if(cometGroup.isTouching(player)||roverGroup.isTouching(player)){
  gamestate="end";
}
  }
if(gamestate==="end"){
  textSize(25);
  text("game over",displayWidth/2,displayHeight/2);
  cometGroup.setVelocityXEach(0);
  roverGroup.setVelocityXEach(0);
  blocksGroup.setVelocityXEach(0);
  coinGroup.setVelocityXEach(0);
  cometGroup.setLifetimeEach(-2);
  roverGroup.setLifetimeEach(-2);
  blocksGroup.setLifetimeEach(-2);
  coinGroup.setLifetimeEach(-2);


  ground.velocityX=0;
  player.velocityY=0;

  cometGroup.destroyEach();
  roverGroup.destroyEach();
  blocksGroup.destroyEach();
  coinGroup.destroyEach(0);

  cometGroup.setVelocityYEach(0);
  var restartButton= createButton('restart');
  restartButton.position(displayWidth/2,displayHeight/4);
if(restartButton.mousePressed){
  gamestate="play";
}
}

player.collide(invisibleground);

  drawSprites();
}
function spawncoins(){

  if(World.frameCount%60===0){
    var rand2=Math.round(random(displayHeight/2,displayHeight-100))
    coin=createSprite(displayWidth,rand2);
    coin.addImage(coinImage);
    coin.velocityX=-4;
    coin.scale=0.1;
    coin.lifetime=displayWidth/4;
    coinGroup.add(coin);

  }
}
function spawnobsticles(){
  if(World.frameCount%160===0){
    var r= Math.round(random(100,displayHeight-500))
    comet=createSprite(displayWidth,r);
    comet.addImage(cometImage);
    comet.velocityX=-(Math.round(random(6,12)));
    comet.velocityY=Math.round(random(2,6));
    comet.scale=0.5;
    comet.lifetime=displayWidth/6;
    cometGroup.add(comet);
    comet.debug=true;
  }
 // var r1=Math.round(random(120,200));
if(World.frameCount%180===0){
  rover=createSprite(displayWidth,displayHeight-200);
  rover.addImage(roverImage);
  rover.scale=0.5;
  rover.velocityX=-5;
  rover.lifetime=displayWidth/6;
  roverGroup.add(rover);
}
}
function spawnblocks(){
  
if(World.frameCount%200===0){
  var rand2=Math.round(random(displayHeight/2,displayHeight-200))
  block1=createSprite(displayWidth,rand2,200,30);
  block1.velocityX=-5;
  block2=createSprite(displayWidth,rand2,100,40);
  block2.velocityX=2;
 // block1.addImage(blockImage);
 // block2.addImage(blockImage);
block1.lifetime=displayWidth/6;
block2.lifetime=displayWidth/6;

var rand = Math.round(random(block1,block2));
blocksGroup.add(block1);
blocksGroup.add(block2);
}


}
