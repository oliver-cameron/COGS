function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

document.addEventListener('keydown', function (event) {
    keydown = event.key;
    if(keydown == "ArrowUp"){
        document.getElementById("modal").style.display = "block";
    }
});
avabGrid = [];
var x = 0
var y = 0
var goTime = false;
var didGo = false;
var chosenCell = [0,0];
var collision = false;
var pressGo = false;
var random = 0;
var chosenLeft = 0;
var functime = false;
function resRun() {
    if (!didGo){
    avabGrid = [];
    document.getElementById("GO").style.background = "#44bb44"
    goTime = true;
    document.getElementById("resout").value = document.getElementById("resolution").value;
    document.getElementById("gridCells").innerHTML = "";
    var grid = "";
    var coords = "";
    cellDist = (parseFloat(document.getElementById("grid").getBoundingClientRect().width) - 1.3) / document.getElementById("resolution").value - 1.3;
    for (var i = document.getElementById("resolution").value * -0.5; i <= (document.getElementById("resolution").value - 1) * 0.5; i++) {
        for (var j = document.getElementById("resolution").value * -0.5; j <= (document.getElementById("resolution").value - 1) * 0.5; j++) {
            if ((i == 0) && !(j == 0)) {
                coords = coords.concat(("<p style='font-size:8px; top:"+((j + document.getElementById("resolution").value * 0.5) * (cellDist + 1.3)-1.3 - 9)+"px; left:" + ((i + document.getElementById("resolution").value * 0.5) * (cellDist + 1.3)-3)+ "px;color: #000; position: absolute;'>")+((0-j) + "</p>")+"\n")
            }
            else if ((j == 0) && !(i == 0)) {
                coords = coords.concat(("<p style='font-size:8px; top:"+((j + document.getElementById("resolution").value * 0.5) * (cellDist + 1.3)-1.3 - 9)+"px; left:" + ((i + document.getElementById("resolution").value * 0.5) * (cellDist + 1.3)-3)+ "px;color: #000; position: absolute;'>")+(i + "</p>")+"\n")
            }
            else if ((i == 0) && (j == 0)) {
                coords = coords.concat(("<p style='font-size:8px; top:"+((j + document.getElementById("resolution").value * 0.5) * (cellDist + 1.3)-1.3 - 9)+"px; left:" + ((i + document.getElementById("resolution").value * 0.5) * (cellDist + 1.3)-3)+ "px;color: #000; position: absolute;'>")+(0 + "</p>")+"\n")
            }
            if((i< document.getElementById("resolution").value * 0.5)&&(j < document.getElementById("resolution").value * 0.5))
            grid = grid.concat("<div id='" + (i + ',') + (0-j) + "'style='left:" + (((i + document.getElementById("resolution").value * 0.5)) * (cellDist + 1.3) + 1.3) + "px;top:" + ((j + document.getElementById("resolution").value * 0.5) * (cellDist + 1.3) + 1.3) + "px; position: absolute; background: #FFFFFF; width:" + cellDist + "px; height:" + cellDist + "px; border: 0px #000 solid;'></div>\n");
            avabGrid.push([(i),(0-j)]);
        }
    }
    document.getElementById("gridCells").innerHTML = grid;
    document.getElementById("coords").innerHTML = coords;
}else{
    document.getElementById("resolution").value = document.getElementById("resout").value
}
}
function parse(str) {
    return Function(`'use strict'; return (${str})`)()
}
setInterval(() => {
    document.getElementById("dot").style.background = document.getElementById("colour1").value;
    document.getElementById("dot").style.borderColor = ("rgb("+oppositeRGB(document.getElementById("colour1").value)+")");
    if (avabGrid.length < 1 && (didGo&& !goTime)){
        document.getElementById("sideContent").innerHTML = ""
    }
    if (isValidMathExpression(document.getElementById("function").value)){
        document.getElementById("function").style.background = "#bbffbb";
        functime = true;
    }else{
        document.getElementById("function").style.background = "#ffbbbb";
        functime = false;
    }
    if(goTime && functime){
        document.getElementById("GO").style.background = "#44bb44"
    }else{
        document.getElementById("GO").style.background = "#66dd66"
    }
}, 1);
function go(){
    if(goTime){
    document.getElementById("GO").style.background = "#66dd66"
    document.getElementById("dot").style.display = "block";
    goTime = false;
    pressGo = true;
    collision = false;
    random = getRandomInt(0, avabGrid.length);
    chosenCell = avabGrid[random];
    avabGrid.splice(random, 1);
    didGo = true;
    var Canvas = document.getElementById('graph');
    var ctx = Canvas.getContext("2d");
    Canvas.strokeStyle = document.getElementById("colour1").value;
    Canvas.width = 1600;
    Canvas.height = 1600;
    ctx.clearRect(0, 0, Canvas.width, Canvas.height);
    ctx.lineWidth = 8;
    ctx.strokeStyle = document.getElementById("colour1").value;
    if(isValidMathExpression(document.getElementById("function").value)){
    x  = ((0 - 5000)/10000)*document.getElementById("resolution").value;
    y = parse(document.getElementById("function").value);
    document.getElementById(chosenCell[0]+','+chosenCell[1]).style.background = "#000000"
    setTimeout(() => {
        document.getElementById(chosenCell[0]+','+chosenCell[1]).style.background = "#fff"
    
    for (i = 0; i < 10000; i++){
        ctx.beginPath();
        ctx.moveTo((x+document.getElementById("resolution").value/2)/document.getElementById("resolution").value*Canvas.width,((0 - y)+document.getElementById("resolution").value/2)/document.getElementById("resolution").value*Canvas.height);
        x  = ((i - 5000)/1000)*document.getElementById("resolution").value;
        y = parse(document.getElementById("function").value);
        ctx.lineTo((x+document.getElementById("resolution").value/2)/document.getElementById("resolution").value*Canvas.width,((0 - y)+document.getElementById("resolution").value/2)/document.getElementById("resolution").value*Canvas.height);
        ctx.stroke();
    }
    var i = (0 - 500);
    var moveDot = setInterval(() => {
        x = i/1000 * parseInt(document.getElementById("resolution").value);
        y = 0 -(parse(document.getElementById("function").value));
        if(((x > chosenCell[0])&&(x < chosenCell[0]+1))&&(((0-y) > chosenCell[1]-1)&&((0-y) < chosenCell[1]))){
            collision = true;
            document.getElementById(chosenCell[0]+','+chosenCell[1]).style.background = document.getElementById("colour1").value;
        }
        document.getElementById("dot").style.left = (((x+document.getElementById("resolution").value * 0.5)/document.getElementById("resolution").value * parseFloat(document.getElementById("grid").getBoundingClientRect().width))- (document.getElementById("dot").getBoundingClientRect().width/2)-1) + "px";
        document.getElementById("dot").style.top = (((y+document.getElementById("resolution").value * 0.5)/document.getElementById("resolution").value * parseFloat(document.getElementById("grid").getBoundingClientRect().width))- (document.getElementById("dot").getBoundingClientRect().width/2)-1) + "px";
        if((x >= chosenCell[0]+1)&&(!collision)){
            document.getElementById(chosenCell[0]+','+chosenCell[1]).style.background = document.getElementById("colour2").value;
        }
        i++;
    },0.00000000001);
    setTimeout(() => {
        document.getElementById("GO").style.background = "#44bb44"
        goTime = true;
        clearInterval(moveDot);
        ctx.clearRect(0, 0, Canvas.width, Canvas.height);
        document.getElementById("dot").style.display = "none";
    }, 5000);
}, 200);
}else{
    document.getElementById("GO").style.background = "#44bb44"
    goTime = true;
    clearInterval(moveDot);
    ctx.clearRect(0, 0, Canvas.width, Canvas.height);
    document.getElementById("dot").style.display = "none"; 
}}
}
function oppositeRGB(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    /*return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;*/
    return ([255-(parseInt(result[1], 16)),255-(parseInt(result[2], 16)),255-(parseInt(result[3], 16))]);
  }
function isValidMathExpression(expr){
        try{
            x = getRandomInt(0,document.getElementById("resolution").value)+1/2;
            math.parse(expr);
            return typeof parse(expr) == "number";
        }
        catch(ex){
            return false;
        }
    }