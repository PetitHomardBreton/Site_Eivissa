import { createTheme } from '../models/themeModel.js';

// Affichage du formulaire
export function addTheme(req, res) {
    res.render('createTheme', { title: 'Ajout d\'un thème :', action: '/themes/add', pageTitle: 'createTheme' });
};

// Ajout d'un thème et actualisation de l'affichage

export function addThemeSubmit(req, res) {
    // récupération des champs
    const newtheme = {
        nameTheme: req.body.nameTheme,
        rankingTheme: req.body.rankingTheme,
    };

    // Utilisation de la fonction createTheme pour insérer le thème dans la BDD
    createTheme(newtheme, (error, results) => {
        if (error) {
            console.error(`Erreur lors de l'exécution de la requête ${error}`);
            res.status(500).send('Erreur serveur');
            return;
        }
        // Redirection vers la liste des thèmes
        res.redirect('/themes');
    });
}

