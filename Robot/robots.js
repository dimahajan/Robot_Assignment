var animSpeed;
var n,m;
var robots;
var walls;
var coins;
var clearList;
var ridList=[];
var bw ;
var bh ;
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var img1=document.createElement('img');
var img2=document.createElement('img');
var img3=document.createElement('img');
var fileData;
img1.src='robot2.png';
img2.src='wall.png';
img3.src='coins.jpeg';

function readFile(file)
{
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function ()
  {
    if(rawFile.readyState === 4)
    {
      if(rawFile.status === 200 || rawFile.status == 0)
      {
        fileData = rawFile.responseText;
      }
    }
  }
  rawFile.send(null);
}

function drawRobots(){
  for(i=0;i<robots.length;i++){
    x = robots[i][0][0]*40+40;
    y = robots[i][0][1]*40+35;
    var n = robots[i][3];
    var gradient=context.createLinearGradient(0,0,1,0);
    gradient.addColorStop("0.5","black");
    context.fillStyle=gradient;
    var x1=x+7;
    var y1=y+22;
    context.font="11px Georgia";
    context.drawImage(img1,0,0,300,300,x,y,75,75);
    context.fillText(""+n,x1,y1);
  }
}

function drawWalls(){
  for(i=0;i<walls.length;i++){
    x = walls[i][0]*40+31;
    y = walls[i][1]*40+31;
    context.drawImage(img2,0,0,300,300,x,y,51,51);
  }
}

function drawCoins(){
  for(i=0;i<coins.length;i++){
    x = coins[i][0][0]*40+35;
    y = coins[i][0][1]*40+34;
    var n = coins[i][1];
    var gradient=context.createLinearGradient(0,0,1,0);
    gradient.addColorStop("0.5","red");
    context.fillStyle=gradient;
    var x1=x+10;
    var y1=y+20;
    context.font="10px Georgia";
    context.drawImage(img3,0,0,300,300,x,y,40,40);
    context.fillText(""+n,x1,y1);
  }
}

function drawBoard(){
  bh = m*40;
  bw = n*40;
  for (var x = 0,i=0; i <=n; i++,x += 40) {
    context.moveTo( x + 30, 30);
    context.lineTo( x + 30, bh + 30);
  }

  for (var x = 0,i=0; i <= m; x += 40,i++) {
    context.moveTo(30,  x + 30);
    context.lineTo(bw + 30,  x + 30);
  }
  context.strokeStyle = "black";
  context.stroke();
}

function clear(){
  var x,y;
  for(var i = 0; i < clearList.length; i++){
    x = clearList[i][0]*40 + 32;
    y = clearList[i][1]*40 + 32;
    context.clearRect(x , y , 37 , 37)
  }
}

function isSameGridWC(){
  var coin = [];
      for(var j=0;j<coins.length;j++){
      var flag = true;
         for(var i = 0; i < walls.length; i++){
            if(walls[i][0]==coins[j][0][0] && walls[i][1]==coins[j][0][1]){
                flag = false;
                break;
            }
         }
        if(flag)
            coin.push(coins[j]);
        else
          clearList.push(coins[j][0]);
    }
    coins = coin;
}

function isSameGridWR(){
    var robot = [];
    for(var j=0;j<robots.length;j++){
         var flag = true;
          for(var i = 0; i < walls.length; i++){
              if(walls[i][0]==robots[j][0][0] && walls[i][1]==robots[j][0][1]){
                 flag = false;
                 break;
              }
          }
          if(flag)
            robot.push(robots[j]);
          else{
            alert("Robot "+robots[j][3]+" is die becz robot goes to on the wall");
            clearList.push(robots[j][0]);

          }
       }
    robots = robot;
}

function isRobotOutOfGrid(){
  var robot = [];
  for(var i=0;i<robots.length;i++){
     if((robots[i][0][0] < 0) || (robots[i][0][1] < 0) || (robots[i][0][0] >= n) || (robots[i][0][1] >= m)){
       alert("Robot "+robots[i][3]+" is dia becz robot goes out of Grid ");
       alert(""+n+","+m+",,"+robots[i][0]);
     }
     else
       robot.push(robots[i]);
  }
 robots = robot;
}

function isMoreRobotInSameGrid(){
  var robot = [];
   for(var i=0;i<robots.length;i++){
     var robot1 = [robots[i]]
     var flag  = true;
      for(var j=0;j<robots.length;j++){
        if(i!=j && robots[i][0][0]==robots[j][0][0] && robots[i][0][1]==robots[j][0][1] ){
          robot1.push(robots[j]);
          flag = false;
        }
      }
      if(flag){
          robot.push(robots[i]);
      }
      else{
        clearList.push(robots[i][0]);
        var s = "";
        for(var j=0;j<robot1.length;j++)
            s+="Robot "+robots[j][3]+" ";
        alert(s+"are same Grid so kill those Robots");
      }
   }
   robots = robot;
}

function isInGridWC(){
  var coin = [];
  for(var i=0;i<coins.length;i++){
     if(!((coins[i][0][0] < 0) || (coins[i][0][1] < 0) || (coins[i][0][0] >= n) || (coins[i][0][1] >= m)))
       coin.push(coins[i]);
     else
       clearList.push(coins[i][0]);
  }
  var wall = [];
  for(var i=0;i<walls.length;i++){
     if(!((walls[i][0] < 0) || (walls[i][1] < 0) || (walls[i][0] >= n) || (walls[i][1] >= m)))
       wall.push(walls[i]);
     else
       clearList.push(walls[i]);
  }
walls= wall;
coins = coin;
}

function validateAll(){
   clearList = [];
   isMoreRobotInSameGrid();
   isRobotOutOfGrid();
   isSameGridWC();
   isInGridWC();
   clear();
}

function side(r,c,sid){
   if(sid == "right")
      r=r-1;
   else if(sid == "left")
      r=r+1;
   else if(sid == "up")
      c=c-1;
   else if(sid == "down")
      c=c+1;
 return [r,c];
}

function chekWall(walls,r,c,sid){
  s = side(r,c,sid);
  r = s[0];
  c = s[1];
  for(var i = 0 ; i < walls.length ; i++){
      if(walls[i][0]==r && walls[i][1]==c){
        return true;
      }
   }
   return false;
}

function chekCoin(coins,r,c,sid){
  s = side(r,c,sid);
  r = s[0];
  c = s[1];
   for(var i = 0 ; i < coins.length ; i++){
      if(coins[i][0][0]==r && coins[i][0][1]==c)
        return true;
   }
   return false;
}

function chekRobot(robots,r,c,sid){
  s = side(r,c,sid);
  r = s[0];
  c = s[1];
   for(var i = 0 ; i < robots.length ; i++){
      if(robots[i][0][0]==r && robot[i][0][1]==c){
        return true;
      }
   }
   return false;
}

function chekEnd(r,c,n,m,sid){
  s = side(r,c,sid);
  r = s[0];
  c = s[1];
  if(r<0 || r > m || c < 0 || c > n )
    return true;
  return false;
}

function getNext(robots,i,cntr){
  for(;cntr>=0;--cntr){
     if(robots[i][1][cntr]=='moveLeft')
       return 'Left';
     else if(robots[i][1][cntr]=='moveRight')
       return 'Right';
     else if(robots[i][1][cntr]=='moveUp')
       return 'Up';
    else if(robots[i][1][cntr]=='moveDown')
       return 'Down';
  }
  return 'Left';
}

function incSp(){
    if(animSpeed>100)
	animSpeed -=500;
    else{
    	//  alert("You can not dicrse the speed from this");
   	  animSpeed=1;
    }
   console.log(animSpeed);
}
  
function dicSp(){
      animSpeed +=500;
      console.log(animSpeed);
}

function keyPressEv(e){
  console.log(e.which);
  if(e.which==43)
     incSp();
  else if(e.which==45)
      dicSp();
}


function isExitRid(rid){
    for(var i = 0 ; i < ridList.length;i++){
      if(ridList[i]==rid)
        return true;
    }
    return false;
}

function moveRobot(cntr){
var myvar = setTimeout(function() {
  var maxlen=0;
   
   context.clearRect(0 , 0 ,  n*40+1000, 29)
    clearList = [];
    var stats='';
    for(var i=0;i<robots.length;i++){
      if(maxlen<robots[i][1].length)
           maxlen=robots[i][1].length;
      if(cntr<robots[i][1].length){
          if(isExitRid(robots[i][3]) && robots[i][1][cntr]!='')
            stats += robots[i][3]+"->" + robots[i][1][cntr]+"   ";
          clearList.push([robots[i][0][0],robots[i][0][1]]);
           
         if(robots[i][1][cntr]=='moveLeft')
            robots[i][0][0]+=1;
          else if(robots[i][1][cntr]=='moveRight')
            robots[i][0][0]-=1;
          else if(robots[i][1][cntr]=='moveDown')
            robots[i][0][1]+=1;
          else if(robots[i][1][cntr]=='moveUp')
            robots[i][0][1]-=1;
          else if(robots[i][1][cntr]=='pickCoin'){
            var co= [];
            for(var k = 0 ; k<coins.length;k++){
              if(coins[k][0][0]==robots[i][0][0] && coins[k][0][1]==robots[i][0][1])
                 robots[i][2]+=coins[k][1];
              else
                co.push(coins[k]);
            }
            coins = co;
          }
          else if(robots[i][1][cntr]=='dropCoin'){
              if(robots[i][2]){
                 coins.push([[robots[i][0][0],robots[i][0][1]],robots[i][2]]);
                 robots[i][2] = 0;
              }
          }

         else if(robots[i][1][cntr]!=''){
           var sls  = robots[i][1][cntr].split(' ');
           if(sls[0]=='isNextWall')
             sls[0]='is'+(getNext(robots,i,cntr))+"Wall";
           else if(sls[0]=='isNextCoin')
             sls[0]='is'+(getNext(robots,i,cntr))+"Coin";
           else if(sls[0]=='isNextRobot')
             sls[0]='is'+(getNext(robots,i,cntr))+"Robot";
           else if(sls[0]=='isNextEnd')
             sls[0]='is'+(getNext(robots,i,cntr))+"End";
           if(sls[0]=='isRightEnd'){

              if(chekEnd(walls,robots[i][0][0],robots[i][0][1],"right"))
                robots[i][1][cntr]=sls[1];
              else
                robots[i][1][cntr]=sls[2];
           }
           else if(sls[0]=='isLeftEnd'){
              if(chekEnd(walls,robots[i][0][0],robots[i][0][1],"left"))
                robots[i][1][cntr]=sls[1];
              else
                robots[i][1][cntr]=sls[2];
           }
           else if(sls[0]=='isUpEnd'){
              if(chekEnd(walls,robots[i][0][0],robots[i][0][1],"Up"))
                robots[i][1][cntr]=sls[1];
              else
                robots[i][1][cntr]=sls[2];
           }
           else if(sls[0]=='isDownEnd'){
              if(chekEnd(walls,robots[i][0][0],robots[i][0][1],"Down"))
                robots[i][1][cntr]=sls[1];
              else
                robots[i][1][cntr]=sls[2];
           }
           else if(sls[0]=='isRightWall'){
              if(chekWall(walls,robots[i][0][0],robots[i][0][1],"right"))
                robots[i][1][cntr]=sls[1];
              else
                robots[i][1][cntr]=sls[2];
           }
           else if(sls[0]=='isLeftWall'){
              if(chekWall(walls,robots[i][0][0],robots[i][0][1],"left"))
                robots[i][1][cntr]=sls[1];
              else
                robots[i][1][cntr]=sls[2];
           }
           else if(sls[0]=='isUpWall'){
              if(chekWall(walls,robots[i][0][0],robots[i][0][1],"up"))
                robots[i][1][cntr]=sls[1];
              else
                robots[i][1][cntr]=sls[2];
           }
           else if(sls[0]=='isDownWall'){
              if(chekWall(walls,robots[i][0][0],robots[i][0][1],"down"))
                robots[i][1][cntr]=sls[1];
              else
                robots[i][1][cntr]=sls[2];
           }
           else if(sls[0]=='isLeftCoin'){
              if(chekCoin(coins,robots[i][0][0],robots[i][0][1],"left"))
                robots[i][1][cntr]=sls[1];
              else
                robots[i][1][cntr]=sls[2];
           }
           else if(sls[0]=='isDownCoin'){
              if(chekCoin(coins,robots[i][0][0],robots[i][0][1],"down"))
                robots[i][1][cntr]=sls[1];
              else
                robots[i][1][cntr]=sls[2];
           }
           else if(sls[0]=='isUpCoin'){
              if(chekCoin(coins,robots[i][0][0],robots[i][0][1],"up"))
                robots[i][1][cntr]=sls[1];
              else
                robots[i][1][cntr]=sls[2];
           }
           else if(sls[0]=='isRightCoin'){
              if(chekCoin(coins,robots[i][0][0],robots[i][0][1],"right"))
                robots[i][1][cntr]=sls[1];
              else
                robots[i][1][cntr]=sls[2];
           }
           else if(sls[0]=='isCoin'){
              if(chekCoin(coins,robots[i][0][0],robots[i][0][1],""))
                robots[i][1][cntr]=sls[1];
              else
                robots[i][1][cntr]=sls[2];
           }
           else if(sls[0]=='isLeftRobot'){
              if(chekRobot(robots,robots[i][0][0],robots[i][0][1],"left"))
                robots[i][1][cntr]=sls[1];
              else
                robots[i][1][cntr]=sls[2];
           }
           else if(sls[0]=='isRightRobot'){
              if(chekRobot(robots,robots[i][0][0],robots[i][0][1],"right"))
                robots[i][1][cntr]=sls[1];
              else
                robots[i][1][cntr]=sls[2];
           }
           else if(sls[0]=='isUpRobot'){
              if(chekRobot(robots,robots[i][0][0],robots[i][0][1],"up"))
                robots[i][1][cntr]=sls[1];
              else
                robots[i][1][cntr]=sls[2];
           }
           else if(sls[0]=='isDownRobot'){
              if(chekRobot(robots,robots[i][0][0],robots[i][0][1],"down"))
                robots[i][1][cntr]=sls[1];
              else
                robots[i][1][cntr]=sls[2];
           }
          i--;
          }
        }
    }
   
    var gradient=context.createLinearGradient(0,0,1,0);
    gradient.addColorStop("0.5","red");
    context.fillStyle=gradient;
    var x=10;
    var y=20;
    context.font="20px Georgia";
    context.fillText(""+stats,x,y);
    stats='';
    clear();
    clearLsit = [];
    validateAll();
    drawCoins();
    drawRobots();
    drawWalls();
    cntr += 1;
   if(cntr<maxlen)
      moveRobot(cntr);
   clearTimeout(myvar); 
  }, animSpeed);
 
}


function drawGrid(){
  drawBoard();
  drawCoins();
  drawRobots();
  drawWalls();
}

function setProgram(){
    for( var i=0 ; i<robots.length ; i++ ){
       readFile(robots[i][1]);
       robots[i][1]=fileData.split('\n');
    }
}

function myMain(){
  readFile("grid.conf");
  var data = fileData.split('\n');
  var conf = [];
  for(var i = 0 ; i<data.length;i++){
    var d = data[i].replace(/\s/g,'');
    if(d != '' && d[0].replace(/\s/g,'') != '#')
      conf.push(d)
  }
  
   n = conf[0];
   m = conf[1];
  canvas.width = m*40+40+1000;
  canvas.height = n*40+40+100;
  
   robots = JSON.parse(conf[2]);
   walls  = JSON.parse(conf[3]);
   coins  = JSON.parse(conf[4]);
  animSpeed  = parseInt(conf[5]);
  ridList    = JSON.parse(conf[6]);
  setProgram();
validateAll();

  drawGrid();
  
  moveRobot(0);
}
myMain();

