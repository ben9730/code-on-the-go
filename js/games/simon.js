/* ==========================================
   Game 2: Simon Says (סדרת צבעים)
   ========================================== */

const SimonGame = {
    name: 'סדרת צבעים',
    icon: '🎨',

    colors: ['red', 'blue', 'green', 'yellow'],
    colorNames: { red: 'אדום', blue: 'כחול', green: 'ירוק', yellow: 'צהוב' },

    config: {
        easy:   { startLen: 2, speed: 800 },
        medium: { startLen: 3, speed: 600 },
        hard:   { startLen: 4, speed: 450 }
    },

    state: null,

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

        this.render();
        setTimeout(() => this.nextLevel(), 800);
    },

    render() {
        const area = document.getElementById('game-area');
        const instructions = document.getElementById('game-instructions');

        instructions.textContent = 'צפו בסדר הצבעים ולחצו באותו סדר';

        area.innerHTML = `
            <div class="simon-level">רמה: <span id="simon-level-num">1</span></div>
            <div class="simon-board">
                ${this.colors.map(c => `
                    <button class="simon-btn ${c}" data-color="${c}"
                        onclick="SimonGame.playerPress('${c}')"
                        aria-label="${this.colorNames[c]}"></button>
                `).join('')}
            </div>
            <div class="simon-message" id="simon-msg">מתכוננים...</div>
        `;

        document.getElementById('game-controls').innerHTML = '';
    },

    nextLevel() {
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
        this.state.isShowingSequence = true;
        const msg = document.getElementById('simon-msg');
        msg.textContent = 'צפו בסדרה...';

        // Disable buttons during sequence
        this.setButtonsEnabled(false);

        await this.sleep(500);

        for (let i = 0; i < this.state.sequence.length; i++) {
            const color = this.state.sequence[i];
            await this.lightUp(color);
            await this.sleep(200);
        }

        this.state.isShowingSequence = false;
        this.state.isPlaying = true;
        this.setButtonsEnabled(true);
        msg.textContent = 'תורכם! לחצו על הצבעים';
    },

    async lightUp(color) {
        const btn = document.querySelector(`.simon-btn.${color}`);
        btn.classList.add('lit');
        await this.sleep(this.state.speed);
        btn.classList.remove('lit');
    },

    playerPress(color) {
        if (!this.state.isPlaying || this.state.isShowingSequence) return;

        const { playerSequence, sequence } = this.state;
        const index = playerSequence.length;

        // Light up briefly
        const btn = document.querySelector(`.simon-btn.${color}`);
        btn.classList.add('lit');
        setTimeout(() => btn.classList.remove('lit'), 200);

        if (color !== sequence[index]) {
            // Wrong!
            this.gameOver();
            return;
        }

        playerSequence.push(color);
        this.state.score += 5;
        app.updateScore(this.state.score);

        if (playerSequence.length === sequence.length) {
            // Level complete
            this.state.isPlaying = false;
            const msg = document.getElementById('simon-msg');
            msg.textContent = 'מצוין! ממשיכים...';
            this.state.score += 10;
            app.updateScore(this.state.score);
            setTimeout(() => this.nextLevel(), 1000);
        }
    },

    gameOver() {
        this.state.isPlaying = false;
        const msg = document.getElementById('simon-msg');
        msg.textContent = 'טעות! המשחק נגמר';

        // Flash all buttons red briefly
        this.colors.forEach(c => {
            const btn = document.querySelector(`.simon-btn.${c}`);
            btn.classList.add('lit');
            setTimeout(() => btn.classList.remove('lit'), 600);
        });

        setTimeout(() => {
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
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    destroy() {
        this.state = null;
    }
};
