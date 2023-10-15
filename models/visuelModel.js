import query from '../database.js';
import { v4 } from 'uuid';

/***CREATE***/

export const createVisuel = (visuelData, callback) => {
    const id = v4();
    query(
        `INSERT INTO visuels (id, nameVisuel, typeVisuel, rankingVisuel, commentaireVisuel, idRealisation, visuelWidth575, visuelWidth767, visuelWidth991, visuelWidth1199, visuelWidth1399, visuelWidth1920) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, visuelData.nameVisuel, visuelData.typeVisuel, visuelData.rankingVisuel, visuelData.commentaireVisuel, visuelData.idRealisation, visuelData.visuelWidth575, visuelData.visuelWidth767, visuelData.visuelWidth991, visuelData.visuelWidth1199, visuelData.visuelWidth1399, visuelData.visuelWidth1920],
        callback
    );
}

/***READs***/

export const getAllVisuels = (callback) => {
    query('SELECT visuels.*, realisations.nomRealisation, realisations.rankingRealisation FROM visuels JOIN realisations ON visuels.idRealisation = realisations.id ORDER BY realisations.rankingRealisation ASC, visuels.rankingVisuel ASC', [], callback);
};

export const getVisuelById = (id, callback) => {
    query('SELECT * FROM visuels WHERE id = ?', [id], callback);
};

/***UPDATE***/

export const updateVisuelModel = (data, callback) => {
    query(`UPDATE visuels SET nameVisuel = ?, typeVisuel = ?, rankingVisuel = ?, commentaireVisuel = ?, idRealisation = ?, visuelWidth575 = ?, visuelWidth767 = ?, visuelWidth991 = ?, visuelWidth1199 = ?, visuelWidth1399 = ?, visuelWidth1920 = ? WHERE id = ?`, data, callback);
};

/***DELETE***/

export const deleteVisuel = (visuelId, callback) => {
    query(`DELETE FROM visuels WHERE id IN(?)`, [visuelId], callback);
};
