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
    document.getElementById("gameWindow").innerHTML=`<div id = "backgroundLayer"></div><div id="playerCharSpriteContainer">${renderPlayerModel(pState.position[2])}</div>`
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
    let gWindow = document.getElementById("gameWindow")

    let enemyCurrentHealthBar = (bState.enemyParty[bState.enemyCurrentActive].stats.currentHealth / bState.enemyParty[bState.enemyCurrentActive].stats.maxHealth) * 100

    let playerCurrentHealthBar = (pState.party[bState.playerCurrentActive].stats.currentHealth / pState.party[bState.playerCurrentActive].stats.maxHealth) * 100

    gWindow.innerHTML=`
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
            <div onclick="openPartyMenu(true,false)" class="battleMenuOption" id = "partyOption">PKMN</div>
            <div onclick="handleBattleLogic('flee',0)" class="battleMenuOption" id = "fleeOption">Flee</div>`
    }
    else if(bState.menu=="fight"){
        const infoBar = document.getElementById("infoBar")
        for(i=0;i<pState.party[bState.playerCurrentActive].moves.length;i++){
            infoBar.innerHTML+=`<div onclick="selectMove('${pState.party[bState.playerCurrentActive].moves[i]}')" class="battleMenuOption">${pState.party[bState.playerCurrentActive].moves[i]}</div>`
        }
        infoBar.innerHTML+=`<div class="battleMenuOption" onclick="mainBattleMenu()">Back</div>`
    }
    else if(bState.menu=="items"){
        let itemMenuContainer = document.createElement("div")
        itemMenuContainer.id="itemMenuContainer"
        for(let itemKey of Object.keys(pState.items)){
            if (pState.items[itemKey]>0){
                itemMenuContainer.innerHTML+=`<div class="itemMenuOption" onclick="selectItem('${itemKey}')">${itemKey} x${pState.items[itemKey]}</div>`
            }
        }
        itemMenuContainer.innerHTML+=`<div class="itemMenuOption" onclick="mainBattleMenu()">Back</div>`
        gWindow.appendChild(itemMenuContainer)
    }
}

function renderBattlePartyMenu(pState,fainted){
    const gameWindow = document.getElementById("gameWindow")
    gameWindow.innerHTML=""
    let partyMenuContainer= document.createElement("div")
    partyMenuContainer.id="partyMenuContainer"
    for(i=0;i<6;i++){
        if (i<pState.party.length){
            partyMenuContainer.innerHTML+=`<div onclick="handleBattleLogic('switch',${i})" class="partyMenuElement"><img src="${pState.party[i].sprite.towards}"/>${pState.party[i].name}<label>${pState.party[i].stats.currentHealth}/${pState.party[i].stats.maxHealth} hp</label></div>`
        }
        else{
            partyMenuContainer.innerHTML+=`<div class="emptyPartySlot"></div>`
        }
    }
    if(!fainted){
        partyMenuContainer.innerHTML+=`<div class="itemMenuOption" onclick="mainBattleMenu()">Back</div>`
    }
    gameWindow.appendChild(partyMenuContainer)
}

function animateWalkCycle(pState,map){
    const background = document.getElementById("backgroundLayer");
    document.getElementById("playerCharSpriteContainer").innerHTML=renderPlayerModel(pState.position[2]);
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