/* ==========================================
   Game 9: English Picture Words (אנגלית בתמונות)
   ========================================== */

const EnglishPictureGame = {
    name: 'אנגלית בתמונות',
    icon: '🇬🇧',

    // Word bank organized by difficulty
    words: {
        easy: [
            { image: '🐶', word: 'Dog', hebrew: 'כלב' },
            { image: '🐱', word: 'Cat', hebrew: 'חתול' },
            { image: '🐟', word: 'Fish', hebrew: 'דג' },
            { image: '🍎', word: 'Apple', hebrew: 'תפוח' },
            { image: '🌹', word: 'Rose', hebrew: 'ורד' },
            { image: '☀️', word: 'Sun', hebrew: 'שמש' },
            { image: '🌙', word: 'Moon', hebrew: 'ירח' },
            { image: '⭐', word: 'Star', hebrew: 'כוכב' },
            { image: '🏠', word: 'House', hebrew: 'בית' },
            { image: '🚗', word: 'Car', hebrew: 'מכונית' },
            { image: '📚', word: 'Book', hebrew: 'ספר' },
            { image: '🍞', word: 'Bread', hebrew: 'לחם' },
            { image: '🌊', word: 'Sea', hebrew: 'ים' },
            { image: '🌲', word: 'Tree', hebrew: 'עץ' },
            { image: '🐦', word: 'Bird', hebrew: 'ציפור' },
            { image: '🎂', word: 'Cake', hebrew: 'עוגה' },
            { image: '🔑', word: 'Key', hebrew: 'מפתח' },
            { image: '⏰', word: 'Clock', hebrew: 'שעון' },
        ],
        medium: [
            { image: '🦁', word: 'Lion', hebrew: 'אריה' },
            { image: '🐘', word: 'Elephant', hebrew: 'פיל' },
            { image: '🦋', word: 'Butterfly', hebrew: 'פרפר' },
            { image: '🌈', word: 'Rainbow', hebrew: 'קשת' },
            { image: '✈️', word: 'Airplane', hebrew: 'מטוס' },
            { image: '🎵', word: 'Music', hebrew: 'מוזיקה' },
            { image: '🍕', word: 'Pizza', hebrew: 'פיצה' },
            { image: '🧀', word: 'Cheese', hebrew: 'גבינה' },
            { image: '🌻', word: 'Sunflower', hebrew: 'חמנייה' },
            { image: '🎁', word: 'Gift', hebrew: 'מתנה' },
            { image: '🔔', word: 'Bell', hebrew: 'פעמון' },
            { image: '🎹', word: 'Piano', hebrew: 'פסנתר' },
            { image: '🐝', word: 'Bee', hebrew: 'דבורה' },
            { image: '🍫', word: 'Chocolate', hebrew: 'שוקולד' },
            { image: '🧤', word: 'Gloves', hebrew: 'כפפות' },
            { image: '📺', word: 'Television', hebrew: 'טלוויזיה' },
            { image: '🎈', word: 'Balloon', hebrew: 'בלון' },
            { image: '🐢', word: 'Turtle', hebrew: 'צב' },
        ],
        hard: [
            { image: '🦅', word: 'Eagle', hebrew: 'נשר' },
            { image: '🐙', word: 'Octopus', hebrew: 'תמנון' },
            { image: '🦉', word: 'Owl', hebrew: 'ינשוף' },
            { image: '🦊', word: 'Fox', hebrew: 'שועל' },
            { image: '🦒', word: 'Giraffe', hebrew: 'ג\'ירפה' },
            { image: '🏰', word: 'Castle', hebrew: 'טירה' },
            { image: '🌋', word: 'Volcano', hebrew: 'הר געש' },
            { image: '🎻', word: 'Violin', hebrew: 'כינור' },
            { image: '🔬', word: 'Microscope', hebrew: 'מיקרוסקופ' },
            { image: '🧲', word: 'Magnet', hebrew: 'מגנט' },
            { image: '💎', word: 'Diamond', hebrew: 'יהלום' },
            { image: '🏔️', word: 'Mountain', hebrew: 'הר' },
            { image: '🦈', word: 'Shark', hebrew: 'כריש' },
            { image: '🦜', word: 'Parrot', hebrew: 'תוכי' },
            { image: '🪐', word: 'Planet', hebrew: 'כוכב לכת' },
            { image: '🧪', word: 'Laboratory', hebrew: 'מעבדה' },
            { image: '🦔', word: 'Hedgehog', hebrew: 'קיפוד' },
            { image: '🎭', word: 'Theater', hebrew: 'תיאטרון' },
        ],
        expert: [
            { image: '🦎', word: 'Chameleon', hebrew: 'זיקית' },
            { image: '🦚', word: 'Peacock', hebrew: 'טווס' },
            { image: '🦥', word: 'Sloth', hebrew: 'עצלן' },
            { image: '🦫', word: 'Beaver', hebrew: 'בונה' },
            { image: '🦩', word: 'Flamingo', hebrew: 'פלמינגו' },
            { image: '🪼', word: 'Jellyfish', hebrew: 'מדוזה' },
            { image: '🦂', word: 'Scorpion', hebrew: 'עקרב' },
            { image: '🦤', word: 'Dodo', hebrew: 'דודו' },
            { image: '🫎', word: 'Moose', hebrew: 'אייל' },
            { image: '🪺', word: 'Nest', hebrew: 'קן' },
            { image: '🪸', word: 'Coral', hebrew: 'אלמוג' },
            { image: '🪻', word: 'Lavender', hebrew: 'לבנדר' },
            { image: '🛖', word: 'Hut', hebrew: 'בקתה' },
            { image: '🏺', word: 'Amphora', hebrew: 'אמפורה' },
            { image: '🪆', word: 'Matryoshka', hebrew: 'מטריושקה' },
            { image: '🫕', word: 'Fondue', hebrew: 'פונדו' },
        ]
    },

    config: {
        easy:   { count: 8,  optionsCount: 3 },
        medium: { count: 10, optionsCount: 4 },
        hard:   { count: 12, optionsCount: 4 },
        expert: { count: 15, optionsCount: 4 }
    },

    state: null,
    _timeouts: [],

    init(difficulty) {
        const cfg = this.config[difficulty];
        const pool = this.shuffleArray([...this.words[difficulty]]);
        const selected = pool.slice(0, cfg.count);

        this.state = {
            difficulty,
            questions: selected,
            currentIndex: 0,
            score: 0,
            correct: 0,
            optionsCount: cfg.optionsCount
        };
        this._timeouts = [];

        this.render();
        this.showQuestion();
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
        instructions.textContent = 'בחרו את המילה באנגלית שמתאימה לתמונה';

        area.innerHTML = '<div class="english-game-container" id="eng-pic-container"></div>';
        document.getElementById('game-controls').innerHTML = '';
    },

    showQuestion() {
        if (!this.state) return;
        const { questions, currentIndex, optionsCount } = this.state;
        if (currentIndex >= questions.length) {
            this.finish();
            return;
        }

        const q = questions[currentIndex];
        const allWords = this.words[this.state.difficulty];
        const wrongOptions = this.shuffleArray(
            allWords.filter(w => w.word !== q.word).map(w => w.word)
        ).slice(0, optionsCount - 1);

        const options = this.shuffleArray([q.word, ...wrongOptions]);
        const container = document.getElementById('eng-pic-container');
        if (!container) return;

        container.innerHTML = `
            <div class="eng-image fade-in" aria-hidden="true">${q.image}</div>
            <div class="eng-hebrew-hint fade-in">${q.hebrew}</div>
            <div class="eng-question fade-in">?What is this in English</div>
            <div class="eng-options" role="group" aria-label="English word options">
                ${options.map((opt, i) => `
                    <button class="eng-option fade-in" onclick="EnglishPictureGame.selectAnswer('${opt}', this)" style="animation-delay: ${i * 0.1}s" dir="ltr">
                        ${opt}
                    </button>
                `).join('')}
            </div>
            <div class="eng-progress">שאלה ${currentIndex + 1} מתוך ${questions.length}</div>
        `;
    },

    selectAnswer(answer, btnEl) {
        if (!this.state) return;
        const q = this.state.questions[this.state.currentIndex];
        const allBtns = document.querySelectorAll('.eng-option');

        allBtns.forEach(btn => btn.disabled = true);

        if (answer === q.word) {
            Sound.correct(); Haptic.correct();
            btnEl.classList.add('correct');
            this.state.score += 10;
            this.state.correct++;
            app.updateScore(this.state.score);
        } else {
            Sound.wrong(); Haptic.wrong();
            btnEl.classList.add('wrong');
            allBtns.forEach(btn => {
                if (btn.textContent.trim() === q.word) {
                    btn.classList.add('correct');
                }
            });
        }

        this._addTimeout(() => {
            if (!this.state) return;
            this.state.currentIndex++;
            this.showQuestion();
        }, 1500);
    },

    finish() {
        if (!this.state) return;
        const { score, correct, questions } = this.state;
        const percentage = Math.round((correct / questions.length) * 100);

        let message;
        if (percentage >= 90) message = '!Excellent! תוצאה מעולה';
        else if (percentage >= 70) message = '!Good job! כל הכבוד';
        else if (percentage >= 50) message = 'לא רע! תרגול ישפר את האנגלית';
        else message = '!Keep trying! נסו שוב';

        const levelMap = { easy: 1, medium: 2, hard: 3, expert: 4 };

        app.endGame({
            score,
            level: levelMap[this.state.difficulty] || 1,
            message: `${correct} מתוך ${questions.length} תשובות נכונות (${percentage}%). ${message}`
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
