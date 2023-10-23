import query from "../database.js";
import formidable from "formidable";
import fs from "fs";

/***AFFICHER LE FORMULAIRE DE MODIFICATION */
export function readVisuelById(req, res) {
  let id = req.params.id;

  query(
    "SELECT visuels.*, realisations.nomRealisation FROM visuels LEFT JOIN realisations ON visuels.idRealisation = realisations.id WHERE visuels.id = ?",
    [id],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la requete");
        return;
      }

      const visuel = results[0];

      if (!visuel) {
        return res.status(404).send(`Visuel with id ${id} not found`);
      }

      res.render("updateVisuel", {
        pageTitle: "Modif Visuel",
        title: "Modification d'un visuel",
        actionUpdateVisuel:
          `/realisations/${visuel.idRealisation}/visuels/${id}/update`,
        visuel,
      });
    }
  );
}

export function updateVisuelSubmit(req, res) {
    let id = req.params.id;
    const formData = formidable({
        allowEmptyFiles: true,
        minFileSize: 0,
    });

    const updateVisuelIntoDb = (data) =>
        query(
            `UPDATE visuels SET nameVisuel = ?, typeVisuel = ?, rankingVisuel = ?, commentaireVisuel = ?, visuelWidth767 = ?, visuelWidth1920 = ? WHERE id = ?`,
            data,
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).send("Erreur lors de la requête");
                    return;
                }
                res.redirect("/");
            }
        );

    formData.parse(req, (error, fields, files) => {
        if (error) {
            console.error(`Erreur lors de la récupération du visuel ${error}`);
            res.status(500).send("Erreur serveur");
            return;
        }

        let visuelWidth767Name = "";
        let visuelWidth1920Name = "";

        if (files.newVisuelWidth767 && files.newVisuelWidth767[0] && files.newVisuelWidth767[0].originalFilename) {
            let oldPath767 = files.newVisuelWidth767[0].filepath;
            let newPath767 = "public/img/" + files.visuelWidth767[0].originalFilename;
            visuelWidth767Name = files.visuelWidth767[0].originalFilename;

            fs.copyFile(oldPath767, newPath767, (error) => {
                if (error) {
                    console.error(`Erreur lors de la récupération de la photo ${error}`);
                    res.status(500).send("Erreur serveur");
                    return;
                }
                
                if (files.newVisuelWidth1920 && files.newVisuelWidth1920[0] && files.visuelWidth1920[0].originalFilename) {
                    let oldPath1920 = files.newVisuelWidth1920[0].filepath;
                    let newPath1920 = "public/img/" + files.visuelWidth1920[0].originalFilename;
                    visuelWidth1920Name = files.visuelWidth1920[0].originalFilename;

                    fs.copyFile(oldPath1920, newPath1920, (error) => {
                        if (error) {
                            console.error(`Erreur lors de la récupération de la photo ${error}`);
                            res.status(500).send("Erreur serveur");
                            return;
                        }
                        updateVisuelIntoDb([
                            fields.nameVisuel,
                            fields.typeVisuel,
                            fields.rankingVisuel,
                            fields.commentaireVisuel,
                            visuelWidth767Name,
                            visuelWidth1920Name,
                            id,
                        ]);
                    });
                } else {
                    updateVisuelIntoDb([
                        fields.nameVisuel,
                        fields.typeVisuel,
                        fields.rankingVisuel,
                        fields.commentaireVisuel,
                        visuelWidth767Name,
                        visuelWidth1920Name,
                        id,
                    ]);
                }
            });
        } else if (files.newVisuelWidth1920 && files.newVisuelWidth1920[0].originalFilename) {
            let oldPath1920 = files.newVisuelWidth1920[0].filepath;
            let newPath1920 = "public/img/" + files.visuelWidth1920[0].originalFilename;
            visuelWidth1920Name = files.visuelWidth1920[0].originalFilename;

            fs.copyFile(oldPath1920, newPath1920, (error) => {
                if (error) {
                    console.error(`Erreur lors de la récupération de la photo ${error}`);
                    res.status(500).send("Erreur serveur");
                    return;
                }
                updateVisuelIntoDb([
                    fields.nameVisuel,
                    fields.typeVisuel,
                    fields.rankingVisuel,
                    fields.commentaireVisuel,
                    visuelWidth767Name,
                    visuelWidth1920Name,
                    id,
                ]);
            });
        } else {
            updateVisuelIntoDb([
                fields.nameVisuel,
                fields.typeVisuel,
                fields.rankingVisuel,
                fields.commentaireVisuel,
                visuelWidth767Name,
                visuelWidth1920Name,
                id,
            ]);
        }
    });
}
