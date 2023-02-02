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

function movePlayer(event){
    console.log(event)
    playerState.moveChar(event)
    animateWalkCycle(playerState,currentMap.map)
    if(Math.random()>currentMap.map[playerState.position[0]][playerState.position[1]].encounter){
        battleFlag = true
        renderBattle(testBattleState)
        document.addEventListener("keydown",function(event){
            
        })
    }
}


