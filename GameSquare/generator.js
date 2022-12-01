
//Массивы цветов
const colors = ['#eb3b5a','#fa8231','#f7b731', '#20bf6b', '#0fb9b1', '#45aaf2', '#4b7bec', '#a55eea']
const contrastColors = ['#eb3b5a', '#f7b731', '#20bf6b', '#2d98da', '#8854d0']
var currentColor;

//Искомый квадрат
var findSquare;

//массив квадрата для микса
var arraySquareReady;

//Генерация цветов, хранение сгенерированных
var colorListForCheck=[['#000000','#000000','#000000'],['#000000','#000000','#000000'],['#000000','#000000','#000000'],];
var allColorsUsing;

////
var standartSizeSquare=150;

function test(){
    console.log("test");
}

function selectColors() //отбираем цвета
{
    if (colorsCount < contrastColors.length)
    {
        currentColor = contrastColors.slice(0);
    }
    else
    {
        currentColor = colors.slice(0);
    }

    while(currentColor.length > colorsCount)
    {
        currentColor.splice(getRandom(0,currentColor.length-1),1);
    }
}


function generateSquare(n) //создаем квадрат
{
    var sizeSquareSection = (Math.ceil(100/n)+1)+"%";

    var newSquare = document.createElement('div');
    newSquare.className = "square";

    var sizeSquare;
    var sizeSquare2=1;
    if (anySize)
    {
        sizeSquare = getRandom(100,150);
        sizeSquare2=getRandom(50,100)/100;
    }
    else sizeSquare = standartSizeSquare;

    //newSquare.style.width = sizeSquare+'px';
    //newSquare.style.height = sizeSquare+'px';
    //newSquare.style.margin = sizeSquare/4+"px";

    newSquare.setAttribute("data-size", sizeSquare2)
    //colors Generate
    colorListForCheck=new Array(n);

    for (var i=0; i<countCeils; i++)
    {
        colorListForCheck[i] = new Array(n);
    }
    
    colorListForCheck = generateColors(colorListForCheck);
    while (checkColors(colorListForCheck) === false)
    {
        colorListForCheck = generateColors(colorListForCheck);
    }
    //allColorsUsing.push(colorListForCheck);
    //////////////

    for (var i=0; i<n; i++)
    {
        var top = i*(100/n)+'%';

        for (var k=0; k<n; k++)
        {
            var left = k*(100/n)+'%';
            var section = document.createElement('div');
            section.className = "square-section";
            //section.style.backgroundColor = 'rgb(' + getRandom(30,250)+','+getRandom(30,250)+','+getRandom(30,250)+')';
            //colorListForCheck[i][k] = currentColor[getRandom(0, currentColor.length)];
            section.style.backgroundColor = colorListForCheck[i][k] 
            section.style.top = top;
            section.style.left = left;
            section.style.width = sizeSquareSection;
            section.style.height = sizeSquareSection;
            newSquare.appendChild(section);
        }
    }

    if (rotateAny && !rotate90)
    {
        newSquare.style.transform="rotate("+getRandom(0,360)+"deg)";
    }
    if (rotate90 && !rotateAny)
    {
        newSquare.style.transform="rotate("+(getRandom(0,4)*90)+"deg)";
    }

    return newSquare;
    //$areaSquare.appendChild(newSquare);
}

function generateColors(newColors)
{
    for (var i = 0; i< countCeils; i++)
    {
        for (var k = 0; k< countCeils; k++)
        {
            newColors[i][k] = currentColor[getRandom(0, currentColor.length)];
        }
    }
    return newColors;
}


function getRandom(min, max)
{
    return Math.floor(Math.random()*(max-min)+min);
}


function doSquare()
{
    //var deleteS = $areaSquare.getElementsByClassName('square');
    //$areaSquare.removeChild(deleteS);
    arraySquareReady = new Array(countSquare);
    allColorsUsing = [];
    

    selectColors();
    //var countReady=0;

    generateFindSquare();
    //findSquare.setAttribute('data-find', 'true');
    //
    //arraySquareReady[0]= findSquare;

    var target = document.createElement('div');
    target.className = "target-bottom";
    target.setAttribute('data-find', 'true');

    var find = findSquare.cloneNode(true);
    find.className = "square-find";
    find.appendChild(target);

    $findSquareArea.appendChild(find);
    //find.setAttribute('data-find', 'true');

    for (var i=0; i<countSquare; i++)
    {
        target = document.createElement('div');
        target.className = "target-bottom";
        target.setAttribute('data-find', 'false');
        arraySquareReady[i]= generateSquare(countCeils);
        arraySquareReady[i].appendChild(target);
    }

    arraySquareReady[getRandom(0, countSquare)] = find;

    //findSquare.style.transform="rotate(0deg)"
    findSquare.style.height = standartSizeSquare+'px';
    findSquare.style.width = standartSizeSquare+'px';
    findSquare.style.margin = standartSizeSquare/4+"px";
    //findSquare.className = "square-example"
    //console.log(allColorsUsing);
}

function checkColors(check)
{
    for (var i = 0; i<allColorsUsing.length; i++)
    {
        console.log("check");
        if(allColorsUsing[i] === check) 
        {
            console.log("bad");
            console.log(allColorsUsing[i])
            console.log(check)
            return false;
        }
    }
    return true;
}

function generateFindSquare()
{
    
    findSquare = generateSquare(countCeils);
    findSquare.className = "square-find";
    allColorsUsing.push(colorListForCheck);
    allColorsUsing.push(rotateMatrix(allColorsUsing[0]));
    allColorsUsing.push(rotateMatrix(allColorsUsing[1]));
    allColorsUsing.push(rotateMatrix(allColorsUsing[2]));

}

function rotateMatrix(matrix)
{
    var test;
    var maxLenght = matrix[0].length;

    var rotateMatrix = new Array(maxLenght);
    for (var i = 0; i< maxLenght; i++)
    {
        rotateMatrix[i] = new Array(maxLenght);
    }

    for (var i = 0; i< maxLenght; i++)
    {
        for (var k = 0; k< maxLenght; k++)
        {
            rotateMatrix[i][k] = matrix[(maxLenght-k-1)][i];
            test = matrix[(maxLenght-k-1)][i];
        }
    }

    return rotateMatrix;
}
