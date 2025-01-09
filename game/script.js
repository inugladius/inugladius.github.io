// Basic game variables
let level = 1;
let playerHealth = 100;
let enemyHealth = 100;
let coins = 0;

// Update stats on screen
function updateStats() {
    document.getElementById('level').innerText = level;
    document.getElementById('player-health').innerText = playerHealth;
    document.getElementById('enemy-health').innerText = enemyHealth;
    document.getElementById('coins').innerText = coins;
}

// Player attack function
function attackEnemy() {
    const damage = Math.floor(Math.random() * 20) + 10;
    enemyHealth -= damage;
    if (enemyHealth <= 0) {
        enemyHealth = 0;
        coins += 10;
        alert("Enemy defeated! You've earned 10 coins.");
    } else {
        retaliate();
    }
    updateStats();
}

// Enemy retaliation
function retaliate() {
    const damage = Math.floor(Math.random() * 15) + 5;
    playerHealth -= damage;
    if (playerHealth <= 0) {
        playerHealth = 0;
        alert("You were defeated! Restarting the level.");
        resetLevel();
    }
}

// Upgrade weapon
function upgradeWeapon() {
    if (coins >= 20) {
        coins -= 20;
        alert("Weapon upgraded! Increased attack damage.");
    } else {
        alert("Not enough coins to upgrade!");
    }
    updateStats();
}

// Move to the next level
function nextLevel() {
    if (enemyHealth === 0) {
        level += 1;
        playerHealth = 100;
        enemyHealth = 100 + level * 20; // Enemies get stronger
        alert("Welcome to Level " + level);
    } else {
        alert("Defeat the enemy first!");
    }
    updateStats();
}

// Reset level on defeat
function resetLevel() {
    playerHealth = 100;
    enemyHealth = 100;
    coins = 0;
    updateStats();
}

// Event listeners
document.getElementById('attack').addEventListener('click', attackEnemy);
document.getElementById('upgrade').addEventListener('click', upgradeWeapon);
document.getElementById('next-level').addEventListener('click', nextLevel);

// Initialize stats
updateStats();
