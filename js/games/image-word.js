/* ==========================================
   Game 6: Image-Word Pairs (תמונה ומילה)
   ========================================== */

const ImageWordGame = {
    name: 'תמונה ומילה',
    icon: '🖼️',

    pairs: [
        { image: '🍎', word: 'תפוח' },
        { image: '🐶', word: 'כלב' },
        { image: '🌹', word: 'ורד' },
        { image: '☀️', word: 'שמש' },
        { image: '🏠', word: 'בית' },
        { image: '⭐', word: 'כוכב' },
        { image: '🐱', word: 'חתול' },
        { image: '🌙', word: 'ירח' },
        { image: '🐟', word: 'דג' },
        { image: '🌻', word: 'חמנייה' },
        { image: '🚗', word: 'מכונית' },
        { image: '📚', word: 'ספרים' },
        { image: '🎵', word: 'מוזיקה' },
        { image: '✈️', word: 'מטוס' },
        { image: '🍞', word: 'לחם' },
        { image: '⏰', word: 'שעון' },
        { image: '🔑', word: 'מפתח' },
        { image: '🌈', word: 'קשת' },
        { image: '🎂', word: 'עוגה' },
        { image: '🐘', word: 'פיל' },
        { image: '🍋', word: 'לימון' },
        { image: '🦋', word: 'פרפר' },
        { image: '🐸', word: 'צפרדע' },
        { image: '🍇', word: 'ענבים' },
    ],

    config: {
        easy:   { pairsPerRound: 3, rounds: 4 },
        medium: { pairsPerRound: 4, rounds: 5 },
        hard:   { pairsPerRound: 5, rounds: 6 }
    },

    state: null,
    _timeouts: [],

    init(difficulty) {
        const cfg = this.config[difficulty];
        this.state = {
            difficulty,
            pairsPerRound: cfg.pairsPerRound,
            totalRounds: cfg.rounds,
            currentRound: 0,
            score: 0,
            correct: 0,
            selected: null,
            currentPairs: [],
            matchedPairs: []
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
        instructions.textContent = 'התאימו כל תמונה למילה המתאימה לה';

        area.innerHTML = '<div class="image-word-container" id="iw-container"></div>';
        document.getElementById('game-controls').innerHTML = '';
    },

    nextRound() {
        if (!this.state) return;
        this.state.currentRound++;
        if (this.state.currentRound > this.state.totalRounds) {
            this.finish();
            return;
        }

        this.state.selected = null;
        this.state.matchedPairs = [];

        const shuffled = this.shuffleArray([...this.pairs]);
        this.state.currentPairs = shuffled.slice(0, this.state.pairsPerRound);

        this.renderRound();
    },

    renderRound() {
        if (!this.state) return;
        const { currentPairs, matchedPairs, currentRound, totalRounds } = this.state;
        const container = document.getElementById('iw-container');
        if (!container) return;

        const images = this.shuffleArray(currentPairs.map((p, i) => ({ ...p, pairIndex: i, type: 'image' })));
        const words = this.shuffleArray(currentPairs.map((p, i) => ({ ...p, pairIndex: i, type: 'word' })));

        let html = `<div class="image-word-pairs">`;

        html += '<div style="display:flex;flex-direction:column;gap:12px;">';
        images.forEach((item, i) => {
            const matched = matchedPairs.includes(item.pairIndex);
            html += `
                <button class="iw-item ${matched ? 'matched' : ''}"
                    data-type="image" data-pair="${item.pairIndex}" data-idx="${i}"
                    onclick="ImageWordGame.select(this, 'image', ${item.pairIndex})"
                    aria-label="תמונה: ${item.word}"
                    ${matched ? 'disabled' : ''}>
                    ${item.image}
                </button>`;
        });
        html += '</div>';

        html += '<div style="display:flex;flex-direction:column;gap:12px;">';
        words.forEach((item, i) => {
            const matched = matchedPairs.includes(item.pairIndex);
            html += `
                <button class="iw-item word ${matched ? 'matched' : ''}"
                    data-type="word" data-pair="${item.pairIndex}" data-idx="${i}"
                    onclick="ImageWordGame.select(this, 'word', ${item.pairIndex})"
                    ${matched ? 'disabled' : ''}>
                    ${item.word}
                </button>`;
        });
        html += '</div></div>';

        html += `<div class="image-word-round">סיבוב ${currentRound} מתוך ${totalRounds}</div>`;

        container.innerHTML = html;
    },

    select(el, type, pairIndex) {
        if (!this.state || this.state.matchedPairs.includes(pairIndex)) return;

        const { selected } = this.state;

        if (!selected) {
            Sound.tap(); Haptic.tap();
            this.state.selected = { type, pairIndex, el };
            el.classList.add('selected');
            return;
        }

        if (selected.type === type) {
            selected.el.classList.remove('selected');
            this.state.selected = { type, pairIndex, el };
            el.classList.add('selected');
            return;
        }

        if (selected.pairIndex === pairIndex) {
            Sound.correct(); Haptic.correct();
            this.state.matchedPairs.push(pairIndex);
            this.state.score += 10;
            this.state.correct++;
            app.updateScore(this.state.score);

            selected.el.classList.remove('selected');
            selected.el.classList.add('matched');
            el.classList.add('matched');
            selected.el.disabled = true;
            el.disabled = true;
            this.state.selected = null;

            if (this.state.matchedPairs.length === this.state.pairsPerRound) {
                this._addTimeout(() => this.nextRound(), 800);
            }
        } else {
            Sound.wrong(); Haptic.wrong();
            el.classList.add('wrong');
            selected.el.classList.add('wrong');
            const prevEl = selected.el;
            this.state.selected = null;

            this._addTimeout(() => {
                el.classList.remove('wrong');
                prevEl.classList.remove('wrong', 'selected');
            }, 600);
        }
    },

    finish() {
        if (!this.state) return;
        const { score, correct } = this.state;
        const total = this.state.totalRounds * this.state.pairsPerRound;
        const percentage = Math.round((correct / total) * 100);

        let message;
        if (percentage >= 90) message = 'התאמה מושלמת! מדהים!';
        else if (percentage >= 70) message = 'כל הכבוד! עבודה יפה!';
        else message = 'נסו שוב - תרגול ישפר!';

        app.endGame({
            score,
            level: this.state.difficulty === 'easy' ? 1 : this.state.difficulty === 'medium' ? 2 : 3,
            message: `${correct} מתוך ${total} התאמות! ${message}`
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
