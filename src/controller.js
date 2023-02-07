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
    console.log(move)
    handleBattleLogic("move",moveDict[move])
}

function selectItem(item){

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
    
    damage = (((((2 * attacker.level) / 5) + 2) * move.power * (attacker.stats[attackerStat] / defender.stats[defenderStat])) / 50 + 2);
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




function handleBattleLogic(actionType, playerAction) {
    let player = playerState.party[currentBattleState.playerCurrentActive];
    let enemy = currentBattleState.enemyParty[currentBattleState.enemyCurrentActive];
    let enemyAction = moveDict[selectEnemyAction()];

    if (actionType === "flee") {
        if (currentBattleState.type === "wild") {
            fleeBattle();
            return;
        }
    }

    let enemyDamage = calculateDamage(enemy, enemyAction, player);
    let playerDamage = calculateDamage(player, playerAction, enemy);

    if (enemy.stats.speed > player.stats.speed) {
        handleHit(player, enemy, enemyAction, enemyDamage);
        if (enemy.stats.currentHealth <= 0) {
            handleFaint(enemy);
        } 
        else{
            handleHit(enemy, player, playerAction, playerDamage);
            if (player.stats.currentHealth <= 0) {
                handleFaint(player);
            }
        }
    } 
    else{
        handleHit(enemy, player, playerAction, playerDamage);
        if (enemy.stats.currentHealth <= 0) {
            handleFaint(enemy);
        } 
        else{
            handleHit(player, enemy, enemyAction, enemyDamage);
            if (player.stats.currentHealth <= 0) {
                handleFaint(player);
            }
        }
    }
    renderBattle(currentBattleState,playerState)
}

function handleHit(attacker, defender, action, damage) {
    if (defender.stats.currentHealth - damage[0] <= 0) {
        defender.stats.currentHealth = 0;
        handleFaint(defender);
    } else {
        defender.stats.currentHealth -= damage[0];
    }
    console.log(`${attacker.name} hit ${defender.name} with ${action} for ${damage[0]} at ${damage[1]} effectiveness`);
}

function handleFaint(faintedPokemon) {
    faintedPokemon.status = "fainted";
    console.log(`${faintedPokemon.name} has fainted`);
}

function movePlayer(event){
    console.log(event)
    playerState.moveChar(event)
    animateWalkCycle(playerState,currentMap.map)
    if(Math.random()>currentMap.map[playerState.position[0]][playerState.position[1]].encounter){
        startWildBattle();
    }
}


