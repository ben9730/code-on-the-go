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

    config: {
        easy:   { count: 6,  timePerQuestion: null },
        medium: { count: 10, timePerQuestion: null },
        hard:   { count: 15, timePerQuestion: null }
    },

    state: null,
    _timeouts: [],

    init(difficulty) {
        const cfg = this.config[difficulty];
        const shuffled = this.shuffleArray([...this.questions]).slice(0, cfg.count);

        this.state = {
            difficulty,
            questions: shuffled,
            currentIndex: 0,
            score: 0,
            correct: 0
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
        instructions.textContent = 'בחרו את התשובה הנכונה לכל שאלה';

        area.innerHTML = '<div class="word-quiz-container" id="quiz-container"></div>';
        document.getElementById('game-controls').innerHTML = '';
    },

    showQuestion() {
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

        container.innerHTML = `
            <div class="word-clue fade-in" aria-hidden="true">${q.clue}</div>
            <div class="word-question fade-in">${q.question}</div>
            <div class="word-options" role="group" aria-label="תשובות אפשריות">
                ${shuffledOptions.map((opt, i) => `
                    <button class="word-option fade-in" onclick="WordQuizGame.selectAnswer('${opt}', this)" style="animation-delay: ${i * 0.1}s">
                        ${opt}
                    </button>
                `).join('')}
            </div>
            <div class="word-progress">שאלה ${currentIndex + 1} מתוך ${questions.length}</div>
        `;
    },

    selectAnswer(answer, btnEl) {
        if (!this.state) return;
        const q = this.state.questions[this.state.currentIndex];
        const allBtns = document.querySelectorAll('.word-option');

        allBtns.forEach(btn => btn.disabled = true);

        if (answer === q.answer) {
            Sound.correct(); Haptic.correct();
            btnEl.classList.add('correct');
            this.state.score += 10;
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
        if (!this.state) return;
        const { score, correct, questions } = this.state;
        const percentage = Math.round((correct / questions.length) * 100);

        let message;
        if (percentage >= 90) message = 'מדהים! תוצאה מושלמת כמעט!';
        else if (percentage >= 70) message = 'כל הכבוד! תוצאה יפה מאוד!';
        else if (percentage >= 50) message = 'לא רע! ניתן לשפר בתרגול';
        else message = 'נסו שוב - תרגול עושה מושלם!';

        app.endGame({
            score,
            level: this.state.difficulty === 'easy' ? 1 : this.state.difficulty === 'medium' ? 2 : 3,
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
