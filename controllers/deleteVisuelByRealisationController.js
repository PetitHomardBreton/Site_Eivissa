import { deleteVisuel } from "../models/visuelModel.js";

export default (req, res) => {
    const visuelToDelete = req.body.visuelToDelete;
    const realisationId = req.params.realisationId;

    if (!visuelToDelete) {
        res.status(400).send('Aucun visuel sélectionné pour suppression.');
        return;
    }

    deleteVisuel(visuelToDelete, (errorDeleteVisuel, result) => {
        if (errorDeleteVisuel) {
            console.error(errorDeleteVisuel);
            res.status(500).send('Erreur lors de la requête de suppression du réalisation');
            return;
        }
      
        // Une fois le réalisation supprimé, redirection vers la page des réalisations
        res.redirect("/realisations/"+realisationId+"/visuels");
    });
};
