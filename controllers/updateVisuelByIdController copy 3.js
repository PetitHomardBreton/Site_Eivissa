import query from "../database.js";
import formidable from "formidable";
import fs from "fs";
import { v4 as uuidv4 } from 'uuid';

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

    const copyFileToPublic = (oldPath, originalFilename, callback) => {
        const newFilename = uuidv4() + "_" + originalFilename;
        const newPath = "public/img/" + newFilename;
        
        fs.copyFile(oldPath, newPath, (error) => {
            if (error) {
                console.error(`Erreur lors de la copie du fichier ${error}`);
                return callback(error);
            }
            callback(null, newFilename);
        });
    }

    formData.parse(req, (error, fields, files) => {
        if (error) {
            console.error(`Erreur lors de la récupération du visuel ${error}`);
            res.status(500).send("Erreur serveur");
            return;
        }

        let visuelWidth767Name = "";
        let visuelWidth1920Name = "";

        if (files.newVisuelWidth767 && files.newVisuelWidth767[0] && files.newVisuelWidth767[0].originalFilename) {
            copyFileToPublic(files.newVisuelWidth767[0].filepath, files.newVisuelWidth767[0].originalFilename, (error, newFilename) => {
                if (error) {
                    res.status(500).send("Erreur serveur");
                    return;
                }
                visuelWidth767Name = newFilename;

                if (files.newVisuelWidth1920 && files.newVisuelWidth1920[0] && files.newVisuelWidth1920[0].originalFilename) {
                    copyFileToPublic(files.newVisuelWidth1920[0].filepath, files.newVisuelWidth1920[0].originalFilename, (error, newFilename) => {
                        if (error) {
                            res.status(500).send("Erreur serveur");
                            return;
                        }
                        visuelWidth1920Name = newFilename;
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
        } else if (files.newVisuelWidth1920 && files.newVisuelWidth1920[0] && files.newVisuelWidth1920[0].originalFilename) {
            copyFileToPublic(files.newVisuelWidth1920[0].filepath, files.newVisuelWidth1920[0].originalFilename, (error, newFilename) => {
                if (error) {
                    res.status(500).send("Erreur serveur");
                    return;
                }
                visuelWidth1920Name = newFilename;
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

