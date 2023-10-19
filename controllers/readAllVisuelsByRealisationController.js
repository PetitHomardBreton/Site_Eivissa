import { getAllVisuelsByRealisationId } from "../models/visuelModel.js";

export default (req, res) => {
  const idRealisation = req.params.idRealisation;
  const idVisuels = req.params.id;
  getAllVisuelsByRealisationId(idRealisation, (errorVisuels, visuels) => {
    if (errorVisuels) {
      console.error(errorVisuels);
      res.status(500).send("Erreur lors de la requête des visuels");
      return;
    }
   
    res.render("readAllVisuelsByRealisation", {
      pageTitle: "VisuelsByRealisation",
      visuels: visuels,
      nomRealisation: visuels[0].nomRealisation,
      idRealisation: idRealisation,
      idVisuels: idVisuels,
      actionDelete: "/realisations/" + idRealisation + "/visuels/delete",
      actionAdd: "/realisations/" + idRealisation + "/visuels/add",
      actionUpdate: "/realisations/" + idRealisation + "/visuels/" + idVisuels + "/update",
    });
  });
};
