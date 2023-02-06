const test = document.getElementById("testButton")

var animFlag = false

var currentBattleState;

test.addEventListener("click",()=>{
    currentMap = new mapState(mapData[0])
    testPkmn = new pokemon({
        name:"Pikachu",
        level:50,
        moves:["Thunder","Thunderbolt","Slam","Thunder Shock"],
        species:0
    })
    playerState = new state({position:playerPosition,party:[testPkmn],flags:playerFlags,items:[]});
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
        enemyParty:[new pokemon(currentMap.encounters[Math.floor(Math.random()*currentMap.encounters.length)])],
        flags:{}
    });
    battleFlag=true
    renderBattle(currentBattleState,playerState)
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


