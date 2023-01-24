class Collect{
    constructor(w, h, src, dur){
        this.w = w;
        this.h = h;
        this.src = src;
        this.duration = dur;
        this.effectTime = 0;
      }
    playEffect(ctx){
        this.effectTime++;
        let img = document.getElementById(this.src);
        ctx.globalAlpha = 1-this.effectTime/this.duration
        ctx.drawImage(img, objectList["character"].x, objectList["character"].y-objectList["character"].h-this.effectTime, this.w, this.h);
        ctx.globalAlpha = 1
  }
}