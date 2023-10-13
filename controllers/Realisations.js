import dotenv from 'dotenv';
dotenv.config();

import query from '../database.js';



export default (req, res) => {
       query(
        'SELECT * FROM realisations ORDER BY rankingRealisation ASC',
        [],
        (error, results) => {
            if(error) {
                console.error(error);
                res.status(500).send('Erreur lors de la requete');
                return;
            }
            res.render('portfolio',{realisations : results});
        }
    );
};
