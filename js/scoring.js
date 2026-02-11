/* ==========================================
   Scoring System - LocalStorage based
   ========================================== */

const Scoring = {
    STORAGE_KEY: 'memory_plus_scores',

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
