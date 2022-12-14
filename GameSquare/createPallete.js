const $pallete = document.getElementById("pallete-choose")
const $deleteColor = document.getElementById("delete-color")

//button next
const $chooseSettings = document.getElementById("choose-settings");

console.log($deleteColor)
$deleteColor.addEventListener('dblclick', clearPallete)

//const $buttonAddColor = document.getElementById("")
let addColorsP=[];

$seeColor.addEventListener('click', addColorCeil)


function addColorCeil(){
    console.log("t")
    if (addColorsP.length>6) return;

    let colorC = $seeColor.style.backgroundColor;

    if (checkColorInPallete(colorC) === false){
        console.log("color use")
        return;
    }

    addColorsP.push(colorC);
    let ceil = document.createElement('div');
    ceil.className = "ceil-color"
    ceil.style.backgroundColor = colorC;
    ceil.draggable=true;
    $pallete.appendChild(ceil)

    setButtonTextSettings();
    sessionStorage.arrayOwnColors = JSON.stringify(addColorsP);
}

function checkColorInPallete(colorCh){
    for (var i=0; i<addColorsP.length; i++){
        if (addColorsP[i] === colorCh) return false
    }
    return true;
}

function clearPallete(){
    console.log("work?")
    addColorsP=[]
    let child = $pallete.children;
    console.log(child.length)
    console.log(child)
    for (var i=0; i< child.length; i++)
    {
        if (child[i].className === 'ceil-color') 
        {
            $pallete.removeChild(child[i]);
            i--;
        }
        console.log("check")
    }
    $chooseSettings.textContent ="ПАЛИТРА ПУСТА";
}

function setButtonTextSettings(){
    if ($chooseColorMode.value != "myColors") $chooseSettings.textContent ="ПРОДОЛЖИТЬ";
    else 
        {
            if (addColorsP.length<1) $chooseSettings.textContent ="ПАЛИТРА ПУСТА";
            else if (addColorsP.length<colorsCount) $chooseSettings.textContent ="ЦВЕТОВ НЕ ХАВАТАЕТ";
            else $chooseSettings.textContent ="ПРОДОЛЖИТЬ";
        }
}

function checkInputColors(){
    if ($chooseColorMode.value === "myColors" && addColorsP.length>1 && addColorsP.length>=colorsCount) {
        changeStates("do-game");
    }
    else 
    {if ($chooseColorMode.value != "myColors") changeStates("do-game")
        else 
        {
            if (addColorsP.length<=1) $chooseSettings.textContent ="ПАЛИТРА ПУСТА";
            else $chooseSettings.textContent ="ЦВЕТОВ НЕ ХАВАТАЕТ";
        }
    }
}

function recoverPallete(){
    console.log(addColorsP)
    console.log("one???")
    for (var i=0; i<addColorsP.length; i++){
        let colorRC = addColorsP[i]
        let ceil = document.createElement('div');
        ceil.className = "ceil-color"
        ceil.style.backgroundColor = colorRC;
        ceil.draggable=true;
        $pallete.appendChild(ceil)
    }
    setButtonTextSettings();
}

function changeGamemodePallete(){
    if ($chooseColorMode.value === "myColors") gameMode="ownColors"
    else gameMode = "classic"
    sessionStorage.gamemode = gameMode;
}