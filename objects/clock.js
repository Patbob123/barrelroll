class Clock{
    constructor(id, x, y, w, h, src){
      this.id = id;
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.src = src;
    }
    draw(ctx){
        ctx.fillStyle = "black"
        ctx.fillRect(this.x,this.y, this.w, this.h)  
        let img = document.getElementById(this.src);
        ctx.drawImage(img, this.x,this.y,this.w, this.h);
    }
    update(){
        this.draw(ctx)
        this.y += 1+(gamespeed/100)
        if(this.y>1000){
            let that = this;
            setTimeout( function() {
                curObjects.splice(this, 1)
                objectList["obstacle"].push(that)
            },0)
        }
    }
  }
  