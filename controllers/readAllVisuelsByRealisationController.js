import { getAllVisuelsByRealisationId } from "../models/visuelModel.js";

export default (req, res) => {
    const idRealisation = req.params.idRealisation;
    getAllVisuelsByRealisationId(idRealisation, (errorVisuels, visuels) => {
        if (errorVisuels) {
            console.error(errorVisuels);
            res.status(500).send("Erreur lors de la requête des visuels");
            return;
        }

        if (visuels && visuels.length > 0) {
            
            const idVisuels = visuels[0].id; 
            res.render("readAllVisuelsByRealisation", {
                pageTitle: "VisuelsByRealisation",
                visuels: visuels,
                nomRealisation: visuels[0].nomRealisation,
                idRealisation: idRealisation,
                idVisuels: idVisuels,
                actionDelete: "/realisations/" + idRealisation + "/visuels/delete",
                actionAdd: "/realisations/" + idRealisation + "/visuels/add",
                actionRead: (id) => "/realisations/" + idRealisation + "/visuels/" + id,
                actionUpdate: "/realisations/" + idRealisation + "/visuels/" + idVisuels + "/update",
            });
        } else {
            res.status(404).send("Aucun visuel trouvé pour cette réalisation.");
        }
    });
}

