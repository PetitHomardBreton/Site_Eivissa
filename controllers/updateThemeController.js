import { updateThemeModel, getThemeById } from '../models/themeModel.js';

/***AFFICHER LE FORMULAIRE DE MODIFICATION */
export function updateTheme(req, res) {
    let id = req.params.id;
    // Récupérer les informations du thème
    getThemeById(id, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send('Erreur lors de la requête');
            return;
        }
        // Renvoyer le formulaire
        res.render('updateTheme', {
            theme: result[0],
            pageTitle: 'Modif du thème',
            title: 'Modifier un thème',
            action: "/themes/" + result[0].id + "/update"
        });
    });
};

export function updateThemeSubmit(req, res) {
    let id = req.params.id;
    // Utiliser directement req.body pour récupérer les données du formulaire
    const { nameTheme, rankingTheme } = req.body;

    updateThemeModel([nameTheme, rankingTheme, id], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send('Erreur lors de la requête');
            return;
        }
        // Rediriger vers la page des thèmes
        res.redirect('/themes');
    });
}



