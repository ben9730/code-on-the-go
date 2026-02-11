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

    init(difficulty) {
        const cfg = this.config[difficulty];
        this.state = {
            difficulty,
            digits: cfg.startDigits,
            showTime: cfg.showTime,
            currentNumber: '',
            level: 0,
            score: 0,
            phase: 'ready' // ready, showing, input, feedback
        };

        this.render();
        setTimeout(() => this.nextLevel(), 600);
    },

    render() {
        const area = document.getElementById('game-area');
        const instructions = document.getElementById('game-instructions');
        instructions.textContent = 'זכרו את המספר שיופיע על המסך והקלידו אותו';

        area.innerHTML = '<div class="number-memory-container" id="number-container"></div>';
        document.getElementById('game-controls').innerHTML = '';
    },

    nextLevel() {
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
        // Ensure first digit is not 0
        if (num[0] === '0') num = (Math.floor(Math.random() * 9) + 1) + num.slice(1);
        return num;
    },

    showNumber() {
        const container = document.getElementById('number-container');
        container.innerHTML = `
            <div class="number-level-info fade-in">רמה ${this.state.level} - ${this.state.digits} ספרות</div>
            <div class="number-display fade-in">${this.state.currentNumber}</div>
            <div class="game-message">זכרו את המספר!</div>
        `;

        // Progress bar effect
        setTimeout(() => {
            this.state.phase = 'input';
            this.showInput();
        }, this.state.showTime);
    },

    showInput() {
        const container = document.getElementById('number-container');
        container.innerHTML = `
            <div class="number-level-info">רמה ${this.state.level} - ${this.state.digits} ספרות</div>
            <div class="number-display fade-in">?</div>
            <div class="number-input-area">
                <input type="number" class="number-input" id="number-input"
                    placeholder="הקלידו את המספר"
                    autocomplete="off"
                    onkeydown="if(event.key==='Enter') NumberMemoryGame.checkAnswer()">
            </div>
            <button class="btn-primary" onclick="NumberMemoryGame.checkAnswer()">בדקו ✓</button>
        `;

        document.getElementById('number-input').focus();
    },

    checkAnswer() {
        const input = document.getElementById('number-input');
        const answer = input.value.trim();

        if (!answer) return;

        const container = document.getElementById('number-container');

        if (answer === this.state.currentNumber) {
            // Correct!
            this.state.score += this.state.digits * 5;
            app.updateScore(this.state.score);

            container.innerHTML = `
                <div class="number-level-info">רמה ${this.state.level}</div>
                <div class="number-display fade-in" style="color: var(--success);">${this.state.currentNumber}</div>
                <div class="game-message success fade-in">נכון! מעולה!</div>
            `;

            // Increase difficulty
            this.state.digits++;
            // Slightly reduce show time (but not below 1 second)
            this.state.showTime = Math.max(1000, this.state.showTime - 150);

            setTimeout(() => this.nextLevel(), 1200);
        } else {
            // Wrong
            container.innerHTML = `
                <div class="number-level-info">רמה ${this.state.level}</div>
                <div class="number-display fade-in" style="color: var(--error);">${this.state.currentNumber}</div>
                <div class="game-message error fade-in">
                    הקלדתם: ${answer}<br>
                    המספר הנכון: ${this.state.currentNumber}
                </div>
            `;

            setTimeout(() => this.finish(), 2000);
        }
    },

    finish() {
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
        this.state = null;
    }
};
