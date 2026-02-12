/* ==========================================
   Memory Plus - Main Application Logic
   ==========================================
   Controls navigation, game lifecycle, timer,
   settings, daily challenge, pause, share
   ========================================== */

const app = {
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
    currentDifficulty: null,
    timerInterval: null,
    timerSeconds: 0,
    currentScore: 0,
    isPaused: false,

    // ==========================================
    // Init
    // ==========================================

    init() {
        Sound.init();
        Haptic.init();
        TextSize.init();
        HighContrast.init();
        BreakReminder.start();
        this.renderStreakBadge();
        this.renderDailyChallenge();

        if (Onboarding.needsOnboarding()) {
            Onboarding.show();
        }
        if (IOSGuide.shouldShow()) {
            setTimeout(() => IOSGuide.show(), 2000);
        }
    },

    // ==========================================
    // Navigation
    // ==========================================

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
    },

    goHome() {
        this.stopTimer();
        this.isPaused = false;
        if (this.currentGame && this.currentGame.destroy) {
            this.currentGame.destroy();
        }
        this.currentGame = null;
        this.currentGameId = null;
        this.showScreen('screen-menu');
        this.renderStreakBadge();
        this.renderDailyChallenge();
    },

    // ==========================================
    // Game Lifecycle
    // ==========================================

    startGame(gameId) {
        this.currentGameId = gameId;
        Sound.click();
        Haptic.tap();
        const modal = document.getElementById('modal-difficulty');
        const title = document.getElementById('difficulty-game-title');
        const info = this.gameNames[gameId];
        title.textContent = `${info.icon} ${info.name}`;
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
        setTimeout(() => {
            const firstBtn = modal.querySelector('.btn-difficulty');
            if (firstBtn) firstBtn.focus();
        }, 100);
        this.trapFocusInModal(modal);
    },

    selectDifficulty(difficulty) {
        Sound.click();
        Haptic.tap();
        this.closeDifficultyModal();

        const gameId = this.currentGameId;
        const game = this.games[gameId];
        const info = this.gameNames[gameId];

        if (!game) return;

        this.currentGame = game;
        this.currentScore = 0;
        this.currentDifficulty = difficulty;
        this.isPaused = false;

        document.getElementById('game-title').textContent = `${info.icon} ${info.name}`;
        document.getElementById('game-score').textContent = 'ניקוד: 0';
        document.getElementById('game-instructions').textContent = '';
        document.getElementById('game-area').innerHTML = '';
        document.getElementById('game-controls').innerHTML = '';

        const pauseBtn = document.getElementById('btn-pause');
        if (pauseBtn) {
            pauseBtn.textContent = '⏸ השהייה';
            pauseBtn.style.display = 'inline-flex';
        }

        this.showScreen('screen-game');
        this.startTimer();
        game.init(difficulty);
    },

    closeDifficultyModal() {
        const modal = document.getElementById('modal-difficulty');
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        this.removeFocusTrap();
    },

    restartGame() {
        Sound.click();
        Haptic.tap();
        if (this.currentGameId) {
            this.startGame(this.currentGameId);
        }
    },

    // ==========================================
    // Pause/Resume
    // ==========================================

    togglePause() {
        if (!this.currentGame) return;
        this.isPaused = !this.isPaused;
        const pauseBtn = document.getElementById('btn-pause');
        const overlay = document.getElementById('pause-overlay');

        if (this.isPaused) {
            this.stopTimer();
            if (pauseBtn) pauseBtn.textContent = '▶ המשך';
            if (overlay) overlay.style.display = 'flex';
            Sound.click();
        } else {
            this.resumeTimer();
            if (pauseBtn) pauseBtn.textContent = '⏸ השהייה';
            if (overlay) overlay.style.display = 'none';
            Sound.click();
        }
    },

    // ==========================================
    // Focus Trap for Modals
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
                if (document.activeElement === first) { e.preventDefault(); last.focus(); }
            } else {
                if (document.activeElement === last) { e.preventDefault(); first.focus(); }
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

    resumeTimer() {
        if (this.timerInterval) return;
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
        if (el) el.textContent = `⏱ ${Scoring.formatTime(this.timerSeconds)}`;
    },

    // ==========================================
    // Score
    // ==========================================

    updateScore(score) {
        this.currentScore = score;
        const el = document.getElementById('game-score');
        if (el) el.textContent = `ניקוד: ${score}`;
    },

    // ==========================================
    // Game Over
    // ==========================================

    endGame({ score, message, level }) {
        this.stopTimer();

        const finalScore = score || this.currentScore;
        const prevBest = Scoring.getGame(this.currentGameId).best;
        const isNewRecord = finalScore > prevBest;

        Scoring.save(this.currentGameId, {
            score: finalScore,
            time: this.timerSeconds,
            level: level || 1
        });

        Streaks.recordPlay();

        // Celebration
        if (isNewRecord && finalScore > 0) {
            Confetti.launch();
            Sound.celebrate();
            Haptic.success();
        } else {
            Sound.gameOver();
        }

        document.getElementById('gameover-score').textContent = finalScore;
        document.getElementById('gameover-time').textContent = Scoring.formatTime(this.timerSeconds);
        document.getElementById('gameover-level').textContent = level || 1;
        document.getElementById('gameover-message').textContent = message || '';

        const recordEl = document.getElementById('gameover-record');
        if (recordEl) recordEl.style.display = isNewRecord && finalScore > 0 ? 'block' : 'none';

        const titles = ['כל הכבוד!', 'מצוין!', 'נהדר!', 'יפה מאוד!', 'עבודה נהדרת!'];
        document.getElementById('gameover-title').textContent = titles[Math.floor(Math.random() * titles.length)];

        const pauseBtn = document.getElementById('btn-pause');
        if (pauseBtn) pauseBtn.style.display = 'none';

        // Mark daily if applicable
        const daily = DailyChallenge.getToday();
        if (this.currentGameId === daily.gameId && this.currentDifficulty === daily.difficulty) {
            DailyChallenge.markCompleted();
        }

        this.showScreen('screen-gameover');
    },

    // ==========================================
    // Share
    // ==========================================

    async shareResult() {
        Sound.click();
        const score = document.getElementById('gameover-score').textContent;
        const time = document.getElementById('gameover-time').textContent;
        const info = this.gameNames[this.currentGameId];
        const streakData = Streaks.get();

        let text = `🧠 זיכרון פלוס\n`;
        text += `${info.icon} ${info.name}\n`;
        text += `ניקוד: ${score} | זמן: ${time}\n`;
        if (streakData.currentStreak > 1) text += `🔥 רצף: ${streakData.currentStreak} ימים!\n`;

        const result = await ShareUtils.share(text);
        if (result === 'copied') {
            const btn = document.getElementById('btn-share');
            if (btn) {
                btn.textContent = '✓ הועתק!';
                setTimeout(() => btn.textContent = '📤 שיתוף', 2000);
            }
        }
    },

    // ==========================================
    // Daily Challenge
    // ==========================================

    renderDailyChallenge() {
        const container = document.getElementById('daily-challenge');
        if (!container) return;
        const daily = DailyChallenge.getToday();
        const completed = DailyChallenge.isCompletedToday();
        const info = this.gameNames[daily.gameId];
        const diffLabels = { easy: 'קל', medium: 'בינוני', hard: 'מאתגר' };

        container.innerHTML = `
            <div class="daily-header">
                <span>📅 אתגר יומי</span>
                ${completed ? '<span class="daily-done">✓ הושלם</span>' : ''}
            </div>
            <div class="daily-info">
                <span class="daily-game">${info.icon} ${info.name}</span>
                <span class="daily-diff">${diffLabels[daily.difficulty]}</span>
            </div>
            ${completed ? '' : `<button class="btn-primary btn-daily" onclick="app.playDaily()">שחקו עכשיו!</button>`}
        `;
    },

    playDaily() {
        const daily = DailyChallenge.getToday();
        this.currentGameId = daily.gameId;
        this.selectDifficulty(daily.difficulty);
    },

    // ==========================================
    // Streak Badge
    // ==========================================

    renderStreakBadge() {
        const el = document.getElementById('streak-badge');
        if (!el) return;
        const data = Streaks.get();
        if (data.currentStreak >= 2) {
            el.style.display = 'flex';
            el.innerHTML = `🔥 <strong>${data.currentStreak}</strong> ימים ברצף`;
        } else {
            el.style.display = 'none';
        }
    },

    // ==========================================
    // Scores Screen
    // ==========================================

    showScores() {
        Sound.click();
        const content = document.getElementById('scores-content');
        const allScores = Scoring.getAll();
        const streakData = Streaks.get();

        let html = '';

        // Streak summary
        if (streakData.totalDays) {
            html += `
                <div class="score-card streak-summary fade-in">
                    <span class="game-icon" aria-hidden="true">🔥</span>
                    <div class="score-info">
                        <h3>רצף משחקים</h3>
                        <p>רצף נוכחי: ${streakData.currentStreak || 0} ימים | שיא: ${streakData.bestStreak || 0} ימים</p>
                    </div>
                    <div class="score-best">
                        <span class="score-number">${streakData.totalDays}</span>
                        <span class="score-label">ימים</span>
                    </div>
                </div>`;
        }

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

        if (!hasScores && !streakData.totalDays) {
            html = '<div class="no-scores">עדיין אין ציונים. שחקו משחק כדי להתחיל!</div>';
        }

        content.innerHTML = html;
        this.showScreen('screen-scores');
    },

    // ==========================================
    // Settings Modal
    // ==========================================

    openSettings() {
        Sound.click();
        const modal = document.getElementById('modal-settings');
        if (modal) {
            modal.style.display = 'flex';
            this.renderSettingsState();
        }
    },

    closeSettings() {
        const modal = document.getElementById('modal-settings');
        if (modal) modal.style.display = 'none';
    },

    toggleSound() {
        const v = !Sound.isEnabled();
        Sound.setEnabled(v);
        if (v) Sound.tap();
        this.renderSettingsState();
    },

    toggleHaptic() {
        const v = !Haptic.isEnabled();
        Haptic.setEnabled(v);
        if (v) Haptic.tap();
        this.renderSettingsState();
    },

    cycleTextSize() {
        const size = TextSize.cycle();
        Sound.click();
        this.renderSettingsState();
    },

    toggleHighContrast() {
        HighContrast.toggle();
        Sound.click();
        this.renderSettingsState();
    },

    renderSettingsState() {
        const soundBtn = document.getElementById('setting-sound');
        const hapticBtn = document.getElementById('setting-haptic');
        const textBtn = document.getElementById('setting-text');
        const contrastBtn = document.getElementById('setting-contrast');

        if (soundBtn) soundBtn.textContent = Sound.isEnabled() ? '🔊 צלילים: פעיל' : '🔇 צלילים: כבוי';
        if (hapticBtn) hapticBtn.textContent = Haptic.isEnabled() ? '📳 רטט: פעיל' : '📴 רטט: כבוי';
        if (textBtn) textBtn.textContent = `🔤 טקסט: ${TextSize.labels[TextSize.getCurrent()]}`;
        if (contrastBtn) contrastBtn.textContent = HighContrast.isOn() ? '◑ ניגודיות: גבוהה' : '◐ ניגודיות: רגילה';
    }
};

// ==========================================
// Event Listeners
// ==========================================

// Modal backdrop close
document.getElementById('modal-difficulty').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) app.closeDifficultyModal();
});

// Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('modal-difficulty');
        if (modal.style.display === 'flex') app.closeDifficultyModal();
        const settings = document.getElementById('modal-settings');
        if (settings && settings.style.display === 'flex') app.closeSettings();
    }
});

// Unlock audio context on first interaction
document.addEventListener('click', () => Sound._resumeCtx(), { once: true });

// ==========================================
// PWA
// ==========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').then(reg => {
            // Check for updates every 60s
            setInterval(() => reg.update(), 60000);
            reg.addEventListener('updatefound', () => {
                const newWorker = reg.installing;
                if (newWorker) {
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            const banner = document.getElementById('update-banner');
                            if (banner) banner.style.display = 'flex';
                        }
                    });
                }
            });
        }).catch(() => {});
    });
}

function applyUpdate() {
    if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
    }
    window.location.reload();
}

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

// Init app on load
document.addEventListener('DOMContentLoaded', () => app.init());
