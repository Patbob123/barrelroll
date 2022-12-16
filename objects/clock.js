class Coin{
    constructor(id, x, y, w, h, src, type){
      this.id = id;
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.src = src;
      this.type = type;
      this.frame = 0;
      this.staggerFrame = 50;
    }
    draw(ctx){
        // ctx.fillStyle = "black"
        // ctx.fillRect(this.x,this.y, this.w, this.h)  
        let img = document.getElementById(this.src);
        ctx.drawImage(img, this.frame*16,0, 16, 16, 
            this.x, this.y, this.w, this.h);
    }
    update(){
        this.draw(ctx)
        this.y += 1+(gamespeed/100)
        this.frame = Math.floor((this.y+200)/this.staggerFrame)%5
        if(this.y>1000){
            let that = this;
            setTimeout( function() {
                curObjects.splice(that, 1)
                objectList["obstacle"].push(that)
            },0)
        }
    }
    hit(){
        score+=5;
        let that = this;
        setTimeout( function() {
            curObjects.splice(that, 1)
            objectList["obstacle"].push(that)
        },0)
        document.getElementById("coinsound").play()
    }
  }
  