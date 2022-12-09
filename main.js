let game

let lanewidth = 200;
let score;
let scoreTick;
let invince;
let pause;
let permaPause;
let gamespeed;
let spawnRate;
let spawnTick;
let objectList = {}
objectList["obstacle"] = []
let curObjects = [];
let can = document.getElementById('thecanvas');
let ctx = can.getContext('2d')
ctx.imageSmoothingEnabled = false

let bgcan = document.getElementById('bgcanvas');
let bgctx = bgcan.getContext('2d')
bgctx.imageSmoothingEnabled = false

document.addEventListener("DOMContentLoaded", function(event){
  resetGame();
  spawnObstacles()
  objectList["background"] = new Background(0, 0, 1200, 1000, "background")
});
window.onload = function () {

 
}
function startGame(){
  let startscreen = new Start()
  startscreen.appear()
}



function resetGame() {
  permaPause = false;
  pause = false;
  score = 0
  scoreTick = 0;
  invince = 0;
  gamespeed = score;
  spawnRate = 5000;
  spawnTick = 0;
  objectList = {}
  curObjects = [];
  ctx.clearRect(0, 0, can.width, can.height)

  objectList["character"] = new Character(100 + 2 * 200, 700, 200, 200, "barrelidle", "barrelmove", "none")

  objectList["obstacle"] = []
  for (let i = 0; i < 10; i++) {
    objectList["obstacle"].push(new Grass(i, 0, 0, 200, 200, "grass"));
  }
  for (let i = 0; i < 2; i++) {
    objectList["obstacle"].push(new Lefter(i, 0, 0, 200, 200, "lefter"))
  }
  for (let i = 0; i < 2; i++) {
    objectList["obstacle"].push(new Righter(i, 0, 0, 200, 200, "righter"))
  }
  for(let i =0;i<1;i++){
    objectList["obstacle"].push(new Swinger(i, 0, 0, 100, 100, "swinger"))

  }
  for (let i = 0; i < 5; i++) {
    objectList["obstacle"].push(new Coin(i, 0, 0, 200, 200, "coin"))
  }
  for (let i = 0; i < 2; i++) {
    objectList["obstacle"].push(new Halo(i, 0, 0, 200, 200, "halo"))
  }
  
  console.log(objectList)
  game = setInterval(function () {

    if (!pause) {
      addscore();
      invince--;
      if (spawnTick >= (spawnRate / 10)) {
        spawnObstacles()
        spawnTick = 0;
      } else {
        spawnTick += 1 + (gamespeed / 100);
      }
      objectList["background"].updateBG()
      objectList["character"].update(ctx)
  
      for (let i = 0; i < curObjects.length; i++) {
        curObjects[i].update(ctx)
  
          if ((curObjects[i].y + curObjects[i].h) > objectList["character"].y+50
            && (objectList["character"].y + objectList["character"].h) > curObjects[i].y+50
            && (curObjects[i].x + curObjects[i].w) > objectList["character"].x+10
            && (objectList["character"].x + objectList["character"].w) > curObjects[i].x+10
          ) {
  
            curObjects[i].hit()
            console.log("HIT")
            console.log("enter invincibility")
          }
  
      }
    }
    //console.log(curObjects)
  }, 10)
}



function addscore() {
  scoreTick++;
  if (scoreTick % 100 == 0) {
    score++;
    gamespeed = score * 10;
    for (let i = 1; i < 5; i++) {
      document.getElementById("number" + i).style["background-image"] = "none";
    }
    for (let i = 1; i < score.toString().length + 1; i++) {
      console.log(score)
      console.log(score.toString().charAt(i - 1))
      document.getElementById("number" + i).style["background-image"] = 'url("images/' + score.toString().charAt(i - 1) + '.png")';
    }
  }
}

function spawnObstacles() {

  let randObsIndex = Math.floor(Math.random() * objectList["obstacle"].length)
  objectList["obstacle"][randObsIndex].y = -200
  objectList["obstacle"][randObsIndex].x = 100 + Math.floor(Math.random() * 5) * 200
  objectList["obstacle"][randObsIndex].oldX = objectList["obstacle"][randObsIndex].x

  console.log(objectList["obstacle"])
  console.log(objectList["obstacle"][randObsIndex])
  console.log(randObsIndex)
  curObjects.push(objectList["obstacle"][randObsIndex])
  objectList["obstacle"].splice(randObsIndex, 1)


}

document.addEventListener('keydown', function (event) {
  console.log(event)
  if (!pause) {
    switch (event.key) {
      case "ArrowDown":

        break;
      case "ArrowUp":
        break;
      case "a":
      case "A":
      case "ArrowLeft":
        objectList["character"].move("left")
        break;
      case "d":
      case "D":
      case "ArrowRight":
        objectList["character"].move("right")
        break;
      case "Escape":
        pauseGame()
        break;
      default:
        return;
    }
  }
  else {
    switch (event.key) {
      case "Escape":
        pauseGame()
        break;
    }
  }
});


function settingDown() {
  document.getElementById("setting").style["background-image"] = 'url("images/settingdown.png")';
  pauseGame()
}

function settingUp() {
  document.getElementById("setting").style["background-image"] = 'url("images/setting.png")';
  
}

function restartDown() {
 // document.getElementById("restart").style["background-image"] = 'url("images/restarthold.png")';
  document.getElementById("restart").classList.add("invisible")
  objectList["background"] = new Background(0, 0, 1200, 1000, "background")
  resetGame()
}

function restartUp() {
  document.getElementById("restart").style["background-image"] = 'url("images/restart.png")';
  
}


function pauseGame() {
  if(!permaPause){
    pause = !pause
    if(pause){
      ctx.fillStyle = "black"
      ctx.globalAlpha = 0.5
      ctx.fillRect(0,0, can.width, can.height)  
    }else{
      ctx.globalAlpha = 1
    }
  }
}

function die(){
  let deathscreen = new Death()
  deathscreen.appear();
  permaPause = true;
  pause = true;
}

function round(number, increment, offset) {
  return Math.ceil((number - offset) / increment) * increment + offset;
}