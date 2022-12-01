const states = ["main-screen","choose-level","create-level","do-game"]

var $mainMenu = document.getElementById("main-screen");

var $chooseLevel = document.getElementById("choose-level");

var $createLevel = document.getElementById("create-level");

var $doGame = document.getElementById("do-game");

//session storage - сохраняем на случай перезагрузки! и только состояние игры
//local storage - для сохранения пользователей!

sessionStorage.test = 'test';
console.log(sessionStorage.test) //this is works

var currentState='main-screen';
var oldStateSave="main-screen";
var numPreState = 0;
//buttons change states
//buttom to menu everywhere
var $buttonBackToMain = document.getElementById("back-to-main-everywhere")
var $buttonOneStepBack = document.getElementById("back-one-step")
var $buttonOnlyBack = document.getElementById("back-only-back")

//menu start
var $buttonMain = document.getElementById("start-main");
$buttonMain.addEventListener('click', function() {
    changeStates("choose-level");
  });

  //choose level
var $buttonLevelEasy = document.getElementById("level-easy");
$buttonLevelEasy.addEventListener('click', function() { 
      //настройки
      rotateAny = false;
      
      rotate90 = false;
      $checkRotate90.checked = false;
      anySize = false;
      $checkAnySize.checked = false;
      $checkRotateAny.checked = false;
      
      colorsCount=3;
      countCeils=3;
      countSquare=10;
      saveAllSettings();
      //gameState в конце!!!!
      changeStates("do-game");
    });
  


var $buttonHandle = document.getElementById("level-create");
$buttonHandle.addEventListener('click', function() {
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
      $buttonOneStepBack.style.display='none';
      $buttonOnlyBack.style.display='none';
    }
    else {
      $buttonBackToMain.style.display='block';
      $buttonOneStepBack.style.display='block';
      $buttonOnlyBack.style.display='block';
    }

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
    
            case "choose-level":
                {
                    $chooseLevel.style.display = doWhat;
                    if (doWhat === "block") numPreState=0;
                    break;
                }
            case "create-level":
                {
                    $createLevel.style.display = doWhat;
                    if (doWhat === "block") numPreState=1;
                    break;
                }
            case "do-game":
                {
                    $doGame.style.display = doWhat;
                    if (doWhat === "block")
                     {
                      if (oldStateSave === "choose-level") numPreState=1;
                      else numPreState=2;     
                      createPanel();
                     }
                    else 
                    {
                      endGame();
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