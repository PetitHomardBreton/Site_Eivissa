import { getVisuelById, updateVisuel} from '../models/visuelModel.js';

/***AFFICHER LE FORMULAIRE DE MODIFICATION */
export function readVisuelById(req, res) {
    let id = req.params.id;

    // Récupérer les informations de la réalisation
    getVisuelById(id, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send('Erreur lors de la requête');
            return;
        }
        let hasVisuelWidth767 = result[0].visuelWidth767 ? true : false;
        console.log(hasVisuelWidth767);
        let hasVisuelWidth1920 = result[0].visuelWidth1920 ? true : false;
        console.log(hasVisuelWidth1920);
        // Renvoyer le formulaire
        res.render('updateVisuel', {
            visuel: result[0],
            pageTitle: 'Modif Visuel',
            hasVisuelWidth767: hasVisuelWidth767,
            hasVisuelWidth1920: hasVisuelWidth1920,
            idVisuel: result[0].id,
            nameVisuel: result[0].nameVisuel,
            typeVisuel : result[0].typeVisuel,
            rankingVisuel: result[0].rankingVisuel,
            commentaireVisuel: result[0].commentaireVisuel,
            idRealisation: result[0].idRealisation,
            visuelWidth1920 : result[0].visuelWidth1920,
            visuelWidth767 : result[0].visuelWidth767,
            actionUpdateVisuel: "/realisations/" + result[0].idRealisation + "/visuels/" + result[0].id +  "/update"

        });
    });
};

export function updateVisuelSubmit(req, res) {
    let id = req.params.id;
    const { nameVisuel, typeVisuel, rankingVisuel, commentaireVisuel, idRealisation, visuelWidth767, visuelWidth1920 } = req.body;
    
    
    updateVisuel(id, {nameVisuel, typeVisuel, rankingVisuel, commentaireVisuel, idRealisation, visuelWidth767, visuelWidth1920}, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send('Erreur lors de la requête');
            return;
        }
        // Rediriger vers la page des visuels de la réalisations
        res.redirect("/realisations/" + idRealisation + "/visuels");


    });
}



