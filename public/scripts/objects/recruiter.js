class Recruiter{
    constructor(id, x, y, w, h, src, type){
      this.id = id;
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.oldX = x;
      this.src = src;
      this.type = type;
      this.updates = 0;
      this.frame = 0;
      this.staggerFrame = 50;
      this.direction = "none";
    }
    draw(ctx){
        // ctx.fillStyle = "black"
        // ctx.fillRect(this.x,this.y, this.w, this.h)  

        let img = document.getElementById(this.src);
        ctx.drawImage(img, this.frame * 16, 0, 16, 16,
            this.x, this.y, this.w, this.h);
    }
    update(){
        this.updates += 1 + (gamespeed / 50);
        switch (this.direction) {
          case "left":
            this.x -= 10 + (gamespeed / 100)
            if (Math.abs(this.oldX - this.x) >= 200) { //MOVE COMPELETE
              this.x = round(this.x, 200, 100)
              this.direction = "none"
              this.oldX = this.x;
            }
    
            break;
          case "right":
            this.x += 10 + (gamespeed / 100)
            if (Math.abs(this.oldX - this.x) >= 200) { //MOVE COMPELETE
              this.x = round(this.oldX + 200, 200, 100)
              this.direction = "none"
              this.oldX = this.x;
            }
            break;
          case "none":
           this.frame = Math.floor(this.updates / this.staggerFrame) % 10
            let directionchance = Math.floor(Math.random() * 500)
            if(directionchance==3){
               this.move("left")
            }else if(directionchance==2){
               this.move("right")
            }
            break;
    
        }
      this.draw(ctx)
      this.y += 1+(gamespeed/10000)
      if(this.y>1000){
        let that = this;
        setTimeout( function() {
          that.frame = 0;
          let i = that.id
          curObjects = curObjects.filter(j => !((j.constructor.name == that.constructor.name) && (j.id==j)));
          objectList["obstacle"].push(new Recruiter(i, 0, 0, 200, 200, "recruiter", i, "collect"))
      },0)
      }
    }
    move(direction) {
        this.frame = 0;
        if (this.direction == "none") {
          if (direction == "left" && this.x > 102 || direction == "right" && this.x < 888) {
            document.getElementById("sidestep").play()
            this.direction = direction
          }
    
        }
      }
    hit(){
        let that = this;
        setTimeout( function() {
            let i = that.id
            curObjects = curObjects.filter(j => !((j.constructor.name == that.constructor.name) && (j.id==j)));
            objectList["obstacle"].push(new Recruiter(i, 0, 0, 200, 200, "recruiter", i, "collect"))
            recruitergot = true;
        },0)
        document.getElementById("cardsound").play()
    }
  }
  