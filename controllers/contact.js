import { v4 } from 'uuid';
import query from '../database.js';
import formidable from 'formidable';
import { DateTime} from 'luxon';

// AFFICHAGE DU FORMULAIRE
export function showcontactform (req, res) {
    res.render('contact', { pageTitle: 'Contact' });
}

// AJOUT D'UN CONTACT ET ACTUALISATION DE L'AFFICHAGE
export function addContactSubmit(req, res) {
    const form = formidable({ multiples: true });
    const creationDate = DateTime.now().toISODate();
    console.log(creationDate);

    const id = v4();

    // Faire la requête INSERT
    query(
        'INSERT INTO contacts (id, lastName, firstname, email, message, creationDate) VALUES (?, ?, ?, ?, ?, ?)',
        [id, req.body.lastname, req.body.firstname, req.body.email, req.body.message , creationDate],
        (error, result) => {
            if (error) {
                console.error(error);
                res.status(500).send('Erreur lors de la requête');
                return;
            }
            // On redirige vers la page d'accueil
            res.redirect("/contact/submitted");
        }
    );
}


