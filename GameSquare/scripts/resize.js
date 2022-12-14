const $findBlock = document.getElementById("find");
const $areaSquare = document.getElementById("generate");
$areaSquare.addEventListener('click', clickSquare);

var sizeExample;
var marginH;
var marginV;

var marginTop;
var marginLeft;

//var marginTopMax;
//var marginLeftMax;

var maxSizeSquare;
//var sizeSquare;

function getSizeSquare()
{
    var width = $findBlock.offsetWidth;
    var height = $findBlock.offsetHeight;

    sizeExample = Math.min(width,height)*0.8;
    marginExampleH = (width - sizeExample)/2;
    marginExampleV = (height - sizeExample)/2;

    width = $areaSquare.offsetWidth;
    height = $areaSquare.offsetHeight;

    var sizeS = Math.sqrt((width*height)/countSquare);
    var k=Math.floor(width/sizeS)*Math.floor(height/sizeS);

    while(k<countSquare || sizeS<0)
    {
        sizeS-=1;
        k = Math.floor(width/sizeS)*Math.floor(height/sizeS);     
    }
    //console.log(k);

    //maxSizeSquare = sizeS*0.65;
    
    //console.log(Math.floor(width/sizeS));
    //console.log(Math.floor(height/sizeS));

    maxSizeSquare = sizeS*0.60;


    var row, column;

    if (Math.floor(width/sizeS) < Math.floor(height/sizeS))
    {
        
        column = Math.floor(width/sizeS)
        row = Math.ceil(countSquare/column);
    }
    else 
    {
        row = Math.floor(height/sizeS);
        column = Math.ceil(countSquare/row)
    }

    ////console.log(row);
    //console.log(column);


    marginLeft = (width - column*maxSizeSquare)/((column+1)*2); //min margin
    marginTop = (height - row*maxSizeSquare)/((row+1)*2); //min margin
    
}
 