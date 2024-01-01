import { getVisuelsOfRealisation, getAllVisuelsForCaroussel } from "../models/visuelModel.js";

export default (req, res) => {
    const idRealisation = req.params.idRealisation;
    getVisuelsOfRealisation(idRealisation, (errorVisuels, visuels) => {
        if (errorVisuels) {
            console.error(errorVisuels);
            res.status(500).send("Erreur lors de la requête des visuels");
            return;
        }

        getAllVisuelsForCaroussel((errorCaroussel, visuelsCaroussel) => {
            if (errorCaroussel) {
                console.error(errorCaroussel);
                res.status(500).send("Erreur lors de la récupération des visuels pour le carroussel");
                return;
            }

            // Filtrer pour exclure le visuel actuel de la liste du carrousel
            const filteredVisuelsCaroussel = visuelsCaroussel.filter(visuel => visuel.idRealisation !== idRealisation);

            if (visuels && visuels.length > 0) {

                visuels.forEach(visuel => {
                });

                const idVisuels = visuels[0].id;
                res.render("visuelsOfRealisation", {
                    pageTitle: "Visuels de " + visuels[0].nomRealisation,
                    visuels: visuels,
                    nomRealisation: visuels[0].nomRealisation,
                    nameVisuel: visuels[0].nameVisuel,
                    typeVisuel: visuels[0].typeVisuel,
                    commentaireVisuel: visuels[0].commentaireVisuel,
                    visuelWidth767: visuels[0].visuelWidth767,
                    visuelWidth1920: visuels[0].visuelWidth1920,
                    descriptionRealisation: visuels[0].descriptionRealisation,
                    commentaireRealisation: visuels[0].commentaireRealisation,
                    idRealisation: idRealisation,
                    idVisuels: idVisuels,
                    actionDelete: "/realisations/" + idRealisation + "/visuels/delete",
                    actionAdd: "/realisations/" + idRealisation + "/visuels/add",
                    actionRead: (id) => "/realisations/" + idRealisation + "/visuels/" + id,
                    actionUpdate: "/realisations/" + idRealisation + "/visuels/" + idVisuels + "/update",
                    visuelsCaroussel: filteredVisuelsCaroussel,
                });
            } else {
                // Rediriger vers la page actionAdd
                res.redirect("/portfolio");
            }
        });
    });
};


