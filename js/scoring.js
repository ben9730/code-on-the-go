/* ==========================================
   Scoring System - LocalStorage based
   with history tracking
   ========================================== */

const Scoring = {
    STORAGE_KEY: 'memory_plus_scores',
    HISTORY_KEY: 'memory_plus_history',

    getAll() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : {};
        } catch {
            return {};
        }
    },

    save(gameId, scoreData) {
        const all = this.getAll();
        if (!all[gameId]) {
            all[gameId] = { best: 0, bestTime: null, plays: 0 };
        }
        all[gameId].plays += 1;
        all[gameId].lastPlayed = new Date().toISOString();
        if (scoreData.score > all[gameId].best) {
            all[gameId].best = scoreData.score;
        }
        if (scoreData.time && (!all[gameId].bestTime || scoreData.time < all[gameId].bestTime)) {
            all[gameId].bestTime = scoreData.time;
        }
        if (scoreData.level && (!all[gameId].bestLevel || scoreData.level > all[gameId].bestLevel)) {
            all[gameId].bestLevel = scoreData.level;
        }
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(all));
        } catch (e) {
            console.warn('Memory Plus: Unable to save scores', e.message);
        }

        // Save to history (last 50 entries)
        this._addHistory(gameId, scoreData);
    },

    _addHistory(gameId, scoreData) {
        try {
            const history = JSON.parse(localStorage.getItem(this.HISTORY_KEY)) || [];
            history.push({
                gameId,
                score: scoreData.score,
                time: scoreData.time,
                level: scoreData.level,
                date: new Date().toISOString()
            });
            // Keep last 50
            while (history.length > 50) history.shift();
            localStorage.setItem(this.HISTORY_KEY, JSON.stringify(history));
        } catch {}
    },

    getHistory(gameId) {
        try {
            const history = JSON.parse(localStorage.getItem(this.HISTORY_KEY)) || [];
            return gameId ? history.filter(h => h.gameId === gameId) : history;
        } catch { return []; }
    },

    getGame(gameId) {
        const all = this.getAll();
        return all[gameId] || { best: 0, bestTime: null, plays: 0 };
    },

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
};
