import query from '../database.js';
import { v4 } from 'uuid';

/***CREATE***/

export const createVisuel = (visuelData, visuelWidth767ImageName, visuelWidth1920ImageName, callback) => {
    const id = v4();
    query(
        `INSERT INTO visuels (id, nameVisuel, typeVisuel, rankingVisuel, commentaireVisuel, idRealisation, visuelWidth767, visuelWidth1920) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            id,
            visuelData.nameVisuel,
            visuelData.typeVisuel,
            visuelData.rankingVisuel,
            visuelData.commentaireVisuel,
            visuelData.idRealisation,
            visuelWidth767ImageName,
            visuelWidth1920ImageName,
        ],
        callback
    );
}


/***READs***/

export const getAllVisuels = (callback) => {
    query('SELECT visuels.*, realisations.nomRealisation, realisations.rankingRealisation FROM visuels JOIN realisations ON visuels.idRealisation = realisations.id ORDER BY realisations.rankingRealisation ASC, visuels.rankingVisuel ASC', [], callback);
};

export const getVisuelById = (id, callback) => {
    query('SELECT visuels.*, realisations.nomRealisation FROM visuels LEFT JOIN realisations ON visuels.idRealisation = realisations.id WHERE visuels.id = ?', [id], callback);
};

export const getAllVisuelsByRealisationId = (id, callback) => {
    console.log('id visuel : ', id);
    query(
        `
        SELECT 
            visuels.*, 
            realisations.nomRealisation AS nomRealisation
        FROM visuels 
        LEFT JOIN realisations ON visuels.idRealisation = realisations.id 
        WHERE visuels.idRealisation = ?
        ORDER BY visuels.rankingVisuel 
        ASC;`,
         [id], 
         callback);
};

/***UPDATE***/

export const updateVisuel = (id, data, callback) => {
    //query(`UPDATE visuels SET nameVisuel = ?, typeVisuel = ?, rankingVisuel = ?, commentaireVisuel = ?, idRealisation = ?, visuelWidth575 = ?, visuelWidth767 = ?, visuelWidth991 = ?, visuelWidth1199 = ?, visuelWidth1399 = ?, visuelWidth1920 = ? WHERE id = ?`, data, callback);
    query(`UPDATE visuels SET ? WHERE id = ?`, [data, id], callback);
};

/***DELETE***/

export const deleteVisuel = (visuelId, callback) => {
    query(`DELETE FROM visuels WHERE id IN(?)`, [visuelId], callback);
};
