let playerFlags = {};

let playerPosition = [0,0,0]

var animFlag = false

var battleFlag = false

async function getPkmnData(){
    let data = await fetch("/assets/data/pokeData.json")
    return data.json()
}

async function calculateInitialStats(species,level){
    let pkmnData = await getPkmnData()
    let statsObject= pkmnData[species].baseStats
    console.log(pkmnData)
    for(i=0;i<level;i++){
        statsObject.hp+=pkmnData[species].statGrowth.hp
        statsObject.attack+=pkmnData[species].statGrowth.attack
        statsObject.spAttack+=pkmnData[species].statGrowth.spAttack
        statsObject.defense+=pkmnData[species].statGrowth.defense
        statsObject.spDefense+=pkmnData[species].statGrowth.spDefense
        statsObject.speed+=pkmnData[species].statGrowth.speed
    }
    return statsObject
}

async function getSprite(species){
    let pkmnData = await getPkmnData();
    console.log(pkmnData[species].sprite)
    return pkmnData[species].sprite
}

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
        this.menu = "main"
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
        this.ability =  properties.ability
        this.name = properties.name
        this.species = properties.species
        this.stats = calculateInitialStats(properties.species,properties.level)
        this.status = false
        this.experience = 0
        this.sprite = getSprite(properties.species)
    }
}
const grassTile = new tile({type:"grassTile",facing:"south",occupied:"",encounter:0.90})

const testPkmn = new pokemon({
    name:"Pikachu",
    level:50,
    moves:["Thunder","Thunderbolt","Slam","Thunder Shock"],
    species:"pikachu"
})

const testPkmn2 = new pokemon({
    name:"Pikachu",
    level:50,
    moves:["Thunder","Thunderbolt","Slam","Thunder Shock"],
    species:"pikachu"
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
