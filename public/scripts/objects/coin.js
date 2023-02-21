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
                let i = that.id
                curObjects = curObjects.filter(j => !((j.constructor.name == that.constructor.name) && (j.id==i)));
                objectList["obstacle"].push(new Coin(i, 0, 0, 200, 200, "coin", "collect"))
            },0)
        }
    }
    hit(){
        score+=5;
        let that = this;
        setTimeout( function() {
            let i = that.id
            curObjects = curObjects.filter(j => !((j.constructor.name == that.constructor.name) && (j.id==i)));
            objectList["obstacle"].push(new Coin(i, 0, 0, 200, 200, "coin", "collect"))
            console.log(curObjects)
        },0)
        effectQueue.push(new Collect(this.w, this.h, this.src+"collect", 50))
        document.getElementById("coinsound").play()
    }
  }
  