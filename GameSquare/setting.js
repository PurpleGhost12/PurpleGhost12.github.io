
//draw// buttons// input
console.log(sessionStorage.abc)


//buttons
var $inputCountColors = document.getElementById("count-color");
var $inputCountCeils = document.getElementById("count-ceils");
var $inputCountSquare = document.getElementById("count-square");

//text
$textGamemode = document.getElementById("gamemode-text");
$textGamemodeBlack = document.getElementById("gamemode-textBlack");

//настройки игры
var rotateAny = false;
var rotate90 = false;
var anySize = false;

var colorsCount=3;
var countCeils=3;
var countSquare=10;
var train = false;

var time=(countCeils*1 + countSquare*1)*3;
var training=false;

$inputCountColors.value = colorsCount;
$inputCountCeils.value = countCeils;
$inputCountSquare.value = countSquare;

var gameMode = "classic"; //classic, monoton, noMistakes
var diffMonoton=15;


//GAMEMODE

var $classicMode = document.getElementById("classicMode");
var $monotonMode = document.getElementById("monotonMode");
var $noMistakesMode = document.getElementById("noMistakesMode");

$classicMode.addEventListener("click", function(){
  gameMode = "classic";
  sessionStorage.gamemode = gameMode;
  $textGamemode.textContent = "КЛАССИЧЕСКИЙ"
  sessionStorage.textGamemode = "КЛАССИЧЕСКИЙ";
  changeStates("choose-level");
})

$monotonMode.addEventListener("click", function(){
  gameMode = "monoton";
  sessionStorage.gamemode = gameMode;
  $textGamemode.textContent = "МОНОТОН"
  sessionStorage.textGamemode = "МОНОТОН";
  changeStates("choose-level");
})

$noMistakesMode.addEventListener("click", function(){
  gameMode = "noMistakes";
  sessionStorage.gamemode = gameMode;
  $textGamemode.textContent = "БЕЗ ОШИБОК"
  sessionStorage.textGamemode = "БЕЗ ОШИБОК";
  changeStates("choose-level");
})



//(индивидуальные настройки)
//prefer check EVENTS 
var $checkRotateAny = document.getElementById("rotateAny");
$checkRotateAny.addEventListener('change', function() {
  if (this.checked) {
    rotateAny=true;
    rotate90 = false;
    $checkRotate90.checked = false;
    sessionStorage.rotate90 = rotate90;
  } else {
    rotateAny=false;
  }
  sessionStorage.rotateAny = rotateAny;
  
  //console.log(sessionStorage.rotateAny);
});

var $checkAnySize = document.getElementById("anySize");
$checkAnySize.addEventListener('change', function() {
  if (this.checked) {
    anySize=true;
  } else {
    anySize=false;
  }
  sessionStorage.anySize = anySize;
});

var $checkRotate90 = document.getElementById("rotate90");
$checkRotate90.addEventListener('change', function() {
  if (this.checked) {
    rotate90=true;
    rotateAny = false;
    $checkRotateAny.checked = false;
    sessionStorage.rotateAny = rotateAny;
  } else {
    rotate90=false;
  }
  sessionStorage.rotate90 = rotate90;
  console.log(sessionStorage.rotate90);
});




//Input events
$inputCountColors.addEventListener('change', function() {
    if (parseInt($inputCountColors.value) < parseInt($inputCountColors.max))
    {
        colorsCount = $inputCountColors.value;
    }
    else 
    {
        colorsCount = $inputCountColors.max;
        $inputCountColors.value = $inputCountColors.max;
    }
    sessionStorage.colorsCount = colorsCount;
  });

$inputCountCeils.addEventListener('change', function() {
    if (parseInt($inputCountCeils.value) < parseInt($inputCountCeils.max))
    {
        countCeils = $inputCountCeils.value;
    }
    else 
    {
        countCeils = $inputCountCeils.max;
        $inputCountCeils.value = $inputCountCeils.max;
    }
    sessionStorage.countCeils = countCeils;
  });

$inputCountSquare.addEventListener('change', function() {
    if (parseInt($inputCountSquare.value) < parseInt($inputCountSquare.max))
    {
        countSquare = $inputCountSquare.value;
    }
    else 
    {
        countSquare = $inputCountSquare.max;
        $inputCountSquare.value = $inputCountSquare.max;
    }
    sessionStorage.countSquare = countSquare;
  });

  
