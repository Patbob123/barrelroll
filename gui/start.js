class Start{
    constructor(){
      this.x = 0;
      this.y = 0;
      this.w = 1200;
      this.h = 1000;
      this.opacity = 0;
    }
    draw(ctx){
        ctx.fillStyle = "black"
        ctx.globalAlpha = this.opacity/100
        ctx.fillRect(this.x,this.y, this.w, this.h)  

        let img = document.getElementById("title");
        ctx.drawImage(img, 400, 200, 400, 200);
    }
    appear(){
      let that = this;
      
      
    }
  }
  