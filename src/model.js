let playerFlags = {};;

let playerPosition = [0,0,0]

var animFlag = false

var battleFlag = false

class tile{
    constructor(properties){
        this.type = properties.type
        this.occupied = properties.occupied
        this.encounter = properties.encounter
    }
}

class battleState{
    constructor(properties){
        this.turncount = 0;
        this.playerCurrentActive = 0;
        this.enemyCurrentActive = 0;
        this.encounterType = properties.type
        this.playerParty = properties.playerParty
        this.enemyParty = properties.enemyParty
        this.flags = properties.flags
    }
    useMove(move,target){

    }
}

class state{
    constructor(properties){
        this.position = properties.position
        this.party = properties.party
        this.money = properties.money
        this.flags = properties.flags
        this.items = properties.items
    }
    addToParty(properties){

    }
    moveChar(direction){
        if(direction == "ArrowUp"){
            this.position[0] -= 1;
            this.position[2] = 2
        }
        else if(direction == "ArrowLeft"){
            this.position[1] -= 1;
            this.position[2] = 1
        }
        else if(direction == "ArrowRight"){
            this.position[1] += 1;
            this.position[2] = 3
        }
        else if(direction == "ArrowDown"){
            this.position[0] += 1;
            this.position[2] = 0
        }
    }
}

class mapState{
    constructor(properties){
        this.map = properties.map
        this.encounters = properties.encounters
    }
}

class pokemon{
    constructor(properties){
        this.level = properties.level
        this.moves = properties.moves
        this.possibleMoves = properties.possibleMoves
        this.ability =  properties.ability
        this.name = properties.name
        this.stats = properties.stats
        this.statGrowth = properties.statGrowth
        this.status = false
        this.experience = 0
        this.sprite = properties.sprite
    }
    levelUp(){
        Object.keys(this.stats).forEach((k)=>{
            this.stats[k]+=this.statGrowth[k]
        })
        this.experience-=this.level*1000
    }

}
const grassTile = new tile({type:"grassTile",facing:"south",occupied:"",encounter:0.90})

const testPkmn = new pokemon({
    name:"Pikachu",
    level:50,
    moves:["Thunder","Thunderbolt","Slam","Thunder Shock"],
    stats:{currentHealth:100,maxHealth:100,attack:10,spAttack:10,defense:10,spDefense:10,speed:10,avoid:100},
    ability:"",
    statGrowth:{currentHealth:10,maxHealth:10,attack:1,spAttack:1,defense:1,spDefense:1,speed:1,avoid:0},
    sprite:{away:"./assets/sprites/Pikachu.png",towards:"./assets/sprites/Pikachu.png"}
})

const testPkmn2 = new pokemon({
    name:"Pikachu",
    level:50,
    moves:["Thunder","Thunderbolt","Slam","Thunder Shock"],
    stats:{currentHealth:100,maxHealth:100,attack:10,spAttack:10,defense:10,spDefense:10,speed:10,avoid:100},
    ability:"",
    statGrowth:{currentHealth:10,maxHealth:10,attack:1,spAttack:1,defense:1,spDefense:1,speed:1,avoid:0},
    sprite:{away:"./assets/sprites/Pikachu.png",towards:"./assets/sprites/Pikachu.png"}
})

var currentMap = new mapState({map:[
    [{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90}],
    [{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90}],
    [{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90}],
    [{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90}],
    [{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90}],
    [{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90}],
    [{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90}],
    [{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90}],
    [{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90}],
    [{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90}],
    [{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90}],
    [{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90}],
    [{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90}],
    [{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90}],
    [{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90}],
    [{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90}],
    [{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90},{type:"grassTile",facing:"south",occupied:"",encounter:0.90}]
],encounters:[testPkmn2]})

var playerState = new state({position:playerPosition,party:[testPkmn],flags:playerFlags,items:[]});

var testBattleState = new battleState({
    encounterType:"wild",
    playerParty:playerState.party,
    enemyParty:[testPkmn2],
    flags:{}
})

function generateBattleState(pState,mState){
    return new battleState({
        
    });
}