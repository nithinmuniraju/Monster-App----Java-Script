const MONSTER_ATTACK = 14;
const PLAYER_NORMAL_ATTACK = 10;
const PLAYER_STRONG_ATTACK = 16;
const PLAYER_HEAL_VALUE = 20;

let setHealth = prompt('Set initial Health','100'); // Convert this into a model on LOAD

if(!setHealth || setHealth <= 0 ){
    setHealth = 100;
}
const DefaultHealth = setHealth;
// const DefaultHealth = 100;
let initialMonsterHealth = DefaultHealth;
let initialPlayerHealth = DefaultHealth;
let hasBonus = true;
 
adjustHealthBars(DefaultHealth);

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

    if(initialPlayerHealth <= 0 && hasBonus){
        hasBonus = false;
        removeBonusLife();
        initialPlayerHealth = getBonusHealth;
        setPlayerHealth(getBonusHealth);
        alert('You would be dead but the bonus life saved you');
    }

    if(initialMonsterHealth <= 0 && initialPlayerHealth > 0){
        alert('PLAYER Won!!');
        reset()
    } else if(initialPlayerHealth <= 0 && initialMonsterHealth > 0){
        alert('PLAYER Lost :(');
        reset()
    } else if(initialPlayerHealth <= 0 && initialMonsterHealth <= 0){
        alert('Match Draw');
        reset()
    }
}
function attackMode(mode){
    console.log('mode',mode);
    let attackType;
    if(mode === "NORMAL"){
        attackType = PLAYER_NORMAL_ATTACK;
    } else if(mode === "STRONG"){
        attackType = PLAYER_STRONG_ATTACK;
    }
    const moanstrDamage = dealMonsterDamage(attackType);
    initialMonsterHealth -= moanstrDamage

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

    increasePlayerHealth(PLAYER_HEAL_VALUE);
    initialPlayerHealth += healValue;

   endRound();
}

//Add a Click functionality for Attack
attackBtn.addEventListener('click', attackHandeler);
//Add a Click functionality for Strong Attack
strongAttackBtn.addEventListener('click', strongAttackHandeler);
//Add a Click functionality for Heal
healBtn.addEventListener('click', healHandeler);