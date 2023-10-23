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
    // récupération des champs
    const newrealisation = {
        rankingRealisation : req.body.rankingRealisation ,
        nomRealisation : req.body.nomRealisation ,
        descriptionRealisation : req.body.descriptionRealisation ,
        commentaireRealisation: req.body.commentaireRealisation,

    };

    // Ajout dans la base
    createRealisation(newrealisation, (error, results) => {
        if (error) {
            console.error(`Erreur lors de l'exécution de la requête ${error}`);
            res.status(500).send('Erreur serveur');
            return;
        }
// Après avoir ajouté la réalisation:
const selectedThemes = req.body.themes; 
selectedThemes.forEach(themeId => {
    createThemeRealisationLink(themeId, results.insertId, (error) => {
        if (error) {
            console.error(`Erreur lors de la création de la liaison thème-réalisation : ${error}`);
            // Vous pourriez gérer l'erreur ici, par exemple en renvoyant une réponse d'erreur.
        }
    });
});

        // Redirection vers la liste des realisation
        res.redirect('/realisations');
    });
}

