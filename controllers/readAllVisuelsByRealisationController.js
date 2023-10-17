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
            action: "/realisations/" + realisationId + "/visuels"
        });
    });
};

