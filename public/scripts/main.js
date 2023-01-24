// import availibleCompanies from './availibleCompanies.js';
// console.log(availibleCompanies)

let game

let lanewidth = 200;
let score, scoreTick, invince, permaPause, gamespeed, spawnRate, spawnTick, halocount, recruitergot;
let pause = true;

let objectList = {}
objectList["obstacle"] = []
let curObjects = [];
let collectedLogoList = [];
let effectQueue = [];

let startMenu = true;

let can = document.getElementById('thecanvas');
let ctx = can.getContext('2d')
ctx.imageSmoothingEnabled = false

let parcan = document.getElementById('particlecanvas');
let parctx = can.getContext('2d')
parctx.imageSmoothingEnabled = false

let playerimgsrc = "public/pfp.png"

let bgcan = document.getElementById('bgcanvas');
let bgctx = bgcan.getContext('2d')
bgctx.imageSmoothingEnabled = false

let uost = document.getElementById("uost")

document.addEventListener("DOMContentLoaded", function(event){
  let pfp = document.getElementById('playerpfp');
  let playerimg = new Image;
  playerimg.onload = function() {
    pfp.src = playerimg.src;
  }
  playerimg.src = playerimgsrc

  objectList["background"] = new Background(0, 0, 1200, 1000, "background")
  objectList["start"] = new Start()
  startGame();
  spawnObstacles()
  
});

function loadImages(){
  
}

function loadLogos(){
  for(let i = 0;i<availibleCompanies.length;i++){
    let logoImg = document.createElement("img")
    logoImg.src = availibleCompanies[i]["logoFile"]
    availibleCompanies[i]["logoImg"] = logoImg
  }
  console.log(availibleCompanies)
}

function startGame(){
  let startscreen = new Start()
  loadLogos()

   let startBG = setInterval(function () {
    if(!startMenu){
      clearInterval(startBG);
    }
      for(let i =0;i<objectList.length;i++){}
      objectList["background"].updateBG()
      startscreen.appear()
    },10)
  
  setupEnvironment()
}


function setupEnvironment(){
  permaPause = false;
  score = 1;
  scoreTick = 0;
  invince = 0;
  gamespeed = 100;
  spawnRate = 5000;
  spawnTick = 0;
  isNight = false;
  recruitergot = false;
  objectList = {}
  curObjects = [];
  collectedLogoList = [];
  effectQueue = [];
  halocount = 0;
  uost.currentTime = 0
  uost.volume = 0.1
 uost.play()

  ctx.clearRect(0, 0, can.width, can.height)
  objectList["background"] = new Background(0, 0, 1200, 1000, "background")
  objectList["character"] = new Character(100 + 2 * 200, 700, 200, 200, "barrelidle", "barrelmove", "none")

  objectList["obstacle"] = []
  for (let i = 0; i < 1; i++) {
    objectList["obstacle"].push(new Recruiter(i,0,0,200,200,"recruiter","collect"));
  }
  for (let i = 0; i < availibleCompanies.length; i++) {
    objectList["obstacle"].push(new Card(i, 0, 0, 200, 200, "card", i, "collect"));
  }
  for (let i = 0; i < 50; i++) {
    objectList["obstacle"].push(new Grass(i, 0, 0, 200, 200, "grass", "trap"));
  }
  for (let i = 0; i < 10; i++) {
    objectList["obstacle"].push(new Lefter(i, 0, 0, 200, 200, "lefter", "trap"))
  }
  for (let i = 0; i < 10; i++) {
    objectList["obstacle"].push(new Righter(i, 0, 0, 200, 200, "righter", "trap"))
  }
  for(let i =0;i<5;i++){
    objectList["obstacle"].push(new Swinger(i, 0, 0, 100, 100, "swinger", "trap"))

  }
  for(let i =0;i<1;i++){
    objectList["obstacle"].push(new Monkey(i, 0, 0, 200, 200, "monkey", "trap"))

  }
  for (let i = 0; i < 25; i++) {
    objectList["obstacle"].push(new Coin(i, 0, 0, 200, 200, "coin", "collect"))
  }
  for (let i = 0; i < 1; i++) {
    objectList["obstacle"].push(new Halo(i, 0, 0, 200, 200, "halo", "collect"))
  }
}

function resetGame() {
  
  pause = false;
  setupEnvironment()
  if(score>1){
    return;
  }
  clearInterval(game)
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
          }
  
      }
    }
    //console.log(curObjects)
  }, 10)
}

function dayNightCycle(){
  console.log(score%5)
  if(score%5==0){
    console.log(score%5)
    isNight = !isNight
    if(isNight){
      $("#filter").animate({ opacity: 0.5 }, 1000, 'linear', function () {
      });
    }else{
      $("#filter").animate({ opacity: 0 }, 1000, 'linear', function () {
      });
    }
  }
}

function addscore() {
  scoreTick++;
  if (scoreTick % 100 == 0) {
    dayNightCycle();
    score++;
    gamespeed = 100 + score * 10;
  }
    for (let i = 1; i < 5; i++) {
      document.getElementById("number" + i).style["background-image"] = "none";
    }
    for (let i = 1; i < score.toString().length + 1; i++) {
      document.getElementById("number" + i).style["background-image"] = 'url("public/images/' + score.toString().charAt(i - 1) + '.png")';
    
  }
}

function spawnObstacles() {
console.log(objectList)
  let randObsIndex = Math.floor(Math.random() * objectList["obstacle"].length)
  objectList["obstacle"][randObsIndex].y = -200
  objectList["obstacle"][randObsIndex].x = 100 + Math.floor(Math.random() * 5) * 200
  objectList["obstacle"][randObsIndex].oldX = objectList["obstacle"][randObsIndex].x

  curObjects.push(objectList["obstacle"][randObsIndex])
  objectList["obstacle"].splice(randObsIndex, 1)


}




function settingDown() {
  document.getElementById("setting").style["background-image"] = 'url("public/images/settingdown.png")';
  pauseGame()
}

function settingUp() {
  document.getElementById("setting").style["background-image"] = 'url("public/images/setting.png")';
  
}

function restartDown() {
 // document.getElementById("restart").style["background-image"] = 'url("images/restarthold.png")';
  document.getElementById("restart").classList.add("invisible")
  objectList["background"] = new Background(0, 0, 1200, 1000, "background")
  resetGame()
}

function restartUp() {
  document.getElementById("restart").style["background-image"] = 'url("public/images/restart.png")';
  
}

function startDown() {
  // document.getElementById("restart").style["background-image"] = 'url("images/restarthold.png")';
  $("#start").animate({ opacity: 0 }, 100, 'linear', function () {
    document.getElementById("start").classList.add("invisible")
  });
 //  document.getElementById("start").classList.add("invisible")
   startMenu = false;
   resetGame()
 }

function pauseGame() {
  if(!permaPause){
    pause = !pause
    if(pause){
      uost.pause()
      ctx.fillStyle = "black"
      ctx.globalAlpha = 0.5
      ctx.fillRect(0,0, can.width, can.height)  
    }else{
      uost.play()
      ctx.globalAlpha = 1
    }
  }
}

function die(){
  let deathscreen = new Death()
  deathscreen.appear();
  permaPause = true;
  pause = true;
  document.getElementById("diedsound").play()
  uost.volume = 0.05
  console.log({"Recruiter":recruitergot, "collectedLogoList":collectedLogoList, "score": score, "halocount": halocount})
}

function round(number, increment, offset) {
  return Math.ceil((number - offset) / increment) * increment + offset;
}