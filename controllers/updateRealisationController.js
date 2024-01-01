import { getThemesForRealisation, updateRealisationModel, getRealisationById } from '../models/realisationModel.js'; // Importation de la fonction getRealisationById
import { getAllThemes } from '../models/themeModel.js'; // Importation de la fonction getAllThemes
import { createThemeRealisationLink, deleteThemesForRealisation } from '../models/themesrealisationsModel.js'; // Importation de la fonction createThemeRealisationLink et deleteThemesForRealisation

/***AFFICHER LE FORMULAIRE DE MODIFICATION */
export function updateRealisation(req, res) { // Exportation de la fonction updateRealisation
    let id = req.params.id; // Récupérer l’identifiant de la réalisation à modifier

    // Récupérer les informations de la réalisation
    getRealisationById(id, (error, realisationResult) => { // Appel de la fonction getRealisationById
        if (error) { // Si erreur
            console.error(error); // Afficher l’erreur
            res.status(500).send('Erreur lors de la requête'); // Afficher le message d’erreur
            return; // Arrêter
        }

        getThemesForRealisation(id, (error, themesForRealisation) => { // Appel de la fonction getThemesForRealisation
            if (error) { // Si erreur
                console.error(error); // Afficher l’erreur
                res.status(500).send('Erreur lors de la requête'); // Afficher le message d’erreur
                return; // Arrêter
            }

            getAllThemes((error, allThemes) => { // Appel de la fonction getAllThemes
                if (error) { // Si erreur
                    console.error(error); // Afficher l’erreur
                    res.status(500).send('Erreur lors de la requête'); // Afficher le message d’erreur
                    return; // Arrêter
                }

                // Renvoyer le formulaire
                res.render('updateRealisation', { // Renvoyer la page updateRealisation
                    realisation: realisationResult[0], // Renvoyer les informations de la réalisation
                    associatedThemes: themesForRealisation, // Renvoyer les thèmes associés à la réalisation
                    allThemes: allThemes, // Renvoyer tous les thèmes
                    pageTitle: 'Modif Realisation', // Renvoyer le titre de la page
                    nomRealisation: realisationResult[0].nomRealisation, // Renvoyer le nom de la réalisation
                    visuelRealisation: realisationResult[0].visuelRealisation,  // Renvoyer le visuel de la réalisation
                    idRealisation: realisationResult[0].id, // Renvoyer l’identifiant de la réalisation
                    actionUpdateRealisation: "/realisations/" + realisationResult[0].id + "/update" // Renvoyer l’action du formulaire
                });
            });
        });
    });
};

export function updateRealisationSubmit(req, res) { // Exportation de la fonction updateRealisationSubmit
    let id = req.params.id; // Récupérer l’identifiant de la réalisation à modifier
    const { rankingRealisation, nomRealisation, descriptionRealisation, commentaireRealisation, themes } = req.body; // Récupérer les informations du formulaire

    // Convertir la chaîne de caractères en un tableau d'identifiants de thèmes
    const themeArray = typeof themes === 'string' ? themes.split(',') : themes;

    // Mettre à jour la réalisation

    updateRealisationModel([rankingRealisation, nomRealisation, descriptionRealisation, commentaireRealisation, id], (error, result) => { // Appel de la fonction updateRealisationModel
        if (error) { // Si erreur
            console.error(error); // Afficher l’erreur
            res.status(500).send('Erreur lors de la mise à jour de la réalisation'); // Afficher le message d’erreur
            return; // Arrêter
        }

        deleteThemesForRealisation(id, (error) => { // Appel de la fonction deleteThemesForRealisation
            if (error) { // Si erreur
                console.error(error); // Afficher l’erreur
                res.status(500).send('Erreur lors de la suppression des thèmes associés');  // Afficher le message d’erreur
                return;  // Arrêter

            }

            // Parcourez le tableau des identifiants de thèmes et créez les liens
            themeArray.forEach(themeId => { // Parcourir le tableau des identifiants de thèmes
                createThemeRealisationLink(themeId, id, (error) => {    // Appel de la fonction createThemeRealisationLink
                    if (error) { // Si erreur
                        console.error(error); // Afficher l’erreur
                        res.status(500).send('Erreur lors de l’ajout d’un thème associé'); // Afficher le message d’erreur
                        return; // Arrêter
                    }
                });
            });

            // Redirigez après avoir traité les thèmes associés
            res.redirect('/realisations'); // Rediriger vers la page realisations
        });
    });
}



