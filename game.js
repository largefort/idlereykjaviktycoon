// Game state object
let gameState = {
    govName: "Stjórnvalda Reykjavíkur",
    budget: 10000, // Starting budget
    population: 1000, // Starting population
    buildings: {
        housing: 1,
        jobs: 1,
        roads: 1,
        parks: 1,
        tourism: 1,
        hospitals: 1,
        schools: 1,
        transport: 1,
    },
    region: "Reykjavík",
    passiveIncome: 50 // ISK earned per second
};

// Load the game state from localStorage or use default state
function loadGameState() {
    const savedState = localStorage.getItem('idleReykjavikTycoon');
    if (savedState) {
        gameState = JSON.parse(savedState);
    }
    updateUI();
}

// Save the game state to localStorage
function saveGameState() {
    localStorage.setItem('idleReykjavikTycoon', JSON.stringify(gameState));
}

// Set government name
function setGovernmentName() {
    const govNameInput = document.getElementById('govName').value;
    if (govNameInput.trim()) {
        gameState.govName = govNameInput;
        updateUI();
        saveGameState(); // Save after changing the name
    }
}

// Upgrade buildings and citizens
function upgrade(type) {
    const costs = {
        housing: 1000,
        jobs: 2000,
        roads: 500,
        parks: 1000,
        tourism: 1500,
        hospitals: 2000,
        schools: 3000,
        transport: 4000
    };

    if (gameState.budget >= costs[type]) {
        gameState.budget -= costs[type];
        gameState.buildings[type]++;
        updateUI();
        saveGameState(); // Save after each upgrade
    }
}

// Select region
function selectRegion(region) {
    gameState.region = region;
    updateUI();
    saveGameState(); // Save region change
}

// Update the UI instantly
function updateUI() {
    document.getElementById('governmentName').innerText = gameState.govName;
    document.getElementById('kr').innerText = gameState.budget.toLocaleString();
    document.getElementById('population').innerText = gameState.population.toLocaleString();

    // Update building levels
    document.getElementById('roads-level').innerText = gameState.buildings.roads;
    document.getElementById('parks-level').innerText = gameState.buildings.parks;
    document.getElementById('tourism-level').innerText = gameState.buildings.tourism;
    document.getElementById('hospitals-level').innerText = gameState.buildings.hospitals;
    document.getElementById('schools-level').innerText = gameState.buildings.schools;
    document.getElementById('transport-level').innerText = gameState.buildings.transport;
    document.getElementById('housing-level').innerText = gameState.buildings.housing;
    document.getElementById('jobs-level').innerText = gameState.buildings.jobs;
}

// Function to generate passive income
function generatePassiveIncome() {
    gameState.budget += gameState.passiveIncome; // Add passive income to budget
    updateUI(); // Update the UI with new budget
    saveGameState(); // Save the game state after each income tick
}

// Initialize game on page load
window.onload = function() {
    loadGameState();  // Load saved game state on launch
    setInterval(generatePassiveIncome, 1000); // Generate ISK every second
};
