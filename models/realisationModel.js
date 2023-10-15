import query from '../database.js';
import { v4 } from 'uuid';

/***CREATE***/

export const createRealisation = (realisationData, callback) => {
    const id = v4();
    query(
        `INSERT INTO realisations (id, nomRealisation, descriptionRealisation, idVisuelPrincipal, rankingRealisation) VALUES (?, ?, ?, ?, ?)`,
        [id, realisationData.nomRealisation, realisationData.descriptionRealisation, realisationData.idVisuelPrincipal, realisationData.rankingRealisation],
        callback
    );
}

/***READs***/

export const getAllRealisations = (callback) => {
    query('SELECT realisations.*, visuels.visuelWidth575 FROM realisations JOIN visuels ON realisations.idVisuelPrincipal = visuels.id ORDER BY rankingRealisation ASC', [], callback);
};

export const getRealisationById = (id, callback) => {
    query('SELECT * FROM realisations WHERE id = ?', [id], callback);
};

/***UPDATE***/

export const updateRealisationModel = (data, callback) => {
    query(`UPDATE realisations SET nameRealisation = ?, descriptionRealisation = ?, idVisuelPrincipal = ?, rankingRealisation = ? WHERE id = ?`, data, callback);
};

/***DELETE***/

export const deleteRealisation = (realisationId, callback) => {
    query(`DELETE FROM realisations WHERE id IN(?)`, [realisationId], callback);
};