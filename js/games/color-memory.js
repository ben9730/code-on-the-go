/* ==========================================
   Game 7: Color Memory (זיכרון צבעים)
   Remember the sequence of colors shown
   ========================================== */

const ColorMemoryGame = {
    name: 'זיכרון צבעים',
    icon: '🎯',

    allColors: [
        { name: 'אדום', hex: '#E53935', light: '#FFCDD2' },
        { name: 'כחול', hex: '#1E88E5', light: '#BBDEFB' },
        { name: 'ירוק', hex: '#43A047', light: '#C8E6C9' },
        { name: 'צהוב', hex: '#FDD835', light: '#FFF9C4' },
        { name: 'סגול', hex: '#8E24AA', light: '#E1BEE7' },
        { name: 'כתום', hex: '#FB8C00', light: '#FFE0B2' },
        { name: 'ורוד', hex: '#EC407A', light: '#F8BBD0' },
        { name: 'תכלת', hex: '#00ACC1', light: '#B2EBF2' },
    ],

    config: {
        easy:   { colorsCount: 4, startLen: 2, showTime: 1200 },
        medium: { colorsCount: 6, startLen: 3, showTime: 1000 },
        hard:   { colorsCount: 8, startLen: 4, showTime: 800 }
    },

    state: null,
    _timeouts: [],

    init(difficulty) {
        const cfg = this.config[difficulty];
        const colors = this.shuffleArray([...this.allColors]).slice(0, cfg.colorsCount);

        this.state = {
            difficulty,
            colors,
            sequence: [],
            playerSequence: [],
            level: 0,
            score: 0,
            startLen: cfg.startLen,
            showTime: cfg.showTime,
            phase: 'ready'
        };
        this._timeouts = [];

        this.render();
        this._addTimeout(() => this.nextLevel(), 800);
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
        instructions.textContent = 'זכרו את סדר הצבעים שיופיעו ולחצו עליהם באותו סדר';

        area.innerHTML = `
            <div class="color-memory-container" id="color-memory-container">
                <div class="color-level" id="color-level">רמה 1</div>
                <div class="color-display" id="color-display"></div>
                <div class="color-buttons" id="color-buttons"></div>
                <div class="game-message" id="color-msg" aria-live="polite">מתכוננים...</div>
            </div>
        `;
        document.getElementById('game-controls').innerHTML = '';
    },

    nextLevel() {
        if (!this.state) return;
        this.state.level++;
        this.state.playerSequence = [];
        this.state.phase = 'showing';

        document.getElementById('color-level').textContent = `רמה ${this.state.level}`;

        const toAdd = this.state.level === 1 ? this.state.startLen : 1;
        for (let i = 0; i < toAdd; i++) {
            const random = this.state.colors[Math.floor(Math.random() * this.state.colors.length)];
            this.state.sequence.push(random);
        }

        this.showSequence();
    },

    async showSequence() {
        if (!this.state) return;
        const display = document.getElementById('color-display');
        const msg = document.getElementById('color-msg');
        const buttonsEl = document.getElementById('color-buttons');

        if (msg) msg.textContent = 'צפו בסדר הצבעים...';
        if (buttonsEl) buttonsEl.innerHTML = '';

        await this.sleep(400);

        for (let i = 0; i < this.state.sequence.length; i++) {
            if (!this.state) return;
            const color = this.state.sequence[i];

            if (display) {
                display.style.background = color.hex;
                display.style.boxShadow = `0 0 30px ${color.hex}`;
                display.textContent = '';
            }

            await this.sleep(this.state.showTime);

            if (display) {
                display.style.background = 'var(--bg-card)';
                display.style.boxShadow = 'var(--shadow)';
            }

            await this.sleep(300);
        }

        if (!this.state) return;
        this.state.phase = 'input';
        if (display) {
            display.style.background = 'var(--bg-card)';
            display.style.boxShadow = 'var(--shadow)';
            display.textContent = '?';
        }
        if (msg) msg.textContent = `בחרו ${this.state.sequence.length} צבעים בסדר הנכון`;
        this.showButtons();
    },

    showButtons() {
        if (!this.state) return;
        const buttonsEl = document.getElementById('color-buttons');
        if (!buttonsEl) return;

        buttonsEl.innerHTML = this.state.colors.map((c, i) => `
            <button class="color-btn" style="background: ${c.hex};"
                onclick="ColorMemoryGame.playerSelect(${i})"
                aria-label="${c.name}">
            </button>
        `).join('');
    },

    playerSelect(colorIndex) {
        if (!this.state || this.state.phase !== 'input') return;

        const color = this.state.colors[colorIndex];
        const expected = this.state.sequence[this.state.playerSequence.length];
        const display = document.getElementById('color-display');

        if (color === expected) {
            this.state.playerSequence.push(color);
            this.state.score += 5;
            app.updateScore(this.state.score);

            if (display) {
                display.style.background = color.hex;
                display.style.boxShadow = `0 0 20px ${color.hex}`;
            }

            if (this.state.playerSequence.length === this.state.sequence.length) {
                this.state.phase = 'success';
                this.state.score += 15;
                app.updateScore(this.state.score);
                const msg = document.getElementById('color-msg');
                if (msg) msg.textContent = 'מצוין! ממשיכים...';

                this._addTimeout(() => {
                    if (display) {
                        display.style.background = 'var(--bg-card)';
                        display.style.boxShadow = 'var(--shadow)';
                        display.textContent = '';
                    }
                    this.nextLevel();
                }, 1000);
            } else {
                this._addTimeout(() => {
                    if (display) {
                        display.style.background = 'var(--bg-card)';
                        display.style.boxShadow = 'var(--shadow)';
                    }
                }, 300);
            }
        } else {
            this.state.phase = 'failed';
            if (display) {
                display.style.background = 'var(--error)';
                display.style.boxShadow = '0 0 30px var(--error)';
            }
            const msg = document.getElementById('color-msg');
            if (msg) msg.textContent = 'טעות! המשחק נגמר';

            this._addTimeout(() => this.finish(), 1500);
        }
    },

    finish() {
        if (!this.state) return;
        const { score, level } = this.state;

        let message;
        if (level >= 8) message = 'זיכרון צבעים מדהים!';
        else if (level >= 5) message = 'כל הכבוד! זיכרון חזק!';
        else if (level >= 3) message = 'התחלה טובה! נסו שוב';
        else message = 'תרגול ישפר את הזיכרון!';

        app.endGame({
            score,
            level: level - 1,
            message: `הגעתם לרמה ${level - 1} עם סדרה של ${this.state.sequence.length - 1} צבעים! ${message}`
        });
    },

    sleep(ms) {
        return new Promise(resolve => this._addTimeout(resolve, ms));
    },

    shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    },

    destroy() {
        this._clearTimeouts();
        this.state = null;
    }
};
