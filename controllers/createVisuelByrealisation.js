import formidable from 'formidable';

import fs from 'fs';

import { createVisuel } from '../models/visuelModel.js';
import {getRealisationById} from '../models/realisationModel.js';

// Affichage du formulaire
export function addVisuelByRealisation(req, res) {
    const realisationId = req.params.realisationId;
    
    getRealisationById(realisationId, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Erreur lors de la requête');
            return;
        }


        if (results.length > 0) {
            const nomRealisation = results[0].nomRealisation; 
            res.render('createVisuelByRealisation', {
                nomRealisation: nomRealisation,
                realisationId: realisationId,
                actionAdd: "/realisations/" + realisationId + "/visuels/add",
                actionDelete: "/realisations/" + realisationId + "/visuels/delete",
                pageTitle: 'createVisuelByRealisation'
            });
        } else {
            res.status(404).send('Réalisation non trouvée');
        }
    });
}



// Soumission du formulaire
export function addVisuelByRealisationSubmit(req, res) {
    const realisationId = req.params.realisationId;
    const form = formidable({ multiples: true, uploadDir: './public/img' });

    form.parse(req, (error, fields, files) => {
        if (error) {
            console.error(`Erreur lors de la récupération des images`);
            res.status(500).send('Erreur serveur');
            return;
        }

        // Récupération des noms de fichiers
        const visuelWidth767ImageName = files.visuelWidth767[0].originalFilename;
        const visuelWidth1920ImageName = files.visuelWidth1920[0].originalFilename;

        // Copie des images vers le dossier de destination
        const visuelWidth767ImagePath = './public/img/' + visuelWidth767ImageName;
        const visuelWidth1920ImagePath = './public/img/' + visuelWidth1920ImageName;

        fs.renameSync(files.visuelWidth767[0].filepath, visuelWidth767ImagePath);
        fs.renameSync(files.visuelWidth1920[0].filepath, visuelWidth1920ImagePath);

        // Appel à la fonction createVisuel du modèle
        createVisuel(
            fields,
            visuelWidth767ImageName,
            visuelWidth1920ImageName,
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).send('Erreur lors de la requête');
                    return;
                }
                // Rediriger vers la liste des visuels
                res.redirect("/realisations/"+realisationId+"/visuels");
            }
        );
    });
}



