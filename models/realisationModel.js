import query from '../database.js';
import { v4 } from 'uuid';

/***CREATE***/

export const createRealisation = (realisationData, callback) => {
    const id = v4();
    query(
        `INSERT INTO realisations (id, rankingRealisation, nomRealisation, descriptionRealisation, commentaireRealisation) VALUES (?, ?, ?, ?, ?)`,
        [id, realisationData.rankingRealisation, realisationData.nomRealisation, realisationData.descriptionRealisation, realisationData.commentaireRealisation],
        (error) => {
            // Si vous avez une erreur, vous la retournez comme d'habitude
            if (error) {
                callback(error, null);
                return;
            }
            
            // Si tout va bien, vous retournez également l'ID généré
            callback(null, id);
        }
    );
}


/***READs***/

export const getAllRealisations = (callback) => {
    query('SELECT r.*, IFNULL(vw.visuelWidth767, vw.visuelWidth1920) AS visuelRealisation FROM realisations r LEFT JOIN ( SELECT v.idRealisation, v.visuelWidth767, v.visuelWidth1920 FROM visuels v WHERE v.rankingVisuel = ( SELECT MIN(rankingVisuel) FROM visuels WHERE idRealisation = v.idRealisation ) ) vw ON r.id = vw.idRealisation  WHERE r.rankingRealisation > 0 ORDER BY r.rankingRealisation ASC ', [], callback);
};

export const getShowreel = (callback) => {
    query('SELECT r.*, IFNULL(vw.visuelWidth767, vw.visuelWidth1920) AS visuelRealisation FROM realisations r LEFT JOIN ( SELECT v.idRealisation, v.visuelWidth767, v.visuelWidth1920 FROM visuels v WHERE v.rankingVisuel = ( SELECT MIN(rankingVisuel) FROM visuels WHERE idRealisation = v.idRealisation ) ) vw ON r.id = vw.idRealisation  WHERE r.rankingRealisation = 0 ', [], callback);
};

export const getRealisationById = (id, callback) => {
    query('SELECT r.*, IFNULL(vw.visuelWidth767, vw.visuelWidth1920) AS visuelRealisation FROM realisations r LEFT JOIN ( SELECT v.idRealisation, v.visuelWidth767, v.visuelWidth1920 FROM visuels v WHERE v.rankingVisuel = ( SELECT MIN(rankingVisuel) FROM visuels ) ) vw ON r.id = vw.idRealisation WHERE r.id = ?', [id], callback);
};

export const getThemesForRealisation = (realisationId, callback) => {
    query(`
        SELECT t.* 
        FROM themes t 
        JOIN themesrealisations tr ON t.id = tr.idThemes
        WHERE tr.idRealisations = ?
    `, [realisationId], callback);
};


/***UPDATE***/

export const updateRealisationModel = (data, callback) => {
    query(`UPDATE realisations SET rankingRealisation = ?, nomRealisation = ?, descriptionRealisation = ?, commentaireRealisation = ? WHERE realisations.id = ?`, data, callback);
};

/***DELETE***/

export const deleteRealisation = (realisationId, callback) => {
    query(`DELETE FROM realisations WHERE id IN(?)`, [realisationId], callback);
};