import query from '../database.js';
import { v4 } from 'uuid';

/***CREATE***/

export const createThemeRealisationLink = (themeId, realisationId, callback) => {
    const id = v4();
    query(`INSERT INTO themesrealisations (id, idThemes, idRealisations) VALUES (?, ?, ?)`, [id, themeId, realisationId], callback);
};

/*** Delete ***/

// Supprimer les associations pour une réalisation donnée
export const deleteThemesForRealisation = (realisationId, callback) => {
    query(`DELETE FROM themesrealisations WHERE idRealisations = ?`, [realisationId], callback);
};