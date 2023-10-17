import { getAllVisuelsByRealisationId } from '../models/visuelModel.js';

export default (req, res) => {
    const realisationId = req.params.realisationId;
    getAllVisuelsByRealisationId(realisationId,(errorVisuels, visuels) => {
        if (errorVisuels) {
            console.error(errorVisuels);
            res.status(500).send('Erreur lors de la requête des visuels');
            return;
        }

        res.render('readAllVisuelsByRealisation', {
            pageTitle: 'VisuelsByRealisation', 
            visuels: visuels, 
            actionDelete: "/realisations/" + realisationId + "/visuels/delete",
            actionAdd: "/realisations/" + realisationId + "/visuels/add"
        });
    });
};

