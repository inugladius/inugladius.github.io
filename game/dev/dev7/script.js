// Game Variables
let playerHealth = 100;
let enemyHealth = 100;
let level = 1;
let coins = 50;
let weaponStats = { attack: 10, speed: 5, durability: 10 };

// Load Game Data from Cookies
window.onload = () => {
    loadGame();
    updateStats();
    switchScreen('menu-screen');
};

// Save Game Data to Cookies
function saveGame() {
    document.cookie = `playerHealth=${playerHealth}; path=/`;
    document.cookie = `enemyHealth=${enemyHealth}; path=/`;
    document.cookie = `level=${level}; path=/`;
    document.cookie = `coins=${coins}; path=/`;
    document.cookie = `weaponStats=${JSON.stringify(weaponStats)}; path=/`;
}

// Load Game Data from Cookies
function loadGame() {
    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
        const [key, value] = cookie.split('=');
        acc[key] = value;
        return acc;
    }, {});

    playerHealth = parseInt(cookies.playerHealth) || 100;
    enemyHealth = parseInt(cookies.enemyHealth) || 100;
    level = parseInt(cookies.level) || 1;
    coins = parseInt(cookies.coins) || 50;
    weaponStats = cookies.weaponStats ? JSON.parse(cookies.weaponStats) : { attack: 10, speed: 5, durability: 10 };
}

// Update Stats on Screen
function updateStats() {
    document.getElementById('level').textContent = level;
    document.getElementById('coins').textContent = coins;
    document.getElementById('player-health').style.width = `${playerHealth}%`;
    document.getElementById('enemy-health').style.width = `${enemyHealth}%`;
}

// Switch Between Screens
function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

// Start Game
function startGame() {
    switchScreen('game-screen');
    resetGame();
}

// Reset Game
function resetGame() {
    playerHealth = 100;
    enemyHealth = 100;
    level = 1;
    coins = 50;
    weaponStats = { attack: 10, speed: 5, durability: 10 };
    saveGame();
    updateStats();
}

// Attack Logic
document.getElementById('attack-btn').addEventListener('click', () => {
    if (enemyHealth > 0 && playerHealth > 0) {
        const playerDamage = Math.floor(Math.random() * weaponStats.attack) + 5;
        const enemyDamage = Math.floor(Math.random() * 10) + 5;

        enemyHealth -= playerDamage;
        playerHealth -= enemyDamage;

        if (enemyHealth < 0) enemyHealth = 0;
        if (playerHealth < 0) playerHealth = 0;

        updateStats();
        triggerAttackAnimation('player');
        triggerAttackAnimation('enemy');

        if (enemyHealth === 0) {
            coins += 20;
            level++;
            alert(`Enemy defeated! Level up! You earned 20 $INU.`);
            resetEnemy();
        }
        if (playerHealth === 0) {
            alert("You have been defeated! Resetting game...");
            resetGame();
        }

        saveGame();
    }
});

// Reset Enemy Stats
function resetEnemy() {
    enemyHealth = 100 + level * 10;
    updateStats();
}

// Upgrade Weapon
function upgradeWeapon(part) {
    if (coins < 30) {
        alert("Not enough $INU to upgrade!");
        return;
    }

    coins -= 30;

    if (part === 'blade') {
        weaponStats.attack += 5;
    } else if (part === 'hilt') {
        weaponStats.speed += 3;
    } else if (part === 'core') {
        weaponStats.durability += 10;
    }

    alert(`${part} upgraded!`);
    updateStats();
    saveGame();
}

// Trigger Attack Animation
function triggerAttackAnimation(character) {
    const element = document.getElementById(character);
    element.classList.add('attack-animation');
    setTimeout(() => element.classList.remove('attack-animation'), 500);
}

// View Instructions
function viewInstructions() {
    alert(`
        Welcome to InuGladius!
        1. Attack your enemy to reduce their health.
        2. Earn coins ($INU) to upgrade your weapons.
        3. Advance levels by defeating enemies.
        4. Stay alive and dominate the arena!
    `);
}
