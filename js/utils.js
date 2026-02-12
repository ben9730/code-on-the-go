/* ==========================================
   Shared Utilities
   Sound, Haptic, Shuffle, Timeout Management,
   Settings, Confetti, Streaks, Daily Challenge
   ========================================== */

// ==========================================
// Sound Engine (Web Audio API, 500-2000Hz)
// ==========================================
const Sound = {
    _ctx: null,
    _enabled: true,
    _volume: 0.5,

    _getCtx() {
        if (!this._ctx) {
            try { this._ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch { }
        }
        return this._ctx;
    },

    _resumeCtx() {
        const ctx = this._getCtx();
        if (ctx && ctx.state === 'suspended') ctx.resume();
    },

    _play(freq, duration, type, vol) {
        if (!this._enabled) return;
        const ctx = this._getCtx();
        if (!ctx) return;
        this._resumeCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = type || 'sine';
        osc.frequency.value = freq;
        gain.gain.value = (vol || 1) * this._volume * 0.3;
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + duration);
    },

    tap()     { this._play(800, 0.08, 'sine', 0.4); },
    correct() { this._play(880, 0.15, 'sine', 0.7); setTimeout(() => this._play(1100, 0.2, 'sine', 0.7), 120); },
    wrong()   { this._play(400, 0.25, 'triangle', 0.6); },
    levelUp() { this._play(660, 0.12, 'sine', 0.6); setTimeout(() => this._play(880, 0.12, 'sine', 0.6), 100); setTimeout(() => this._play(1100, 0.2, 'sine', 0.6), 200); },
    gameOver(){ this._play(600, 0.15, 'sine', 0.5); setTimeout(() => this._play(500, 0.15, 'sine', 0.5), 150); setTimeout(() => this._play(400, 0.3, 'sine', 0.5), 300); },
    click()   { this._play(1000, 0.05, 'sine', 0.3); },
    celebrate(){ for (let i = 0; i < 5; i++) setTimeout(() => this._play(660 + i * 110, 0.12, 'sine', 0.5), i * 80); },

    setEnabled(v) { this._enabled = v; Settings.set('soundEnabled', v); },
    setVolume(v)  { this._volume = v; Settings.set('soundVolume', v); },
    isEnabled()   { return this._enabled; },
    init() {
        this._enabled = Settings.get('soundEnabled', true);
        this._volume = Settings.get('soundVolume', 0.5);
    }
};

// ==========================================
// Haptic Feedback
// ==========================================
const Haptic = {
    _enabled: true,

    tap()     { if (this._enabled && navigator.vibrate) navigator.vibrate(30); },
    correct() { if (this._enabled && navigator.vibrate) navigator.vibrate([40, 30, 40]); },
    wrong()   { if (this._enabled && navigator.vibrate) navigator.vibrate(100); },
    success() { if (this._enabled && navigator.vibrate) navigator.vibrate([50, 50, 50, 50, 100]); },

    setEnabled(v) { this._enabled = v; Settings.set('hapticEnabled', v); },
    isEnabled()   { return this._enabled; },
    init() { this._enabled = Settings.get('hapticEnabled', true); }
};

// ==========================================
// Settings Persistence
// ==========================================
const Settings = {
    _KEY: 'memory_plus_settings',
    _cache: null,

    _load() {
        if (this._cache) return this._cache;
        try {
            this._cache = JSON.parse(localStorage.getItem(this._KEY)) || {};
        } catch { this._cache = {}; }
        return this._cache;
    },

    get(key, defaultVal) {
        const data = this._load();
        return data[key] !== undefined ? data[key] : defaultVal;
    },

    set(key, value) {
        const data = this._load();
        data[key] = value;
        this._cache = data;
        try { localStorage.setItem(this._KEY, JSON.stringify(data)); } catch {}
    }
};

// ==========================================
// Text Size Control
// ==========================================
const TextSize = {
    sizes: ['normal', 'large', 'xlarge'],
    labels: { normal: 'רגיל', large: 'גדול', xlarge: 'גדול מאוד' },
    multipliers: { normal: 1, large: 1.15, xlarge: 1.3 },

    _current: 'normal',

    init() {
        this._current = Settings.get('textSize', 'normal');
        this.apply();
    },

    cycle() {
        const i = this.sizes.indexOf(this._current);
        this._current = this.sizes[(i + 1) % this.sizes.length];
        Settings.set('textSize', this._current);
        this.apply();
        return this._current;
    },

    apply() {
        const m = this.multipliers[this._current];
        document.documentElement.style.setProperty('--font-scale', m);
        document.documentElement.style.fontSize = (20 * m) + 'px';
    },

    getCurrent() { return this._current; }
};

// ==========================================
// High Contrast Mode
// ==========================================
const HighContrast = {
    _on: false,

    init() {
        this._on = Settings.get('highContrast', false);
        this.apply();
    },

    toggle() {
        this._on = !this._on;
        Settings.set('highContrast', this._on);
        this.apply();
        return this._on;
    },

    apply() {
        document.body.classList.toggle('high-contrast', this._on);
    },

    isOn() { return this._on; }
};

// ==========================================
// Confetti Celebration
// ==========================================
const Confetti = {
    launch() {
        const container = document.createElement('div');
        container.className = 'confetti-container';
        container.setAttribute('aria-hidden', 'true');
        const colors = ['#E53935', '#FDD835', '#43A047', '#1E88E5', '#FB8C00', '#8E24AA', '#EC407A'];
        for (let i = 0; i < 40; i++) {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';
            piece.style.left = Math.random() * 100 + '%';
            piece.style.background = colors[Math.floor(Math.random() * colors.length)];
            piece.style.animationDelay = (Math.random() * 0.6) + 's';
            piece.style.animationDuration = (1.5 + Math.random() * 1.5) + 's';
            container.appendChild(piece);
        }
        document.body.appendChild(container);
        setTimeout(() => container.remove(), 4000);
    }
};

// ==========================================
// Streak System
// ==========================================
const Streaks = {
    _KEY: 'memory_plus_streaks',

    _load() {
        try { return JSON.parse(localStorage.getItem(this._KEY)) || {}; } catch { return {}; }
    },

    _save(data) {
        try { localStorage.setItem(this._KEY, JSON.stringify(data)); } catch {}
    },

    recordPlay() {
        const data = this._load();
        const today = new Date().toISOString().slice(0, 10);
        if (data.lastPlayDate === today) return;

        const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
        if (data.lastPlayDate === yesterday) {
            data.currentStreak = (data.currentStreak || 0) + 1;
        } else if (data.lastPlayDate) {
            // Grace: check if 2 days ago (forgiveness)
            const twoDaysAgo = new Date(Date.now() - 172800000).toISOString().slice(0, 10);
            if (data.lastPlayDate === twoDaysAgo && !data.usedGrace) {
                data.currentStreak = (data.currentStreak || 0) + 1;
                data.usedGrace = true;
            } else {
                data.currentStreak = 1;
                data.usedGrace = false;
            }
        } else {
            data.currentStreak = 1;
        }

        data.lastPlayDate = today;
        data.totalDays = (data.totalDays || 0) + 1;
        if (data.currentStreak > (data.bestStreak || 0)) {
            data.bestStreak = data.currentStreak;
        }
        this._save(data);
    },

    get() {
        return this._load();
    }
};

// ==========================================
// Daily Challenge (seeded random)
// ==========================================
const DailyChallenge = {
    getSeed() {
        return new Date().toISOString().slice(0, 10);
    },

    seededRandom(seed) {
        let h = 0;
        for (let i = 0; i < seed.length; i++) {
            h = ((h << 5) - h + seed.charCodeAt(i)) | 0;
        }
        return function() {
            h = (h * 1103515245 + 12345) & 0x7fffffff;
            return (h >> 16) / 32768;
        };
    },

    getToday() {
        const seed = this.getSeed();
        const rng = this.seededRandom(seed);
        const gameIds = ['card-match', 'simon', 'word-quiz', 'spot-diff', 'number-memory', 'image-word', 'color-memory', 'reaction-speed'];
        const gameIndex = Math.floor(rng() * gameIds.length);
        const difficulties = ['easy', 'medium', 'hard'];
        const diffIndex = Math.floor(rng() * difficulties.length);
        return {
            gameId: gameIds[gameIndex],
            difficulty: difficulties[diffIndex],
            seed
        };
    },

    isCompletedToday() {
        return Settings.get('dailyCompleted', '') === this.getSeed();
    },

    markCompleted() {
        Settings.set('dailyCompleted', this.getSeed());
    }
};

// ==========================================
// Break Reminder
// ==========================================
const BreakReminder = {
    _startTime: null,
    _interval: null,
    _reminded: false,
    THRESHOLD: 20 * 60 * 1000, // 20 minutes

    start() {
        this._startTime = Date.now();
        this._reminded = false;
        this._interval = setInterval(() => this._check(), 60000);
    },

    stop() {
        if (this._interval) clearInterval(this._interval);
        this._interval = null;
    },

    _check() {
        if (this._reminded || !this._startTime) return;
        if (Date.now() - this._startTime >= this.THRESHOLD) {
            this._reminded = true;
            this._showReminder();
        }
    },

    _showReminder() {
        const el = document.getElementById('break-reminder');
        if (el) {
            el.style.display = 'flex';
            Sound.levelUp();
            Haptic.success();
        }
    },

    dismiss() {
        const el = document.getElementById('break-reminder');
        if (el) el.style.display = 'none';
        this._startTime = Date.now();
        this._reminded = false;
    }
};

// ==========================================
// Onboarding
// ==========================================
const Onboarding = {
    _KEY: 'memory_plus_onboarded',

    needsOnboarding() {
        return !Settings.get(this._KEY, false);
    },

    complete() {
        Settings.set(this._KEY, true);
    },

    show() {
        const modal = document.getElementById('modal-onboarding');
        if (modal) {
            modal.style.display = 'flex';
            this._step = 0;
            this._showStep();
        }
    },

    steps: [
        { title: 'ברוכים הבאים!', text: 'זיכרון פלוס הוא אוסף משחקי חשיבה וזיכרון שעוזרים לשמור על מוח פעיל ובריא.', icon: '🧠' },
        { title: 'בחרו משחק', text: 'לחצו על כרטיס משחק כדי להתחיל. בחרו רמת קושי ובהצלחה!', icon: '🎮' },
        { title: 'אתגר יומי', text: 'כל יום מחכה לכם אתגר חדש! שחקו כל יום כדי לבנות רצף.', icon: '📅' },
        { title: 'הגדרות', text: 'אפשר לשנות גודל טקסט, ניגודיות, וצלילים בלחיצה על כפתור ההגדרות.', icon: '⚙️' },
    ],

    _step: 0,

    _showStep() {
        const s = this.steps[this._step];
        const container = document.getElementById('onboarding-content');
        if (!container) return;
        container.innerHTML = `
            <div class="onboarding-icon">${s.icon}</div>
            <h3>${s.title}</h3>
            <p>${s.text}</p>
            <div class="onboarding-progress">צעד ${this._step + 1} מתוך ${this.steps.length}</div>
            <div class="onboarding-actions">
                ${this._step > 0 ? '<button class="btn-secondary" onclick="Onboarding.prev()">הקודם</button>' : ''}
                <button class="btn-primary" onclick="Onboarding.next()">${this._step < this.steps.length - 1 ? 'הבא' : 'בואו נתחיל!'}</button>
            </div>
        `;
    },

    next() {
        Sound.click();
        Haptic.tap();
        if (this._step < this.steps.length - 1) {
            this._step++;
            this._showStep();
        } else {
            this.close();
        }
    },

    prev() {
        Sound.click();
        if (this._step > 0) {
            this._step--;
            this._showStep();
        }
    },

    close() {
        const modal = document.getElementById('modal-onboarding');
        if (modal) modal.style.display = 'none';
        this.complete();
    }
};

// ==========================================
// Share Results (Web Share API)
// ==========================================
const ShareUtils = {
    async share(text) {
        if (navigator.share) {
            try {
                await navigator.share({ title: 'זיכרון פלוס', text });
            } catch {}
        } else {
            try {
                await navigator.clipboard.writeText(text);
                return 'copied';
            } catch { return 'failed'; }
        }
        return 'shared';
    }
};

// ==========================================
// iOS Install Guide
// ==========================================
const IOSGuide = {
    isIOS() {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    },

    isStandalone() {
        return window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
    },

    shouldShow() {
        return this.isIOS() && !this.isStandalone() && !Settings.get('iosGuideDismissed', false);
    },

    show() {
        const modal = document.getElementById('modal-ios-guide');
        if (modal) modal.style.display = 'flex';
    },

    dismiss() {
        const modal = document.getElementById('modal-ios-guide');
        if (modal) modal.style.display = 'none';
        Settings.set('iosGuideDismissed', true);
    }
};

// ==========================================
// Shared Shuffle
// ==========================================
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
