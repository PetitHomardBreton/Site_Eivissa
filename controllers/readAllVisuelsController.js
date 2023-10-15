import { getAllVisuels } from '../models/visuelModel.js';

export default (req, res) => {


    getAllVisuels((errorVisuels, visuels) => {
        if (errorVisuels) {
            console.error(errorVisuels);
            res.status(500).send('Erreur lors de la requête des visuels');
            return;
        }

        res.render('readAllVisuels', {pageTitle: 'Visuels', visuels });
    });
};

