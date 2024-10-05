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
    passiveIncomeRate: 0 // Passive income rate initialized at 0
};

// Building income rates (ISK per second for each building)
const buildingIncomeRates = {
    housing: 10,   // 10 ISK per second per housing building
    jobs: 15,      // 15 ISK per second per jobs building
    roads: 5,      // 5 ISK per second per road building
    parks: 8,      // 8 ISK per second per park
    tourism: 12,   // 12 ISK per second per tourism building
    hospitals: 20, // 20 ISK per second per hospital
    schools: 18,   // 18 ISK per second per school
    transport: 25  // 25 ISK per second per transport building
};

// Load the game state from localStorage or use default state
function loadGameState() {
    const savedState = localStorage.getItem('idleReykjavikTycoon');
    if (savedState) {
        gameState = JSON.parse(savedState);
    }
    calculatePassiveIncome(); // Calculate passive income when loading
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
        calculatePassiveIncome(); // Recalculate passive income after upgrading
        updateUI();
        saveGameState(); // Save after each upgrade
    }
}

// Calculate passive income based on building levels
function calculatePassiveIncome() {
    let totalIncome = 0;
    for (let building in gameState.buildings) {
        totalIncome += gameState.buildings[building] * buildingIncomeRates[building];
    }
    gameState.passiveIncomeRate = totalIncome; // Set the passive income rate
}

// Function to generate passive income every second
function generatePassiveIncome() {
    gameState.budget += gameState.passiveIncomeRate; // Add passive income to budget
    updateUI(); // Update the UI with the new budget
    saveGameState(); // Auto-save the game state
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

    // Update passive income rate in the UI
    document.getElementById('passive-income').innerText = `Passive Income: ${gameState.passiveIncomeRate.toLocaleString()} ISK/s`;
}

// Initialize game on page load
window.onload = function() {
    loadGameState();  // Load saved game state on launch
    setInterval(generatePassiveIncome, 1000); // Generate passive income every second
};
