import { v4 } from 'uuid';
import query from '../database.js';

// Affichage du formulaire
export function addTheme(req, res) {
    res.render('createTheme', { title: 'Ajout d\'un thème :', action: '/themes/add', pageTitle: 'createTheme' });
};

// Ajout d'un thème et actualisation de l'affichage

export function addThemeSubmit(req, res) {

// récupération des champs
    const newtheme = {
        id: v4(),
        nameTheme: req.body.nameTheme,
        rankingTheme: req.body.rankingTheme,
    };

    // Insertion du thème dans la BDD
    query(
        `INSERT INTO themes (id, nameTheme, rankingTheme) VALUES (?, ?, ?)`,
        [newtheme.id, newtheme.nameTheme, newtheme.rankingTheme],
        (error, results) => {
            if (error) {
                console.error(`Erreur lors de l'exécution de la requête ${error}`);
                res.status(500).send('Erreur serveur');
                return;
            }
            // Redirection vers la liste des thèmes
            res.redirect('/themes');
        }
    );
}

