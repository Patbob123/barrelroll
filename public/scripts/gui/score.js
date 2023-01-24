class Score{
    constructor(x, y){
      this.x = x;
      this.y = y;
      this.frame = 3;
    }
    draw(ctx){
        ctx.fillStyle = "black"
        ctx.fillRect(this.x,this.y, this.w, this.h)  
        
        if(this.direction!="none"){
          let img = document.getElementById(this.mover);
          if(this.direction == "left"){
            ctx.drawImage(img, this.frame*32,0, 32, 16, 
              this.oldX-200, this.y, this.w*2, this.h);
          }else{
            ctx.drawImage(img, this.frame*32,0, 32, 16, 
              this.oldX, this.y, this.w*2, this.h);
          }
      }else{
        let img = document.getElementById(this.idle);
        ctx.drawImage(img, this.frame*16,0, 16, 16, 
          this.x, this.y, this.w, this.h);
      }
    }
    update(){
      this.updates+= 1+(gamespeed/1000);
      switch(this.direction){
        case "left":
          this.x -= 10+(gamespeed/100)
          this.frame = Math.floor((Math.abs(this.oldX-this.x)/(200/3)))
          if(Math.abs(this.oldX-this.x)>=200){ //MOVE COMPELETE
            this.x = round(this.x, 200, 100)
            this.direction = "none"
            this.oldX = this.x;
          }
          console.log(this.frame)
          
          break;
        case "right":
          this.x += 10+(gamespeed/100)
          this.frame = 3+Math.floor((Math.abs(this.oldX-this.x)/(200/3)))
          if(Math.abs(this.oldX-this.x)>=200){ //MOVE COMPELETE
            this.x = round(this.oldX+200, 200, 100)
            this.direction = "none"
            this.oldX = this.x;
            this.frame = 3;
          }
          console.log(this.frame)
          
          
          break;
          case "none":
          this.frame = Math.floor(this.updates/this.staggerFrame)%5
          
          
          break;

      }
      this.draw(ctx)
    }
    move(direction){
      this.frame=0;
      if(this.direction == "none"){
        if(direction == "left"&&this.x>102||direction == "right"&&this.x<888){
          this.direction = direction
        }
        
      }
    }
  }
  