let playerFlags = {};

let playerPosition = [0,0,0]

const typeRelationships = {
    "fire": { weakTo: ["water"], strongAgainst: ["grass", "ice", "steel"] },
    "water": { weakTo: ["grass"], strongAgainst: ["fire", "ground", "rock"] },
    "grass": { weakTo: ["fire", "ice", "bug"], strongAgainst: ["water", "ground"] },
    "ice": { weakTo: ["fire", "fighting", "rock"], strongAgainst: ["grass", "ground", "dragon"] },
    "fighting": { weakTo: ["flying", "psychic", "fairy"], strongAgainst: ["normal", "ice", "rock", "dark"] },
    "poison": { weakTo: ["ground", "psychic"], strongAgainst: ["grass", "fairy"] },
    "ground": { weakTo: ["water", "grass", "ice"], strongAgainst: ["fire", "electric", "poison", "rock"] },
    "flying": { weakTo: ["electric", "ice", "rock"], strongAgainst: ["grass", "fighting", "bug"] },
    "psychic": { weakTo: ["bug", "ghost", "dark"], strongAgainst: ["fighting", "poison"] },
    "bug": { weakTo: ["fire", "flying", "rock"], strongAgainst: ["grass", "psychic", "dark"] },
    "rock": { weakTo: ["water", "grass", "fighting", "ground"], strongAgainst: ["fire", "ice", "flying", "bug"] },
    "ghost": { weakTo: ["dark"], strongAgainst: ["psychic", "ghost"] },
    "dragon": { weakTo: ["ice", "dragon", "fairy"], strongAgainst: ["fire", "water", "grass", "electric"] },
    "dark": { weakTo: ["fighting", "bug", "fairy"], strongAgainst: ["psychic", "ghost"] },
    "steel": { weakTo: ["fire", "water", "electric", "steel"], strongAgainst: ["ice", "rock", "fairy"] },
    "fairy": { weakTo: ["steel", "poison"], strongAgainst: ["fighting", "dragon", "dark"] },
  };
  
var moveDict = {"Thunder":{type:"electric",power:120,category:"special",accuracy:80,effect:["paralyze",0.10]},"Thunderbolt":{type:"electric",power:80,category:"special",accuracy:100,effect:["paralyze",0.10]},"Slam":{type:"normal",power:80,category:"physical",accuracy:100,effect:["none",0]},"Thunder Shock":{type:"electric",power:60,category:"special",accuracy:500,effect:["paralyze",0.30]}}
var battleFlag = false
var mapData;
var pkmnData;
getPkmnData()


async function getPkmnData(){
    let data =  await fetch("/assets/data/pokeData.json")
    data = await data.json()
    let maps = await fetch("/assets/data/maps.json")
    maps = await maps.json()
    pkmnData = data
    mapData = maps
}

function calculateInitialStats(species,level){
    let statsObject ={maxHealth:pkmnData[species].baseStats.maxHealth,
        attack:pkmnData[species].baseStats.attack,
        spAttack:pkmnData[species].baseStats.spAttack,
        defense:pkmnData[species].baseStats.defense,
        spDefense:pkmnData[species].baseStats.spDefense,
        speed:pkmnData[species].baseStats.speed    
    }
    console.log(pkmnData)
    for(i=0;i<level;i++){
        statsObject.maxHealth+=pkmnData[species].statGrowth.maxHealth
        statsObject.attack+=pkmnData[species].statGrowth.attack
        statsObject.spAttack+=pkmnData[species].statGrowth.spAttack
        statsObject.defense+=pkmnData[species].statGrowth.defense
        statsObject.spDefense+=pkmnData[species].statGrowth.spDefense
        statsObject.speed+=pkmnData[species].statGrowth.speed
    }
    statsObject.currentHealth=statsObject.maxHealth
    return statsObject
}

function getSprite(species){
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
        console.log(pkmnData)
        this.level = properties.level
        this.moves = properties.moves
        this.ability =  properties.ability
        this.name = properties.name
        this.species = properties.species
        this.stats = calculateInitialStats(properties.species,properties.level)
        this.status = false
        this.experience = 0
        this.sprite = pkmnData[properties.species].sprite
        this.type = pkmnData[properties.species].type
        this.modifiers = {attack:1,defense:1,spAttack:1,spDefense:1,speed:1,avoid:1}
    }
}
const grassTile = new tile({type:"grassTile",facing:"south",occupied:"",encounter:0.90})

var testPkmn;

var testPkmn2;

var currentMap;

var playerState; 
