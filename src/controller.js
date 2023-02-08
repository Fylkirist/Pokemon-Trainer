const test = document.getElementById("testButton")

var animFlag = false

var currentBattleState;

//placeholder for the main menu
test.addEventListener("click",()=>{
    currentMap = new mapState(mapData[0])
    testPkmn = new pokemon({
        name:"Pikachu1",
        level:50,
        moves:["Thunder","Thunderbolt","Slam","Thunder Shock"],
        species:0
    })
    playerState = new state({position:playerPosition,party:[testPkmn],flags:playerFlags,items:{"PokeBall":6,"Potion":10}});
    drawGrid(currentMap.map,playerState)
    document.addEventListener("keydown", function(event){
    if (animFlag || battleFlag){

    }
    else if (event.key=="ArrowDown" || event.key=="ArrowUp" || event.key=="ArrowLeft" || event.key=="ArrowRight"){
        movePlayer(event.key)
    }
    })
})

function endBattle(){
    drawGrid(currentMap.map,playerState)
    battleFlag=false
    animFlag=false
}


function startWildBattle(){
    currentBattleState = new battleState({
        encounterType:"wild",
        enemyParty:[new pokemon(currentMap.encounters[Math.floor(Math.random()*currentMap.encounters.length)])],
        flags:{}
    });
    battleFlag=true
    renderBattle(currentBattleState,playerState)
}

function openPartyMenu(fight,fainted){
    if (fight){
        renderBattlePartyMenu(playerState,fainted)
    }
    else{

    }
}

function openFightMenu(){
    currentBattleState.menu="fight"
    renderBattle(currentBattleState,playerState)
}
function openItemsMenu(){
    currentBattleState.menu="items"
    renderBattle(currentBattleState,playerState)
}

function mainBattleMenu(){
    currentBattleState.menu="main"
    renderBattle(currentBattleState,playerState)
}

function selectMove(move){
    console.log(move)
    handleBattleLogic("move",moveDict[move])
}

function selectItem(item){
    playerState.items[item]-=1
    currentBattleState.menu="main"
    renderBattle(currentBattleState,playerState)
    handleBattleLogic("item",item)
}

function useItem(item,target){
    switch(itemDict[item].effect){
        case "restore":
            target.stats.currentHealth = target.stats.currentHealth + itemDict[item].value>target.stats.maxHealth ? target.stats.maxHealth : target.stats.currentHealth + itemDict[item].value
            console.log(`player used ${item} and restored ${target.name} to ${target.stats.currentHealth} HP!`)
            break
        case "catch":
            if (Math.random()*100>itemDict[item].value){
                playerState.addToParty(currentBattleState.enemyParty[currentBattleState.enemyCurrentActive])
                console.log(`You caught ${currentBattleState.enemyParty[currentBattleState.enemyCurrentActive].name}`)
                endBattle()
                return 1
            }
            else{
                console.log(`You failed to catch ${currentBattleState.enemyParty[currentBattleState.enemyCurrentActive].name}`)
                break
            }
    }
}

//placeholder for enemy logic
function selectEnemyAction(){
    return currentBattleState.enemyParty[currentBattleState.enemyCurrentActive].moves[Math.floor(Math.random()*currentBattleState.enemyParty[currentBattleState.enemyCurrentActive].moves.length)]
}

function calculateDamage(attacker, move, defender, flags) {
    let miss = 100 - move.accuracy;
    if (miss > Math.floor(Math.random() * 100)) {
        return [0, 0];
    }
    
    let damage;
    let damageModifier = 1;
    let attackerStat = move.category === "physical" ? "attack" : "spAttack";
    let defenderStat = move.category === "physical" ? "defense" : "spDefense";
    
    damage = ((((2 * attacker.level) / 5) + 2) * move.power * (attacker.stats[attackerStat] / defender.stats[defenderStat])) / 50 + 2;
    damage = attacker.type === move.type ? damage * 1.5 : damage;

    let defenderType = typeRelationships[defender.type];
    if (defenderType.weakTo.includes(move.type)) {
        damage *= 2;
        damageModifier *= 2;
    } else if (defenderType.strongAgainst.includes(move.type)) {
        damage *= 0.5;
        damageModifier *= 0.5;
    }
    return [Math.ceil(damage), damageModifier];
}

function fleeBattle(bType){
    if(bType!="wild"){
        return false
    }
    else{
        return Math.random()>0.3
    }
}

function handleBattleLogic(actionType, playerAction) {
    let player = playerState.party[currentBattleState.playerCurrentActive];
    let enemy = currentBattleState.enemyParty[currentBattleState.enemyCurrentActive];
    let enemyAction = moveDict[selectEnemyAction()];

    if (actionType == 'flee') {
        if (fleeBattle(currentBattleState.encounterType)){
            console.log("You have fled the battle");
            endBattle()
            return
        }
        else{
            console.log("You failed to flee");
        }
    }
    
    if (actionType==="switch"){
        currentBattleState.playerCurrentActive=playerAction;
        player = playerState.party[currentBattleState.playerCurrentActive];
        renderBattle(currentBattleState,playerState);
    }
    if (actionType==="item"){
        if(useItem(playerAction,playerState.party[currentBattleState.playerCurrentActive])==1){
            return
        };
    }

    if (actionType==="move"){
        if (enemy.stats.speed > player.stats.speed) {
            handleHit(enemy, player, enemyAction);
            handleHit(player, enemy, playerAction);
        }
        else{
            handleHit(player, enemy, playerAction);
            handleHit(enemy, player, enemyAction);
        }
    }
    else{
        handleHit(enemy, player, enemyAction);
    }
    currentBattleState.menu="main"
    renderBattle(currentBattleState,playerState)
}

function handleHit(attacker, defender, action) {
    if(attacker.status=="fainted"){
        endBattle()
        return
    }
    let damage = calculateDamage(attacker, action, defender)
    if (defender.stats.currentHealth - damage[0] <= 0) {
        defender.stats.currentHealth = 0;
        handleFaint(defender);
    } else {
        defender.stats.currentHealth -= damage[0];
    }
    console.log(`${attacker.name} hit ${defender.name} for ${damage[0]} at ${damage[1]} effectiveness`);
}

function handleFaint(faintedPokemon) {
    faintedPokemon.status = "fainted";
    console.log(`${faintedPokemon.name} has fainted`);
}

function movePlayer(event){
    animFlag = true
    console.log(event)
    playerState.moveChar(event)
    animateWalkCycle(playerState,currentMap.map)
    if(Math.random()>currentMap.map[playerState.position[0]][playerState.position[1]].encounter){
        startWildBattle();
    }
}

