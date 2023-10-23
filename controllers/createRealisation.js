import { createRealisation } from '../models/realisationModel.js';
import {getAllThemes} from '../models/themeModel.js';
import {createThemeRealisationLink} from '../models/themesrealisationsModel.js';

// Affichage du formulaire
export function addRealisation(req, res) {
    getAllThemes((error, themes) => {
        if (error) {
            console.error(`Erreur lors de la récupération des thèmes ${error}`);
            res.status(500).send('Erreur serveur');
            return;
        }
        res.render('createrealisation', { 
            title: 'Ajout d\'une réalisation :', 
            action: '/realisations/add', 
            pageTitle: 'createrealisation',
            themes: themes
        });
    });
};

// Soumission du formulaire
export function addRealisationSubmit(req, res) {
    // Récupération des champs
    const newrealisation = {
        rankingRealisation : req.body.rankingRealisation,
        nomRealisation : req.body.nomRealisation,
        descriptionRealisation : req.body.descriptionRealisation,
        commentaireRealisation: req.body.commentaireRealisation
    };

    // Ajout dans la base
    createRealisation(newrealisation, (error, generatedId) => {
        if (error) {
            console.error(`Erreur lors de l'exécution de la requête ${error}`);
            res.status(500).send('Erreur serveur');
            return;
        }

        console.log("Generated ID:", generatedId);

        // Après avoir ajouté la réalisation:
        const selectedThemes = req.body.themes;

        // Utilisez un compteur pour suivre le nombre de liaisons insérées
        let count = 0;
        selectedThemes.forEach(themeId => {
            createThemeRealisationLink(themeId, generatedId, (error) => {
                if (error) {
                    console.error(`Erreur lors de la création de la liaison thème-réalisation : ${error}`);
                    // Vous pourriez gérer l'erreur ici, par exemple en renvoyant une réponse d'erreur.
                }

                // Incrémente le compteur et vérifie si toutes les liaisons ont été insérées
                count++;
                if (count === selectedThemes.length) {
                    // Redirection vers la liste des realisation seulement après que toutes les liaisons aient été insérées
                    res.redirect('/realisations');
                }
            });
        });
    });
}


