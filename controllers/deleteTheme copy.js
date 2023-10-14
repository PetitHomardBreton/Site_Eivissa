import { deleteTheme } from "../models/themeModel";


/****SUPPRESSION D'un THEME */
export default (req, res) => {
    deleteTheme ((errorDeleteTheme, theme) => {
        if (errorDeleteTheme) {
            console.error(errorDeleteTheme);
            res.status(500).send('Erreur lors de la requête de suppression du thème');
            return;
        }
       //on redirige vers la page des thèmes
       res.redirect('/themes');
    }
    
    );
};