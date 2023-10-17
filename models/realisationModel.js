import query from '../database.js';
import { v4 } from 'uuid';

/***CREATE***/

export const createRealisation = (realisationData, callback) => {
    const id = v4();
    query(
        `INSERT INTO realisations (id, rankingRealisation, nomRealisation, descriptionRealisation, commentaireRealisation) VALUES (?, ?, ?, ?, ?)`,
        [id, realisationData.rankingRealisation, realisationData.nomRealisation, realisationData.descriptionRealisation, realisationData.commentaireRealisation],
        callback
    );
}

/***READs***/

export const getAllRealisations = (callback) => {
    query('SELECT realisations.*, visuels.visuelWidth767 FROM realisations LEFT JOIN visuels ON realisations.idVisuelPrincipal = visuels.id ORDER BY realisations.rankingRealisation ASC', [], callback);
};

export const getRealisationById = (id, callback) => {
    query('SELECT realisations.*, visuels.visuelWidth767 FROM realisations LEFT JOIN visuels ON realisations.idVisuelPrincipal = visuels.id WHERE realisations.id = ?', [id], callback);
};

/***UPDATE***/

export const updateRealisationModel = (data, callback) => {
    query(`UPDATE realisations SET rankingRealisation = ?, nomRealisation = ?, descriptionRealisation = ?, commentaireRealisation = ? WHERE realisations.id = ?`, data, callback);
};

/***DELETE***/

export const deleteRealisation = (realisationId, callback) => {
    query(`DELETE FROM realisations WHERE id IN(?)`, [realisationId], callback);
};