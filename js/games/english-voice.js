/* ==========================================
   Game 10: English Voice Words (אנגלית בקול)
   Uses Web Speech API (speechSynthesis) for TTS
   ========================================== */

const EnglishVoiceGame = {
    name: 'אנגלית בקול',
    icon: '🔊',

    words: {
        easy: [
            { image: '🐶', word: 'Dog', hebrew: 'כלב' },
            { image: '🐱', word: 'Cat', hebrew: 'חתול' },
            { image: '🐟', word: 'Fish', hebrew: 'דג' },
            { image: '🍎', word: 'Apple', hebrew: 'תפוח' },
            { image: '☀️', word: 'Sun', hebrew: 'שמש' },
            { image: '🌙', word: 'Moon', hebrew: 'ירח' },
            { image: '🏠', word: 'House', hebrew: 'בית' },
            { image: '🚗', word: 'Car', hebrew: 'מכונית' },
            { image: '📚', word: 'Book', hebrew: 'ספר' },
            { image: '🍞', word: 'Bread', hebrew: 'לחם' },
            { image: '🌊', word: 'Water', hebrew: 'מים' },
            { image: '🌲', word: 'Tree', hebrew: 'עץ' },
            { image: '🐦', word: 'Bird', hebrew: 'ציפור' },
            { image: '🔑', word: 'Key', hebrew: 'מפתח' },
            { image: '🎂', word: 'Cake', hebrew: 'עוגה' },
            { image: '🌹', word: 'Flower', hebrew: 'פרח' },
        ],
        medium: [
            { image: '🦁', word: 'Lion', hebrew: 'אריה' },
            { image: '🐘', word: 'Elephant', hebrew: 'פיל' },
            { image: '🦋', word: 'Butterfly', hebrew: 'פרפר' },
            { image: '🌈', word: 'Rainbow', hebrew: 'קשת' },
            { image: '✈️', word: 'Airplane', hebrew: 'מטוס' },
            { image: '🍕', word: 'Pizza', hebrew: 'פיצה' },
            { image: '🧀', word: 'Cheese', hebrew: 'גבינה' },
            { image: '🎁', word: 'Present', hebrew: 'מתנה' },
            { image: '🎹', word: 'Piano', hebrew: 'פסנתר' },
            { image: '🐝', word: 'Bee', hebrew: 'דבורה' },
            { image: '🐢', word: 'Turtle', hebrew: 'צב' },
            { image: '🎈', word: 'Balloon', hebrew: 'בלון' },
            { image: '🔔', word: 'Bell', hebrew: 'פעמון' },
            { image: '🌻', word: 'Sunflower', hebrew: 'חמנייה' },
            { image: '🍫', word: 'Chocolate', hebrew: 'שוקולד' },
            { image: '📺', word: 'Television', hebrew: 'טלוויזיה' },
        ],
        hard: [
            { image: '🦅', word: 'Eagle', hebrew: 'נשר' },
            { image: '🐙', word: 'Octopus', hebrew: 'תמנון' },
            { image: '🦊', word: 'Fox', hebrew: 'שועל' },
            { image: '🏰', word: 'Castle', hebrew: 'טירה' },
            { image: '🌋', word: 'Volcano', hebrew: 'הר געש' },
            { image: '🎻', word: 'Violin', hebrew: 'כינור' },
            { image: '💎', word: 'Diamond', hebrew: 'יהלום' },
            { image: '🏔️', word: 'Mountain', hebrew: 'הר' },
            { image: '🦈', word: 'Shark', hebrew: 'כריש' },
            { image: '🦜', word: 'Parrot', hebrew: 'תוכי' },
            { image: '🧲', word: 'Magnet', hebrew: 'מגנט' },
            { image: '🎭', word: 'Theater', hebrew: 'תיאטרון' },
            { image: '🦒', word: 'Giraffe', hebrew: 'ג\'ירפה' },
            { image: '🦉', word: 'Owl', hebrew: 'ינשוף' },
            { image: '🔬', word: 'Microscope', hebrew: 'מיקרוסקופ' },
            { image: '🦔', word: 'Hedgehog', hebrew: 'קיפוד' },
        ],
        expert: [
            { image: '🦎', word: 'Chameleon', hebrew: 'זיקית' },
            { image: '🦚', word: 'Peacock', hebrew: 'טווס' },
            { image: '🦥', word: 'Sloth', hebrew: 'עצלן' },
            { image: '🦩', word: 'Flamingo', hebrew: 'פלמינגו' },
            { image: '🦂', word: 'Scorpion', hebrew: 'עקרב' },
            { image: '🪸', word: 'Coral', hebrew: 'אלמוג' },
            { image: '🦫', word: 'Beaver', hebrew: 'בונה' },
            { image: '🏺', word: 'Amphora', hebrew: 'אמפורה' },
            { image: '🦤', word: 'Dodo', hebrew: 'דודו' },
            { image: '🪻', word: 'Lavender', hebrew: 'לבנדר' },
            { image: '🛖', word: 'Hut', hebrew: 'בקתה' },
            { image: '🪆', word: 'Matryoshka', hebrew: 'מטריושקה' },
        ]
    },

    config: {
        easy:   { count: 8,  optionsCount: 3, showImage: true },
        medium: { count: 10, optionsCount: 4, showImage: true },
        hard:   { count: 12, optionsCount: 4, showImage: false },
        expert: { count: 12, optionsCount: 4, showImage: false }
    },

    state: null,
    _timeouts: [],
    _voice: null,

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
            optionsCount: cfg.optionsCount,
            showImage: cfg.showImage
        };
        this._timeouts = [];
        this._initVoice();

        this.render();
        this.showQuestion();
    },

    _initVoice() {
        this._voice = null;
        if (!window.speechSynthesis) return;

        const voices = speechSynthesis.getVoices();
        this._voice = voices.find(v => v.lang.startsWith('en')) || null;

        if (!this._voice) {
            speechSynthesis.addEventListener('voiceschanged', () => {
                const v = speechSynthesis.getVoices();
                this._voice = v.find(voice => voice.lang.startsWith('en')) || null;
            }, { once: true });
        }
    },

    _speak(text) {
        if (!window.speechSynthesis) return;
        speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.8;
        utterance.pitch = 1;
        if (this._voice) utterance.voice = this._voice;
        speechSynthesis.speak(utterance);
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
        if (this.state.showImage) {
            instructions.textContent = 'הקשיבו למילה באנגלית ובחרו את התשובה הנכונה';
        } else {
            instructions.textContent = 'הקשיבו למילה באנגלית - בחרו את התרגום הנכון (בלי תמונה!)';
        }

        area.innerHTML = '<div class="english-game-container" id="eng-voice-container"></div>';
        document.getElementById('game-controls').innerHTML = '';
    },

    showQuestion() {
        if (!this.state) return;
        const { questions, currentIndex, optionsCount, showImage } = this.state;
        if (currentIndex >= questions.length) {
            this.finish();
            return;
        }

        const q = questions[currentIndex];
        const allWords = this.words[this.state.difficulty];
        const wrongOptions = this.shuffleArray(
            allWords.filter(w => w.word !== q.word).map(w => ({ word: w.word, hebrew: w.hebrew }))
        ).slice(0, optionsCount - 1);

        const options = this.shuffleArray([
            { word: q.word, hebrew: q.hebrew },
            ...wrongOptions
        ]);

        const container = document.getElementById('eng-voice-container');
        if (!container) return;

        let imageHtml = '';
        if (showImage) {
            imageHtml = `<div class="eng-image fade-in" aria-hidden="true">${q.image}</div>`;
        }

        container.innerHTML = `
            ${imageHtml}
            <button class="eng-voice-btn fade-in" onclick="EnglishVoiceGame.playWord()" aria-label="השמע מילה">
                <span class="voice-icon">🔊</span>
                <span class="voice-text">הקשיבו למילה</span>
            </button>
            <div class="eng-options" role="group" aria-label="אפשרויות תשובה">
                ${options.map((opt, i) => `
                    <button class="eng-option eng-option-dual fade-in" onclick="EnglishVoiceGame.selectAnswer('${opt.word.replace(/'/g, "\\'")}', this)" style="animation-delay: ${i * 0.1}s">
                        <span class="eng-opt-word" dir="ltr">${opt.word}</span>
                        <span class="eng-opt-hebrew">${opt.hebrew}</span>
                    </button>
                `).join('')}
            </div>
            <div class="eng-progress">שאלה ${currentIndex + 1} מתוך ${questions.length}</div>
        `;

        // Auto-play the word
        this._addTimeout(() => this._speak(q.word), 300);
    },

    playWord() {
        if (!this.state) return;
        const q = this.state.questions[this.state.currentIndex];
        this._speak(q.word);
        Haptic.tap();
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
            // Speak the word again on correct answer
            this._speak(q.word);
        } else {
            Sound.wrong(); Haptic.wrong();
            btnEl.classList.add('wrong');
            allBtns.forEach(btn => {
                const wordSpan = btn.querySelector('.eng-opt-word');
                if (wordSpan && wordSpan.textContent.trim() === q.word) {
                    btn.classList.add('correct');
                }
            });
            // Speak the correct word
            this._addTimeout(() => this._speak(q.word), 500);
        }

        this._addTimeout(() => {
            if (!this.state) return;
            this.state.currentIndex++;
            this.showQuestion();
        }, 2000);
    },

    finish() {
        if (!this.state) return;
        const { score, correct, questions } = this.state;
        const percentage = Math.round((correct / questions.length) * 100);

        let message;
        if (percentage >= 90) message = '!Amazing! הבנה מעולה של אנגלית';
        else if (percentage >= 70) message = '!Well done! כל הכבוד';
        else if (percentage >= 50) message = 'לא רע! המשיכו לתרגל הקשבה';
        else message = '!Practice makes perfect! נסו שוב';

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
        if (window.speechSynthesis) speechSynthesis.cancel();
        this.state = null;
    }
};
