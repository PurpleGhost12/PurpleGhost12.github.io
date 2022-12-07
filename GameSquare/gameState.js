
var $mainMenu = document.getElementById("main-screen");

var $chooseGamemode = document.getElementById("choose-gamemode");

var $chooseLevel = document.getElementById("choose-level");

var $createLevel = document.getElementById("create-level");

var $doGame = document.getElementById("do-game");

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
var $buttonMain = document.getElementById("start-main");
$buttonMain.addEventListener('click', function() {
    changeStates("choose-gamemode");
  });

  //choose level
var $buttonLevelEasy = document.getElementById("level-easy");
$buttonLevelEasy.addEventListener('click', function() { 
      //настройки
      rotateAny = false;  
      rotate90 = false;
      anySize = false;
      
      colorsCount=3;
      countCeils=3;
      countSquare=10;

      train = false;

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

      train = false;

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

      train = false; 

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

      train = false; 

      saveAllSettings();
      //gameState в конце!!!!
      changeStates("do-game");
    });
    

var $buttonLevelTrain = document.getElementById("level-train");
$buttonLevelTrain.addEventListener('click', function() { 
      //настройки
      train = true;
      sessionStorage.train=true;
      //gameState в конце!!!!
      changeStates("create-level");
    });

var $buttonHandle = document.getElementById("level-create");
$buttonHandle.addEventListener('click', function() {
      train = false;
      sessionStorage.train=false;
      console.log(train);
      changeStates("create-level");
      //настройки
    });
  




  //Change screen/state
  function changeStates(newState)
  {
    //console.log(sessionStorage.state);
    //console.log(newState);
    numPreState=0;
    oldStateSave = currentState;

    findState(currentState, 'none');
    findState(newState, 'block');

    sessionStorage.state = newState;
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
                      preState="choose-gamemode";
                    }
                    break;
                }
            case "do-game":
                {
                    $doGame.style.display = doWhat;
                    if (doWhat === "block")
                     {
                      if (oldStateSave === "create-level" && train === false) numPreState="create-level";
                      else preState="choose-level";     
                      createPanel();
                     }
                    else 
                    {
                      endGameExit();
                      hidePanel();
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
    changeStates('do-game');
  }