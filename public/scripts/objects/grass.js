class Grass {
    constructor(id, x, y, w, h, src, type) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.src = src;
        this.type = type;
    }
    draw(ctx) {
        // ctx.fillStyle = "black"
        // ctx.fillRect(this.x,this.y, this.w, this.h)  
        let img = document.getElementById(this.src);
        ctx.drawImage(img, this.x, this.y, this.w, this.h);
    }
    update() {
        this.draw(ctx)
        this.y += 1 + (gamespeed / 100)
        if (this.y > 1000) {
            let that = this;
            setTimeout(function () {
                let i = that.id
                console.log(curObjects)
                curObjects = curObjects.filter(j => !((j.constructor.name == that.constructor.name) && (j.id==i)));
                console.log(curObjects)
                objectList["obstacle"].push(new Grass(i, 0, 0, 200, 200, "grass", "trap"))
            }, 0)
        }
    }
    hit() {
        if (invince <= 0) {
            die()
        } else {
            score+=5;
            let that = this;
            setTimeout(function () {
                let i = that.id
                curObjects = curObjects.filter(j => !((j.constructor.name == that.constructor.name) && (j.id==i)));
                objectList["obstacle"].push(new Grass(i, 0, 0, 200, 200, "grass", "trap"))
            }, 0)
            document.getElementById("coinsound").play()
        }
    }
}
