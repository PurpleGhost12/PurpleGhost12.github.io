
let $checkBoxMain = document.getElementById("setOpen");
let $mainSet= document.getElementById("main-settings");
$checkBoxMain.addEventListener('change', function(){
    if (this.checked)
    {
        $mainSet.style.display="block";
    }
    else 
    {
        $mainSet.style.display="none";
    }
})

let $checkBoxHelp = document.getElementById("setOpenHelp");
let $mainHelp= document.getElementById("help");
$checkBoxHelp.addEventListener('change', function(){
    if (this.checked)
    {
        $mainHelp.style.display="block";
    }
    else 
    {
        $mainHelp.style.display="none";
    }
})

let $chooseBack = document.getElementsByClassName("fone");
//$chooseBack.addEventListener(onchange, changeBackground('mango'))
let $background = document.getElementById("background");
function changeBackground(newColors, who)
{
    console.log(who);
    console.log(newColors);
    $background.className='background '+ newColors;
    for (let i =0; i<$chooseBack.length; i++){
        $chooseBack[i].checked=false;
    }
    who.checked=true;
}