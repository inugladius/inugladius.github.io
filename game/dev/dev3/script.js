let level = 1;
let playerHealth = 100;
let enemyHealth = 100;
let coins = 0;
let selectedWeapon = 'sword';

// Update stats and health bars
function updateStats() {
    document.getElementById('level').innerText = level;
    document.getElementById('coins').innerText = coins;
    document.getElementById('player-health-bar').style.width = `${playerHealth}%`;
    document.getElementById('enemy-health-bar').style.width = `${enemyHealth}%`;
}

// Screen navigation
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

function startGame() {
    showScreen('game');
    updateStats();
}

function backToMenu() {
    showScreen('menu');
}

function openSettings() {
    showScreen('settings');
}

function openWeaponsMenu() {
    showScreen('weapons-menu');
}

function closeWeaponsMenu() {
    showScreen('game');
}

function selectWeapon(weapon) {
    selectedWeapon = weapon;
    alert(`You selected the ${weapon}!`);
    closeWeaponsMenu();
}

// Game logic
document.getElementById('attack').addEventListener('click', () => {
    const damage = Math.floor(Math.random() * 15) + 10;
    enemyHealth -= damage;
    if (enemyHealth <= 0) {
        enemyHealth = 0;
        coins += 10;
        alert("Enemy defeated! Coins earned: 10");
    }
    updateStats();
});

document.getElementById('next-level').addEventListener('click', () => {
    if (enemyHealth <= 0) {
        level += 1;
        playerHealth = 100;
        enemyHealth = 100 + level * 10;
        updateStats();
    } else {
        alert("Defeat the enemy first!");
    }
});

// Initialize game
updateStats();
