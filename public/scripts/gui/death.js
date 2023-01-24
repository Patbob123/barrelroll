class Death{
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

        let img = document.getElementById("barrelbroke");
        ctx.drawImage(img, 400, 200, 400, 200);
    }
    appear(){
      let that = this;
      
      let fadeblack = setInterval(function () {
        if (that.opacity >= 100) {
            document.getElementById("restart").classList.remove("invisible")
            console.log(document.getElementById("restart").classList)
            clearInterval(fadeblack);
            
        }
        that.opacity++;
        that.draw(ctx)
      }, 10)
      
    }
  }
  