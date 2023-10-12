import dotenv from 'dotenv';
dotenv.config();

import query from '../database.js';

/***AFFICHER LE FORMULAIRE DE MODIFICATION */
export function updateTheme(req, res) {
    let id = req.params.id;

    query(
        'SELECT * FROM themes WHERE id = ?', [id],
        (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send('Erreur lors de la requête');
                return;
            }

            const theme = results[0];

            if (!theme) {
                return res.status(404).send(`le thème avec l'id ${id} n'a pas été trouvé`);
            }

            // Appeler le template themeForm en lui passant les informations concernant le thème
            res.render('themeForm', {title: 'Modification d\'un thème', action: `/themes/${id}/update`, theme, pageTitle: 'Modification d\'un thème'});
        }
    );
};

export function updateThemeSubmit(req, res) {
    let id = req.params.id;
    
    const updateThemeIntoDb = (data) => {
        query(`UPDATE themes SET nameTheme = ?,
                               rankingTheme = ?
            WHERE id = ?`, data,
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).send('Erreur lors de la requête');
                    return;
                }
                // Rediriger vers la page des thèmes
                res.redirect('/themes');
            }
        );
    };
    
    // Utiliser directement req.body pour récupérer les données du formulaire
    const { nameTheme, rankingTheme } = req.body;

    // Vérification des champs
    updateThemeIntoDb([nameTheme, rankingTheme, id]);
}


