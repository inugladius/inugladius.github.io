// Game Variables
let level = 1;
let playerHealth = 100;
let enemyHealth = 100;
let coins = 50;
let weapon = { blade: 0, hilt: 0, core: 0 };

// Start Game
function startGame() {
    loadGame();
    switchScreen('game-screen');
}

// Screen Switching
function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
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
        const playerDamage = Math.floor(Math.random() * 15) + 5;
        const enemyDamage = Math.floor(Math.random() * 10) + 5;

        enemyHealth -= playerDamage;
        playerHealth -= enemyDamage;

        if (enemyHealth <= 0) {
            enemyHealth = 0;
            coins += 20;
            alert("Enemy defeated! Coins earned: 20 $INU");
        }

        if (playerHealth <= 0) {
            playerHealth = 0;
            alert("You lost! Try again.");
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

// Weapon Upgrade
function upgradeWeapon(part) {
    const cost = 20;
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

// Save and Load Game
function saveGame() {
    const gameData = { level, coins, playerHealth, enemyHealth, weapon };
    localStorage.setItem('inuGame', JSON.stringify(gameData));
}

function loadGame() {
    const savedGame = JSON.parse(localStorage.getItem('inuGame'));
    if (savedGame) {
        level = savedGame.level;
        coins = savedGame.coins;
        playerHealth = savedGame.playerHealth;
        enemyHealth = savedGame.enemyHealth;
        weapon = savedGame.weapon;
    }
    updateStats();
}

// Initialize Game
loadGame();
