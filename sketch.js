var score =0;
var gun,bluebubble,redbubble, bullet, backBoard;

var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;

var blueBubbleGroup, redBubbleGroup, bulletGroup, greenBubbleGroup, yellowBubbleGroup;


var life =3;
var score=0;
var gameState=1

function preload(){
  gunImg = loadImage("Ar1.gif")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("Z1.gif")
  greenBubbleImg = loadImage("Z2.gif")
  redBubbleImg = loadImage("Z3.gif")
  yellowBubbleImg = loadImage("Z4.gif")
  backBoardImg= loadImage("back.jpg")
  bgImg = loadImage("bg.gif")

}
function setup() {
  createCanvas(800, 800);

  backBoard= createSprite(5, width/2, 10 ,height);
  backBoard.addImage(backBoardImg)
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.5
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   
  greenBubbleGroup = createGroup();
  yellowBubbleGroup = createGroup();
  heading= createElement("h1");
  scoreboard= createElement("h1");
}

function draw() {
  background(bgImg);
  
  heading.html("Life: "+life)
  heading.style('color:red'); 
  heading.position(150,20)

  scoreboard.html("Score: "+score)
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,20)

  if(gameState===1){
    gun.y=mouseY  

    if (frameCount % 80 === 0) {
      drawblueBubble();
    }

    if (frameCount % 100 === 0) {
      drawredBubble();
    }
     
    if (frameCount % 120 === 0) {
      drawgreenBubble();
    }
    if (frameCount % 140 === 0) {
      drawyellowBubble();
    }
    if(keyDown("space")){
      shootBullet();
    }

    if (blueBubbleGroup.collide(backBoard)){
      handleGameover(blueBubbleGroup);
    }
    
    if (redBubbleGroup.collide(backBoard)) {
     handleGameover(redBubbleGroup);
    }
    if (greenBubbleGroup.collide(backBoard)) {
      handleGameover(greenBubbleGroup);
     }    
     if ( yellowBubbleGroup.collide(backBoard)) {
      handleGameover(yellowBubbleGroup);
     }
     /*if(blueBubbleGroup.(bulletGroup)){
      handleBubbleCollision(blueBubbleGroup);
    }*/

    /*if(blueBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision();
    }*/
    
    /*if(blueBubbleGroup.collide()){
      handleBubbleCollision(blueBubbleGroup);
    }*/
    
    if(blueBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(blueBubbleGroup);
    }
    if(greenBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(greenBubbleGroup);
    }
    if(yellowBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(yellowBubbleGroup);
    }

    if(redBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(redBubbleGroup);
    }

    drawSprites();
  }
    
  
}

function drawblueBubble(){
  bluebubble = createSprite(800,random(20,780),40,40);
  bluebubble.addImage(blueBubbleImg);
  bluebubble.scale = 0.3;
  bluebubble.velocityX = -2;
  bluebubble.lifetime = 400;
  blueBubbleGroup.add(bluebubble);
}
function drawredBubble(){
  redbubble = createSprite(800,random(20,780),40,40);
  redbubble.addImage(redBubbleImg);
  redbubble.scale = 0.3;
  redbubble.velocityX = -3;
  redbubble.lifetime = 400;
  redBubbleGroup.add(redbubble);
}
function drawgreenBubble(){
  greenbubble = createSprite(800,random(20,780),40,40);
  greenbubble.addImage(greenBubbleImg);
  greenbubble.scale = 0.3;
  greenbubble.velocityX = -4;
  greenbubble.lifetime = 400;
  greenBubbleGroup.add(greenbubble);
}
function drawyellowBubble(){
  yellowbubble = createSprite(800,random(20,780),40,40);
  yellowbubble.addImage(yellowBubbleImg);
  yellowbubble.scale = 0.3;
  yellowbubble.velocityX = -5;
  yellowbubble.lifetime = 400;
  yellowBubbleGroup.add(yellowbubble);
}

function shootBullet(){
  bullet= createSprite(150, width/2, 50,20)
  bullet.y= gun.y-20
  bullet.addImage(bulletImg)
  bullet.scale=0.12
  bullet.velocityX= 7
  bulletGroup.add(bullet)
}

function handleBubbleCollision(bubbleGroup){
    if (life > 0) {
       score=score+1;
    }

     blast= createSprite(bullet.x+60, bullet.y, 50,50);
    blast.addImage(blastImg) 

    /* blast= sprite(bullet.x+60, bullet.y, 50,50);
    blast.addImage(blastImg) */

    /* blast= createSprite(bullet.x+60, bullet.y, 50,50);
    blast.add(blastImg) */

    /* blast= createSprite(bullet.x+60, bullet.y, 50,50);
    image(blastImg) */
    
    blast.scale=0.3
    blast.life=20
    bulletGroup.destroyEach()
    bubbleGroup.destroyEach()
}

function handleGameover(bubbleGroup){
  
    life=life-1;
    bubbleGroup.destroyEach();
    

    if (life === 0) {
      gameState=2
      
      swal({
        title: `Game Over`,
        text: "Oops you lost the game....!!!",
        text: "Your Score is " + score,
        imageUrl:
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Thanks For Playing"
      });

    }
  
}