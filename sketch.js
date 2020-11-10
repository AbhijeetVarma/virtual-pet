var dogHungry , dogHappy , dog

var database , foodStock , foodS 

var feed , addFood
var fedTime,lastFed,foodObj
var bed,gar,wash

function preload()
{
  dogHappy = loadImage("dogImg1.png")
  dogHungry = loadImage("dogImg.png")
  bed=loadImage("Bed Room.png")
  gar=loadImage("Garden.png")
  wash=loadImage("Wash room.png")
}


function setup() {
  createCanvas(1000,500);
  database = firebase.database()
  

  dog = createSprite(750,250,100,100)
  dog.addImage("dhu",dogHungry)
  dog.addImage("dha",dogHappy)
  dog.scale = 0.5;
  
  feed=createButton("Feed The Dog")
  feed.position(700,95)
  feed.mousePressed(feedDog);

  AddFood=createButton("Add Food")
  AddFood.position(800,95)
  AddFood.mousePressed(addFood)

  foodObj = new Food();

  var getStockref = database.ref('food')
  getStockref.on("value",readStock )



  var readStateRef= database.ref('gameState')
  readStateRef.on("value",readState)

  
}


function draw() {  


foodObj.getFoodStock()

fedTime = database.ref("feedTime")

fedTime.on("value",function (data){
  
  lastFed=data.val();
})
  

  fill("white")

    textSize(20)

    if(lastFed>=12){

     text("last fed : "+lastFed%12 + "PM",350,80)
    }else if(lastFed===0){
      text("last fed : 12 AM",350,80)

    }else{
      text("last fed : "+lastFed + "AM",350,80)
    
    }



   



    var curTime = hour()

    if(curTime === lastFed+1){
      foodObj.garden()
      update("playing")
    }else if(curTime === lastFed+2){
      foodObj.bedroom()
      update("sleeping")
    }else if(curTime > lastFed+2 && curTime <= lastFed+4){
      foodObj.washroom()
      update("playing")
    }else{
      update("hungry")
      foodObj.display()
    }

    

    if(gameState !== "hungry"){
      AddFood.hide()
      feed.hide()
      dog.remove()
      }else{
        AddFood.show()
        feed.show()
        dog.addImage("dhu",dogHungry)
      }

      drawSprites();
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
 dog.changeImage("dha",dogHappy)

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

function readStock(data){
  foodStock = data.val();
  foodObj.updateFoodStock(foodStock)
}


function readState(data){
  gameState = data.val()


}
function update(state){
  database.ref('/').update({
    gameState:state
  })
}

