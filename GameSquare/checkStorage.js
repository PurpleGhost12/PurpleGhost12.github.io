
//session storage
/**
 * state - последнее состояние
 * 
 * //настройки игры
var rotateAny = false;
var rotate90 = false;
var anySize = false;

var colorsCount=3;
var countCeils=3;
var countSquare=10;

 * 
 */


function checkState()
{
    if (sessionStorage.state === undefined)
    {
        sessionStorage.state = 'main-screen'
        changeStates('main-screen')
        //console.log("No")
    }
    else 
    {
        //console.log("Yes")
        currentState = sessionStorage.state;
        switch(sessionStorage.state)
        {
            case "main-screen":
                {
                    changeStates('main-screen')
                    break;
                }
            case "choose-level":
                {
                    changeStates('choose-level')
                    break;
                }
            case "create-level":
                {
                    changeStates("create-level")
                    break;
                }
            case "do-game":
                {
                    changeStates("do-game")
                    break;
                }
        }
    }
}

function checkSettings()
{
    if (sessionStorage.rotateAny != undefined) 
    {
        if (sessionStorage.rotateAny === "true")
        {
            rotateAny=true;
            $checkRotateAny.checked = true;

        }
        else
        {
            rotateAny = false;
            $checkRotateAny.checked = false;
        }
        
    }
    if (sessionStorage.rotate90 != undefined) {
        if (sessionStorage.rotate90 === "true")
        {
            rotate90=true;
            $checkRotate90.checked = true;

        }
        else
        {
            rotate90 = false;
            $checkRotate90.checked = false;
        }
    }
    if (sessionStorage.anySize != undefined) 
    {
        if (sessionStorage.anySize === "true")
        {
            anySize=true;
            $checkAnySize.checked = true;

        }
        else
        {
            anySize = false;
            $checkAnySize.checked = false;
        } 
    }

    ////////////
    if (sessionStorage.colorsCount != undefined){
        colorsCount = sessionStorage.colorsCount;
        $inputCountColors.value = colorsCount;
    }
    
    if (sessionStorage.countCeils != undefined){
        countCeils = sessionStorage.countCeils;
        $inputCountCeils.value = countCeils;
    }
    
    if (sessionStorage.countSquare != undefined){
        countSquare = sessionStorage.countSquare;
        $inputCountSquare.value = countSquare;
    }
}

function checkUserPref(){
    let nowFone;
    if (localStorage.userBackground != undefined)
    {
        $background.className='background ' + localStorage.userBackground;
        nowFone = localStorage.userBackground;
    }
    else {
        $background.className='background mango';
        nowFone = 'mango';
    }

    for (let i =0; i<$chooseBack.length; i++){
        if ($chooseBack[i].id === nowFone) $chooseBack[i].checked=true;
    }
}
checkSettings();
checkState();
checkUserPref();


function saveAllSettings()
{
    sessionStorage.rotateAny = rotateAny;
    sessionStorage.rotate90 = rotate90;
    sessionStorage.anySize = anySize;
    
    sessionStorage.colorsCount = colorsCount;
    sessionStorage.countCeils = countCeils;
    sessionStorage.countSquare = countSquare;
    
}