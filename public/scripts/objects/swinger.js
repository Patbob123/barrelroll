class Swinger{
    constructor(id, x, y, w, h, src, type){
      this.id = id;
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.oldX = x;
      this.src = src;
      this.type = type;
      this.updates = 0;
      this.frame = 0;
      this.direction = "left";
    }
    draw(ctx){
        // ctx.fillStyle = "black"
        // ctx.fillRect(this.x,this.y, this.w, this.h)  

        let img = document.getElementById(this.src);
        console.log(this.frame)
        ctx.drawImage(img, this.frame*48,0, 48, 32, 
          this.oldX-this.w*2, this.y-100-this.h*2, this.w*6, this.h*4);
    }
    update(){
      this.updates+= 1+(gamespeed/100);
      this.y += 1+(gamespeed/100)
      if(this.x<this.oldX-200){
        console.log("change")
        this.direction = "right";
      }else if(this.x>this.oldX+200){
        console.log("change")
        this.direction = "left";
      }
      
      if(this.direction=="right"){

        this.x += 1+(gamespeed/100)
        this.frame = 4+Math.floor(((Math.abs((this.oldX-200)-this.x)))/(400/4))

      }else if(this.direction=="left"){

        this.x -= 1+(gamespeed/100)
     
        this.frame = 0+Math.floor(((Math.abs((this.oldX+200)-this.x)+20)/(400/4)))
      }
      this.frame = this.frame>7?7:this.frame;
      
      this.draw(ctx)

      if(this.y>1000){
        let that = this;
        setTimeout( function() {
          let i = that.id
          curObjects = curObjects.filter(j => !((j.constructor.name == that.constructor.name) && (j.id==i)));
          objectList["obstacle"].push(new Swinger(i, 0, 0, 100, 100, "swinger", "trap"))
      },0)
      }
    }
    hit(){
      if (invince <= 0) {
        die()
      }else {
        score+=5;
        let that = this;
        setTimeout(function () {
            let i = that.id
            curObjects = curObjects.filter(j => !((j.constructor.name == that.constructor.name) && (j.id==i)));
            objectList["obstacle"].push(new Swinger(i, 0, 0, 100, 100, "swinger", "trap"))
        }, 0)
        document.getElementById("coinsound").play()
    }
      
    }
  }
  