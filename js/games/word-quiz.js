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
    ],

    config: {
        easy:   { count: 6,  timePerQuestion: null },
        medium: { count: 10, timePerQuestion: null },
        hard:   { count: 15, timePerQuestion: null }
    },

    state: null,

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

        this.render();
        this.showQuestion();
    },

    render() {
        const area = document.getElementById('game-area');
        const instructions = document.getElementById('game-instructions');
        instructions.textContent = 'בחרו את התשובה הנכונה לכל שאלה';

        area.innerHTML = '<div class="word-quiz-container" id="quiz-container"></div>';
        document.getElementById('game-controls').innerHTML = '';
    },

    showQuestion() {
        const { questions, currentIndex } = this.state;
        if (currentIndex >= questions.length) {
            this.finish();
            return;
        }

        const q = questions[currentIndex];
        const shuffledOptions = this.shuffleArray([...q.options]);
        const container = document.getElementById('quiz-container');

        container.innerHTML = `
            <div class="word-clue fade-in">${q.clue}</div>
            <div class="word-question fade-in">${q.question}</div>
            <div class="word-options">
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
        const q = this.state.questions[this.state.currentIndex];
        const allBtns = document.querySelectorAll('.word-option');

        // Disable all buttons
        allBtns.forEach(btn => btn.disabled = true);

        if (answer === q.answer) {
            btnEl.classList.add('correct');
            this.state.score += 10;
            this.state.correct++;
            app.updateScore(this.state.score);
        } else {
            btnEl.classList.add('wrong');
            // Highlight correct answer
            allBtns.forEach(btn => {
                if (btn.textContent.trim() === q.answer) {
                    btn.classList.add('correct');
                }
            });
        }

        setTimeout(() => {
            this.state.currentIndex++;
            this.showQuestion();
        }, 1200);
    },

    finish() {
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
        this.state = null;
    }
};
