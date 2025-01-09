// Game Variables
let level = 1;
let playerHealth = 100;
let enemyHealth = 100;
let coins = 50;
let weapon = { blade: 0, hilt: 0, core: 0 };

// Load Data from Cookies
function loadGame() {
    const savedGame = JSON.parse(localStorage.getItem('inuGame'));
    if (savedGame) {
        level = savedGame.level || 1;
        coins = savedGame.coins || 0;
        weapon = savedGame.weapon || { blade: 0, hilt: 0, core: 0 };
    }
    updateStats();
}

// Save Data to Cookies
function saveGame() {
    const gameData = { level, coins, weapon };
    localStorage.setItem('inuGame', JSON.stringify(gameData));
}

// Switch Between Screens
function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

// Start Game
function startGame() {
    switchScreen('game-screen');
    loadGame();
}

// Update Stats
function updateStats() {
    document.getElementById('level').innerText = level;
    document.getElementById('coins').innerText = `${coins} $INU`;
    document.getElementById('upgrade-coins').innerText = `${coins} $INU`;
    document.getElementById('player-health').style.width = `${playerHealth}%`;
    document.getElementById('enemy-health').style.width = `${enemyHealth}%`;
}

// Attack Logic
document.getElementById('attack-btn').addEventListener('click', () => {
    if (enemyHealth > 0) {
        const damage = 10 + weapon.blade * 5;
        enemyHealth -= damage;
        if (enemyHealth <= 0) {
            enemyHealth = 0;
            coins += 20;
            alert("Enemy defeated! Coins earned: 20 $INU");
        }
        updateStats();
        saveGame();
    }
});

// Next Level
document.getElementById('next-level-btn').addEventListener('click', () => {
    if (enemyHealth <= 0) {
        level++;
        playerHealth = 100;
        enemyHealth = 100 + level * 20;
        updateStats();
        saveGame();
    } else {
        alert("Defeat the enemy first!");
    }
});

// Upgrade Weapon
function upgradeWeapon(part) {
    const cost = 10;
    if (coins >= cost) {
        coins -= cost;
        weapon[part]++;
        alert(`Upgraded ${part}!`);
        saveGame();
        updateStats();
    } else {
        alert("Not enough $INU!");
    }
}

// Initialize Game
loadGame();
