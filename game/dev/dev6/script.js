// Game Variables
let level = 1;
let live = 3;
let playerHealth = 100;
let enemyHealth = 100;
let coins = 50000;
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
    document.getElementById('weaponstatus').innerText = `Blade: ${weapon.blade}, Hilt: ${weapon.hilt}, Core: ${weapon.core}`;
    document.getElementById('livestatus').innerText = `Lives: ${live}`;
}

// Attack Logic with Visual Effects
document.getElementById('attack-btn').addEventListener('click', () => {
    if (enemyHealth > 0 && playerHealth > 0) {
        // Calculate Damage
        const playerDamage = Math.floor(Math.random() * 15) + 5;
        const enemyDamage = Math.floor(Math.random() * 10) + 5;

        // Apply Damage
        enemyHealth -= playerDamage;
        playerHealth -= enemyDamage;

        // Ensure health doesn't go negative
        if (enemyHealth < 0) enemyHealth = 0;
        if (playerHealth < 0) playerHealth = 0;

        // Update Health Bars
        updateStats();

        // Trigger Animations
        triggerAttackAnimation('player');
        triggerAttackAnimation('enemy');

        // Check Game State
        if (enemyHealth === 0) {
            coins += 20;
            alert("Enemy defeated! You earned 20 $INU.");
        }
        if (playerHealth === 0) {
            alert("You have been defeated! Try again.");
        }

        // Save Progress
        saveGame();
    } else {
        if (live < 1) {
            alert("Game over! Reset to continue.");
            resetGame();
        } else {
            alert(`[-1] You lost 1 life. ${live - 1} lives remaining.`);
            live--;
            updateStats();
        }
    }
});

// Attack Animation Function
function triggerAttackAnimation(character) {
    const element = document.getElementById(character);
    if (element) {
        element.classList.add('attack-animation');
        setTimeout(() => element.classList.remove('attack-animation'), 500);
    }
}

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
    if (typeof localStorage === 'undefined') {
        alert("Local storage is not supported or disabled.");
        return;
    }
    const gameData = { level, coins, playerHealth, enemyHealth, weapon, live };
    localStorage.setItem('inuGame', JSON.stringify(gameData));
}

function loadGame() {
    if (typeof localStorage === 'undefined') {
        alert("Local storage is not supported or disabled.");
        return;
    }
    const savedGame = JSON.parse(localStorage.getItem('inuGame'));
    if (savedGame) {
        level = savedGame.level;
        coins = savedGame.coins;
        playerHealth = savedGame.playerHealth;
        enemyHealth = savedGame.enemyHealth;
        weapon = savedGame.weapon;
        live = savedGame.live;
    }
    updateStats();
}

// Reset Game
function resetGame() {
    level = 1;
    live = 3;
    playerHealth = 100;
    enemyHealth = 100;
    coins = 50000;
    weapon = { blade: 0, hilt: 0, core: 0 };
    updateStats();
    saveGame();
}

// Initialize Game
loadGame();
