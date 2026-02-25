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
            { image: '👶', word: 'Baby', hebrew: 'תינוק' },
            { image: '👀', word: 'Eye', hebrew: 'עין' },
            { image: '✋', word: 'Hand', hebrew: 'יד' },
            { image: '🦶', word: 'Foot', hebrew: 'רגל' },
            { image: '🍌', word: 'Banana', hebrew: 'בננה' },
            { image: '🍊', word: 'Orange', hebrew: 'תפוז' },
            { image: '🥛', word: 'Milk', hebrew: 'חלב' },
            { image: '🥚', word: 'Egg', hebrew: 'ביצה' },
            { image: '🪑', word: 'Chair', hebrew: 'כיסא' },
            { image: '🚪', word: 'Door', hebrew: 'דלת' },
            { image: '⭐', word: 'Star', hebrew: 'כוכב' },
            { image: '❤️', word: 'Heart', hebrew: 'לב' },
            { image: '🎵', word: 'Music', hebrew: 'מוזיקה' },
            { image: '⏰', word: 'Clock', hebrew: 'שעון' },
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
            { image: '🍇', word: 'Grapes', hebrew: 'ענבים' },
            { image: '🍓', word: 'Strawberry', hebrew: 'תות' },
            { image: '🥕', word: 'Carrot', hebrew: 'גזר' },
            { image: '🌽', word: 'Corn', hebrew: 'תירס' },
            { image: '🐴', word: 'Horse', hebrew: 'סוס' },
            { image: '🐑', word: 'Sheep', hebrew: 'כבשה' },
            { image: '🐸', word: 'Frog', hebrew: 'צפרדע' },
            { image: '🐧', word: 'Penguin', hebrew: 'פינגווין' },
            { image: '🌍', word: 'Earth', hebrew: 'כדור הארץ' },
            { image: '🔥', word: 'Fire', hebrew: 'אש' },
            { image: '❄️', word: 'Snow', hebrew: 'שלג' },
            { image: '🌧️', word: 'Rain', hebrew: 'גשם' },
            { image: '👑', word: 'Crown', hebrew: 'כתר' },
            { image: '🎒', word: 'Backpack', hebrew: 'תיק גב' },
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
            { image: '🐊', word: 'Crocodile', hebrew: 'תנין' },
            { image: '🦀', word: 'Crab', hebrew: 'סרטן' },
            { image: '🐋', word: 'Whale', hebrew: 'לווייתן' },
            { image: '🐺', word: 'Wolf', hebrew: 'זאב' },
            { image: '🦌', word: 'Deer', hebrew: 'אייל' },
            { image: '🏖️', word: 'Beach', hebrew: 'חוף' },
            { image: '🌵', word: 'Cactus', hebrew: 'קקטוס' },
            { image: '🍄', word: 'Mushroom', hebrew: 'פטריה' },
            { image: '🧊', word: 'Ice', hebrew: 'קרח' },
            { image: '⚡', word: 'Lightning', hebrew: 'ברק' },
            { image: '🔭', word: 'Telescope', hebrew: 'טלסקופ' },
            { image: '🧭', word: 'Compass', hebrew: 'מצפן' },
            { image: '⚓', word: 'Anchor', hebrew: 'עוגן' },
            { image: '🎯', word: 'Target', hebrew: 'מטרה' },
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
            { image: '🦭', word: 'Seal', hebrew: 'כלב ים' },
            { image: '🦦', word: 'Otter', hebrew: 'לוטרה' },
            { image: '🦡', word: 'Badger', hebrew: 'גירית' },
            { image: '🪼', word: 'Jellyfish', hebrew: 'מדוזה' },
            { image: '🦑', word: 'Squid', hebrew: 'דיונון' },
            { image: '🪺', word: 'Nest', hebrew: 'קן' },
            { image: '🏛️', word: 'Parliament', hebrew: 'פרלמנט' },
            { image: '⛵', word: 'Sailboat', hebrew: 'מפרשית' },
            { image: '🎪', word: 'Circus', hebrew: 'קרקס' },
            { image: '🗿', word: 'Statue', hebrew: 'פסל' },
            { image: '🪵', word: 'Log', hebrew: 'בול עץ' },
            { image: '🪘', word: 'Drum', hebrew: 'תוף' },
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
    _currentUtterance: null,
    _repeatUtterance: null,

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
        this._pickBestVoice(speechSynthesis.getVoices());
        if (!this._voice) {
            speechSynthesis.addEventListener('voiceschanged', () => {
                this._pickBestVoice(speechSynthesis.getVoices());
            }, { once: true });
        }
        // Warm up the speech engine to avoid first-word delay
        this._warmUp();
    },

    _warmUp() {
        if (!window.speechSynthesis) return;
        const warmup = new SpeechSynthesisUtterance('');
        warmup.volume = 0;
        speechSynthesis.speak(warmup);
        speechSynthesis.cancel();
    },

    _pickBestVoice(voices) {
        if (!voices || voices.length === 0) return;
        const enVoices = voices.filter(v => v.lang && v.lang.startsWith('en'));
        if (enVoices.length === 0) return;

        // Ranked by quality: Enhanced > Google network > MS Natural > Apple > MS standard > Android
        const preferred = [
            'Samantha (Enhanced)', 'Daniel (Enhanced)', 'Karen (Enhanced)',
            'Google US English', 'Google UK English Female', 'Google UK English Male',
            'Microsoft Ana Online (Natural)', 'Microsoft Jenny Online (Natural)',
            'Samantha', 'Daniel', 'Karen', 'Moira', 'Tessa',
            'Microsoft Zira', 'Microsoft David', 'Microsoft Mark',
            'English United States', 'English United Kingdom'
        ];

        for (const name of preferred) {
            const match = enVoices.find(v => v.name.includes(name) || v.voiceURI.includes(name));
            if (match) { this._voice = match; return; }
        }

        // Among remaining, prefer network voices (higher quality) over local
        const networkVoice = enVoices.find(v => !v.localService && v.lang === 'en-US');
        if (networkVoice) { this._voice = networkVoice; return; }

        // Fallback: prefer en-US, then en-GB, then any en
        this._voice =
            enVoices.find(v => v.lang === 'en-US') ||
            enVoices.find(v => v.lang === 'en-GB') ||
            enVoices[0];
    },

    _speak(text, slow) {
        if (!window.speechSynthesis) return;
        speechSynthesis.cancel();

        // Add trailing period for cleaner sentence-final intonation
        const spokenText = text.endsWith('.') ? text : text + '.';

        // Store reference to prevent garbage collection
        this._currentUtterance = new SpeechSynthesisUtterance(spokenText);
        this._currentUtterance.lang = 'en-US';
        this._currentUtterance.rate = slow ? 0.6 : 0.8;
        this._currentUtterance.pitch = 1.0;
        this._currentUtterance.volume = 1.0;
        if (this._voice) this._currentUtterance.voice = this._voice;

        // Speak once, then repeat after a pause for clarity
        if (!slow) {
            this._currentUtterance.onend = () => {
                this._addTimeout(() => {
                    if (!this.state) return;
                    this._repeatUtterance = new SpeechSynthesisUtterance(spokenText);
                    this._repeatUtterance.lang = 'en-US';
                    this._repeatUtterance.rate = 0.65;
                    this._repeatUtterance.pitch = 1.0;
                    this._repeatUtterance.volume = 1.0;
                    if (this._voice) this._repeatUtterance.voice = this._voice;
                    speechSynthesis.speak(this._repeatUtterance);
                }, 600);
            };
        }
        speechSynthesis.speak(this._currentUtterance);
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
            <div class="eng-voice-buttons">
                <button class="eng-voice-btn fade-in" onclick="EnglishVoiceGame.playWord()" aria-label="השמע מילה">
                    <span class="voice-icon">🔊</span>
                    <span class="voice-text">הקשיבו למילה</span>
                </button>
                <button class="eng-voice-btn eng-voice-slow fade-in" onclick="EnglishVoiceGame.playWordSlow()" aria-label="השמע לאט">
                    <span class="voice-icon">🐢</span>
                    <span class="voice-text">לאט יותר</span>
                </button>
            </div>
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
        this._speak(q.word, false);
        Haptic.tap();
    },

    playWordSlow() {
        if (!this.state) return;
        const q = this.state.questions[this.state.currentIndex];
        this._speak(q.word, true);
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
            // Speak the word clearly on correct answer
            this._speak(q.word, true);
        } else {
            Sound.wrong(); Haptic.wrong();
            btnEl.classList.add('wrong');
            allBtns.forEach(btn => {
                const wordSpan = btn.querySelector('.eng-opt-word');
                if (wordSpan && wordSpan.textContent.trim() === q.word) {
                    btn.classList.add('correct');
                }
            });
            // Speak the correct word slowly so they learn it
            this._addTimeout(() => this._speak(q.word, true), 500);
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
