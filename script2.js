/*const arr_rus = ["Привычка - вторая натура", "Заметьте хорошо!", "Беда не приходит одна", "Через тернии к звёздам"]; /*Заметьте хорошо!*/ 
var arr_can = ["Привычка - вторая натура", "Заметьте хорошо!", "Беда не приходит одна", "Через тернии к звёздам"];
/*const arr_lat = ["Consuetudo est altera natura", "Nota bene", "Nulla calamitas sola", "Per aspera ad astra"];*/
var arr_latCan = ["Consuetudo est altera natura", "Nota bene", "Nulla calamitas sola", "Per aspera ad astra"];

//array_size
var max = Math.min(arr_can.length, arr_latCan.length)-1;
const min = 0;

//size
var conteinerWidht;
var marginFrame=10;

//events click
var $blocks = document.getElementById("blocks");
$blocks.addEventListener('click', clickBlock);

//resize
window.addEventListener('resize', replaceBlock);


//resize
var $frame = document.getElementById("frame");
var $con = document.getElementById("con");


var end = false;

var currentPosition = 70;
var currentNum=1;

function createBlock()
{
    if (end) return;

    var max = Math.min(arr_can.length, arr_latCan.length)-1;
    var num = Math.floor(Math.random () * (max - min + 1)) + min;
    var $newBlocks = document.createElement("div");
    $newBlocks.className="block";

    $blocks.appendChild($newBlocks);

    $newBlocks.textContent = "Фраза " + currentNum + " " + arr_can[num];

    $newBlocks.setAttribute('data-rus', "Фраза " + currentNum + " " + arr_can[num]);
    $newBlocks.setAttribute('data-lat', "Фраза " + currentNum + " " + arr_latCan[num]);

    currentNum= currentNum +1;

    arr_can.splice(num,1);
    arr_latCan.splice(num,1);

    $newBlocks.value = num;
    $newBlocks.style.top = currentPosition +'px';
    $newBlocks.style.left = marginFrame + 'px';   

    currentPosition+=$newBlocks.offsetHeight + 20;

    if (currentPosition > $frame.clientHeight) 
    {
        $frame.style.height = currentPosition + 'px'
        $con.style.height = currentPosition + 20 + 'px'
    }

    conteinerWidht = $frame.clientWidth-marginFrame;

    if (end === false && (arr_can.length === 0 || arr_latCan.length === 0)) 
    {
        end = true;
        document.getElementById("button1").value = "Фразы закончились...";
    }
    
}


function clickBlock(event)
{
    if (event.target.className === "block" || event.target.className === "block2" || event.target.className === "blockColor")
    {
        if (event.target.style.left === marginFrame +'px')
        {
            event.target.className = "block2"
            /*event.target.textContent = arr_lat[event.target.value];*/
            event.target.textContent = event.target.dataset.lat;
            event.target.style.left = conteinerWidht - event.target.offsetWidth + 'px';
            //event.target.style.transformOrigin = "right center"
        }
        else 
        {
            event.target.textContent = event.target.dataset.rus;
            event.target.style.left = marginFrame + 'px'; 
            event.target.className = "block"
            //event.target.style.transformOrigin = "left center"
        }
    }

}

function colorBlocks()
{
    console.log($blocks.children)
    var arr_colors = $blocks.children;
    for (var i=0; i<arr_colors.length; i++)
    {
        if (arr_colors[i].className === 'block2')
        {
            arr_colors[i].className = "blockColor";
        }
    }

}

function replaceBlock()
{
    var arr_replace = $blocks.children;
    conteinerWidht = $frame.clientWidth-marginFrame;
    for (var i=0; i<arr_replace.length; i++)
    {
        if (arr_replace[i].className === 'block2' || arr_replace[i].className === 'blockColor')
        {
            arr_replace[i].style.left = conteinerWidht - arr_replace[i].offsetWidth + 'px';
        }
    }
}

