import { deleteRealisation } from "../models/realisationModel.js";

export default (req, res) => {
    const realisationToDelete = req.body.realisationToDelete;

    if (!realisationToDelete) {
        res.status(400).send('Aucune réalisation sélectionné pour suppression.');
        return;
    }

    deleteRealisation(realisationToDelete, (errorDeleteRealisation, result) => {
        if (errorDeleteRealisation) {
            console.error(errorDeleteRealisation);
            res.status(500).send('Erreur lors de la requête de suppression du réalisation');
            return;
        }

        // Une fois le réalisation supprimé, redirection vers la page des réalisations
        res.redirect('/realisations');
    });
};
