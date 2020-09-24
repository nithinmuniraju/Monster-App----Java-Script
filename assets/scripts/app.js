const MONSTER_ATTACK = 14;
const PLAYER_NORMAL_ATTACK = 10;
const PLAYER_STRONG_ATTACK = 16;

const DefaultHealth = 100;
let initialMonsterHealth = DefaultHealth;
let initialPlayerHealth = DefaultHealth;
 
adjustHealthBars(DefaultHealth);

function attackMode(mode){
    let attackType;
    if(mode === "NORMAL"){
        attackType = PLAYER_NORMAL_ATTACK;
    } else if(mode === "STRONG"){
        attackType = PLAYER_STRONG_ATTACK;
    }

    const moanstrDamage = dealMonsterDamage(attackType);
    initialMonsterHealth -= moanstrDamage

    const playerDamage = dealPlayerDamage(MONSTER_ATTACK);
    initialPlayerHealth -= playerDamage
    console.log('playerDamage',initialPlayerHealth);

    if(initialMonsterHealth <= 0 && initialPlayerHealth > 0){
        alert('PLAYER Won!!');
    } else if(initialPlayerHealth <= 0 && initialMonsterHealth > 0){
        alert('PLAYER Lost :(');
    } else if(initialPlayerHealth <= 0 && initialMonsterHealth <= 0){
        alert('Match Draw');
    }
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

//Add a Click functionality for Attack
attackBtn.addEventListener('click', attackHandeler);
//Add a Click functionality for Strong Attack
strongAttackBtn.addEventListener('click', strongAttackHandeler);