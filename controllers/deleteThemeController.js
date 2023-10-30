import { deleteTheme } from "../models/themeModel.js";

export default (req, res) => {
    const themeToDelete = req.body.themeToDelete;

    if (!themeToDelete) {
        res.status(400).send('Aucun thème sélectionné pour suppression.');
        return;
    }

    deleteTheme(themeToDelete, (errorDeleteTheme, result) => {
        if (errorDeleteTheme) {
            console.error(errorDeleteTheme);
            res.status(500).send('Erreur lors de la requête de suppression du thème');
            return;
        }

        // Une fois le thème supprimé, redirection vers la page des thèmes
        res.redirect('/themes');
    });
};
