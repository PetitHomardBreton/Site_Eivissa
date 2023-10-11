import dotenv from 'dotenv';
dotenv.config();

import query from '../database.js';

/****SUPPRESSION D'un THEME */
export default (req, res) => {
    const themeToDelete = req.body.themeToDelete;
    
    query(
        `DELETE FROM themes WHERE id IN(?)`,
        themeToDelete,
        (error, result) => {
            if(error) {
                console.error(error);
                res.status(500).send('Erreur lors de la requete');
                return;
            }

            //on redirige vers la page des thèmes
            res.redirect('/themes');
        }
    );
};