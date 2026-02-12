/* ==========================================
   Game 1: Card Matching (התאמת קלפים)
   ========================================== */

const CardMatchGame = {
    name: 'התאמת קלפים',
    icon: '🃏',

    emojis: ['🍎', '🍊', '🍋', '🍇', '🍉', '🍓', '🌻', '🌹', '🌺', '🦋',
             '🐶', '🐱', '🐸', '🐘', '🦁', '🐧', '🏠', '⭐', '🌙', '☀️'],

    config: {
        easy:   { pairs: 6,  cols: 3 },
        medium: { pairs: 8,  cols: 4 },
        hard:   { pairs: 10, cols: 4 }
    },

    state: null,
    _timeouts: [],

    init(difficulty) {
        const cfg = this.config[difficulty];
        const selected = this.shuffleArray([...this.emojis]).slice(0, cfg.pairs);
        const cards = this.shuffleArray([...selected, ...selected]);

        this.state = {
            difficulty,
            cards,
            flipped: [],
            matched: [],
            score: 0,
            moves: 0,
            cols: cfg.cols
        };
        this._timeouts = [];

        this.render();
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
        const { cards, cols, difficulty } = this.state;
        const area = document.getElementById('game-area');
        const instructions = document.getElementById('game-instructions');

        instructions.textContent = 'הפכו שני קלפים ומצאו את הזוגות התואמים';

        let html = `<div class="card-match-grid ${difficulty}">`;
        cards.forEach((emoji, i) => {
            html += `
                <div class="memory-card" data-index="${i}" onclick="CardMatchGame.flipCard(${i})" tabindex="0" role="button" aria-label="קלף ${i + 1}">
                    <div class="memory-card-inner">
                        <div class="memory-card-front" aria-hidden="true">❓</div>
                        <div class="memory-card-back">${emoji}</div>
                    </div>
                </div>`;
        });
        html += '</div>';
        area.innerHTML = html;

        document.getElementById('game-controls').innerHTML = '';
    },

    flipCard(index) {
        if (!this.state) return;
        const { flipped, matched, cards } = this.state;

        if (flipped.includes(index) || matched.includes(index) || flipped.length >= 2) return;

        flipped.push(index);
        Sound.tap(); Haptic.tap();
        const cardEl = document.querySelector(`.memory-card[data-index="${index}"]`);
        if (cardEl) cardEl.classList.add('flipped');

        if (flipped.length === 2) {
            this.state.moves++;
            this.checkMatch();
        }
    },

    checkMatch() {
        if (!this.state) return;
        const { flipped, matched, cards } = this.state;
        const [i1, i2] = flipped;

        if (cards[i1] === cards[i2]) {
            Sound.correct(); Haptic.correct();
            matched.push(i1, i2);
            this.state.score += 10;
            app.updateScore(this.state.score);

            this._addTimeout(() => {
                if (!this.state) return;
                const el1 = document.querySelector(`.memory-card[data-index="${i1}"]`);
                const el2 = document.querySelector(`.memory-card[data-index="${i2}"]`);
                if (el1) el1.classList.add('matched');
                if (el2) el2.classList.add('matched');
                this.state.flipped = [];

                if (matched.length === this.state.cards.length) {
                    this.finish();
                }
            }, 400);
        } else {
            Sound.wrong(); Haptic.wrong();
            if (this.state.score > 0) this.state.score -= 1;
            app.updateScore(this.state.score);

            this._addTimeout(() => {
                if (!this.state) return;
                const el1 = document.querySelector(`.memory-card[data-index="${i1}"]`);
                const el2 = document.querySelector(`.memory-card[data-index="${i2}"]`);
                if (el1) el1.classList.remove('flipped');
                if (el2) el2.classList.remove('flipped');
                this.state.flipped = [];
            }, 900);
        }
    },

    finish() {
        const bonus = Math.max(0, 50 - this.state.moves);
        this.state.score += bonus;

        app.endGame({
            score: this.state.score,
            message: `סיימתם ב-${this.state.moves} מהלכים! מצוין!`,
            level: this.state.difficulty === 'easy' ? 1 : this.state.difficulty === 'medium' ? 2 : 3
        });
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
