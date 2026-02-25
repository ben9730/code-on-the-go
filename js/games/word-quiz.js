/* ==========================================
   Game 3: Word Quiz (חידון מילים)
   ========================================== */

const WordQuizGame = {
    name: 'חידון מילים',
    icon: '📝',

    questions: [
        { clue: '🍎', question: 'איזה פרי זה?', answer: 'תפוח', options: ['תפוח', 'אגס', 'תפוז', 'בננה'] },
        { clue: '🐘', question: 'מהו החיה הזו?', answer: 'פיל', options: ['פיל', 'ג\'ירפה', 'אריה', 'דוב'] },
        { clue: '🌹', question: 'איזה פרח זה?', answer: 'ורד', options: ['חמנייה', 'ורד', 'רקפת', 'כלנית'] },
        { clue: '☀️', question: 'מה מאיר ביום?', answer: 'שמש', options: ['ירח', 'כוכב', 'שמש', 'מנורה'] },
        { clue: '🌙', question: 'מה מאיר בלילה?', answer: 'ירח', options: ['שמש', 'ירח', 'ענן', 'גשם'] },
        { clue: '🏠', question: 'מה רואים בתמונה?', answer: 'בית', options: ['בית', 'מגדל', 'גשר', 'חנות'] },
        { clue: '📚', question: 'מה אלה?', answer: 'ספרים', options: ['מחברות', 'ספרים', 'עיתונים', 'מכתבים'] },
        { clue: '🎵', question: 'מה מסמל הסימן הזה?', answer: 'מוזיקה', options: ['ריקוד', 'שירה', 'מוזיקה', 'רעש'] },
        { clue: '⏰', question: 'מה זה?', answer: 'שעון', options: ['שעון', 'פעמון', 'טלפון', 'רדיו'] },
        { clue: '✈️', question: 'מה טס בשמיים?', answer: 'מטוס', options: ['רכבת', 'מכונית', 'מטוס', 'אוטובוס'] },
        { clue: '🚗', question: 'מה נוסע בכביש?', answer: 'מכונית', options: ['אופניים', 'מכונית', 'סירה', 'עגלה'] },
        { clue: '🌊', question: 'מה רואים בים?', answer: 'גלים', options: ['הרים', 'עננים', 'גלים', 'שלג'] },
        { clue: '🍞', question: 'מה אוכלים בבוקר?', answer: 'לחם', options: ['לחם', 'עוגה', 'פיצה', 'סושי'] },
        { clue: '☕', question: 'מה שותים בבוקר?', answer: 'קפה', options: ['מיץ', 'קפה', 'חלב', 'מים'] },
        { clue: '🐕', question: 'מי הוא חבר האדם הטוב ביותר?', answer: 'כלב', options: ['חתול', 'כלב', 'ציפור', 'דג'] },
        { clue: '🌈', question: 'מה מופיע אחרי הגשם?', answer: 'קשת', options: ['שמש', 'קשת', 'ענן', 'רוח'] },
        { clue: '🔑', question: 'במה פותחים דלת?', answer: 'מפתח', options: ['מסמר', 'מפתח', 'כפתור', 'ידית'] },
        { clue: '🎂', question: 'מה אוכלים ביום הולדת?', answer: 'עוגה', options: ['פיצה', 'סלט', 'עוגה', 'מרק'] },
        { clue: '🌻', question: 'איזה פרח פונה לשמש?', answer: 'חמנייה', options: ['ורד', 'כלנית', 'חמנייה', 'רקפת'] },
        { clue: '🧊', question: 'מה קר מאוד?', answer: 'קרח', options: ['אש', 'קרח', 'מים', 'אבן'] },
        { clue: '🍌', question: 'איזה פרי צהוב זה?', answer: 'בננה', options: ['בננה', 'לימון', 'אננס', 'מנגו'] },
        { clue: '🐦', question: 'מי שר על העץ?', answer: 'ציפור', options: ['ציפור', 'חתול', 'כלב', 'דבורה'] },
        { clue: '🌍', question: 'על מה אנחנו חיים?', answer: 'כדור הארץ', options: ['כדור הארץ', 'ירח', 'שמש', 'כוכב'] },
        { clue: '🎈', question: 'מה עף באוויר?', answer: 'בלון', options: ['בלון', 'כדור', 'עפיפון', 'מטריה'] },
        { clue: '🧹', question: 'במה מנקים את הרצפה?', answer: 'מטאטא', options: ['מברשת', 'מטאטא', 'מגב', 'סמרטוט'] },
        { clue: '🎁', question: 'מה מקבלים ביום הולדת?', answer: 'מתנה', options: ['מתנה', 'מכתב', 'פרח', 'ספר'] },
        { clue: '🧤', question: 'מה שמים על הידיים בחורף?', answer: 'כפפות', options: ['כפפות', 'גרביים', 'כובע', 'צעיף'] },
        { clue: '🌧️', question: 'מה יורד מהשמיים?', answer: 'גשם', options: ['שלג', 'גשם', 'ברד', 'רוח'] },
        { clue: '🎭', question: 'לאן הולכים לראות הצגה?', answer: 'תיאטרון', options: ['קולנוע', 'תיאטרון', 'מוזיאון', 'ספריה'] },
        { clue: '🕯️', question: 'מה מדליקים בשבת?', answer: 'נרות', options: ['נרות', 'אור', 'מנורה', 'פנס'] },
        { clue: '🍫', question: 'מה מתוק וחום?', answer: 'שוקולד', options: ['שוקולד', 'קפה', 'עוגה', 'סוכר'] },
        { clue: '🧀', question: 'מה שמים על הלחם?', answer: 'גבינה', options: ['גבינה', 'חמאה', 'ריבה', 'שוקולד'] },
        { clue: '🐝', question: 'מי מייצרת דבש?', answer: 'דבורה', options: ['פרפר', 'דבורה', 'זבוב', 'נמלה'] },
        { clue: '🏊', question: 'מה עושים בבריכה?', answer: 'שוחים', options: ['רצים', 'שוחים', 'קופצים', 'רוקדים'] },
        { clue: '🎹', question: 'איזה כלי נגינה זה?', answer: 'פסנתר', options: ['גיטרה', 'פסנתר', 'כינור', 'חליל'] },
        { clue: '🦷', question: 'מה צריך לצחצח כל יום?', answer: 'שיניים', options: ['שיניים', 'שיער', 'ידיים', 'רגליים'] },
        { clue: '📺', question: 'מה צופים בסלון?', answer: 'טלוויזיה', options: ['רדיו', 'טלוויזיה', 'מחשב', 'טלפון'] },
        { clue: '🧳', question: 'מה לוקחים לטיול?', answer: 'מזוודה', options: ['תיק', 'מזוודה', 'ארנק', 'שקית'] },
        { clue: '🍳', question: 'מה מטגנים בבוקר?', answer: 'ביצה', options: ['ביצה', 'בשר', 'ירקות', 'דג'] },
        { clue: '🌺', question: 'מה פורח בגינה?', answer: 'פרחים', options: ['עצים', 'פרחים', 'דשא', 'שיחים'] },
        { clue: '🦁', question: 'מי מלך החיות?', answer: 'אריה', options: ['אריה', 'נמר', 'דוב', 'זאב'] },
        { clue: '📮', question: 'לאן שולחים מכתבים?', answer: 'דואר', options: ['דואר', 'חנות', 'בנק', 'בית'] },
        { clue: '🧲', question: 'מה מושך מתכת?', answer: 'מגנט', options: ['מגנט', 'דבק', 'חוט', 'מסמר'] },
        { clue: '🔔', question: 'מה משמיע צלצול?', answer: 'פעמון', options: ['שעון', 'פעמון', 'טלפון', 'חצוצרה'] },
        { clue: '🍕', question: 'מה אוכלים משולש?', answer: 'פיצה', options: ['פיצה', 'סנדוויץ', 'טוסט', 'קרפ'] },
        { clue: '🐢', question: 'מי הולך הכי לאט?', answer: 'צב', options: ['צב', 'חילזון', 'נמלה', 'צפרדע'] },
        { clue: '🌽', question: 'איזה ירק צהוב זה?', answer: 'תירס', options: ['תירס', 'דלעת', 'לימון', 'בננה'] },
        { clue: '🎓', question: 'מה חובשים בסיום לימודים?', answer: 'כובע', options: ['כובע', 'כתר', 'קסדה', 'מצנפת'] },
        { clue: '💡', question: 'מה מאיר בחדר?', answer: 'מנורה', options: ['נר', 'מנורה', 'פנס', 'שמש'] },
        { clue: '🍯', question: 'מה מתוק וזהוב?', answer: 'דבש', options: ['דבש', 'סוכר', 'ריבה', 'סילאן'] },
        { clue: '🧶', question: 'ממה סורגים סוודר?', answer: 'צמר', options: ['צמר', 'כותנה', 'משי', 'עור'] },
        { clue: '🪑', question: 'על מה יושבים?', answer: 'כיסא', options: ['כיסא', 'שולחן', 'ספסל', 'מיטה'] },
        { clue: '🌲', question: 'מה גדל ביער?', answer: 'עצים', options: ['עצים', 'פרחים', 'דשא', 'שיחים'] },
        { clue: '🐑', question: 'ממי מקבלים צמר?', answer: 'כבשה', options: ['כבשה', 'פרה', 'עז', 'סוס'] },
        { clue: '🍰', question: 'מה אופים בתנור?', answer: 'עוגה', options: ['עוגה', 'סלט', 'מרק', 'סנדוויץ'] },
    ],

    // Expert questions - harder, more abstract, trickier options
    expertQuestions: [
        { clue: '🫀', question: 'מה פועם בגוף?', answer: 'לב', options: ['לב', 'ריאה', 'כליה', 'כבד'] },
        { clue: '🪶', question: 'מה קל כמו...?', answer: 'נוצה', options: ['נוצה', 'עלה', 'אבק', 'רוח'] },
        { clue: '🔬', question: 'במה מגדילים דברים קטנים?', answer: 'מיקרוסקופ', options: ['טלסקופ', 'מיקרוסקופ', 'משקפת', 'זכוכית מגדלת'] },
        { clue: '🧭', question: 'מה מראה כיוונים?', answer: 'מצפן', options: ['מצפן', 'מפה', 'שלט', 'חץ'] },
        { clue: '⚖️', question: 'מה מסמל צדק?', answer: 'מאזניים', options: ['מאזניים', 'חרב', 'מגן', 'ספר'] },
        { clue: '🎻', question: 'על איזה כלי מנגנים עם קשת?', answer: 'כינור', options: ['גיטרה', 'כינור', 'צ\'לו', 'חליל'] },
        { clue: '🧬', question: 'מה נושא את המידע התורשתי?', answer: 'DNA', options: ['DNA', 'דם', 'תא', 'חלבון'] },
        { clue: '🏛️', question: 'איפה יושבת הכנסת?', answer: 'ירושלים', options: ['תל אביב', 'ירושלים', 'חיפה', 'באר שבע'] },
        { clue: '🫁', question: 'באיזה איבר נושמים?', answer: 'ריאות', options: ['ריאות', 'לב', 'קיבה', 'כליות'] },
        { clue: '🪨', question: 'ממה בנויים הרים?', answer: 'סלע', options: ['סלע', 'חול', 'עפר', 'חרסית'] },
        { clue: '🌡️', question: 'במה מודדים חום?', answer: 'מדחום', options: ['מדחום', 'ברומטר', 'שעון', 'סרגל'] },
        { clue: '🧪', question: 'איפה עושים ניסויים?', answer: 'מעבדה', options: ['מטבח', 'מעבדה', 'כיתה', 'ספריה'] },
        { clue: '🪐', question: 'מהו כוכב הלכת הגדול במערכת השמש?', answer: 'צדק', options: ['שבתאי', 'צדק', 'מאדים', 'נוגה'] },
        { clue: '🦅', question: 'מי ידוע כמלך השמיים?', answer: 'נשר', options: ['עורב', 'נשר', 'ינשוף', 'בז'] },
        { clue: '🏺', question: 'מה מצאו במערות קומראן?', answer: 'מגילות', options: ['מגילות', 'מטבעות', 'כלי חרס', 'תכשיטים'] },
        { clue: '🎼', question: 'מי חיבר את "לירח"?', answer: 'בטהובן', options: ['מוצרט', 'בטהובן', 'באך', 'שופן'] },
        { clue: '🌋', question: 'מה מתפרץ מהר געש?', answer: 'לבה', options: ['לבה', 'מים', 'אבנים', 'עשן'] },
        { clue: '🧠', question: 'מהו האיבר המורכב ביותר בגוף?', answer: 'מוח', options: ['מוח', 'לב', 'עין', 'כבד'] },
        { clue: '🏗️', question: 'מי מתכנן בניינים?', answer: 'אדריכל', options: ['מהנדס', 'אדריכל', 'קבלן', 'שרטט'] },
        { clue: '🎨', question: 'מי צייר את המונה ליזה?', answer: 'לאונרדו דה וינצ\'י', options: ['פיקאסו', 'לאונרדו דה וינצ\'י', 'מיכלאנג\'לו', 'ואן גוך'] },
        { clue: '🔭', question: 'במה צופים בכוכבים?', answer: 'טלסקופ', options: ['מיקרוסקופ', 'טלסקופ', 'משקפת', 'פריסקופ'] },
        { clue: '🏜️', question: 'מהו המדבר הגדול בישראל?', answer: 'הנגב', options: ['הנגב', 'יהודה', 'ערבה', 'סיני'] },
        { clue: '🎪', question: 'מה הביטוי "לחם ו..."?', answer: 'שעשועים', options: ['שעשועים', 'משחקים', 'מים', 'חמאה'] },
        { clue: '🦉', question: 'איזה עוף פעיל בלילה?', answer: 'ינשוף', options: ['ינשוף', 'נשר', 'יונה', 'עורב'] },
        { clue: '📐', question: 'כמה מעלות יש במשולש?', answer: '180', options: ['90', '180', '360', '270'] },
    ],

    config: {
        easy:   { count: 6,  timePerQuestion: null },
        medium: { count: 10, timePerQuestion: null },
        hard:   { count: 15, timePerQuestion: null },
        expert: { count: 20, timePerQuestion: 8 }
    },

    state: null,
    _timeouts: [],
    _timerInterval: null,

    init(difficulty) {
        const cfg = this.config[difficulty];
        let pool;
        if (difficulty === 'expert') {
            pool = this.shuffleArray([...this.expertQuestions, ...this.questions]);
        } else {
            pool = this.shuffleArray([...this.questions]);
        }
        const selected = pool.slice(0, cfg.count);

        this.state = {
            difficulty,
            questions: selected,
            currentIndex: 0,
            score: 0,
            correct: 0,
            timePerQuestion: cfg.timePerQuestion,
            timeLeft: cfg.timePerQuestion
        };
        this._timeouts = [];
        this._timerInterval = null;

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

    _startQuestionTimer() {
        if (!this.state || !this.state.timePerQuestion) return;
        this.state.timeLeft = this.state.timePerQuestion;
        this._updateTimerBar();

        if (this._timerInterval) clearInterval(this._timerInterval);
        this._timerInterval = setInterval(() => {
            if (!this.state) { this._stopQuestionTimer(); return; }
            this.state.timeLeft--;
            this._updateTimerBar();
            if (this.state.timeLeft <= 0) {
                this._stopQuestionTimer();
                this._timeUp();
            }
        }, 1000);
    },

    _stopQuestionTimer() {
        if (this._timerInterval) {
            clearInterval(this._timerInterval);
            this._timerInterval = null;
        }
    },

    _updateTimerBar() {
        const bar = document.getElementById('quiz-timer-fill');
        const text = document.getElementById('quiz-timer-text');
        if (!bar || !this.state) return;
        const pct = (this.state.timeLeft / this.state.timePerQuestion) * 100;
        bar.style.width = pct + '%';
        bar.style.background = pct > 40 ? 'var(--primary)' : pct > 20 ? '#FFA000' : 'var(--error)';
        if (text) text.textContent = this.state.timeLeft + ' שניות';
    },

    _timeUp() {
        if (!this.state) return;
        const q = this.state.questions[this.state.currentIndex];
        const allBtns = document.querySelectorAll('.word-option');
        allBtns.forEach(btn => {
            btn.disabled = true;
            if (btn.textContent.trim() === q.answer) {
                btn.classList.add('correct');
            }
        });
        Sound.wrong(); Haptic.wrong();

        this._addTimeout(() => {
            if (!this.state) return;
            this.state.currentIndex++;
            this.showQuestion();
        }, 1200);
    },

    render() {
        const area = document.getElementById('game-area');
        const instructions = document.getElementById('game-instructions');
        if (this.state.difficulty === 'expert') {
            instructions.textContent = 'ענו על השאלות לפני שהזמן נגמר!';
        } else {
            instructions.textContent = 'בחרו את התשובה הנכונה לכל שאלה';
        }

        area.innerHTML = '<div class="word-quiz-container" id="quiz-container"></div>';
        document.getElementById('game-controls').innerHTML = '';
    },

    showQuestion() {
        this._stopQuestionTimer();
        if (!this.state) return;
        const { questions, currentIndex } = this.state;
        if (currentIndex >= questions.length) {
            this.finish();
            return;
        }

        const q = questions[currentIndex];
        const shuffledOptions = this.shuffleArray([...q.options]);
        const container = document.getElementById('quiz-container');
        if (!container) return;

        let timerHtml = '';
        if (this.state.timePerQuestion) {
            timerHtml = `
                <div class="quiz-timer">
                    <div class="quiz-timer-bar">
                        <div class="quiz-timer-fill" id="quiz-timer-fill"></div>
                    </div>
                    <span class="quiz-timer-text" id="quiz-timer-text">${this.state.timePerQuestion} שניות</span>
                </div>`;
        }

        container.innerHTML = `
            ${timerHtml}
            <div class="word-clue fade-in" aria-hidden="true">${q.clue}</div>
            <div class="word-question fade-in">${q.question}</div>
            <div class="word-options" role="group" aria-label="תשובות אפשריות">
                ${shuffledOptions.map((opt, i) => `
                    <button class="word-option fade-in" onclick="WordQuizGame.selectAnswer('${opt.replace(/'/g, "\\'")}', this)" style="animation-delay: ${i * 0.1}s">
                        ${opt}
                    </button>
                `).join('')}
            </div>
            <div class="word-progress">שאלה ${currentIndex + 1} מתוך ${questions.length}</div>
        `;

        if (this.state.timePerQuestion) {
            this._startQuestionTimer();
        }
    },

    selectAnswer(answer, btnEl) {
        if (!this.state) return;
        this._stopQuestionTimer();
        const q = this.state.questions[this.state.currentIndex];
        const allBtns = document.querySelectorAll('.word-option');

        allBtns.forEach(btn => btn.disabled = true);

        if (answer === q.answer) {
            Sound.correct(); Haptic.correct();
            btnEl.classList.add('correct');
            let points = 10;
            if (this.state.timePerQuestion && this.state.timeLeft > 0) {
                points += this.state.timeLeft; // bonus for speed
            }
            this.state.score += points;
            this.state.correct++;
            app.updateScore(this.state.score);
        } else {
            Sound.wrong(); Haptic.wrong();
            btnEl.classList.add('wrong');
            allBtns.forEach(btn => {
                if (btn.textContent.trim() === q.answer) {
                    btn.classList.add('correct');
                }
            });
        }

        this._addTimeout(() => {
            if (!this.state) return;
            this.state.currentIndex++;
            this.showQuestion();
        }, 1200);
    },

    finish() {
        this._stopQuestionTimer();
        if (!this.state) return;
        const { score, correct, questions } = this.state;
        const percentage = Math.round((correct / questions.length) * 100);

        let message;
        if (percentage >= 90) message = 'מדהים! תוצאה מושלמת כמעט!';
        else if (percentage >= 70) message = 'כל הכבוד! תוצאה יפה מאוד!';
        else if (percentage >= 50) message = 'לא רע! ניתן לשפר בתרגול';
        else message = 'נסו שוב - תרגול עושה מושלם!';

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
        this._stopQuestionTimer();
        this._clearTimeouts();
        this.state = null;
    }
};
