class Start{
    constructor(){
      this.x = 1200;
      this.y = 0;
      this.w = 1200;
      this.h = 1000;
      this.opacity = 0;
      this.status = 1; //0 is off, 1 is on
    }
    draw(ctx){
        ctx.fillStyle = "black"

        let img = document.getElementById("title");
        ctx.drawImage(img, this.x, 50, 700, 700);
    }
    appear(){
      if(this.x>250){
        this.x-=50;
      }else{
        this.status = 1;
      }
      this.draw(ctx);
      
    }
    disappear(){
      if(this.x>(-700)){
        this.x-=50;
      }else{
        this.status = 0;
      }
      this.draw(ctx);
      
    }
  }
  