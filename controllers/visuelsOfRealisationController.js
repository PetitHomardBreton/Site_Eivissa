import { getVisuelsOfRealisation } from "../models/visuelModel.js";

export default (req, res) => {
    const idRealisation = req.params.idRealisation;
    getVisuelsOfRealisation(idRealisation, (errorVisuels, visuels) => {
        if (errorVisuels) {
            console.error(errorVisuels);
            res.status(500).send("Erreur lors de la requête des visuels");
            return;
        }

        if (visuels && visuels.length > 0) {

            const idVisuels = visuels[0].id;
            res.render("visuelsOfRealisation", {
                pageTitle: "VisuelsByRealisation",
                visuels: visuels,
                nomRealisation: visuels[0].nomRealisation,
                nameVisuel: visuels[0].nameVisuel,
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
            });
        } else {
            // Rediriger vers la page actionAdd
            res.redirect("/realisations/" + idRealisation + "/visuels/add");
        }
    });
}


