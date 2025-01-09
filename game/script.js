let level = 1;
let playerHealth = 100;
let enemyHealth = 100;
let coins = 0;
let selectedWeapon = 'sword';
let soundOn = true;

// Helper functions
function updateStats() {
    document.getElementById('level').innerText = level;
    document.getElementById('player-health').innerText = playerHealth;
    document.getElementById('enemy-health').innerText = enemyHealth;
    document.getElementById('coins').innerText = coins;
}

function saveGame() {
    document.cookie = `gameData=${JSON.stringify({
        level,
        playerHealth,
        coins,
        selectedWeapon,
    })}; path=/;`;
}

function loadGame() {
    const gameData = document.cookie
        .split('; ')
        .find(row => row.startsWith('gameData='))
        ?.split('=')[1];
    if (gameData) {
        const data = JSON.parse(gameData);
        level = data.level || 1;
        playerHealth = data.playerHealth || 100;
        coins = data.coins || 0;
        selectedWeapon = data.selectedWeapon || 'sword';
    }
    updateStats();
}

function toggleSound() {
    soundOn = !soundOn;
    document.getElementById('sound-status').innerText = soundOn ? 'ON' : 'OFF';
}

// Screen navigation
function startGame() {
    loadGame();
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('game').classList.remove('hidden');
}

function backToMenu() {
    saveGame();
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById('menu').classList.remove('hidden');
}

function openSettings() {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById('settings').classList.remove('hidden');
}

function openWeaponsMenu() {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById('weapons-menu').classList.remove('hidden');
}

function closeWeaponsMenu() {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById('game').classList.remove('hidden');
}

function selectWeapon(weapon) {
    selectedWeapon = weapon;
    alert(`You selected ${weapon}!`);
    closeWeaponsMenu();
}

// Game logic
document.getElementById('attack').addEventListener('click', () => {
    if (enemyHealth > 0) {
        enemyHealth -= 20;
        if (enemyHealth <= 0) {
            coins += 10;
            alert("You defeated the enemy!");
        }
    }
    playerHealth -= 10; // Simulate enemy attack
    updateStats();
    saveGame();
});

document.getElementById('next-level').addEventListener('click', () => {
    if (enemyHealth <= 0) {
        level += 1;
        playerHealth = 100;
        enemyHealth = 100 + level * 10;
        updateStats();
        alert(`Welcome to level ${level}!`);
    } else {
        alert("Defeat the enemy first!");
    }
});

// Initialize
updateStats();
