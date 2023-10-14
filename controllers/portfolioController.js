import { getThemes } from '../models/themeModel.js';
import { getRealisations } from '../models/realisationModel.js';

export default (req, res) => {
    getThemes((errorThemes, themes) => {
        if (errorThemes) {
            console.error(errorThemes);
            res.status(500).send('Erreur lors de la requête des thèmes');
            return;
        }

        getRealisations((errorRealisations, realisations) => {
            if (errorRealisations) {
                console.error(errorRealisations);
                res.status(500).send('Erreur lors de la requête des réalisations');
                return;
            }

            res.render('portfolio', {
                pageTitle: 'Portfolio',
                fullPage: false,
                themes,
                realisations
            });
        });
    });
};
