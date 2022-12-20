
//манипуляция dom
const $findSquareArea = document.getElementById("find");
const $hideField = document.getElementById("hide-field");
const $currentScoreOut = document.getElementById("scoreCurrent");

const $timeOver = document.getElementById("time-over");

//var $closeScore = document.getElementById("close-score");

//var $doGame = document.getElementById("do-game");

//records/score output
const $score = document.getElementById("score");

const $timerLine = document.getElementById("timerLine");

window.addEventListener('resize', setSizeSquare)
//parametres of the game

var gameState=false;  //Check i use?
var readySquare=false;

var endGameCheck=true;

var maxTime;
var currentTime;
var mistakesCount;
var currScore;


//Подсказка
$findSquareArea.addEventListener("dblclick",function(){
    if (train) {
        seeFindSquare();
    }
})


//Clear field
function clearField()
{
    $areaSquare.innerHTML = '';
    $findSquareArea.innerHTML = '';
}

function startGame()
{
    mistakesCount=0;
    currScore=0;
    $currentScoreOut.textContent = currScore;
    $timeOver.style.transform='scale(0)';
    endGameCheck=false;
    createNewField();
    setBestOutScore()
    currentTime=(countCeils*1*countSquare);
    maxTime=currentTime; // рассчет времени
    currentTime+=0.2;

    $startPanel.style.display = "none";
    $score.style.display="none";

    $hideField.style.opacity = 1;
    $timerLine.style.transition="none";
    $timerLine.style.width='100%';
    $timerLine.style.transition="width 0.2s";
    console.log(train)
    if (train === false) startTimer();

}

var interval;
function startTimer(){
    interval = setInterval(function() //timer
    {
       if (currentTime <=0)
       {
        currentTime=0;
        $timerLine.style.width='0%';
        clearInterval(interval);
        endGame();
       }
       else 
       {
        currentTime-=0.1;
        if (currentTime<=0) currentTime=0;  
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
        currScore++;
        $currentScoreOut.textContent = currScore;
        soundPopBTN.currentTime = 0;
        soundPopBTN.play()

    }
    else 
    {
        if (event.target.className === "target-bottom")
        {
                                ///Штраф!
            soundWrong.currentTime = 0;
            soundWrong.play();
            currentTime-=1;
            mistakesCount++;
            if (currentTime<=0) time=0;
            if (gameMode === "noMistakes") {
                time=0;
                $timerLine.style.width='0%';
                endGame();
            }
        }

    }

}

function gameShow()
{
    $startPanel.style.display = "none";
    $hideField.style.opacity = 1;

}

function seeFindSquare(){
    for (var i=0; i<countSquare; i++)
    {
        console.log(arraySquareReady[i].className)
        if (arraySquareReady[i].className === "square-find")
        {
            arraySquareReady[i].dataset.size=1;
            let cSize = (maxSizeSquare*arraySquareReady[i].dataset.size);
            let marginPlus = ((maxSizeSquare-cSize)/2)

            arraySquareReady[i].className="square-true-end"

            arraySquareReady[i].style.width = cSize +'px';
            arraySquareReady[i].style.height = cSize + 'px';
            arraySquareReady[i].style.margin = (marginTop+marginPlus)+'px ' + (marginLeft+marginPlus)+'px';
            arraySquareReady[i].style.transform="rotate(0)";

            /*arraySquareReady[i].className="square-true-end";
            arraySquareReady[i].style.width = maxSizeSquare +'px';
            arraySquareReady[i].style.height = maxSizeSquare + 'px';
            arraySquareReady[i].style.transform="scale(1.1) rotate(0)";*/
        }
    }
}
function endGame()//Сделать конец игры покрасивее, тип отобразить где ыбл верный и тд
{
 //Нужно два завершения игры
    endGameCheck=true;
    let end;
    clearInterval(end);
    clearInterval(interval)


    if (gameMode === "noMistakes" && mistakesCount>0) $timeOver.textContent = "НЕВЕРНО!"
    else $timeOver.textContent = "ВРЕМЯ ВЫШЛО!"

    
    $timeOver.style.transform='scale(1)';
    setTimeout(function(){
        $timeOver.style.transform='scale(0)';
        seeFindSquare()
    }, 2000)

    setTimeout(function(){
        seeScore()
    },5000);
}

function seeScore()
{
    //hide game field
    clearField();
    //set score
    saveUsersScore(gameMode, level, currScore);
    outAllRecords(currScore, mistakesCount)

    $hideField.style.opacity = 0;

    //see score
    $score.style.display="block";

    //clear 
    readySquare = false;
    gameState=false;
    sessionStorage.gameState = false;
    $timerLine.style.transition="none";
    $timerLine.style.width=100+'%';
}

function closeScore(){
    $score.style.display="none";
    $startPanel.style.display = "block";
}

function endGameExit(){
    $timeOver.style.transform='scale(0)';
    endGameCheck=true;
    clearField();
    clearInterval(interval)
    $startPanel.style.display = "block";
    
    closeScore();

    $hideField.style.opacity = 0;
    readySquare = false;
    gameState=false;
    sessionStorage.gameState = false;
    $timerLine.style.transition="none";
    $timerLine.style.width=100+'%';
    console.log("end")

}