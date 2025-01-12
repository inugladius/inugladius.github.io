// Variablen
let level = 1;
let lives = 3;
let coins = 50000;
let playerHealth = 100;
let enemyHealth = 100;

// Charakter- und Waffenwahl
let characters = [
    { name: "Inu Warrior", attack: 10, defense: 8 },
    { name: "Inu Berserker", attack: 15, defense: 5 },
    { name: "Inu Defender", attack: 7, defense: 12 }
];
let selectedCharacter = characters[0];

let weapons = [
    { name: "Sword", attack: 10 },
    { name: "Spear", attack: 12 },
    { name: "Axe", attack: 15 }
];
let selectedWeapon = weapons[0];

// Spiel starten
function startGame() {
    updateStats();
    loadArena();
    switchScreen('game-screen');
}

// Arena wechseln
function loadArena() {
    const arenas = ['img/arena1.webp', 'img/arena2.webp'];
    const arena = document.querySelector('.arena');
    arena.style.backgroundImage = `url(${arenas[level % arenas.length]})`;
}

// Angriff
document.getElementById('attack-btn').addEventListener('click', () => {
    enemyHealth -= selectedWeapon.attack + selectedCharacter.attack;
    playerHealth -= 10; // Beispiel
    updateStats();
});

// Statistiken aktualisieren
function updateStats() {
    document.getElementById('level').innerText = level;
    document.getElementById('coins').innerText = coins;
    document.getElementById('player-health').style.width = `${playerHealth}%`;
    document.getElementById('enemy-health').style.width = `${enemyHealth}%`;
}

// Bildschirm wechseln
function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

// Charakter wählen
function chooseCharacter(index) {
    selectedCharacter = characters[index];
    alert(`Charakter gewählt: ${selectedCharacter.name}`);
    switchScreen('menu-screen');
}

// Waffe wählen
function chooseWeapon(index) {
    selectedWeapon = weapons[index];
    alert(`Waffe gewählt: ${selectedWeapon.name}`);
    switchScreen('game-screen');
}
