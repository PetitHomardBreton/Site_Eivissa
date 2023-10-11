import { v4 } from 'uuid';
import query from '../database.js';

// Export du contrôleur
export default (req, res) => {
    // Création du theme
    const newtheme = {
        id: v4(),
        Theme: req.body.Theme,
        ranking: req.body.ranking,
    };

    // Insertion du thème dans la BDD
    query(
        `INSERT INTO themes (id, Theme, ranking) VALUES (?, ?, ?)`,
        [newtheme.id, newtheme.Theme, newtheme.ranking],
        (error, results) => {
            if (error) {
                console.error(`Erreur lors de l'exécution de la requête ${error}`);
                res.status(500).send('Erreur serveur');
                return;
            }
            res.send('theme créé');
        }
    );
};
