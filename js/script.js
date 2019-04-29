
var howManyDots;
var howManyMade = 0;
var xLocs = new Array();
var yLocs = new Array();
var dXSpeed = new Array();
var dYSpeed = new Array();
var dotColor = new Array();
var dotSize = 10;
var moveTheDots = false;
var colors = ['#808000', '#00FF00', '#00FFFF', '#00FFFF', 'Gold', 'DeepSkyBlue', 'Indigo', 'Maroon', 'LightSeaGreen', 'HotPink', 'Chocolate', 'CadetBlue', 'Aquamarine', 'CadetBlue', 'Chocolate','CornflowerBlue', 'Cyan', 'DarkBlue','#00008b', 'DarkGreen', 'DarkSlateBlue', 'DeepSkyBlue','FireBrick', 'Gold', 'GreenYellow', 'HotPink','Indigo', 'LightBlue', 'LightGreen','LightSeaGreen', 'LimeGreen', 'Maroon','MediumSeaGreen', 'MediumSlateBlue' ];
var stopAnimation = true;
var totalColors = colors.length;
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext('2d');
var rect = canvas.getBoundingClientRect();
var canvasW = rect.right - rect.left;
var canvasH = rect.bottom - rect.top;
console.log("The totall number of colors is " + totalColors);

function frame() {
  //alert("make a frame");
  if(moveTheDots === false) {
    clearInterval(id);
  }
  else {
    for(var i = 0; i < xLocs.length; i++) {
      var theDX = dXSpeed[i];
      var theDY = dYSpeed[i];
      xLocs[i] += theDX;
      yLocs[i] += theDY;
      //bouncing
      //run check for a left wall
      if(xLocs[i] < dotSize/2) {
        xLocs[i] = dotSize/2 + 1;
        dXSpeed[i] *= -1;
      }
      //run check for right wall
      if(xLocs[i] > canvasW - (dotSize/2)) {
        xLocs[i] = canvasW - (dotSize/2) - 1;
        dXSpeed[i] *= -1;
      }
      if(yLocs[i] < dotSize/2) {
        yLocs[i] = dotSize/2 + 1;
        dYSpeed[i] *= -1;
      }
      if(yLocs[i] > canvasH - (dotSize/2)) {
        yLocs[i] = canvasH - (dotSize/2) - 1;
        dYSpeed[i] *= -1;
      }
    }
    redrawScene();
  }
}

function moveEveryBody(){
  var id = setInterval(frame, 7);
}
function toggleDotMoving(){
  if(moveTheDots == false) {
    //alert("start");
    moveEveryBody();
    moveTheDots = true;
  }
  else {
    //alert("stop");
    moveTheDots = false;
  }
}
function doReset() {
  howManyMade = 0;
  var xLocsLen = xLocs.length;
  var yLocsLen = yLocs.length;
  var dXSpeedLen = dXSpeed.length;
  var dYSpeedLen = dYSpeed.length;
  var dotColorLen = dotColor.length;

  for (var i = 0; i < xLocsLen; i++){
    xLocs.pop();
  }
  for (var i = 0; i < yLocsLen; i++){
    yLocs.pop();
  }
  for (var i = 0; i < dXSpeedLen; i++){
    dXSpeed.pop();
  }
  for (var i = 0; i < dYSpeedLen; i++){
    dYSpeed.pop();
  }
  for (var i = 0; i < dotColorLen; i++){
    dotColor.pop();
  }
  redrawScene();
}
function getMousePosition(canvas, event) {
  var rect = canvas.getBoundingClientRect();

  var xL = event.clientX - rect.left;
  var yL = event.clientY - rect.top;
  return {
    x: xL,
    y:yL
  }
}
function setup(){
  setTimeout(function(){
    howManyDots = prompt("How many dots would you like");
  },
  100);
}
function addClick(x, y) {
  //lots of programing...
  xLocs.push(Math.floor(x- (dotSize/2.0)));
  yLocs.push(Math.floor(y- (dotSize/2.0)));
  //color of dots
  var dColor = Math.floor( Math.random() * colors.length);
  dotColor.push(dColor);
  //speed of dots
  var randDX = 0;
  var randDY = 0;
  while(randDX === 0 && randDY === 0) {
    var randDX = Math.floor( Math.random() * 9) - 4;
    var randDY = Math.floor( Math.random() * 9) - 4;
  }
  dXSpeed.push(randDX);
  dYSpeed.push(randDY);
}
function redrawScene() {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  //loop
  for(var i=0; i < xLocs.length; i++) {
    context.beginPath();
    context.ellipse(
      xLocs[i],
      yLocs[i],
      dotSize,
      dotSize,
      0,0,
      Math.PI*2);
    var whichColorNum = dotColor[i];
    context.fillStyle = colors[whichColorNum];
    context.fill();
    context.closePath();
  }
}

canvas.addEventListener('mousedown', function(event) {
    //alert("Hey you called the anonymous function!");
    var mousePos = getMousePosition(canvas, event);
    //alert("You clicked at " + mousePos.x + "," + mousePos.y);

    if(howManyMade < howManyDots) {
      addClick(mousePos.x, mousePos.y);
      howManyMade++;
      redrawScene();
    }
  }
 );
