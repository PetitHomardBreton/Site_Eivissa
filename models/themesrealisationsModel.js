import query from '../database.js';
import { v4 } from 'uuid';

/***CREATE***/

export const createThemeRealisationLink = (themeId, realisationId, callback) => {
    query(`INSERT INTO themesrealisations (idThemes, idRealisations) VALUES (?, ?)`, [themeId, realisationId], callback);
};
