class Card{
    constructor(id, x, y, w, h, src, company, type){
      this.id = id;
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.src = src;
      this.companyIndex = company
      this.type = type;
      this.frame = 0;
      this.staggerFrame = 50;
      this.upDownFrame = {
        0: h/16,
        1: 0,
        2: 0,
        3: 0,
        4: h/16,
      }
    }
    draw(ctx){
        // ctx.fillStyle = "black"
        // ctx.fillRect(this.x,this.y, this.w, this.h)  
       

        let img = document.getElementById(this.src);
        ctx.drawImage(img, this.frame*16,0, 16, 16, 
            this.x, this.y, this.w, this.h);

        let logoimg = rfmData.companyOptions[this.companyIndex]["logoImg"]
        ctx.drawImage(logoimg, this.x+this.w/4, this.y+this.h/8+this.upDownFrame[this.frame], this.w/2, this.h/2);
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
                objectList["obstacle"].push(new Card(i, 0, 0, 200, 200, "card", i, "collect"))
            },0)
        }
    }
    hit(){
        let that = this;
        setTimeout( function() {
            let i = that.id
            curObjects = curObjects.filter(j => !((j.constructor.name == that.constructor.name) && (j.id==i)));
            collectedLogoList.push(rfmData.companyOptions[that.companyIndex]["company"])
        },0)
        document.getElementById("cardsound").play()
    }
  }
  