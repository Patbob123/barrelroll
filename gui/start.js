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

        let img = document.getElementById("title");
        ctx.drawImage(img, 250, 50, 700, 700);
    }
    appear(){
      this.draw(ctx)
      
    }
  }
  