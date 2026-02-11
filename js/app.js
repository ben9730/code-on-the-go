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
        'image-word':     ImageWordGame,
        'color-memory':   ColorMemoryGame,
        'reaction-speed': ReactionSpeedGame
    },

    gameNames: {
        'card-match':     { name: 'התאמת קלפים', icon: '🃏' },
        'simon':          { name: 'סדרת צבעים', icon: '🎨' },
        'word-quiz':      { name: 'חידון מילים', icon: '📝' },
        'spot-diff':      { name: 'מצאו את השונה', icon: '🔍' },
        'number-memory':  { name: 'זיכרון מספרים', icon: '🔢' },
        'image-word':     { name: 'תמונה ומילה', icon: '🖼️' },
        'color-memory':   { name: 'זיכרון צבעים', icon: '🎯' },
        'reaction-speed': { name: 'מהירות תגובה', icon: '⚡' }
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
        modal.setAttribute('aria-hidden', 'false');
        // Focus first difficulty button for accessibility
        setTimeout(() => {
            const firstBtn = modal.querySelector('.btn-difficulty');
            if (firstBtn) firstBtn.focus();
        }, 100);
        this.trapFocusInModal(modal);
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
        const modal = document.getElementById('modal-difficulty');
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        this.removeFocusTrap();
    },

    restartGame() {
        if (this.currentGameId) {
            this.startGame(this.currentGameId);
        }
    },

    // ==========================================
    // Focus Trap for Modals (Accessibility)
    // ==========================================

    _focusTrapHandler: null,

    trapFocusInModal(modal) {
        this.removeFocusTrap();
        this._focusTrapHandler = (e) => {
            if (e.key !== 'Tab') return;
            const focusable = modal.querySelectorAll('button:not([disabled]), [tabindex]:not([tabindex="-1"])');
            if (focusable.length === 0) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };
        document.addEventListener('keydown', this._focusTrapHandler);
    },

    removeFocusTrap() {
        if (this._focusTrapHandler) {
            document.removeEventListener('keydown', this._focusTrapHandler);
            this._focusTrapHandler = null;
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
                        <span class="game-icon" aria-hidden="true">${info.icon}</span>
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

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('modal-difficulty');
        if (modal.style.display === 'flex') {
            app.closeDifficultyModal();
        }
    }
});

// ==========================================
// PWA: Service Worker Registration
// ==========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(() => {});
    });
}

// PWA Install Prompt
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const installBtn = document.getElementById('install-btn');
    if (installBtn) installBtn.style.display = 'inline-flex';
});

function installApp() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => {
        deferredPrompt = null;
        const installBtn = document.getElementById('install-btn');
        if (installBtn) installBtn.style.display = 'none';
    });
}
