/* ==========================================
   Game 4: Spot the Different (מצאו את השונה)
   ========================================== */

const SpotDiffGame = {
    name: 'מצאו את השונה',
    icon: '🔍',

    emojiGroups: [
        { group: ['🍎', '🍏'], similar: true },
        { group: ['🐶', '🐕'], similar: true },
        { group: ['🌹', '🌺'], similar: true },
        { group: ['⭐', '🌟'], similar: true },
        { group: ['🏠', '🏡'], similar: true },
        { group: ['😊', '😄'], similar: true },
        { group: ['🚗', '🚙'], similar: true },
        { group: ['🌻', '🌼'], similar: true },
        { group: ['🐱', '🐈'], similar: true },
        { group: ['📘', '📗'], similar: true },
        { group: ['🎵', '🎶'], similar: true },
        { group: ['🍊', '🍋'], similar: true },
        { group: ['🦋', '🐛'], similar: true },
        { group: ['🌙', '🌛'], similar: true },
        { group: ['🐟', '🐠'], similar: true },
        { group: ['🍕', '🍔'], similar: true },
        { group: ['✏️', '🖊️'], similar: true },
        { group: ['🎩', '🧢'], similar: true },
        { group: ['🥾', '👟'], similar: true },
        { group: ['🍰', '🧁'], similar: true },
    ],

    config: {
        easy:   { gridSize: 6,  rounds: 6  },
        medium: { gridSize: 9,  rounds: 8  },
        hard:   { gridSize: 12, rounds: 10 }
    },

    state: null,
    _timeouts: [],

    init(difficulty) {
        const cfg = this.config[difficulty];
        this.state = {
            difficulty,
            gridSize: cfg.gridSize,
            totalRounds: cfg.rounds,
            currentRound: 0,
            score: 0,
            correct: 0
        };
        this._timeouts = [];

        this.render();
        this.nextRound();
    },

    _addTimeout(fn, ms) {
        const id = setTimeout(fn, ms);
        this._timeouts.push(id);
        return id;
    },

    _clearTimeouts() {
        this._timeouts.forEach(id => clearTimeout(id));
        this._timeouts = [];
    },

    render() {
        const area = document.getElementById('game-area');
        const instructions = document.getElementById('game-instructions');
        instructions.textContent = 'מצאו את הפריט השונה מכל האחרים';

        area.innerHTML = '<div class="spot-diff-container" id="spot-diff-container"></div>';
        document.getElementById('game-controls').innerHTML = '';
    },

    nextRound() {
        if (!this.state) return;
        this.state.currentRound++;
        if (this.state.currentRound > this.state.totalRounds) {
            this.finish();
            return;
        }

        const { gridSize } = this.state;
        const pair = this.emojiGroups[Math.floor(Math.random() * this.emojiGroups.length)];
        const mainEmoji = pair.group[0];
        const diffEmoji = pair.group[1];

        const diffIndex = Math.floor(Math.random() * gridSize);

        const container = document.getElementById('spot-diff-container');
        if (!container) return;
        const colClass = gridSize <= 6 ? '' : gridSize <= 9 ? '' : 'size-4';
        const cols = gridSize <= 6 ? 3 : gridSize <= 9 ? 3 : 4;

        let html = `
            <div class="spot-diff-question fade-in">מצאו את הפריט השונה!</div>
            <div class="spot-diff-grid ${colClass}" style="grid-template-columns: repeat(${cols}, 1fr);">
        `;

        for (let i = 0; i < gridSize; i++) {
            const emoji = i === diffIndex ? diffEmoji : mainEmoji;
            const isDiff = i === diffIndex;
            html += `
                <button class="spot-diff-item fade-in" data-diff="${isDiff}"
                    onclick="SpotDiffGame.selectItem(this, ${isDiff})"
                    aria-label="פריט ${i + 1}"
                    style="animation-delay: ${i * 0.05}s">
                    ${emoji}
                </button>`;
        }

        html += `</div>
            <div class="spot-diff-round">סיבוב ${this.state.currentRound} מתוך ${this.state.totalRounds}</div>
        `;

        container.innerHTML = html;
    },

    selectItem(el, isDiff) {
        if (!this.state) return;

        document.querySelectorAll('.spot-diff-item').forEach(item => {
            item.disabled = true;
            item.style.cursor = 'default';
        });

        if (isDiff) {
            Sound.correct(); Haptic.correct();
            el.classList.add('correct');
            this.state.score += 10;
            this.state.correct++;
            app.updateScore(this.state.score);
        } else {
            Sound.wrong(); Haptic.wrong();
            el.classList.add('wrong');
            const correctEl = document.querySelector('.spot-diff-item[data-diff="true"]');
            if (correctEl) correctEl.classList.add('correct');
        }

        this._addTimeout(() => this.nextRound(), 1000);
    },

    finish() {
        if (!this.state) return;
        const { score, correct, totalRounds } = this.state;
        const percentage = Math.round((correct / totalRounds) * 100);

        let message;
        if (percentage >= 90) message = 'עיניים חדות! מרשים מאוד!';
        else if (percentage >= 70) message = 'כל הכבוד! תצפית טובה!';
        else if (percentage >= 50) message = 'לא רע! שימו לב לפרטים הקטנים';
        else message = 'נסו שוב - התרגול ישפר את התצפית!';

        app.endGame({
            score,
            level: this.state.difficulty === 'easy' ? 1 : this.state.difficulty === 'medium' ? 2 : 3,
            message: `${correct} מתוך ${totalRounds} נכונים (${percentage}%). ${message}`
        });
    },

    destroy() {
        this._clearTimeouts();
        this.state = null;
    }
};
