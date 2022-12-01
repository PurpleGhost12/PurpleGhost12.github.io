
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
        $mainSet.style.display="block";
    }
    else 
    {
        $mainSet.style.display="none";
    }
})
