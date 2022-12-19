
const $mainMenu = document.getElementById("main-screen");
const $statistic = document.getElementById("statistic-creen")
const $chooseGamemode = document.getElementById("choose-gamemode");
const $chooseLevel = document.getElementById("choose-level");
const $createLevel = document.getElementById("create-level");
const $doGame = document.getElementById("do-game");



//session storage - сохраняем на случай перезагрузки! и только состояние игры
//local storage - для сохранения пользователей!

sessionStorage.test = 'test';
console.log(sessionStorage.test) //this is works

var currentState='main-screen';
var oldStateSave="main-screen";
var preState = 'main-screen';
//buttons change states
//buttom to menu everywhere
var $buttonBackToMain = document.getElementById("back-to-main-everywhere")
var $buttonOnlyBack = document.getElementById("back-only-back")

//menu start
const $buttonMain = document.getElementById("start-main");
$buttonMain.addEventListener('click', function() {
  if (checkUserName()){
    changeStates("choose-gamemode");
  }
  else {
    console.log("bad name")
    alert( "Введите имя" );
  }
    
  });

//statictic
const $buttonStatistic = document.getElementById("staristic-btn")
$buttonStatistic.addEventListener('click', function(){
  changeStates("statistic-creen");
})


  //choose level
const $buttonLevelEasy = document.getElementById("level-easy");
$buttonLevelEasy.addEventListener('click', function() { 
      //настройки
      rotateAny = false;  
      rotate90 = false;
      anySize = false;
      
      colorsCount=3;
      countCeils=3;
      countSquare=10;

      diffMonoton=20;

      train = false;
      level=0;
      saveAllSettings();
      //gameState в конце!!!!
      changeStates("do-game");
    });
  
var $buttonLevelMedium = document.getElementById("level-medium");
$buttonLevelMedium.addEventListener('click', function() { 
      //настройки
      rotateAny = false;      
      rotate90 = true;
      anySize = false;
      
      colorsCount=4;
      countCeils=4;
      countSquare=12;

      diffMonoton=15;

      train = false;
      level=1;
      saveAllSettings();
      //gameState в конце!!!!
      changeStates("do-game");
    });

var $buttonLevelHard = document.getElementById("level-hard");
$buttonLevelHard.addEventListener('click', function() { 
      //настройки
      rotateAny = false;
      rotate90 = true;
      anySize = true;
      
      colorsCount=5;
      countCeils=5;
      countSquare=15;

      diffMonoton=13;

      train = false; 
      level=2;
      saveAllSettings();
      //gameState в конце!!!!
      changeStates("do-game");
    });

    
var $buttonLevelVeryHard = document.getElementById("level-veryHard");
$buttonLevelVeryHard.addEventListener('click', function() { 
      //настройки
      rotateAny = true;
      rotate90 = false;
      anySize = true;
      
      colorsCount=5;
      countCeils=5;
      countSquare=20;

      diffMonoton=10;

      train = false; 
      level=3;

      saveAllSettings();
      //gameState в конце!!!!
      changeStates("do-game");
    });
    

var $buttonLevelTrain = document.getElementById("level-train");
$buttonLevelTrain.addEventListener('click', function() { 
      //настройки
      train = true;
      gameMode = "classic"
      sessionStorage.gamemode = "classic"
      sessionStorage.train=true;
      created = true;
      sessionStorage.created = created;
      $textGamemodeBlack.textContent = outStringGamemode()
      sessionStorage.textGamemodeBlack = outStringGamemode()
      //gameState в конце!!!!
      changeStates("create-level");
    });

var $buttonHandle = document.getElementById("level-create");
$buttonHandle.addEventListener('click', function() {
      train = false;
      created = true;
      sessionStorage.created = created;
      gameMode = "classic"
      sessionStorage.gamemode = "classic"
      sessionStorage.train=false;
      $textGamemodeBlack.textContent = outStringGamemode()
      sessionStorage.textGamemodeBlack = outStringGamemode()
      console.log(train);
      changeStates("create-level");
      //настройки
    });
  



  //Change screen/state
  function changeStates(newState)
  {
    //console.log(sessionStorage.state);
    //console.log(newState);
    //numPreState=0;
    oldStateSave = currentState;

    findState(currentState, 'none');
    findState(newState, 'block');

    sessionStorage.state = newState;
    sessionStorage.oldStateSave = oldStateSave;

    currentState = newState;
    if (newState === 'main-screen') 
    {
      $buttonBackToMain.style.display='none';
      $buttonOnlyBack.style.display='none';
    }
    else {
      $buttonBackToMain.style.display='block';
      $buttonOnlyBack.style.display='block';
    }

    $mainSet.style.display="none";
    $checkBoxMain.checked=false;
    $mainHelp.style.display="none";
    $checkBoxHelp.checked=false;

    function findState(findSt, doWhat)
    {
        switch(findSt)
        {
            case "main-screen":
                {
                    $mainMenu.style.display = doWhat;
                    if (doWhat === "none") clearField();
                    break;
                }
            case "statistic-creen":
                {
                    $statistic.style.display = doWhat
                    break;
                }

            case "choose-gamemode":
                {
                    $chooseGamemode.style.display = doWhat;
                    if (doWhat === "block") preState="main-screen";
                    break;
                }
            case "choose-level":
                {
                    $chooseLevel.style.display = doWhat;
                    if (doWhat === "block") preState="choose-gamemode";
                    break;
                }
            case "create-level":
                {
                    $createLevel.style.display = doWhat;
                    if (doWhat === "block") {
                      checkSettings();
                      changeGamemodePallete()
                      preState="choose-gamemode";
                    }
                    break;
                }
            case "do-game":
                {
                    $doGame.style.display = doWhat;
                    if (doWhat === "block")
                     {
                      if (oldStateSave === "choose-level") preState="choose-level";
                      else preState="create-level";     
                      createPanel();
                     }
                    else 
                    {
                      endGameExit();
                      hidePanel();
                      resetCreatedScore();
                    }
                    break;
                }
        }
    }
  }

  function backToMain()
  {
    changeStates('main-screen');
  }
function toLevel()
{

}
  function toGame()
  {
    console.log("game?")
    changeStates('do-game');
  }