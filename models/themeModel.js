import query from '../database.js';

export const getThemes = (callback) => {
    query('SELECT nameTheme FROM themes ORDER BY rankingTheme ASC', [], (error, results) => {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, results.map(row => row.nameTheme));
    });
};
