
class Character {
  constructor(x, y, w, h, idle, mover, direction) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.idle = idle;
    this.mover = mover;
    this.direction = direction;
    this.oldX = x;
    this.frame = 3;
    this.updates = 0;
    this.staggerFrame = 10;
    this.barrelframes = {
      0: 0,
      1: -25,
      2: 0,
      3: 0,
      4: 25,
      5: 0,
      6: 0,
    }
  }

  draw(ctx) {
    // ctx.fillStyle = "black"
    // ctx.fillRect(this.x,this.y, this.w, this.h)  
    bgctx.fillStyle = "black"
    bgctx.fillRect(this.x, this.y, this.w, this.h)

    ctx.filter = "saturate(2)";

    if (this.direction != "none") {
      let img = document.getElementById(this.mover);
      if (this.direction == "left") {
        ctx.drawImage(img, this.frame * 32, 0, 32, 16,
          this.oldX - 200, this.y, this.w * 2, this.h);
      } else {
        ctx.drawImage(img, this.frame * 32, 0, 32, 16,
          this.oldX, this.y, this.w * 2, this.h);
      }
    } else {
      let img = document.getElementById(this.idle);
      ctx.drawImage(img, this.frame * 16, 0, 16, 16,
        this.x, this.y, this.w, this.h);
    }

    let playerpfp = document.getElementById("playerpfp");
    ctx.drawImage(playerpfp, this.x + 50 + this.barrelframes[this.frame], this.y + 50, this.w - 100, this.h - 100);

    ctx.filter = "none"; 

    if (invince > 0) {
      let playerpfp = document.getElementById("playerhalo");
      ctx.globalAlpha = invince/500
      ctx.drawImage(playerpfp, this.x + 50 + this.barrelframes[this.frame], this.y, this.w - 100, this.h - 100);
      ctx.globalAlpha = 1;
    }
  }
  update() {
    this.updates += 1 + (gamespeed / 1000);
    switch (this.direction) {
      case "left":
        this.x -= 10 + (gamespeed / 100)
        this.frame = Math.floor((Math.abs(this.oldX - this.x) / (200 / 3)))
        if (Math.abs(this.oldX - this.x) >= 200) { //MOVE COMPELETE
          this.x = round(this.x, 200, 100)
          this.direction = "none"
          this.oldX = this.x;
        }
        console.log(this.frame)

        break;
      case "right":
        this.x += 10 + (gamespeed / 100)
        this.frame = 3 + Math.floor((Math.abs(this.oldX - this.x) / (200 / 3)))
        if (Math.abs(this.oldX - this.x) >= 200) { //MOVE COMPELETE
          this.x = round(this.oldX + 200, 200, 100)
          this.direction = "none"
          this.oldX = this.x;
          this.frame = 3;
        }
        console.log(this.frame)


        break;
      case "none":
        this.frame = Math.floor(this.updates / this.staggerFrame) % 5


        break;

    }
    this.draw(ctx)
    for(let i = 0; i<effectQueue.length;i++){
      if(effectQueue[i]["effectTime"]<effectQueue[i]["duration"]){
        effectQueue[i].playEffect(parctx);
      }else{
        effectQueue.splice(i, 1)
      }
      
    }
  }
  move(direction) {
    this.frame = 0;
    if (this.direction == "none") {
      if (this.checkSides(direction)) {
        return
      }

      if (direction == "left" && this.x > 102 || direction == "right" && this.x < 888) {
        document.getElementById("sidestep").play()
        this.direction = direction
      }

    }
  }
  checkSides(direction) {
    for (let i = 0; i < curObjects.length; i++) {
      if ((curObjects[i].y + curObjects[i].h) > objectList["character"].y + 50
        && (objectList["character"].y + objectList["character"].h) > curObjects[i].y + 50) {
        if (direction == "right"
          && curObjects[i].x < (objectList["character"].x + objectList["character"].w + 10)
          && (objectList["character"].x + objectList["character"].w + 10) < (curObjects[i].x + curObjects[i].w)
          && curObjects[i].type =="trap"
        ) {
          return true
        }
        if (direction == "left"
          && curObjects[i].x < (objectList["character"].x - 10)
          && (objectList["character"].x - 10) < (curObjects[i].x + curObjects[i].w)
          && curObjects[i].type =="trap"
        ) {
          console.log("LOFET")
          return true
        }
      }

    }
    return false;
  }
}
