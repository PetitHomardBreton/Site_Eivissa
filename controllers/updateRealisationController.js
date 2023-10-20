import { updateRealisationModel, getRealisationById} from '../models/realisationModel.js';

/***AFFICHER LE FORMULAIRE DE MODIFICATION */
export function updateRealisation(req, res) {
    let id = req.params.id;
    // Récupérer les informations de la réalisation
    getRealisationById(id, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send('Erreur lors de la requête');
            return;
        }
        // Renvoyer le formulaire
        res.render('updateRealisation', {
            realisation: result[0],
            pageTitle: 'Modif Realisation',
            nomRealisation: result[0].nomRealisation,
            visuelRealisation : result[0].visuelRealisation,
            idRealisation: result[0].id,
            /*title: 'Modifier une réalisation',*/
            actionUpdateRealisation: "/realisations/" + result[0].id + "/update"
        });
    });
};

export function updateRealisationSubmit(req, res) {
    let id = req.params.id;
    // Utiliser directement req.body pour récupérer les données du formulaire
    const { rankingRealisation, nomRealisation, descriptionRealisation, commentaireRealisation } = req.body;

    updateRealisationModel([rankingRealisation, nomRealisation, descriptionRealisation, commentaireRealisation, id], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send('Erreur lors de la requête');
            return;
        }
        // Rediriger vers la page des réalisations
        res.redirect('/realisations');
    });
}



