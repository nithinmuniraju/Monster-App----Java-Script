const MONSTER_ATTACK = 14;
const PLAYER_NORMAL_ATTACK = 10;
const PLAYER_STRONG_ATTACK = 16;
const PLAYER_HEAL_VALUE = 20;

// Logging Values;
const LOG_EVENT_PLAYER_NORMAL_ATTACK = "PLAYER_NORMAL_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_NORMAL_STRONG_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_GAME_OVER = "GAME_OVER";

let DefaultHealth;
function getInitialValue(){
    const enteredValue = prompt('Set initial Health','100'); // Convert this into a model on LOAD

    const parsedValue = parseInt(enteredValue)
    if(!parsedValue || parsedValue <= 0 || isNaN(parsedValue)){
        // setHealth = 100;
        throw {message: "Invalid argument - Please pass only numbers - Default set to Value: 100"}
    }
    return parsedValue;
}

try{
    DefaultHealth = getInitialValue();
} catch(error){
    console.log('erroe', error);
    DefaultHealth = 100;
    alert(error.message);
}


// const DefaultHealth = 100;
let initialMonsterHealth = DefaultHealth;
let initialPlayerHealth = DefaultHealth;
let hasBonus = true;

let logResults = [];
 
adjustHealthBars(DefaultHealth);

function writeLog(event, value, initialMonsterHealth, initialPlayerHealth){
    let logEvent;
    if(event === LOG_EVENT_PLAYER_NORMAL_ATTACK){
        logEvent = {
            "event" : event,
            "value" : value,
            "target" : "MONSTER",
            "monsterHealth" : initialMonsterHealth,
            "playerHealth" : initialPlayerHealth,

        }
    } else if(event === LOG_EVENT_PLAYER_STRONG_ATTACK){
        logEvent = {
            "event" : event,
            "value" : value,
            "target" : "MONSTER",
            "monsterHealth" : initialMonsterHealth,
            "playerHealth" : initialPlayerHealth,

        }
    } else if(event === LOG_EVENT_MONSTER_ATTACK){
        logEvent = {
            "event" : event,
            "value" : value,
            "target" : "PLAYER",
            "monsterHealth" : initialMonsterHealth,
            "playerHealth" : initialPlayerHealth,

        }
    } else if(event === LOG_EVENT_PLAYER_HEAL){
        logEvent = {
            "event" : event,
            "value" : value,
            "target" : "PLAYER",
            "monsterHealth" : initialMonsterHealth,
            "playerHealth" : initialPlayerHealth,

        }
    } else if(event === LOG_GAME_OVER){
        logEvent = {
            "event" : event,
            "value" : value,
            "monsterHealth" : initialMonsterHealth,
            "playerHealth" : initialPlayerHealth,

        }
    }

    logResults.push(logEvent);
}
// Reset function on Game Over
function reset(){
    initialMonsterHealth = DefaultHealth;
    initialPlayerHealth = DefaultHealth;
    resetGame(DefaultHealth);
}

function endRound(){
    const getBonusHealth = initialPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK);
    initialPlayerHealth -= playerDamage
    writeLog(LOG_EVENT_MONSTER_ATTACK,playerDamage, initialMonsterHealth, initialPlayerHealth)
    if(initialPlayerHealth <= 0 && hasBonus){
        hasBonus = false;
        removeBonusLife();
        initialPlayerHealth = getBonusHealth;
        setPlayerHealth(getBonusHealth);
        alert('You would be dead but the bonus life saved you');
    }

    if(initialMonsterHealth <= 0 && initialPlayerHealth > 0){
        writeLog(LOG_GAME_OVER, 'PLAYER WON!!', initialMonsterHealth, initialPlayerHealth);
        alert('PLAYER WON!!');
        reset()
    } else if(initialPlayerHealth <= 0 && initialMonsterHealth > 0){
        writeLog(LOG_GAME_OVER, 'MONSTER WON', initialMonsterHealth, initialPlayerHealth);
        alert('MONSTER WON');
        reset()
    } else if(initialPlayerHealth <= 0 && initialMonsterHealth <= 0){
        writeLog(LOG_GAME_OVER, 'MATCH DRAW', initialMonsterHealth, initialPlayerHealth);
        alert('MATCH DRAW');
        reset()
    }
}
function attackMode(mode){
    let attackType;
    let targetEvent;
    if(mode === "NORMAL"){
        attackType = PLAYER_NORMAL_ATTACK;
        targetEvent = LOG_EVENT_PLAYER_NORMAL_ATTACK;
    } else if(mode === "STRONG"){
        attackType = PLAYER_STRONG_ATTACK;
        targetEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
    }
    const moanstrDamage = dealMonsterDamage(attackType);
    initialMonsterHealth -= moanstrDamage
    writeLog(targetEvent, moanstrDamage, initialMonsterHealth, initialPlayerHealth)
    endRound();
}

function attackHandeler(){
    attackMode('NORMAL');
}

function strongAttackHandeler(){
    /*  ********** 
    TODO: Strong Attack should enable after 5 normal attack
        ********** 
     */
    attackMode('STRONG');
}

function healHandeler(){
    let healValue;

    if(initialPlayerHealth >= DefaultHealth - PLAYER_HEAL_VALUE){
        alert('You can\'t heal more than your max initial health');
        healValue = DefaultHealth - initialPlayerHealth;
    } else {
        healValue = PLAYER_HEAL_VALUE
    }

    writeLog(LOG_EVENT_PLAYER_HEAL, healValue, initialMonsterHealth, initialPlayerHealth);
    increasePlayerHealth(PLAYER_HEAL_VALUE);
    initialPlayerHealth += healValue;

   endRound();
}

function writeLogHandeler(){
    // #1 Display Log in readable format using LOOPS
    for(let i = 0; i < logResults.length; i++){
        console.log(logResults[i]);
    }
    console.log('**********')
    // #2 Display Log in readable format using LOOPS
    let i = 0;
    for(const element of logResults){
        console.log(`${i}`);
        for(const events in element){
            console.log(`${events} : ${element[events]}`);
        }
        i++;
    }
}

//Add a Click functionality for Attack
attackBtn.addEventListener('click', attackHandeler);

//Add a Click functionality for Strong Attack
strongAttackBtn.addEventListener('click', strongAttackHandeler);

//Add a Click functionality for Heal
healBtn.addEventListener('click', healHandeler);

//Add a Click functionality for Logging Result
logBtn.addEventListener('click', writeLogHandeler);