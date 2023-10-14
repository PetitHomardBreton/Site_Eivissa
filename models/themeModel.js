import query from '../database.js';
import { v4 } from 'uuid'; // Assurez-vous d'avoir ce package installé

/***CREATE***/

export const createTheme = (themeData, callback) => {
    const id = v4();
    query(
        `INSERT INTO themes (id, nameTheme, rankingTheme) VALUES (?, ?, ?)`,
        [id, themeData.nameTheme, themeData.rankingTheme],
        callback
    );
};

/***READs***/

export const getAllThemes = (callback) => {
    query('SELECT * FROM themes ORDER BY rankingTheme ASC', [], callback);
};

export const getThemeById = (id, callback) => {
    query('SELECT * FROM themes WHERE id = ?', [id], callback);
};

/***UPDATE***/

export const updateThemeModel = (data, callback) => {
    query(`UPDATE themes SET nameTheme = ?, rankingTheme = ? WHERE id = ?`, data, callback);
};

/***DELETE***/

export const deleteTheme = (themeId, callback) => {
    query(`DELETE FROM themes WHERE id IN(?)`, [themeId], callback);
};


