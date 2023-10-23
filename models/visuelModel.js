import query from '../database.js';
import { v4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


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


/***DELETE***/

export const deleteVisuel = (visuelId, callback) => {
    // Obtenez d'abord les noms des fichiers image
    query('SELECT visuelWidth767, visuelWidth1920 FROM visuels WHERE id = ?', [visuelId], (error, results) => {
        if (error || results.length === 0) {
            callback(error);
            return;
        }
        
        const visuelWidth767 = results[0].visuelWidth767;
        const visuelWidth1920 = results[0].visuelWidth1920;

        // Supprimez les fichiers image
        fs.unlink(path.join(__dirname, '..', 'public', 'img', visuelWidth767), (err) => {
            if (err) console.error("Erreur lors de la suppression de visuelWidth767:", err);
        });

        fs.unlink(path.join(__dirname, '..', 'public', 'img', visuelWidth1920), (err) => {
            if (err) console.error("Erreur lors de la suppression de visuelWidth1920:", err);
        });

        // Maintenant, supprimez l'entrée de la base de données
        query(`DELETE FROM visuels WHERE id = ?`, [visuelId], callback);
    });
};
