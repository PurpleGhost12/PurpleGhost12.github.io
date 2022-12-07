
//манипуляция dom
var $findSquareArea = document.getElementById("find");
var $timer = document.querySelector('#time');
var $hideField = document.getElementById("hide-field");

var $timeOver = document.getElementById("time-over");

var $doGame = document.getElementById("do-game");

var $timerLine = document.getElementById("timerLine");

window.addEventListener('resize', setSizeSquare)
//parametres of the game

var gameState=false;  //Check i use?
var readySquare=false;

var endGameCheck=true;

var maxTime;
var currentTime;


function clearField()
{
    $areaSquare.innerHTML = '';
    $findSquareArea.innerHTML = '';
}

function startGame()
{
    $timeOver.style.scale=0;
    endGameCheck=false;
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
    console.log(train)
    if (train === false) startTimer();

}

var interval;
function startTimer(){
    interval = setInterval(function() //timer
    {
       //time = parseFloat($timer.textContent)
       if (currentTime <=0)
       {
        currentTime=0;
        $timer.textContent = currentTime.toFixed(1);
        $timerLine.style.width='0%';
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
    
    $findSquareArea.appendChild(findSquare);
    for (var i=0; i<countSquare; i++)
    {
        $areaSquare.appendChild(arraySquareReady[i])
    }
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
    if (endGameCheck) return;

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
            if (gameMode === "noMistakes") {
                time=0;
                $timerLine.style.width='0%';
                endGame();
            }
            //$timer.textContent = time.toFixed(1)
        }

    }

}

function gameShow()
{
    $startPanel.style.display = "none";
    $hideField.style.opacity = 1;

}
function endGame()//Сделать конец игры покрасивее, тип отобразить где ыбл верный и тд
{
 //Нужно два завершения игры
    endGameCheck=true;
    var one=0;
    let end;
    clearInterval(end);
    clearInterval(interval)
    $timeOver.style.scale=1;
    setTimeout(function(){
        $timeOver.style.scale=0;
        for (var i=0; i<countSquare; i++)
        {
            console.log(arraySquareReady[i].className)
            if (arraySquareReady[i].className === "square-find")
            {
                arraySquareReady[i].className="square-true-end";
            }
        }
    }, 3000)

    setTimeout(function(){
        clearField();
        $startPanel.style.display = "block";
        $hideField.style.opacity = 0;
        readySquare = false;
        gameState=false;
        sessionStorage.gameState = false;
        $timerLine.style.transition="none";
        $timerLine.style.width=100+'%';
        console.log("end")
    },10000);

    /*end = setInterval(function() //timer
    {
        //square-true-end - class name
       if (one===0)
       {
            $timeOver.style.scale=0;
            for (var i=0; i<countSquare; i++)
            {
                console.log(arraySquareReady[i].className)
                if (arraySquareReady[i].className === "square-find")
                {
                    arraySquareReady[i].className="square-true-end";
                }
            }

       }
       if (one>0) {
        clearInterval(end);
        clearField();
        $startPanel.style.display = "block";
        $hideField.style.opacity = 0;
        readySquare = false;
        gameState=false;
        sessionStorage.gameState = false;
        $timerLine.style.transition="none";
        $timerLine.style.width=100+'%';
        console.log("end")
       }
       one++;
    }, 5000)*/
}

function endGameExit(){
    $timeOver.style.scale=0;
    endGameCheck=true;
    clearField();
    clearInterval(interval)
    $startPanel.style.display = "block";
    $hideField.style.opacity = 0;
    readySquare = false;
    gameState=false;
    sessionStorage.gameState = false;
    $timerLine.style.transition="none";
    $timerLine.style.width=100+'%';
    console.log("end")

}