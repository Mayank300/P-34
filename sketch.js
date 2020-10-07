
var dog,happyDog,database,foodS,foodStock,boneImage,milkImage;

function preload(){
   dogImage = loadImage("images/Dog.png");
   dogHappy = loadImage("images/DogHappyIMG.png");
   boneImage = loadImage("images/bone.png");
 }

function setup() {
  database = firebase.database();
  createCanvas(500,500);
  database = firebase.database();

  var dog = createSprite(width/2,300,10,10);
  dog.addImage("Dog",dogImage);
  dog.scale = 0.1;

  var bone = createSprite(310,40,10,10);
  bone.addImage("bone",boneImage);
  bone.scale = 0.09;

  var foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87) 
  drawSprites();
  textSize(30);
  strokeWeight(5);
  stroke("Blue");
  fill("white");
  text("FOOD STOCK       : "+foodStock,80,50);
  textSize(20);
  text("NOTE: PRESS UP_ARROW TO FEED MILO MILK!",15,470);

  if(KeyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappy)
  }
}

function readStock(data){
    foodS = data.val(); 
}

function writeStock(x){
  
  if(x<=0){
    x = 0;
  } else{
    x = x-1;
  }

    database.ref('/').update({
      Food:x
    })
}
