import dotenv from 'dotenv';
dotenv.config();

import query from '../database.js';

/****DETAIL DU THEME */
export default (req, res) => {
    //récupération de l'identifiant du thème à afficher
    let id = req.params.id;

    query(
        'SELECT * FROM themes WHERE id = ?', 
        [id],
        (error, results) => {
            if(error) {
                console.error(error);
                res.status(500).send('Erreur lors de la requete');
                return;
            }
            
            const theme = results[0];
            
            if (!theme) {
                return res.status(404).send(`Theme avec l'id ${id} n'a pas été trouvé`);
            }
            
            res.render('updateTheme', {theme, pageTitle: 'Thème' });
        }
    );
};