// Game Variables
let level = 1;
let playerHealth = 100;
let enemyHealth = 100;
let coins = 0;
let selectedWeapon = 'sword';

// Screen Switching
function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

// Update Stats
function updateStats() {
    document.getElementById('level').innerText = level;
    document.getElementById('coins').innerText = coins;
    document.getElementById('player-health').style.width = `${playerHealth}%`;
    document.getElementById('enemy-health').style.width = `${enemyHealth}%`;
}

// Attack Logic
document.getElementById('attack-btn').addEventListener('click', () => {
    if (enemyHealth > 0) {
        const damage = Math.floor(Math.random() * 20) + 10;
        enemyHealth -= damage;
        if (enemyHealth <= 0) {
            enemyHealth = 0;
            coins += 10;
            alert("Enemy defeated! Coins earned: 10");
        }
        updateStats();
    }
});

// Next Level Logic
document.getElementById('next-level-btn').addEventListener('click', () => {
    if (enemyHealth <= 0) {
        level++;
        playerHealth = 100;
        enemyHealth = 100 + level * 10;
        updateStats();
    } else {
        alert("Defeat the enemy first!");
    }
});

// Weapon Selection
function selectWeapon(weapon) {
    selectedWeapon = weapon;
    alert(`You selected the ${weapon}!`);
    switchScreen('game-screen');
}

// Initialize
updateStats();
