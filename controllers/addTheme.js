import { v4 } from 'uuid';
import query from '../database.js';


//AFFICHAGE DU FORMULAIRE
export function addTheme(req, res) {
    res.render('themeForm', { title: 'Ajout d\'un theme', action: '/themes/add' });
};

/*******AJOUT D UN CONTACT ET ACTUALISATION DE L AFFICHAGE */
export function addThemeSubmit(req, res) {
        
            
            const id = v4();
            
            // Faire la requête INSERT
            query(
                'INSERT INTO Contacts (id, civilite, lastName, surname, phone, email, image) VALUES(?, ?)',
                [id, fields.Theme],
                (error, result) => {
                    if (error) {
                        console.error(error);
                        res.status(500).send('Erreur lors de la requete');
                        return;
                    }
                    //on redirige vers la page d'accueil
                    res.redirect('/themes');
                }
            );
        }