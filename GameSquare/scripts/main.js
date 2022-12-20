
const soundPopBTN = new Audio("music/pop.wav");
const soundWrong = new Audio("music/wrong.wav");

const $checkBoxMain = document.getElementById("setOpen");
const $mainSet= document.getElementById("main-settings");
$checkBoxMain.addEventListener('change', function(){
    if (this.checked)
    {
        $mainSet.style.display="block";
        $mainHelp.style.display="none";
        $checkBoxHelp.checked=false;
    }
    else 
    {
        $mainSet.style.display="none";
    }
})

const $checkBoxHelp = document.getElementById("setOpenHelp");
const $mainHelp= document.getElementById("help");
$checkBoxHelp.addEventListener('change', function(){
    if (this.checked)
    {
        $mainHelp.style.display="block";
        $mainSet.style.display="none";
        $checkBoxMain.checked=false;
    }
    else 
    {
        $mainHelp.style.display="none";
    }
})

const $chooseBack = document.getElementsByClassName("fone");
//$chooseBack.addEventListener(onchange, changeBackground('mango'))
const $background = document.getElementById("background");
function changeBackground(newColors, who)
{
    console.log(who);
    console.log(newColors);
    $background.className='background '+ newColors;
    localStorage.userBackground = newColors;
    for (let i =0; i<$chooseBack.length; i++){
        $chooseBack[i].checked=false;
    }
    who.checked=true;
}