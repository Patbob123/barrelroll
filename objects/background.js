class Background{
    constructor(x, y, w, h, src){
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.src = src;
    }
    draw(ctx){
        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, this.w, this.h)  
        let img = document.getElementById(this.src);
        ctx.drawImage(img, this.x,this.y,this.w, this.h);
        ctx.drawImage(img, this.x,this.y-this.h,this.w, this.h);
    }
    updateBG(){
        this.draw(ctx)
        this.y += 1+(gamespeed/100)
        if(this.y>this.h){
            this.y=0
        }
    }
  }
  