class Lefter{
    constructor(id, x, y, w, h, src){
      this.id = id;
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.src = src;
      this.abilStatus = 0; //0 = unused, 1 using, 2 used
      this.oldX = x;
      this.frame = 0;
      this.abilPoint = 100;
    }
    draw(ctx){
        // ctx.fillStyle = "black"
        // ctx.fillRect(this.x,this.y, this.w, this.h)
        let img = document.getElementById(this.src);
        if(this.abilStatus == 1||this.abilStatus == 0){
          ctx.drawImage(img, this.frame*32,0, 32, 16, 
          this.oldX-200, this.y, this.w*2, this.h);
        }else{
          ctx.drawImage(img, this.frame*32,0, 32, 16, 
            this.oldX, this.y, this.w*2, this.h);
        }
    }
    update(){
    
      this.y += 1+(gamespeed/100)
      if(this.y>=this.abilPoint&&this.abilStatus!=2){
        this.abilStatus = 1;
      }
      if(this.abilStatus == 1){
        this.abil()
      }else{
        this.oldX = this.x;
      }

      this.draw(ctx)

      if(this.y>1000){
        let that = this;
        setTimeout( function() {
          that.abilStatus = 0
          that.frame = 0;
          curObjects.splice(this, 1)
          objectList["obstacle"].push(that)
      },0)
      }
    }
    abil(){
      this.x -= 10+(gamespeed/100)
      this.frame = Math.floor(((Math.abs(this.oldX-this.x)-1)/(200/5)))
      
      if(Math.abs(this.oldX-this.x)>=200){ //MOVE COMPELETE
        this.x = round(this.x, 200, 100)
        this.oldX = this.x;
        this.frame = 4;
        this.abilStatus = 2;
      }
     
      console.log(this.frame)
    }
    hit(){
      if (invince <= 0) {
        die()
      }else {
        score+=5;
        let that = this;
        setTimeout(function () {
            curObjects.splice(this, 1)
            objectList["obstacle"].push(that)
        }, 0)
        document.getElementById("coinsound").play()
    }
    }
  }
  