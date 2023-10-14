import { deleteContact } from "../models/contactModel.js";

export default (req, res) => {
    const contactToDelete = req.body.contactToDelete;

    if (!contactToDelete) {
        res.status(400).send('Aucun contact sélectionné pour suppression.');
        return;
    }

    deleteContact(contactToDelete, (errorDeleteContact, result) => {
        if (errorDeleteContact) {
            console.error(errorDeleteContact);
            res.status(500).send('Erreur lors de la requête de suppression du contact');
            return;
        }

        // Une fois le contact supprimé, redirection vers la page des contacts
        res.redirect('/contacts');
    });
};
