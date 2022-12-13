var $startPanel = document.getElementById("start-panel");
var $gameField = document.getElementById("game-field");
var $squareAnimate = document.getElementById("square-animate");
window.addEventListener('resize', createPanel)

var animator;
var n=5;

function createPanel()
{  
    n=countCeils;
    clearInterval(animator);
    createSquare();
    var width = $gameField.offsetWidth;
    var height = $gameField.offsetHeight;
    var size = Math.min(width,height)*0.9;
 
    $startPanel.style.width=size+'px';
    $startPanel.style.height=size+'px';
    animator = setInterval(function() //timer
    {
        for (var i=0; i<n*n;i++)
        {
            if (getRandom(0,2)===1) {
                if (gameMode === "monoton"){
                    var bw = getRandom(0,230);
                    sections[i].style.backgroundColor = 'rgb('+bw+','+bw+','+bw+')';
                }
                if (gameMode === "ownColors"){
                    sections[i].style.backgroundColor = addColorsP[getRandom(0,colors.length)];
                }
                else sections[i].style.backgroundColor = colors[getRandom(0,colors.length)];
            }
            
        }
    }, 200)
}
function hidePanel()
{
    console.log("stop animate");
    clearInterval(animator);
}
var sections;
function createSquare()
{
    $squareAnimate.innerHTML="";
    sections = new Array(n*n);
    var newSquare = document.createElement('div');
    newSquare.className = "square-animate";

    var sizeSquareSection = (Math.ceil(100/n)+1)+"%";

    for (var i=0; i<n; i++)
    {
        var top = i*(100/n)+'%';

        for (var k=0; k<n; k++)
        {
            var left = k*(100/n)+'%';
            var section = document.createElement('div');
            section.className = "square-section";
            section.style.top = top;
            section.style.left = left;
            section.style.width = sizeSquareSection;
            section.style.height = sizeSquareSection;

            section.style.backgroundColor = colors[getRandom(0,colors.length)];

            newSquare.appendChild(section);
            sections[i*n+k] = section;
        }
    }
    $squareAnimate.appendChild(newSquare);
}

createSquare();
createPanel();