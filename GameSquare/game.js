
//манипуляция dom
var $findSquareArea = document.getElementById("find");
var $timer = document.querySelector('#time');
var $hideField = document.getElementById("hide-field");

var $doGame = document.getElementById("do-game");

var $timerLine = document.getElementById("timerLine");

window.addEventListener('resize', setSizeSquare)
//parametres of the game

var gameState=false;
var readySquare=false;

var maxTime;
var currentTime;

function clearField()
{
    $areaSquare.innerHTML = '';
    $findSquareArea.innerHTML = '';
}



function startGame()
{
    
    createNewField();
    //$timer.textContent="30.0"
    //time = parseFloat($timer.textContent)
    currentTime=(countCeils*1*countSquare);
    maxTime=currentTime; // рассчет времени
    $timer.textContent = currentTime.toFixed(1)
    currentTime+=0.2;
    $startPanel.style.display = "none";
    $hideField.style.opacity = 1;
    //$timerLine.style.transition="none";
    //$timerLine.style.width='100%';
    $timerLine.style.transition="width 0.2s";
    startTimer();

}

var interval;
function startTimer(){
    interval = setInterval(function() //timer
    {
       //time = parseFloat($timer.textContent)
       if (currentTime <=0)
       {
        clearInterval(interval);
        endGame();
       }
       else 
       {
        currentTime-=0.1;
        if (currentTime<=0) currentTime=0;
        $timer.textContent = currentTime.toFixed(1)    
        $timerLine.style.width=(currentTime/maxTime)*100+'%';
       }
       
    }, 100)
}


function createNewField()
{
    clearField();
    doSquare();
    readySquare = true;

    
    addField();
    setSizeSquare();

    gameState=true;

}

function addField()
{
    saveField = document.createElement('div');
    saveField.className = "save-div";
    $findSquareArea.appendChild(findSquare);
    for (var i=0; i<countSquare; i++)
    {
        saveField.appendChild(arraySquareReady[i])
    }
    $areaSquare.appendChild(saveField)
}

function setSizeSquare()
{
    if (readySquare === false) return;

    getSizeSquare();

    findSquare.style.width = sizeExample +"px";
    findSquare.style.height = sizeExample +"px";
    findSquare.className = "square-example"
    findSquare.style.margin=0+'px';
    findSquare.style.transform = "rotate(0deg) translate(-50%,-50%)";
    findSquare.style.opacity = '1';
    
  
    for (var i=0; i<countSquare; i++)
    {
        //console.log(maxSizeSquare)
        var cSize = (maxSizeSquare*arraySquareReady[i].dataset.size);
        var marginPlus = ((maxSizeSquare-cSize)/2)
        arraySquareReady[i].style.width = cSize +'px';
        arraySquareReady[i].style.height = cSize + 'px';
        arraySquareReady[i].style.margin = (marginTop+marginPlus)+'px ' + (marginLeft+marginPlus)+'px';
        arraySquareReady[i].style.opacity = '1';
        
    }
}

function clickSquare(event)
{
    //console.log("Click!");
    console.log(event.target.dataset.find);
    if (event.target.dataset.find === 'true')
    {
        console.log("Yes!");
        console.log(event.target.dataset.find);
        createNewField();
        currentTime+=1;

    }
    else 
    {
        if (event.target.className === "target-bottom")
        {
                                ///Штраф!
            currentTime-=1;
            if (currentTime<=0) time=0;
            //$timer.textContent = time.toFixed(1)
        }

    }

}

function gameShow()
{
    $startPanel.style.display = "none";
    $hideField.style.opacity = 1;

}
function endGame()
{
    clearField();
    $startPanel.style.display = "block";
    $hideField.style.opacity = 0;
    readySquare = false;
    gameState=false;
    sessionStorage.gameState = false;
    clearInterval(interval);
    $timerLine.style.transition="none";
    $timerLine.style.width=100+'%';
    console.log("end")

    
}