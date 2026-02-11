/* ==========================================
   Game 5: Number Memory (זיכרון מספרים)
   ========================================== */

const NumberMemoryGame = {
    name: 'זיכרון מספרים',
    icon: '🔢',

    config: {
        easy:   { startDigits: 3, showTime: 3000 },
        medium: { startDigits: 4, showTime: 2500 },
        hard:   { startDigits: 5, showTime: 2000 }
    },

    state: null,
    _timeouts: [],

    init(difficulty) {
        const cfg = this.config[difficulty];
        this.state = {
            difficulty,
            digits: cfg.startDigits,
            showTime: cfg.showTime,
            currentNumber: '',
            level: 0,
            score: 0,
            phase: 'ready'
        };
        this._timeouts = [];

        this.render();
        this._addTimeout(() => this.nextLevel(), 600);
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
        instructions.textContent = 'זכרו את המספר שיופיע על המסך והקלידו אותו';

        area.innerHTML = '<div class="number-memory-container" id="number-container"></div>';
        document.getElementById('game-controls').innerHTML = '';
    },

    nextLevel() {
        if (!this.state) return;
        this.state.level++;
        this.state.currentNumber = this.generateNumber(this.state.digits);
        this.state.phase = 'showing';

        this.showNumber();
    },

    generateNumber(digits) {
        let num = '';
        for (let i = 0; i < digits; i++) {
            num += Math.floor(Math.random() * 10);
        }
        if (num[0] === '0') num = (Math.floor(Math.random() * 9) + 1) + num.slice(1);
        return num;
    },

    showNumber() {
        if (!this.state) return;
        const container = document.getElementById('number-container');
        if (!container) return;

        container.innerHTML = `
            <div class="number-level-info fade-in">רמה ${this.state.level} - ${this.state.digits} ספרות</div>
            <div class="number-display fade-in" aria-live="polite">${this.state.currentNumber}</div>
            <div class="game-message">זכרו את המספר!</div>
        `;

        this._addTimeout(() => {
            if (!this.state) return;
            this.state.phase = 'input';
            this.showInput();
        }, this.state.showTime);
    },

    showInput() {
        if (!this.state) return;
        const container = document.getElementById('number-container');
        if (!container) return;

        container.innerHTML = `
            <div class="number-level-info">רמה ${this.state.level} - ${this.state.digits} ספרות</div>
            <div class="number-display fade-in">?</div>
            <div class="number-input-area">
                <label for="number-input" class="sr-only">הקלידו את המספר</label>
                <input type="text" inputmode="numeric" pattern="[0-9]*" class="number-input" id="number-input"
                    placeholder="הקלידו את המספר"
                    autocomplete="off"
                    maxlength="20"
                    onkeydown="if(event.key==='Enter') NumberMemoryGame.checkAnswer()">
            </div>
            <button class="btn-primary" onclick="NumberMemoryGame.checkAnswer()">בדקו ✓</button>
        `;

        document.getElementById('number-input').focus();
    },

    checkAnswer() {
        if (!this.state) return;
        const input = document.getElementById('number-input');
        if (!input) return;

        // Sanitize: only allow digits
        const answer = input.value.replace(/[^0-9]/g, '').trim();

        if (!answer) return;

        const container = document.getElementById('number-container');
        if (!container) return;

        if (answer === this.state.currentNumber) {
            this.state.score += this.state.digits * 5;
            app.updateScore(this.state.score);

            container.innerHTML = `
                <div class="number-level-info">רמה ${this.state.level}</div>
                <div class="number-display fade-in" style="color: var(--success);">${this.state.currentNumber}</div>
                <div class="game-message success fade-in">נכון! מעולה!</div>
            `;

            this.state.digits++;
            this.state.showTime = Math.max(1000, this.state.showTime - 150);

            this._addTimeout(() => this.nextLevel(), 1200);
        } else {
            container.innerHTML = `
                <div class="number-level-info">רמה ${this.state.level}</div>
                <div class="number-display fade-in" style="color: var(--error);">${this.state.currentNumber}</div>
                <div class="game-message error fade-in">
                    הקלדתם: ${answer}<br>
                    המספר הנכון: ${this.state.currentNumber}
                </div>
            `;

            this._addTimeout(() => this.finish(), 2000);
        }
    },

    finish() {
        if (!this.state) return;
        const { score, level, digits } = this.state;

        let message;
        if (level >= 8) message = 'זיכרון מדהים! אלוף המספרים!';
        else if (level >= 5) message = 'כל הכבוד! זיכרון חזק!';
        else if (level >= 3) message = 'התחלה טובה! תרגול ישפר';
        else message = 'נסו שוב - כל תרגול מחזק!';

        app.endGame({
            score,
            level: level - 1,
            message: `הגעתם לרמה ${level - 1} עם ${digits - 1} ספרות! ${message}`
        });
    },

    destroy() {
        this._clearTimeouts();
        this.state = null;
    }
};
