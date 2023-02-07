var app = document.getElementById("app")

initializeDisplay()

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

function renderBattle(bState,pState){

    let enemyCurrentHealthBar = (bState.enemyParty[bState.enemyCurrentActive].stats.currentHealth / bState.enemyParty[bState.enemyCurrentActive].stats.maxHealth) * 100

    let playerCurrentHealthBar = (pState.party[bState.playerCurrentActive].stats.currentHealth / pState.party[bState.playerCurrentActive].stats.maxHealth) * 100

    document.getElementById("gameWindow").innerHTML=`
    <div id = "battleBackground">
        <div id = "enemyInfoContainer">
            <label>${bState.enemyParty[bState.enemyCurrentActive].name}</label>
            <label>lvl ${bState.enemyParty[bState.enemyCurrentActive].level}</label>
            <div id = "enemyHealthBarContainer"><div id = "enemyHealthBar" style = "width:${enemyCurrentHealthBar}px; height:10px; background:green;"></div></div>
        </div>
        <div id = "enemySpriteContainer">
            <img src = "${bState.enemyParty[bState.enemyCurrentActive].sprite.towards}"/>
        </div>
        <div id = "playerInfoContainer">
            <label>${pState.party[bState.playerCurrentActive].name}</label>
            <label>lvl ${pState.party[bState.playerCurrentActive].level}</label>
            <div id = "playerHealthBarContainer">
                <div id="playerHealthBar" style="width:${playerCurrentHealthBar}px; height:10px; background:green;"></div>
            </div>
            <label>${pState.party[bState.playerCurrentActive].stats.currentHealth}/${pState.party[bState.playerCurrentActive].stats.maxHealth}</label>
        </div>
        <div id = "playerSpriteContainer">
            <img src = "${pState.party[bState.playerCurrentActive].sprite.away}"/>
        </div>
        <div id = "menuContainer">
            <div id = "infoBar">
            </div>
            <div id = "menuHead">
            </div>
        </div>
    </div>`
    if(bState.menu=="main"){
        document.getElementById("menuHead").innerHTML=`
            <div onclick="openFightMenu()"class="battleMenuOption" id = "fightOption">Fight</div>
            <div onclick="openItemsMenu()"class="battleMenuOption" id = "itemsOption">Items</div>
            <div onclick="openPartyMenu(false)" class="battleMenuOption" id = "partyOption">PKMN</div>
            <div onclick="fleeBattle()" class="battleMenuOption" id = "fleeOption">Flee</div>`
    }
    else if(bState.menu=="fight"){
        const infoBar = document.getElementById("infoBar")
        for(i=0;i<pState.party[bState.playerCurrentActive].moves.length;i++){
            infoBar.innerHTML+=`<div onclick="selectMove(${pState.party[bState.playerCurrentActive].moves[i]})" class="battleMenuOption">${pState.party[bState.playerCurrentActive].moves[i]}</div>`
            }
        infoBar.innerHTML+=`<div class="battleMenuOption" onclick="mainBattleMenu()">Back</div>`
    }
    else if(bState.menu=="items"){
        for(i=0;i<pState.items.length;i++){
            
        }
    }
}

function renderBattlePartyMenu(bState){
    const gameWindow = document.getElementById("gameWindow")
    gameWindow.innerHTML=`<div id="partyMenuBG"></div>`
    for(i=0;i<bState.playerParty.length;i++){
        
    }
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