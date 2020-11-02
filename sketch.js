var dogHungry , dogHappy , dog

var database , foodStock , foodS 



function preload()
{
  dogHappy = loadImage("dogImg1.png")
  dogHungry = loadImage("dogImg.png")
}


function setup() {
  createCanvas(500, 500);
  database = firebase.database()
  foodStock = database.ref('food');
  foodStock.on("value",readStock)

  dog = createSprite(250,250,100,100)
  dog.addImage("Hungry",dogHungry)
  dog.addImage("Happy",dogHappy)
  dog.scale = 0.5;
  
  
}


function draw() {  
background(46,149,87)

if(keyDown("up")){
 writeFood(foodS)
 dog.changeImage("Happy",dogHappy)

}

  drawSprites();
  fill("white")
    textSize(20)
    text("Food Left: "+ foodS,100,100)
  //add styles here

}

function readStock(data){
  
    foodS=data.val();
  
}

function writeFood(x){
    
   if(x<=0){
    x=0
   }else{
    x = x-1
   }
 
  database.ref('/').update({
    food:x
  })

}



