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
let playerOptions;
let startScreen;
let nextButton;

let gamebackground = new Background(0, 0, 1200, 1000, "background")

let can = document.getElementById('thecanvas');
let ctx = can.getContext('2d')
ctx.imageSmoothingEnabled = false

let parcan = document.getElementById('particlecanvas');
let parctx = can.getContext('2d')
parctx.imageSmoothingEnabled = false

let playerimg = new Image;

let bgcan = document.getElementById('bgcanvas');
let bgctx = bgcan.getContext('2d')
bgctx.imageSmoothingEnabled = false

let uost = document.getElementById("uost")

document.addEventListener("DOMContentLoaded", function(event){
  let pfp = document.getElementById('playerpfp');
  playerimg.onload = function() {
    pfp.src = playerimg.src;
  }
 // playerimg.src = playerimgsrc

  objectList["background"] = gamebackground;
  objectList["start"] = new Start()
  startGame();
  spawnObstacles()
  
});

function loadImages(){
  
}

function loadLogos(){
  for(let i = 0;i<rfmData.companyOptions.length;i++){
    let logoImg = document.createElement("img")
    logoImg.src = rfmData.companyOptions[i]["avatar"]
    rfmData.companyOptions[i]["logoImg"] = logoImg
  }
  console.log(rfmData.companyOptions)
}

function startGame(){
  startscreen = new Start()
  loadLogos()

   let startBG = setInterval(function () {
    if(startscreen.status == 0){
      clearInterval(startBG);
    }
      for(let i =0;i<objectList.length;i++){}
      objectList["background"].updateBG()
      startscreen.appear()
    },10)
  
  setupEnvironment()
}

function setupMusic(){
  uost.currentTime = 0
  uost.volume = 0.1
  let gameResp = uost.play()
  if (gameResp!== undefined) {
    gameResp.then(_ => {
      console.log("music starts")
    }).catch(err => {
       //console.log(err)
    });
}
}

function setupEnvironment(){
  permaPause = false;
  score = 1;
  scoreTick = 0;
  invince = 0;
  gamespeed = 10;
  spawnRate = 5000;
  spawnTick = 0;
  isNight = false;
  recruitergot = false;
  objectList = {}
  curObjects = [];
  collectedLogoList = [];
  effectQueue = [];
  halocount = 0;
  setupMusic();

  ctx.clearRect(0, 0, can.width, can.height)
  objectList["background"] = gamebackground
  objectList["character"] = new Character(100 + 2 * 200, 700, 200, 200, "barrelidle", "barrelmove", "none")

  objectList["obstacle"] = []
  for (let i = 0; i < 1; i++) {
    objectList["obstacle"].push(new Recruiter(i,0,0,200,200,"recruiter","collect"));
  }
  for (let i = 0; i < rfmData.companyOptions.length; i++) {
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
  if(score%10==0){
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
    gamespeed = 10 + score *10;
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
  if(!pause){
    document.getElementById("setting").style["background-image"] = 'url("public/images/settingdown.png")';
    pauseGame()
  }else{
    document.getElementById("setting").style["background-image"] = 'url("public/images/setting.png")';
    pauseGame()
  }
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
  let endstartBG = setInterval(function () {
    console.log(startscreen.status)
    if(startscreen.status == 0){
      clearInterval(endstartBG);
      this.startPlayerOptions();
    }
      objectList["background"].updateBG()
      startscreen.disappear()
    },10)
  $("#start").animate({ left: -1000 }, 200, 'linear', function () {
    document.getElementById("start").classList.add("invisible")
  });
 //  document.getElementById("start").classList.add("invisible")
   //startMenu = false;
   //resetGame()
 }

function startPlayerOptions(){
 
  for(let i=0;i<rfmData.userOptions.length;i++){
    
    let playerCard = $('<div>').addClass("linecard playercard")
    .attr({
        id: "playercard"+i,
        "data-index": i,
    })
    const playerUser = $('<div>').text(rfmData.userOptions[i]["user"]);
    const playerStreak = $('<div>').text(rfmData.userOptions[i]["streak"]).addClass("right");
    playerCard.append(playerUser)
    playerCard.append(playerStreak)
    

  //  playerCard.animate({left: "1200px"}, 100, 'linear');
    console.log((playerCard))
    $("#playerOptions").append(playerCard)
    document.getElementById("playercard"+i).onclick = showCompanies
    
    playerCard.animate({left: "0"}, 200, 'linear');
  }
}



function runnerGame(){
  $("#playerOptions").remove();
  startMenu = false;
   resetGame()
}

function pauseGame() {
  if(!startMenu){
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
}
function die(){
  // let deathscreen = new Death()
  // deathscreen.appear();
  this.gamescoreLeaderboard();
  pauseGame()
  permaPause = true;
  
  document.getElementById("diedsound").play()
  uost.volume = 0.05
  console.log({"Recruiter":recruitergot, "collectedLogoList":collectedLogoList, "score": score, "halocount": halocount})
}

async function showCompanies(e){
  playerimg.src = rfmData.userOptions[e.target.dataset.index]["avatar"];
  console.log(e.target.dataset.index)
  for(let i=0;i<rfmData.userOptions.length;i++){
    $("#playercard"+i).animate({left: "-1200px"}, 200, 'linear', function () {
      $("#playercard"+i).remove();
    });
  }
    let nextButtonText = $('<div>').addClass("normalText").text("Start");
    nextButton = $('<div>')
    .attr({
        id: "rungame",
    })
    nextButton.append(nextButtonText);
    $("#playerOptions").append(nextButton)

  let companyOptions =  $('<div>').addClass("companyoptions")
  .attr({
    id: "companyOptions",
})
  $("#playerOptions").append(companyOptions)

  
  console.log(rfmData)
  for(let i=0;i<rfmData.companyOptions.length;i++){
    
    let companyCard = $('<div>').addClass("companycard")
    .attr({
        id: "companycard"+i,
        "data-index": i,
    })
    let companyName = $('<div>').addClass("companyName")
    .attr({
        id: "companyname"+i,
    }).text(rfmData.companyOptions[i]["company"])
    let companyImage = $('<div>').addClass("companyimage")
    .attr({
        id: "companyimage"+i,
        "data-index": i,
        "z-index": 89,
    })
    
    
    
    $("#companyOptions").append(companyCard)
    $("#companycard"+i).append(companyImage)
    $("#companycard"+i).append(companyName)
    document.getElementById("companyimage"+i).style.backgroundImage = `url("${rfmData.companyOptions[i].avatar}")`
    companyCard.animate({left: "0"}, 200, 'linear');
   
  //  playerCard.animate({left: "1200px"}, 100, 'linear');
    console.log((companyCard))

  }

 
  $("#rungame").animate({ left: "1200px" }, 0, 'linear', function () {
    document.getElementById("rungame").classList.remove("invisible")
  });
  $("#rungame").animate({ left: "33%" }, 200, 'linear', function (){
    let curCompaniesText =  $('<div>').addClass("normalText")
    .text("Current Companies")
    $("#playerOptions").append(curCompaniesText)
  });
 
  document.getElementById("rungame").onclick = runnerGame

}
async function gamescoreLeaderboard(){
  console.log("A")
  let scoreText =  $('<div>').addClass("normalText")
  .text("Score Leaderboard")

  let scoreLeaderboard = $('<div>').addClass("scoreBoard")
  .attr({
      id: "scoreLeaderboard",
  })
  scoreLeaderboard.append(scoreText)

  for(let i=0;i<rfmData.gamePlayScore.length;i++){
    console.log(rfmData.gamePlayScore)
    let scoreCard = $('<div>').addClass("linecard scorecard")
    .attr({
        id: "scoreCard"+i,
        "data-index": i,
    })
    const playerUser = $('<div>').text(rfmData.gamePlayScore[i]["user"]);
    const playerScore = $('<div>').text(rfmData.gamePlayScore[i]["score"]).addClass("right");
    scoreCard.append(playerUser)
    scoreCard.append(playerScore)

    scoreLeaderboard.append(scoreCard)
    scoreCard.animate({left: "0"}, 200, 'linear');
  }
 
  $("#leaderBoard").append(scoreLeaderboard)
  scoreLeaderboard.animate({opacity: 1}, 200, 'linear');

  nextButton.animate({ left: "1200px" }, 0, 'linear', function () {

    document.getElementById("rungame").classList.remove("invisible")
  });
  nextButton.addClass("normalText").text("Continue");
  nextButton.animate({ left: "30%" }, 200, 'linear')
  scoreLeaderboard.append(nextButton)
  document.getElementById("rungame").onclick = tileLeaderboard
  
  //appendRunGame(tileLeaderboard, function(){});
  
}
async function tileLeaderboard(){
  $("#scoreLeaderboard").animate({left: "-1200px"}, 200, 'linear', function () {
    $("#scoreLeaderboard").remove();
  });
  let tileLeaderboard = $('<div>').addClass("playerOptions")
  .attr({
      id: "tileLeaderboard",
  })
  let tabBar = $('<div>').addClass("tabBar")
  .attr({
      id: "tabBar",
  })

  tileScoreArr = rfmData.companyTileScore
  
  for(let j=0;j<tileScoreArr.length;j++){
    
    for(let key in tileScoreArr[j]){
      //populateTileLeaderBoard(tileScoreArr[j][key], tileLeaderboard)
    let tabButton = $('<div>').addClass("tabbuttons")
      .attr({
          'data-company': j,
          id: "tabButton"+j,
      }).text(key)
      tabBar.append(tabButton)
    }
  }
  $("#leaderBoard").append(tabBar)
  $("#leaderBoard").append(tileLeaderboard)
  
  for(let j=0;j<tileScoreArr.length;j++){
    for(let key in tileScoreArr[j]){
    document.getElementById("tabButton"+j).addEventListener("click", ()=>{
      
      populateTileLeaderBoard(tileScoreArr[j][key], tileLeaderboard)
    })
  }
 }
 console.log(tileLeaderboard)
}

function populateTileLeaderBoard(company, tileLeaderboard){
  console.log(company)
  let test = document.getElementById("tileLeaderboard")
  while (test.firstChild) {
    test.lastChild.remove();;
  }
  for(let i=0;i<company.length;i++){
    let tileScoreCard = $('<div>').addClass("linecard playercard")
    .attr({
        id: "tileScoreCard"+i,
    })
    const playerUser = $('<div>').text(company[i]["user"]);
    const playerTiles = $('<div>').addClass("right").text(company[i]["tiles"]);
    tileScoreCard.append(playerUser)
    tileScoreCard.append(playerTiles)
    

    tileLeaderboard.append(tileScoreCard)
    
    tileScoreCard.animate({left: "0"}, 200, 'linear');
  }
  
  $("#leaderBoard").append(tileLeaderboard)


}

function round(number, increment, offset) {
  return Math.ceil((number - offset) / increment) * increment + offset;
}

// function appendRunGame(curFunction, secFunction){
//   console.log(curFunction)
//   $("#rungame").animate({ left: "1200px" }, 0, 'linear', function () {
//     document.getElementById("rungame").classList.remove("invisible")
//   });
//   $("#rungame").animate({ left: "400px" }, 200, 'linear', function (){
//     secFunction();
//   });
//   document.getElementById("rungame").onclick = eval(curFunction)
// }