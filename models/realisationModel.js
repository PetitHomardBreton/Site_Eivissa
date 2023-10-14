import query from '../database.js';

export const getRealisations = (callback) => {
    query('SELECT realisations.*, visuels.visuelWidth575 FROM realisations JOIN visuels ON realisations.idVisuelPrincipal = visuels.id ORDER BY rankingRealisation ASC', [], callback);
};
