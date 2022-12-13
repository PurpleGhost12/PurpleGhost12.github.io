//канвас для picker
const colorBlock = document.getElementById("color-block");
const colorBlockContext = colorBlock.getContext("2d", {willReadFrequently:true});
var colorBlockWidth = colorBlock.scrollWidth
var colorBlockHeight = colorBlock.scrollHeight;

const hueBar = document.getElementById("hue-bar");
const hueBarContext = hueBar.getContext("2d", {willReadFrequently:true});
var hueBarWidth = hueBar.scrollWidth
var hueBarHeight = hueBar.scrollHeight;

var dragPoint=false;
var dragLine=false;

//container 
const $colorBlockContainer = document.getElementById("point-conteiner")
const $hueBarContainer = document.getElementById("line-point-conteiner");

//point
const $pointCursor = document.getElementById("point-color");
const $pointLineCursor = document.getElementById("line-point-color");
//drag and drop

$colorBlockContainer.addEventListener("mousedown", mousedownColorBlock);
$colorBlockContainer.addEventListener("mouseup", mouseupColorBlock);
$colorBlockContainer.addEventListener("mousemove", mousemoveColorBlock);

$hueBarContainer.addEventListener("mousedown", mousedownHueBar);
$hueBarContainer.addEventListener("mouseup", mouseupHueBar);
$hueBarContainer.addEventListener("mousemove", mousemoveHueBar);
//color now
var currentColor = "rgba(255,0,0,1)";
//see color
const $seeColor = document.getElementById("see-color");

window.addEventListener("resize", function(){
   resizeCanvas()
   fillHueGradient()
   fillColorBlockGradient()
})

function resizeCanvas(){
   var displayWidth  = hueBar.clientWidth;
   var displayHeight = hueBar.clientHeight;
   //console.log(displayWidth, displayHeight)
   hueBar.width = displayWidth;
   hueBar.height = displayHeight;
   hueBarWidth = displayWidth;
   hueBarHeight = displayHeight;

   displayWidth  = colorBlock.clientWidth;
   displayHeight = colorBlock.clientHeight;
   //console.log(displayWidth, displayHeight)
   colorBlock.width = displayWidth;
   colorBlock.height = displayHeight;
   colorBlockWidth = displayWidth;
   colorBlockHeight = displayHeight;
}
//point coords
const colorBlockState = {
   x: 10,
   y: 10
};
const colorHueState = {
   x: 0,
   y: 0
};

function fillHueGradient(){
   hueBarContext.rect(0, 0, hueBarWidth, hueBarHeight);
   const grd1 = hueBarContext.createLinearGradient(0, 0, 0, colorBlockHeight);
   grd1.addColorStop(0, "rgba(255, 0, 0, 1)");
   grd1.addColorStop(0.17, "rgba(255, 255, 0, 1)");
   grd1.addColorStop(0.34, "rgba(0, 255, 0, 1)");
   grd1.addColorStop(0.51, "rgba(0, 255, 255, 1)");
   grd1.addColorStop(0.68, "rgba(0, 0, 255, 1)");
   grd1.addColorStop(0.85, "rgba(255, 0, 255, 1)");
   grd1.addColorStop(1, "rgba(255, 0, 0, 1)");
   hueBarContext.fillStyle = grd1;
   hueBarContext.fill();
   ////console.log(hueBarWidth, hueBarHeight)
   //console.log(colorBlockHeight, colorBlockWidth)
   //console.log(hueBar.width,hueBar.height)
   
}

function fillColorBlockGradient() {
   colorBlockContext.fillStyle = currentColor;
   //console.log(currentColor)
   colorBlockContext.fillRect(0, 0, colorBlockWidth, colorBlockHeight);

   let grdWhite = hueBarContext.createLinearGradient(0, 0, colorBlockWidth, 0);
   grdWhite.addColorStop(0, "rgba(255,255,255,1)");
   grdWhite.addColorStop(1, "rgba(255,255,255,0)");
   colorBlockContext.fillStyle = grdWhite;
   colorBlockContext.fillRect(0, 0, colorBlockWidth, colorBlockHeight);

   let grdBlack = hueBarContext.createLinearGradient(0, 0, 0, colorBlockHeight);
   grdBlack.addColorStop(0, "rgba(0,0,0,0)");
   grdBlack.addColorStop(1, "rgba(0,0,0,1)");
   colorBlockContext.fillStyle = grdBlack;
   colorBlockContext.fillRect(0, 0, colorBlockWidth, colorBlockHeight);

   $seeColor.style.backgroundColor = currentColor;
   //$seeColor.textContent = currentColor;
}



function createColorPicker(){
   resizeCanvas();

fillHueGradient()
fillColorBlockGradient()
colorBlockState.x=120;
colorBlockState.y=0;

}

//createColorPicker()
/*colorBlock.addEventListener("mouseout", mouseoutColorBlock, false); //! testing
colorBlock.addEventListener("mousedown", mousedownColorBlock, false);
colorBlock.addEventListener("mouseup", mouseupColorBlock, true);
colorBlock.addEventListener("mousemove", mousemoveColorBlock, false);

$hueBarContainer.addEventListener("mousedown", mousedownHueBar);
$hueBarContainer.addEventListener("mouseup", mouseupHueBar);
$hueBarContainer.addEventListener("mousemove", mousemoveHueBar);
*/

function mousedownHueBar(event){
   dragLine=true;
   clickOnHueBar(event);
   setLineCoords(event)
}
function mouseupHueBar(){
   dragLine=false;
}
function mousemoveHueBar(event){
   if (dragLine){
      clickOnHueBar(event)
      setLineCoords(event)
   }
}

function mousedownColorBlock(event){
   dragPoint = true;
   changeColorVariable(event);
   setPointCoords(event)
}

function mousemoveColorBlock(event)
{
   if (dragPoint) {
      changeColorVariable(event);
      setPointCoords(event)
   }
   //console.log("move", dragPoint);
   //console.log(event.offsetX,event.offsetY)
}

function mouseupColorBlock(){
   dragPoint = false;
}

function setPointCoords(e)
{
   /*if (e.target.className === "point-color"){
      var rect = e.currentTarget.getBoundingClientRect();
      var offsetX = e.clientX - rect.left;
      var offsetY = e.clientY - rect.top;
      $pointCursor.style.left = offsetX-$pointCursor.offsetWidth/2+ 'px';
      $pointCursor.style.top = offsetY-$pointCursor.offsetHeight/2 + 'px';
   }
   else 
   {
      $pointCursor.style.left = e.offsetX-$pointCursor.offsetWidth/2+ 'px';
      $pointCursor.style.top = e.offsetY-$pointCursor.offsetHeight/2 + 'px';
      //console.log("here")
   }*/
   var rect = e.currentTarget.getBoundingClientRect();
   var offsetX = e.clientX - rect.left;
   var offsetY = e.clientY - rect.top;
   $pointCursor.style.left = offsetX-$pointCursor.offsetWidth/2+ 'px';
   $pointCursor.style.top = offsetY-$pointCursor.offsetHeight/2 + 'px';
   
}

function setLineCoords(e){
   var rect = e.currentTarget.getBoundingClientRect();
   var offsetY = e.clientY - rect.top;
   $pointLineCursor.style.top = offsetY-$pointLineCursor.offsetHeight/2 + 'px';
   //console.log(offsetY);
}


function changeColorVariable(e) {
   if (e) //???
   {
      var rect = e.currentTarget.getBoundingClientRect();
      var offsetX = e.clientX - rect.left;
      var offsetY = e.clientY - rect.top;
      colorBlockState.x = offsetX;
      colorBlockState.y = offsetY;
   }
   console.log(colorBlockState.x)
   let imageData = colorBlockContext.getImageData(colorBlockState.x,colorBlockState.y, 1,1).data;
   currentColor ="rgba(" + imageData[0] + "," + imageData[1] + "," + imageData[2] + ",1)";
   $seeColor.style.backgroundColor = currentColor;
   //console.log(currentColor)
   //$seeColor.textContent = currentColor;
}

function clickOnHueBar(e) {
   var rect = e.currentTarget.getBoundingClientRect();
   var offsetX = e.clientX - rect.left;
   var offsetY = e.clientY - rect.top;
   colorHueState.x = offsetX;
   colorHueState.y = offsetY;

   let imageData = hueBarContext.getImageData(colorHueState.x, colorHueState.y, 1, 1).data;
    currentColor = "rgba(" + imageData[0] + "," + imageData[1] + "," + imageData[2] + ",1)";

    //console.log(currentColor +"do")
   fillColorBlockGradient();
   //console.log(currentColor+"sered")
   changeColorVariable();

   $seeColor.style.backgroundColor = currentColor;
   console.log(currentColor+"posle")
   //$seeColor.textContent = currentColor;
}