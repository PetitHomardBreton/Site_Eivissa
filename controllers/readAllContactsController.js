import { getAllContacts } from '../models/contactModel.js';

export default (req, res) => {
    getAllContacts((error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Erreur lors de la requete');
            return;
        }
        res.render('readAllContacts', { contacts : results, pageTitle: 'contacts' });
    });
};