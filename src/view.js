var app = document.getElementById("app")

function initializeDisplay(){
    app.innerHTML = `<div id = "gameWindow"><div id="playerSpriteContainer"></div></div>`
}

function renderForegroundElement(source){
    return `<img src="${source}" class="foregroundElement"></img>`
}

function renderPlayerModel(facing){
    return `<img id="playerSprite${facing}"></img>`
}

function drawGrid(mapGrid,pState){
    document.getElementById("gameWindow").innerHTML=`<div id = "backgroundLayer"></div><div id="playerSpriteContainer">${renderPlayerModel(pState.position[2])}</div>`
    let buffer = ``
    for(row = pState.position[0]-11; row<pState.position[0]+11; row++){
        for(col = pState.position[1]-11; col<pState.position[1]+11; col++){
            if(row>=0 && row<mapGrid.length && col>=0 && col<mapGrid[row].length){
                if(mapGrid[row][col].occupied!=""){
                    buffer+=`<div class="${mapGrid[row][col].type}">${renderForegroundElement(mapGrid[row][col].occupied.sprite)}</div>`
                }
                else{
                    buffer+=`<div class="${mapGrid[row][col].type}"></div>`
                }
            }
            else{
                buffer+='<div class="outsideMap"></div>'
            }
        }
    }
    document.getElementById("backgroundLayer").innerHTML = buffer

}

function renderBattle(battleState){

    console.log(battleState.enemyParty[battleState.enemyCurrentActive])

    let enemyCurrentHealthBar = (battleState.enemyParty[battleState.enemyCurrentActive].stats.currentHealth / battleState.enemyParty[battleState.enemyCurrentActive].stats.maxHealth) * 100

    let playerCurrentHealthBar = (battleState.playerParty[battleState.playerCurrentActive].stats.currentHealth / battleState.playerParty[battleState.playerCurrentActive].stats.maxHealth) * 100

    document.getElementById("gameWindow").innerHTML=`
    <div id = "battleBackground">
        <div id = "enemyInfoContainer">
            <label>${battleState.enemyParty[battleState.enemyCurrentActive].name}</label>
            <label>lvl ${battleState.enemyParty[battleState.enemyCurrentActive].level}</label>
            <div id = "enemyHealthBarContainer"><div id = "enemyHealthBar" style = "width:${enemyCurrentHealthBar}px; height:10px; background:green;"></div></div>
        </div>
        <div id = "enemySpriteContainer">
            <img src = "${battleState.enemyParty[battleState.enemyCurrentActive].sprite.towards}"/>
        </div>
        <div id = "playerInfoContainer">
            <label>${battleState.playerParty[battleState.playerCurrentActive].name}</label>
            <label>lvl ${battleState.playerParty[battleState.playerCurrentActive].level}</label>
            <div id = "playerHealthBarContainer">
                <div id="playerHealthBar" style="width:${playerCurrentHealthBar}px; height:10px; background:green;"></div>
            </div>
            <label>${battleState.playerParty[battleState.playerCurrentActive].stats.currentHealth}/${battleState.playerParty[battleState.playerCurrentActive].stats.maxHealth}</label>
        </div>
        <div id = "playerSpriteContainer">
            <img src = "${battleState.playerParty[battleState.playerCurrentActive].sprite.away}"/>
        </div>
        <div id = "infoBar">
            <div id = "menuHead">
                <div id = "fightOption">Fight</div>
                <div id = "itemsOption">Items</div>
                <div id = "partyOption">PKMN</div>
                <div id = "fleeOption">Flee</div>
            </div>
        </div>
    </div>`
}

function openMoveMenu(moves){
    
}

function animateWalkCycle(pState,map){
    const background = document.getElementById("backgroundLayer");
    document.getElementById("playerSpriteContainer").innerHTML=renderPlayerModel(pState.position[2]);
    let direction;

    switch (pState.position[2]) {
        case 0:
        direction = "translate(0, -50px)";
        break;

    case 1:
        direction = "translate(50px, 0)";
        break;

    case 2:
        direction = "translate(0, 50px)";
        break;

    case 3:
        direction = "translate(-50px, 0)";
        break;
    }

    background.style.transform = direction;
    background.style.transition = "transform 500ms";
    background.addEventListener("transitionend", function () {
        drawGrid(map, pState);
        animFlag=false
      });
}