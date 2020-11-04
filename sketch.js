var dogHungry , dogHappy , dog

var database , foodStock , foodS 

var feed , addFood
var fedTime,lastFed,foodObj

function preload()
{
  dogHappy = loadImage("dogImg1.png")
  dogHungry = loadImage("dogImg.png")
}


function setup() {
  createCanvas(1000,500);
  database = firebase.database()
  

  dog = createSprite(750,250,100,100)
  dog.addImage("Hungry",dogHungry)
  dog.addImage("Happy",dogHappy)
  dog.scale = 0.5;
  
  feed=createButton("Feed The Dog")
  feed.position(700,95)
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food")
  addFood.position(800,95)
  addFood.mousePressed(addFood)

  foodObj = new Food();

  
}


function draw() {  
background(46,149,87)

fedTime = database.ref("feedTime")
fedTime.on("value",function (data){
  lastFed=data.val();
})
  drawSprites();
  fill("white")
    textSize(20)
    if(lastFed>=12){
     text("last fed : "+lastFed%12 + "PM",350,80)
    }else if(lastFed===0){
      text("last fed : 12 AM",350,80)

    }else{
      text("last fed : "+lastFed + "AM",350,80)
    
    }

    foodObj.display()
  //add styles here

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



function feedDog(){
 dog.changeImage("Happy",dogHappy)

 foodObj.updateFoodStock(foodObj.getFoodStock()-1)
 database.ref('/').update({
   food:foodObj.getFoodStock(),
   feedTime:hour()
 })
}

function addFood(){
  foodStock++
  database.ref('/').update({
    food:foodStock
  })
}



