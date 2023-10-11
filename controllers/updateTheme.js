import dotenv from 'dotenv';
dotenv.config();

import query from '../database.js';
import formidable from 'formidable';

/***AFFICHER LE FORMULAIRE DE MODIFICATION */
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
                return res.status(404).send(`le thème avec l'id ${id} n'a pas été trouvé`);
            }

            //on appelle le template themeForm en lui passant les informations concernant le thème
            res.render('themeForm', {title: 'Modification d\'un thème', action: `/themes/${id}/update`, theme, pageTitle: 'Modification d\'un thème'});
        }
    );
};

export function updateThemeSubmit(req, res) {
    let id = req.params.id;
    const formData = formidable({ 
        allowEmptyFiles: true,
        minFileSize: 0
    });

    const updateThemetIntoDb = (data) => //
        query(`UPDATE themes SET nameTheme = ?,
                               rankingTheme = ?

            WHERE id = ?`, data,
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).send('Erreur lors de la requete');
                    return;
                }
                //on redirige vers la page des thèmes
                res.redirect('/themes');
            }
        );

    // Récupération des champs et des fichiers
    formData.parse(req, (error, fields, files) => {


        // Vérification des champs
        updateThemeIntoDb([
            fields.nameTheme,
            fields.rankingTheme,

            id
        ]);
    });
}

