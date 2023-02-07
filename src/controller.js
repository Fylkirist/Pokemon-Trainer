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
//placeholder for enemy logic
function selectEnemyAction(){
    return currentBattleState.enemyParty[currentBattleState.enemyCurrentActive].moves[Math.floor(Math.random()*currentBattleState.enemyParty[currentBattleState.enemyCurrentActive].moves.length)]
}

function calculateDamage(attacker,move,defender,flags){
    let miss = 100-moveDict[move].accuracy
    if(miss>Math.floor(Math.random()*100)){
        return [0,0]
    }
    let dmgMod = 1
    let damage;
    if (move.category == "physical"){
        damage = (((((2*attacker.level)/5)+2)*move.power*(attacker.stats.attack/defender.stats.defense))/50+2)
    }
    else{
        damage = (((((2*attacker.level)/5)+2)*move.power*(attacker.stats.spAttack/defender.stats.spDefense))/50+2)
    }
        
    damage = attacker.type == move.type ? damage*1.5:damage

    if(typeRelationships[defender.type].weakTo.includes(move.type)){
        damage*=2
        dmgMod*=2
    }
    else if(typeRelationships[defender.type].strongAgainst.includes(move.type)){
        damage*=0.5
        dmgMod*=0.5
    }
    return[damage,dmgMod]

}

function handleBattleLogic(actionType,playerAction){
    let pSpeed = playerState[currentBattleState.playerCurrentActive].stats.speed
    let eSpeed = currentBattleState.enemyParty[currentBattleState.enemyCurrentActive].stats.speed
    let playerFainted = false
    let eAction = moveDict[selectEnemyAction()]
    if(actionType=="flee"){
        if(currentBattleState.type=="wild"){
            fleeBattle();
            return
        }
    }
    let enemyDamage = calculateDamage(currentBattleState.enemyParty[currentBattleState.enemyCurrentActive],eAction,playerState.party[currentBattleState.playerCurrentActive])
    if(actionType=="move"){
        let playerDamage = calculateDamage(playerState.party[currentBattleState.playerCurrentActive],playerAction,currentBattleState.enemyParty[currentBattleState.enemyCurrentActive])
        if(eSpeed>pSpeed){   
            if(playerState.party[currentBattleState.playerCurrentActive].stats.currentHealth-enemyDamage[0]<=0){
                playerState.party[currentBattleState.playerCurrentActive].stats.currentHealth=0
                playerFainted = true;
                console.log(`${currentBattleState.enemyParty[currentBattleState.enemyCurrentActive].name} hit ${playerState.party[currentBattleState.playerCurrentActive].name} with ${eAction} for ${enemyDamage[0]} at ${enemyDamage[1]} effectiveness`)
            }
            else{
                playerState.party[currentBattleState.playerCurrentActive].stats.currentHealth-=enemyDamage[0]
                console.log(`${currentBattleState.enemyParty[currentBattleState.enemyCurrentActive].name} hit ${playerState.party[currentBattleState.playerCurrentActive].name} with ${eAction} for ${enemyDamage[0]} at ${enemyDamage[1]} effectiveness`)
            }
        }
        else{
            if(playerState.party[currentBattleState.playerCurrentActive].stats.currentHealth-enemyDamage[0]<=0){
                playerState.party[currentBattleState.playerCurrentActive].stats.currentHealth=0
                playerFainted = true;
                console.log(`${currentBattleState.enemyParty[currentBattleState.enemyCurrentActive].name} hit ${playerState.party[currentBattleState.playerCurrentActive].name} with ${eAction} for ${enemyDamage[0]} at ${enemyDamage[1]} effectiveness`)
            }
            else{
                playerState.party[currentBattleState.playerCurrentActive].stats.currentHealth-=enemyDamage[0]
                console.log(`${currentBattleState.enemyParty[currentBattleState.enemyCurrentActive].name} hit ${playerState.party[currentBattleState.playerCurrentActive].name} with ${eAction} for ${enemyDamage[0]} at ${enemyDamage[1]} effectiveness`)
            }
        }
    }
    else{
        if(playerState.party[currentBattleState.playerCurrentActive].stats.currentHealth-enemyDamage[0]<=0){
            playerState.party[currentBattleState.playerCurrentActive].stats.currentHealth=0
            playerFainted = true;
        }
        else{

        }
    }
}
function movePlayer(event){
    console.log(event)
    playerState.moveChar(event)
    animateWalkCycle(playerState,currentMap.map)
    if(Math.random()>currentMap.map[playerState.position[0]][playerState.position[1]].encounter){
        startWildBattle();
    }
}


