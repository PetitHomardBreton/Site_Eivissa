import { createRealisation } from '../models/realisationModel.js';

// Affichage du formulaire
export function addRealisation(req, res) {
    res.render('createrealisation', { title: 'Ajout d\'une réalisation :', action: '/realisations/add', pageTitle: 'createrealisation' });
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
        // Redirection vers la liste des realisation
        res.redirect('/realisations');
    });
}

