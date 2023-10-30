import { getThemesForRealisation, updateRealisationModel, getRealisationById} from '../models/realisationModel.js';
import { getAllThemes } from '../models/themeModel.js';
import { createThemeRealisationLink, deleteThemesForRealisation } from '../models/themesrealisationsModel.js';

/***AFFICHER LE FORMULAIRE DE MODIFICATION */
export function updateRealisation(req, res) {
    let id = req.params.id;

    // Récupérer les informations de la réalisation
    getRealisationById(id, (error, realisationResult) => {
        if (error) {
            console.error(error);
            res.status(500).send('Erreur lors de la requête');
            return;
        }

        getThemesForRealisation(id, (error, themesForRealisation) => {
            if (error) {
                console.error(error);
                res.status(500).send('Erreur lors de la requête');
                return;
            }

            getAllThemes((error, allThemes) => {
                if (error) {
                    console.error(error);
                    res.status(500).send('Erreur lors de la requête');
                    return;
                }

                // Renvoyer le formulaire
                res.render('updateRealisation', {
                    realisation: realisationResult[0],
                    associatedThemes: themesForRealisation,
                    allThemes: allThemes,
                    pageTitle: 'Modif Realisation',
                    nomRealisation: realisationResult[0].nomRealisation,
                    visuelRealisation: realisationResult[0].visuelRealisation,
                    idRealisation: realisationResult[0].id,
                    actionUpdateRealisation: "/realisations/" + realisationResult[0].id + "/update"
                });
            });
        });
    });
};

export function updateRealisationSubmit(req, res) {
    let id = req.params.id;
    const { rankingRealisation, nomRealisation, descriptionRealisation, commentaireRealisation, themes } = req.body;

    updateRealisationModel([rankingRealisation, nomRealisation, descriptionRealisation, commentaireRealisation, id], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send('Erreur lors de la requête');
            return;
        }

        // Mettre à jour les associations de thèmes pour la réalisation :
        deleteThemesForRealisation(id, (error) => {
            if (error) {
                console.error(error);
                res.status(500).send('Erreur lors de la suppression des thèmes associés');
                return;
            }

            // Si des thèmes ont été sélectionnés, ajoutez-les comme nouvelles associations :
            if (themes && themes.length > 0) {
                let addedCount = 0;
                themes.forEach(themeId => {
                    createThemeRealisationLink(themeId, id, (error) => {
                        if (error) {
                            console.error(error);
                            res.status(500).send('Erreur lors de l’ajout d’un thème associé');
                            return;
                        }

                        addedCount++;
                        if (addedCount === themes.length) {
                            // Redirigez vers la page des réalisations après avoir traité tous les thèmes
                            res.redirect('/realisations');
                        }
                    });
                });
            } else {
                // Si aucun thème n'est sélectionné, redirigez simplement
                res.redirect('/realisations');
            }
        });
    });
}




