
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
    if (sessionStorage.oldStateSave != undefined){
        currentState = sessionStorage.oldStateSave;
    }
    if (sessionStorage.state === undefined)
    {
        sessionStorage.state = 'main-screen'
        changeStates('main-screen')
    }
    else 
    {
        changeStates(sessionStorage.state);
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

    //////////
    if (sessionStorage.train != undefined) 
    {
        if (sessionStorage.train === "true")
        {
            train=true;

        }
        else
        {
            train = false;
        } 
    }

    if (sessionStorage.created != undefined) 
    {
        if (sessionStorage.created === "true")
        {
            created=true;

        }
        else
        {
            created = false;
        } 
    }

    if (sessionStorage.level != undefined){
        level = sessionStorage.level;
    }

    if (sessionStorage.gamemode !=undefined){
        gameMode = sessionStorage.gamemode;
        //console.log(sessionStorage.gamemode)
    }
    if (sessionStorage.textGamemode != undefined){
        $textGamemode.textContent = sessionStorage.textGamemode;
    }
    if (sessionStorage.textGamemodeBlack !=undefined){
        $textGamemodeBlack.textContent = sessionStorage.textGamemodeBlack
    }

    //colors
    if (sessionStorage.colorWinName !=undefined){
        changeColorWinInput(sessionStorage.colorWinName)
        $chooseColorMode.value = sessionStorage.colorWinName;
        $chooseColorMode.dispatchEvent(new Event('change'));

    }
    else {
        changeColorWinInput("random")
    }

    //current created score 
    if (sessionStorage.createdCurrScore != undefined){
        createdCurrScore = parseInt(sessionStorage.createdCurrScore);
    }


}

function checkPalleteArray(){
    if (sessionStorage.arrayOwnColors !=undefined)
    {
        //console.log("one one")
        addColorsP = JSON.parse(sessionStorage.arrayOwnColors);
        recoverPallete();
        //sessionStorage.arrayOwnColors = JSON.stringify(addColorsP);
    }
}
function stringToBool(str){
    if (str === "true") return true;
    else return false;
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
checkPalleteArray()



function saveAllSettings()
{
    sessionStorage.rotateAny = rotateAny;
    sessionStorage.rotate90 = rotate90;
    sessionStorage.anySize = anySize;
    
    sessionStorage.colorsCount = parseInt(colorsCount);
    sessionStorage.countCeils = parseInt(countCeils);
    sessionStorage.countSquare = parseInt(countSquare);

    sessionStorage.train = train;
    sessionStorage.created = created;
    //sessionStorage.level = parseInt(level);
    sessionStorage.level = parseInt(level);
    
}