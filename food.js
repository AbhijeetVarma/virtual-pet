class Food{
constructor(){
    this.image = loadImage("Milk.png")
    this.foodStock = 0
    this.lastFed = null;
    
}

getFoodStock(){
 return this.foodStock
}

updateFoodStock(food){
 
      this.foodStock=food
  console.log(this.foodStock)
}



display(){
    background(46,149,87)
    var x=80
    var y = 100

    imageMode(CENTER);
    //image(this.image,720,200,70,70)
    
    if(foodStock!== 0){

        for(var i =0;i<this.foodStock;i++){
            if(i%10 === 0){
                x= 80
                y=y+50
            }
            image(this.image,x,y,70,70)
            x=x+40
        }



    }
    
}


bedroom(){
   background(bed,500,250) 
}
garden(){
    background(gar,1000,500) 
 }
 washroom(){
    background(wash,1200,500) 
 }



}