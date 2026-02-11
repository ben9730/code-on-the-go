/* ==========================================
   Game 2: Simon Says (סדרת צבעים)
   ========================================== */

const SimonGame = {
    name: 'סדרת צבעים',
    icon: '🎨',

    colors: ['red', 'blue', 'green', 'yellow'],
    colorNames: { red: 'אדום', blue: 'כחול', green: 'ירוק', yellow: 'צהוב' },
    colorKeys: { '1': 'red', '2': 'blue', '3': 'green', '4': 'yellow' },

    config: {
        easy:   { startLen: 2, speed: 800 },
        medium: { startLen: 3, speed: 600 },
        hard:   { startLen: 4, speed: 450 }
    },

    state: null,
    _timeouts: [],
    _keyHandler: null,

    init(difficulty) {
        const cfg = this.config[difficulty];
        this.state = {
            difficulty,
            sequence: [],
            playerSequence: [],
            level: 0,
            score: 0,
            speed: cfg.speed,
            startLen: cfg.startLen,
            isPlaying: false,
            isShowingSequence: false
        };
        this._timeouts = [];

        this.render();
        this._addTimeout(() => this.nextLevel(), 800);
    },

    render() {
        const area = document.getElementById('game-area');
        const instructions = document.getElementById('game-instructions');

        instructions.textContent = 'צפו בסדר הצבעים ולחצו באותו סדר (מקשים 1-4)';

        area.innerHTML = `
            <div class="simon-level">רמה: <span id="simon-level-num">1</span></div>
            <div class="simon-board" role="group" aria-label="לוח צבעים">
                ${this.colors.map((c, i) => `
                    <button class="simon-btn ${c}" data-color="${c}"
                        onclick="SimonGame.playerPress('${c}')"
                        aria-label="${this.colorNames[c]} (מקש ${i + 1})"
                        tabindex="0"></button>
                `).join('')}
            </div>
            <div class="simon-message" id="simon-msg" aria-live="polite">מתכוננים...</div>
        `;

        document.getElementById('game-controls').innerHTML = '';

        // Keyboard support
        this._removeKeyHandler();
        this._keyHandler = (e) => {
            const color = this.colorKeys[e.key];
            if (color) this.playerPress(color);
        };
        document.addEventListener('keydown', this._keyHandler);
    },

    _removeKeyHandler() {
        if (this._keyHandler) {
            document.removeEventListener('keydown', this._keyHandler);
            this._keyHandler = null;
        }
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

    nextLevel() {
        if (!this.state) return;
        this.state.level++;
        this.state.playerSequence = [];
        document.getElementById('simon-level-num').textContent = this.state.level;

        // Add new colors to the sequence
        const toAdd = this.state.level === 1 ? this.state.startLen : 1;
        for (let i = 0; i < toAdd; i++) {
            const random = this.colors[Math.floor(Math.random() * this.colors.length)];
            this.state.sequence.push(random);
        }

        this.showSequence();
    },

    async showSequence() {
        if (!this.state) return;
        this.state.isShowingSequence = true;
        const msg = document.getElementById('simon-msg');
        if (msg) msg.textContent = 'צפו בסדרה...';

        this.setButtonsEnabled(false);

        await this.sleep(500);

        for (let i = 0; i < this.state.sequence.length; i++) {
            if (!this.state) return;
            const color = this.state.sequence[i];
            await this.lightUp(color);
            await this.sleep(200);
        }

        if (!this.state) return;
        this.state.isShowingSequence = false;
        this.state.isPlaying = true;
        this.setButtonsEnabled(true);
        if (msg) msg.textContent = 'תורכם! לחצו על הצבעים';
    },

    async lightUp(color) {
        const btn = document.querySelector(`.simon-btn.${color}`);
        if (!btn) return;
        btn.classList.add('lit');
        await this.sleep(this.state.speed);
        btn.classList.remove('lit');
    },

    playerPress(color) {
        if (!this.state || !this.state.isPlaying || this.state.isShowingSequence) return;

        const { playerSequence, sequence } = this.state;
        const index = playerSequence.length;

        // Light up briefly
        const btn = document.querySelector(`.simon-btn.${color}`);
        if (btn) {
            btn.classList.add('lit');
            this._addTimeout(() => btn.classList.remove('lit'), 200);
        }

        if (color !== sequence[index]) {
            this.gameOver();
            return;
        }

        playerSequence.push(color);
        this.state.score += 5;
        app.updateScore(this.state.score);

        if (playerSequence.length === sequence.length) {
            this.state.isPlaying = false;
            const msg = document.getElementById('simon-msg');
            if (msg) msg.textContent = 'מצוין! ממשיכים...';
            this.state.score += 10;
            app.updateScore(this.state.score);
            this._addTimeout(() => this.nextLevel(), 1000);
        }
    },

    gameOver() {
        if (!this.state) return;
        this.state.isPlaying = false;
        const msg = document.getElementById('simon-msg');
        if (msg) msg.textContent = 'טעות! המשחק נגמר';

        this.colors.forEach(c => {
            const btn = document.querySelector(`.simon-btn.${c}`);
            if (btn) {
                btn.classList.add('lit');
                this._addTimeout(() => btn.classList.remove('lit'), 600);
            }
        });

        this._addTimeout(() => {
            if (!this.state) return;
            app.endGame({
                score: this.state.score,
                level: this.state.level - 1,
                message: `הגעתם לרמה ${this.state.level - 1}! נסו שוב לשיפור`
            });
        }, 1200);
    },

    setButtonsEnabled(enabled) {
        document.querySelectorAll('.simon-btn').forEach(btn => {
            btn.disabled = !enabled;
            btn.style.cursor = enabled ? 'pointer' : 'default';
        });
    },

    sleep(ms) {
        return new Promise(resolve => this._addTimeout(resolve, ms));
    },

    destroy() {
        this._clearTimeouts();
        this._removeKeyHandler();
        this.state = null;
    }
};
