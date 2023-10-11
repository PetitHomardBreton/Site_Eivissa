import dotenv from 'dotenv';
dotenv.config();

import query from '../database.js';

export function updateTheme(req, res) {
    let id = req.params.id;

    query(
        'SELECT * FROM themes WHERE id = ?', [id],
        (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send('Erreur lors de la requete');
                return;
            }

            const theme = results[0];

            if (!theme) {
                return res.status(404).send(`Theme with id ${id} not found`);
            }

            //on appelle le template contactForm en lui passant les informations concernant le contact
            res.render('themeForm', {
                title: 'Modification d\'un theme',
                action: `/themes/${id}/update`,
                theme
            });
        }
    );
}