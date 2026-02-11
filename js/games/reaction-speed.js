/* ==========================================
   Game 8: Reaction Speed (מהירות תגובה)
   Test reaction time by tapping when prompted
   ========================================== */

const ReactionSpeedGame = {
    name: 'מהירות תגובה',
    icon: '⚡',

    config: {
        easy:   { rounds: 5,  minWait: 2000, maxWait: 5000 },
        medium: { rounds: 8,  minWait: 1500, maxWait: 4000 },
        hard:   { rounds: 10, minWait: 1000, maxWait: 3500 }
    },

    state: null,
    _timeouts: [],

    init(difficulty) {
        const cfg = this.config[difficulty];
        this.state = {
            difficulty,
            totalRounds: cfg.rounds,
            currentRound: 0,
            score: 0,
            minWait: cfg.minWait,
            maxWait: cfg.maxWait,
            reactionTimes: [],
            phase: 'waiting',
            startTime: 0,
            tooEarly: false
        };
        this._timeouts = [];

        this.render();
        this._addTimeout(() => this.nextRound(), 1000);
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
        instructions.textContent = 'לחצו על הכפתור ברגע שהוא הופך לירוק';

        area.innerHTML = `
            <div class="reaction-container" id="reaction-container">
                <div class="reaction-round" id="reaction-round"></div>
                <button class="reaction-target waiting" id="reaction-target"
                    onclick="ReactionSpeedGame.tap()"
                    aria-label="כפתור תגובה">
                    <span class="reaction-text" id="reaction-text">המתינו...</span>
                    <span class="reaction-time" id="reaction-time"></span>
                </button>
                <div class="reaction-stats" id="reaction-stats"></div>
            </div>
        `;
        document.getElementById('game-controls').innerHTML = '';
    },

    nextRound() {
        if (!this.state) return;
        this.state.currentRound++;
        if (this.state.currentRound > this.state.totalRounds) {
            this.finish();
            return;
        }

        this.state.phase = 'waiting';
        this.state.tooEarly = false;

        const target = document.getElementById('reaction-target');
        const text = document.getElementById('reaction-text');
        const timeEl = document.getElementById('reaction-time');
        const roundEl = document.getElementById('reaction-round');

        if (roundEl) roundEl.textContent = `סיבוב ${this.state.currentRound} מתוך ${this.state.totalRounds}`;
        if (target) { target.className = 'reaction-target waiting'; }
        if (text) text.textContent = 'המתינו...';
        if (timeEl) timeEl.textContent = '';

        const waitTime = this.state.minWait + Math.random() * (this.state.maxWait - this.state.minWait);

        this._addTimeout(() => {
            if (!this.state || this.state.phase !== 'waiting') return;
            this.state.phase = 'ready';
            this.state.startTime = Date.now();

            if (target) target.className = 'reaction-target go';
            if (text) text.textContent = 'לחצו עכשיו!';
        }, waitTime);
    },

    tap() {
        if (!this.state) return;

        if (this.state.phase === 'waiting') {
            this.state.tooEarly = true;
            this.state.phase = 'too-early';

            const target = document.getElementById('reaction-target');
            const text = document.getElementById('reaction-text');
            const timeEl = document.getElementById('reaction-time');

            if (target) target.className = 'reaction-target too-early';
            if (text) text.textContent = 'מוקדם מדי!';
            if (timeEl) timeEl.textContent = 'ניסיון אבד';

            this._clearTimeouts();
            this._addTimeout(() => this.nextRound(), 1500);
            return;
        }

        if (this.state.phase === 'ready') {
            const reactionTime = Date.now() - this.state.startTime;
            this.state.reactionTimes.push(reactionTime);
            this.state.phase = 'result';

            const points = Math.max(0, Math.round(50 - (reactionTime / 20)));
            this.state.score += points;
            app.updateScore(this.state.score);

            const target = document.getElementById('reaction-target');
            const text = document.getElementById('reaction-text');
            const timeEl = document.getElementById('reaction-time');

            if (target) target.className = 'reaction-target result';
            if (text) text.textContent = this.getRatingText(reactionTime);
            if (timeEl) timeEl.textContent = `${reactionTime} ms`;

            this.updateStats();

            this._addTimeout(() => this.nextRound(), 2000);
        }
    },

    getRatingText(ms) {
        if (ms < 250) return 'מהיר ברק!';
        if (ms < 400) return 'מהיר מאוד!';
        if (ms < 600) return 'טוב!';
        if (ms < 800) return 'סביר';
        return 'אפשר יותר מהר';
    },

    updateStats() {
        if (!this.state) return;
        const statsEl = document.getElementById('reaction-stats');
        if (!statsEl || this.state.reactionTimes.length === 0) return;

        const times = this.state.reactionTimes;
        const avg = Math.round(times.reduce((a, b) => a + b, 0) / times.length);
        const best = Math.min(...times);

        statsEl.innerHTML = `
            <span>ממוצע: <strong>${avg} ms</strong></span>
            <span>שיא: <strong>${best} ms</strong></span>
        `;
    },

    finish() {
        if (!this.state) return;
        const { score, reactionTimes } = this.state;

        let message;
        if (reactionTimes.length === 0) {
            message = 'נסו שוב ולחצו רק כשהכפתור ירוק!';
        } else {
            const avg = Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length);
            const best = Math.min(...reactionTimes);

            if (avg < 350) message = `ממוצע ${avg}ms - תגובה מהירה מאוד! שיא: ${best}ms`;
            else if (avg < 500) message = `ממוצע ${avg}ms - תגובה טובה! שיא: ${best}ms`;
            else message = `ממוצע ${avg}ms - תרגול ישפר! שיא: ${best}ms`;
        }

        app.endGame({
            score,
            level: this.state.difficulty === 'easy' ? 1 : this.state.difficulty === 'medium' ? 2 : 3,
            message
        });
    },

    destroy() {
        this._clearTimeouts();
        this.state = null;
    }
};
