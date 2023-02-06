const test = document.getElementById("testButton")

initializeDisplay()

test.addEventListener("click",()=>{
    drawGrid(currentMap.map,playerState)
    document.addEventListener("keydown", function(event){
    if (animFlag || battleFlag){

    }
    else if (event.key=="ArrowDown" || event.key=="ArrowUp" || event.key=="ArrowLeft" || event.key=="ArrowRight"){
        animFlag = true
        movePlayer(event.key)
    }
    })
})

function startWildBattle(){
    currentBattleState = new battleState({
        encounterType:"wild",
        playerParty:playerState.party,
        enemyParty:[currentMap.encounters[Math.floor(Math.random()*currentMap.encounters.length)]],
        flags:{}
    });
    battleFlag=true
    renderBattle(currentBattleState)
}

function openFightMenu(){
    currentBattleState.menu="fight"
    renderBattle(currentBattleState,playerState)
}

function mainBattleMenu(){
    currentBattleState.menu="main"
    renderBattle(currentBattleState,playerState)
}

function selectMove(move){
    
}

function selectItem(item){

}

function movePlayer(event){
    console.log(event)
    playerState.moveChar(event)
    animateWalkCycle(playerState,currentMap.map)
    if(Math.random()>currentMap.map[playerState.position[0]][playerState.position[1]].encounter){
        startWildBattle();
    }
}


