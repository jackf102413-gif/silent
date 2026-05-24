// Sample games data
const games = [
    {
        id: 1,
        name: 'Space Shooter',
        description: 'Classic arcade space shooter game',
        emoji: '🚀',
        url: 'https://www.classicgamesnow.com/games/spaceinvaders.html'
    },
    {
        id: 2,
        name: 'Snake Game',
        description: 'Retro snake game - eat and grow',
        emoji: '🐍',
        url: 'https://playsnake.org/'
    },
    {
        id: 3,
        name: 'Flappy Bird',
        description: 'Tap to fly through obstacles',
        emoji: '🐦',
        url: 'https://flappybird.io/'
    },
    {
        id: 4,
        name: 'Pac-Man',
        description: 'Navigate the maze and eat pellets',
        emoji: '👾',
        url: 'https://www.classicgamesnow.com/games/pacman.html'
    },
    {
        id: 5,
        name: 'Breakout',
        description: 'Classic brick breaker game',
        emoji: '🎯',
        url: 'https://www.classicgamesnow.com/games/breakout.html'
    },
    {
        id: 6,
        name: 'Asteroids',
        description: 'Shoot asteroids in space',
        emoji: '⭐',
        url: 'https://www.classicgamesnow.com/games/asteroids.html'
    },
    {
        id: 7,
        name: 'Memory Tiles',
        description: 'Match tiles and test your memory',
        emoji: '🧠',
        url: 'https://playmemory.io/'
    },
    {
        id: 8,
        name: 'Tic Tac Toe',
        description: 'Classic strategy game',
        emoji: '⭕',
        url: 'https://playgroundai.itch.io/tic-tac-toe'
    }
];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Only run on games page
    if (document.getElementById('gamesGrid')) {
        displayGames(games);
        setupSearch();
        setupModal();
    }
});

// Display games in grid
function displayGames(gamesToDisplay) {
    const gamesGrid = document.getElementById('gamesGrid');
    const noResults = document.getElementById('noResults');

    gamesGrid.innerHTML = '';

    if (gamesToDisplay.length === 0) {
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';

    gamesToDisplay.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.innerHTML = `
            <div class="game-image">${game.emoji}</div>
            <div class="game-info">
                <h3>${game.name}</h3>
                <p>${game.description}</p>
                <div class="game-buttons">
                    <button class="play-btn" onclick="playGame('${game.url}')">Play</button>
                    <button class="fullscreen-btn" onclick="openFullscreen('${game.url}', '${game.name}')">⛶</button>
                </div>
            </div>
        `;
        gamesGrid.appendChild(gameCard);
    });
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const filteredGames = games.filter(game => 
                game.name.toLowerCase().includes(searchTerm) ||
                game.description.toLowerCase().includes(searchTerm)
            );
            displayGames(filteredGames);
        });
    }
}

// Play game in new window
function playGame(url) {
    window.open(url, '_blank');
}

// Fullscreen game modal
function setupModal() {
    const modal = document.getElementById('gameModal');
    const closeBtn = document.getElementById('closeBtn');

    if (closeBtn) {
        closeBtn.addEventListener('click', closeFullscreen);
    }

    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeFullscreen();
            }
        });
    }

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeFullscreen();
        }
    });
}

// Open fullscreen mode
function openFullscreen(url, gameName) {
    const modal = document.getElementById('gameModal');
    const gameFrame = document.getElementById('gameFrame');
    
    gameFrame.src = url;
    modal.classList.add('active');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// Close fullscreen mode
function closeFullscreen() {
    const modal = document.getElementById('gameModal');
    const gameFrame = document.getElementById('gameFrame');
    
    modal.classList.remove('active');
    gameFrame.src = '';
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}
