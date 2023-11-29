import { getAllRealisations } from "../models/realisationModel.js";

export default (req, res) => {
    getAllRealisations((error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Erreur lors de la requete');
            return;
        }
        res.render('readAllRealisations', { realisations: results, pageTitle: 'Realisations' });
        
    });
};