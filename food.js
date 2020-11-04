class Food{
constructor(){
    this.image = loadImage("Milk.png")
    this.foodStock = null
    this.lastFed = null;
}

getFoodStock(){
  var getStockref = database.ref('food')
  getStockref.on("value", function (data){
      foodStock = data.val();
  })
}

updateFoodStock(food){
  database.ref('/').update({
      foodStock:food
  })
}



display(){

    var x=80
    var y = 100

    //imageMode(CENTER);
    //image(this.image,720,200,70,70)

    if(foodStock!== 0){

        for(var i =0;i>this.foodStock;i++){
            if(i%10 === 0){
                x= 80
                y=y+50
            }
            image(this.image,x,y,70,70)
            x=x+70
        }



    }
    
}



}