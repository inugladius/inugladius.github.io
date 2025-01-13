// Game Variables
let level = 1;
let lives = 3;
let playerHealth = 100;
let enemyHealth = 100;
let coins = 100;
let weapon = { blade: 0, hilt: 0, core: 0 };

// Start Game
function startGame() {
    loadGame();
    loadArena();
    switchScreen('game-screen');
    updateStats();
}

// Screen Switching
function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
}

// Update Stats
function updateStats() {
    const levelElem = document.getElementById('level');
    const coinsElem = document.getElementById('coins');
    const upgradeCoinsElem = document.getElementById('upgrade-coins');
    const playerHealthElem = document.getElementById('player-health');
    const playerxHealthElem = document.getElementById('playerxhealth');
    const enemyHealthElem = document.getElementById('enemy-health');
    const weaponStatusElem = document.getElementById('weaponstatus');
    const liveStatusElem = document.getElementById('livestatus');
    const weaponxStatusElem = document.getElementById('weaponsession');

    const weaponUpgrade = weapon.blade + weapon.hilt; // Fix: Definition von weaponUpgrade

    if (levelElem) levelElem.innerText = level;
    if (coinsElem) coinsElem.innerText = `${coins} $INU`;
    if (upgradeCoinsElem) upgradeCoinsElem.innerText = `${coins} $INU`;
    if (playerHealthElem) playerHealthElem.style.width = `${playerHealth}%`;
    if (playerxHealthElem) playerxHealthElem.innerText = `${playerHealth}%`;
    if (enemyHealthElem) enemyHealthElem.style.width = `${enemyHealth}%`;
    if (weaponStatusElem) {
        weaponStatusElem.innerText = `Blade: ${weapon.blade}, Hilt: ${weapon.hilt}, Core: ${weapon.core}`;
        weaponxStatusElem.innerText = weaponUpgrade;
    }
    if (liveStatusElem) liveStatusElem.innerText = lives;
    
}

// Attack Logic with Visual Effects
document.getElementById('attack-btn').addEventListener('click', () => {
    const weaponUpgrade = weapon.blade + weapon.hilt; // Fix: Variable für Damage-Berechnung

    if (enemyHealth > 0 && playerHealth > 0) {
        // Calculate Damage
        const playerDamage = Math.floor(Math.random() * 10 + 4 + weaponUpgrade);
        const enemyDamage = Math.floor(Math.random() * 10 + 5);

        // Apply Damage
        enemyHealth -= playerDamage;
        playerHealth -= enemyDamage;

        // Ensure health doesn't go negative
        enemyHealth = Math.max(0, enemyHealth);
        playerHealth = Math.max(0, playerHealth);

        // Update Health Bars
        updateStats();

        // Trigger Animations
        triggerAttackAnimation('player');
        triggerAttackAnimation('enemy');

        // Check Game State
        if (enemyHealth === 0) {
            coins += 20;
            alert("Enemy defeated! You earned 20 $INU.");
            levelUp();
        }
        if (playerHealth === 0) {
            alert("You have been defeated! Try again.");
        }

        // Save Progress
        saveGame();
    } else {
        if (lives < 1) {
            alert("Game over! Reset to continue.");
            resetGame();
        } else {
            lives--;
            alert(`[-1] You lost 1 life. ${lives} lives remaining.`);
            playerHealth = 100;
            updateStats();
            saveGame();
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

// Level-Up System
function levelUp() {
    if (enemyHealth <= 0) {
        level++;
        playerHealth = 100 + level * 10;
        enemyHealth = 100 + level * 20;
        coins += 50; // Bonus für Levelaufstieg
        triggerLevelUpAnimation();
        loadArena(); // Fix: Nächste Arena laden
        updateStats();
        saveGame();
    } else {
        alert("Defeat the enemy first!");
    }
}

// Visual Effects bei Levelaufstieg
function triggerLevelUpAnimation() {
    const levelUpElement = document.createElement('div');
    levelUpElement.id = 'level-up-animation';
    levelUpElement.innerText = `Level ${level} erreicht!`;
    document.body.appendChild(levelUpElement);

    setTimeout(() => {
        document.body.removeChild(levelUpElement);
    }, 2000);
}

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

// Neue Arenen
function loadArena() {
    const arenaBackgrounds = ['../img/arena1.webp', '../img/arena2.webp', '../img/arena3.webp'];
    const arena = document.querySelector('.arena');
    const currentArena = level % arenaBackgrounds.length;
    if (arena) arena.style.backgroundImage = `url(${arenaBackgrounds[currentArena]})`;
}

// Save and Load Game
function saveGame() {
    if (typeof localStorage === 'undefined') {
        alert("Local storage is not supported or disabled.");
        return;
    }
    const gameData = { level, coins, playerHealth, enemyHealth, weapon, lives };
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
        lives = savedGame.lives;
    }
    updateStats();
}

// Reset Game
function resetGame() {
    level = 1;
    lives = 3;
    playerHealth = 100;
    enemyHealth = 100;
    coins = 100;
    weapon = { blade: 0, hilt: 0, core: 0 };
    loadArena(); // Fix: Arena resetten
    updateStats();
    saveGame();
}

// Initialize Game
startGame();
