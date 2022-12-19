


//score data
//user data
/*
                    <p class = "padding-settings text-left">РЕЖИМ ИГРЫ: <span id = "gamemode_text">0</span></p>
                        <p class = "padding-settings text-left">ИГРОК: <span  id = "user_name_text"> 0</span></p>
                        <p class = "padding-settings"><span id ="score-out">000</span></p>
                        <p class = "score text-left padding-settings">ОШИБКИ: <span id ="mistakes-out">0</span></p>
                        <p class = "score text-left padding-settings">РЕКОРД ИГРОКА: <span id ="record-out-user">0</span></p>
                        <div class ="line-decor"></div>
                        <p class = "score text-left padding-settings">ЛУЧШИЙ РЕКОРД: <span id ="record-out-best">0</span></p>
                        <p class = "score text-left padding-settings">ЛУЧШЕГО ИГРОКА: <span id ="best_player"> </span></p>
                        <span id ="text-about-records"></span>
                        
*/

var currentUser;
var usersListSave=[];
var newBestUser = false;

//input name
const $userName = document.getElementById("user-name");
$userName.addEventListener("change", function(){
    let name = this.value;
    //console.log(usersListSave)
    //currentUser = checkUserInput(name)

    //console.log(usersListSave, currentUser, name)
    saveuserList()

})

function checkUserName(){
    if ($userName.value === ''){
        return false;
    }
    currentUser = checkUserInput($userName.value)
    return true
}

//current player
const $gamemode_text = document.getElementById("gamemode_text")
const $user_name_text = document.getElementById("user_name_text")
const $score_out = document.getElementById("score-out")
const $record_out_user = document.getElementById("record-out-user")
const $mistakes = document.getElementById("mistakes-out")

const $textAboutRecords = document.getElementById("text-about-records");

//best player
const $record_out_best = document.getElementById("record-out-best");
const $best_player = document.getElementById("best_player");

function initUserStart(){
    usersListSave = [];
    if (localStorage.getItem('usersListSave')){
        usersListSave = JSON.parse(localStorage.usersListSave)
    }
    else {
        usersListSave = [];
    }
    if (localStorage.getItem('currentUser')){
        currentUser = JSON.parse(localStorage.currentUser)
        $userName.value = currentUser.name
    }
}

initUserStart();



function saveuserList(){
    localStorage.usersListSave = JSON.stringify(usersListSave);
    localStorage.currentUser = JSON.stringify(currentUser)
}



function checkUserInput(nameCh){
    for (var i=0; i<usersListSave.length; i++){
        if (usersListSave[i].name === nameCh) return usersListSave[i]
    }
    return createPlayer(nameCh)
}

function createPlayer(nameN){
    let newUser = {
        name:nameN,
        recordsBest:[{mode:'classic', score:[0,0,0,0]}, {mode:'monoton', score:[0,0,0,0]}, {mode:'noMistakes', score:[0,0,0,0]}]
    }
    currentUser = newUser;
    console.log(usersListSave)
    usersListSave.push(newUser)
    return newUser;
}


function getPlayerRecords(gamemode, level, user){
    if (level >3) return 0;

    if (created){
        return createdCurrScore;
    }

    for (var i=0; i<user.recordsBest.length; i++){
        if (user.recordsBest[i].mode === gamemode) return user.recordsBest[i].score[level]
    }
    return 0;
}

function getBestPlayerRecords(gamemode, level){
    let bestCurrentPlayer = currentUser;
    let userScore = getPlayerRecords(gamemode, level,currentUser)
    for (var i=0; i<usersListSave.length; i++){
        let cScore = getPlayerRecords(gamemode, level, usersListSave[i])
        if (userScore < cScore){
            bestCurrentPlayer =  usersListSave[i];
            userScore = cScore
        }
        
    }
    return bestCurrentPlayer;
}

function outAllRecords(score, mistakes)
{
    console.log(gameMode, outStringGamemode())
    console.log(levelToString(level))
    console.log(levelToString(level), level)
    $gamemode_text.textContent =outStringGamemode() +" / " + levelToString(level)
    $user_name_text.textContent =currentUser.name
    $score_out.textContent = score;
    $mistakes.textContent = mistakes;
    $record_out_user.textContent = getPlayerRecords(gameMode, level, currentUser)

    //best player
    let bestCurrentPlayer = getBestPlayerRecords(gameMode, level);
    let veryBestScore =getPlayerRecords(gameMode, level, bestCurrentPlayer)
    $record_out_best.textContent =veryBestScore
    $best_player.textContent =bestCurrentPlayer.name;

    //$textAboutRecords
    $textAboutRecords.style.display = "none"
    if (newBestUser){
        $textAboutRecords.textContent = 'ТВОЙ НОВЫЙ РЕКОРД!'
        $textAboutRecords.style.display = "block"
        console.log("new")
    }
    if (newBestUser && score >= veryBestScore){
        $textAboutRecords.textContent = 'ЛУЧШИЙ СЧЕТ ИЗ ВСЕХ!!!'
        $textAboutRecords.style.display = "block"
        console.log("new")
    }

    if (created) $record_out_user.textContent = createdCurrScore;

    if (train || created){
        $record_out_best.textContent = '-'
        $best_player.textContent = '-'
    }

}

function saveUsersScore(gamemode, level, score){
    console.log(currentUser.recordsBest[0])

    if (level > 3) return 0;

    if (created){
        if (score> createdCurrScore) createdCurrScore = score;
        sessionStorage.createdCurrScore = createdCurrScore;
        return
    }

    newBestUser = false;
    for (var i=0; i<currentUser.recordsBest.length; i++){
        if (currentUser.recordsBest[i].mode === gamemode) {
            if (currentUser.recordsBest[i].score[level] <score) {
                currentUser.recordsBest[i].score[level] = score;
                newBestUser = true;
            }
        }
    }
    saveuserList()
}

//game score out best
const $outBestscoreGame = document.getElementById("bestScoreOut");
function setBestOutScore(){
    if (train) {
        $outBestscoreGame.textContent = '-'
        return;
    }
    $outBestscoreGame.textContent = getPlayerRecords(gameMode, level, currentUser);
    

}

//save created mode score
var createdCurrScore=0;
function resetCreatedScore()
{
    createdCurrScore=0;
    sessionStorage.createdCurrScore = createdCurrScore;
}