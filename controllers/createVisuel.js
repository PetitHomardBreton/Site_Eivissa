import { createVisuel } from '../models/visuelModel.js';

// Affichage du formulaire
export function addVisuel(req, res) {
    res.render('createVisuel', { title: 'Ajout d\'un visuel :', action: '/visuels/add', pageTitle: 'createVisuel' });
};


// Soumission du formulaire
export function addVisuelSubmit(req, res) {
    // récupération des champs
    const newvisuel = {
        nameVisuel: req.body.nameVisuel,
        typeVisuel: req.body.typeVisuel,
        rankingVisuel: req.body.rankingVisuel,
        commentaireVisuel: req.body.commentaireVisuel,
        idRealisation: req.body.idRealisation,
        visuelWidth575: req.body.visuelWidth575,
        visuelWidth767: req.body.visuelWidth767,
        visuelWidth991: req.body.visuelWidth991,
        visuelWidth1199: req.body.visuelWidth1199,
        visuelWidth1399: req.body.visuelWidth1399,
        visuelWidth1920: req.body.visuelWidth1920,        
    };

    // Ajout dans la base
    createVisuel(newVisuel, (error, results) => {
        if (error) {
            console.error(`Erreur lors de l'exécution de la requête ${error}`);
            res.status(500).send('Erreur serveur');
            return;
        }
        // Redirection vers la liste des visuels
        res.redirect('/visuels');
    });
}

