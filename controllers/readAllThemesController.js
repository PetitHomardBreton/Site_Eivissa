import { getAllThemes } from '../models/themeModel.js';

export default (req, res) => {
    getAllThemes((error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Erreur lors de la requete');
            return;
        }
        res.render('themes', { themes: results, pageTitle: 'Themes' });
    });
};