import { getAllThemes } from '../models/themeModel.js';
import { getAllRealisations } from '../models/realisationModel.js';
import {getRealisationsByTheme} from '../models/themesrealisationsModel.js';

export default (req, res) => {
    const themeId = req.query.themeId;

    getAllThemes((errorThemes, themes) => {
        if (errorThemes) {
            console.error(errorThemes);
            res.status(500).send('Erreur lors de la requête des thèmes');
            return;
        }

        // Si une ID de thème est fournie (requête fetch)
        if (themeId) {
            getRealisationsByTheme(themeId, (errorRealisations, realisations) => {
                if (errorRealisations) {
                    console.error(errorRealisations);
                    res.status(500).send('Erreur lors de la requête des réalisations');
                    return;
                }
                res.json(realisations);
            });
            return;
        }

        // Pour une requête normale, renvoyer tous les thèmes et toutes les réalisations
        getAllRealisations((errorRealisations, realisations) => {
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


