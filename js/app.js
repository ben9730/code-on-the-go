/* ==========================================
   Memory Plus - Main Application Logic
   ==========================================
   Controls navigation, game lifecycle, timer
   ========================================== */

const app = {
    // Game registry
    games: {
        'card-match':     CardMatchGame,
        'simon':          SimonGame,
        'word-quiz':      WordQuizGame,
        'spot-diff':      SpotDiffGame,
        'number-memory':  NumberMemoryGame,
        'image-word':     ImageWordGame
    },

    gameNames: {
        'card-match':     { name: 'התאמת קלפים', icon: '🃏' },
        'simon':          { name: 'סדרת צבעים', icon: '🎨' },
        'word-quiz':      { name: 'חידון מילים', icon: '📝' },
        'spot-diff':      { name: 'מצאו את השונה', icon: '🔍' },
        'number-memory':  { name: 'זיכרון מספרים', icon: '🔢' },
        'image-word':     { name: 'תמונה ומילה', icon: '🖼️' }
    },

    currentGame: null,
    currentGameId: null,
    timerInterval: null,
    timerSeconds: 0,
    currentScore: 0,

    // ==========================================
    // Navigation
    // ==========================================

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
    },

    goHome() {
        this.stopTimer();
        if (this.currentGame && this.currentGame.destroy) {
            this.currentGame.destroy();
        }
        this.currentGame = null;
        this.currentGameId = null;
        this.showScreen('screen-menu');
    },

    // ==========================================
    // Game Lifecycle
    // ==========================================

    startGame(gameId) {
        this.currentGameId = gameId;
        // Show difficulty modal
        const modal = document.getElementById('modal-difficulty');
        const title = document.getElementById('difficulty-game-title');
        const info = this.gameNames[gameId];
        title.textContent = `${info.icon} ${info.name}`;
        modal.style.display = 'flex';
    },

    selectDifficulty(difficulty) {
        this.closeDifficultyModal();

        const gameId = this.currentGameId;
        const game = this.games[gameId];
        const info = this.gameNames[gameId];

        if (!game) return;

        this.currentGame = game;
        this.currentScore = 0;

        // Set game title
        document.getElementById('game-title').textContent = `${info.icon} ${info.name}`;
        document.getElementById('game-score').textContent = 'ניקוד: 0';
        document.getElementById('game-instructions').textContent = '';
        document.getElementById('game-area').innerHTML = '';
        document.getElementById('game-controls').innerHTML = '';

        // Show game screen
        this.showScreen('screen-game');

        // Start timer
        this.startTimer();

        // Initialize the game
        game.init(difficulty);
    },

    closeDifficultyModal() {
        document.getElementById('modal-difficulty').style.display = 'none';
    },

    restartGame() {
        if (this.currentGameId) {
            this.startGame(this.currentGameId);
        }
    },

    // ==========================================
    // Timer
    // ==========================================

    startTimer() {
        this.stopTimer();
        this.timerSeconds = 0;
        this.updateTimerDisplay();
        this.timerInterval = setInterval(() => {
            this.timerSeconds++;
            this.updateTimerDisplay();
        }, 1000);
    },

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    },

    updateTimerDisplay() {
        const el = document.getElementById('game-timer');
        if (el) {
            el.textContent = `⏱ ${Scoring.formatTime(this.timerSeconds)}`;
        }
    },

    // ==========================================
    // Score Updates
    // ==========================================

    updateScore(score) {
        this.currentScore = score;
        const el = document.getElementById('game-score');
        if (el) {
            el.textContent = `ניקוד: ${score}`;
        }
    },

    // ==========================================
    // Game Over
    // ==========================================

    endGame({ score, message, level }) {
        this.stopTimer();

        // Save score
        Scoring.save(this.currentGameId, {
            score: score || this.currentScore,
            time: this.timerSeconds,
            level: level || 1
        });

        // Show game over screen
        document.getElementById('gameover-score').textContent = score || this.currentScore;
        document.getElementById('gameover-time').textContent = Scoring.formatTime(this.timerSeconds);
        document.getElementById('gameover-level').textContent = level || 1;
        document.getElementById('gameover-message').textContent = message || '';

        // Set title based on score
        const titles = ['כל הכבוד!', 'מצוין!', 'נהדר!', 'יפה מאוד!', 'עבודה נהדרת!'];
        document.getElementById('gameover-title').textContent = titles[Math.floor(Math.random() * titles.length)];

        this.showScreen('screen-gameover');
    },

    // ==========================================
    // Scores Screen
    // ==========================================

    showScores() {
        const content = document.getElementById('scores-content');
        const allScores = Scoring.getAll();

        let html = '';
        let hasScores = false;

        for (const [gameId, info] of Object.entries(this.gameNames)) {
            const scoreData = allScores[gameId];
            if (scoreData && scoreData.plays > 0) {
                hasScores = true;
                html += `
                    <div class="score-card fade-in">
                        <span class="game-icon">${info.icon}</span>
                        <div class="score-info">
                            <h3>${info.name}</h3>
                            <p>שוחק ${scoreData.plays} פעמים${scoreData.bestTime ? ' | זמן שיא: ' + Scoring.formatTime(scoreData.bestTime) : ''}</p>
                        </div>
                        <div class="score-best">
                            <span class="score-number">${scoreData.best}</span>
                            <span class="score-label">שיא</span>
                        </div>
                    </div>`;
            }
        }

        if (!hasScores) {
            html = '<div class="no-scores">עדיין אין ציונים. שחקו משחק כדי להתחיל!</div>';
        }

        content.innerHTML = html;
        this.showScreen('screen-scores');
    }
};

// Close modal on backdrop click
document.getElementById('modal-difficulty').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        app.closeDifficultyModal();
    }
});

// Keyboard support for memory cards
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('modal-difficulty');
        if (modal.style.display === 'flex') {
            app.closeDifficultyModal();
        }
    }
});
