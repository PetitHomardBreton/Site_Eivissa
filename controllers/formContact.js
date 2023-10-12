import { v4 } from 'uuid';
import query from '../database.js';
import nodemailer from 'nodemailer';
import { DateTime } from 'luxon';
import formidable from 'formidable';

// Configuration de Nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',  // Remplacez par l'hôte SMTP de votre fournisseur
    port: 465,                      // Port habituellement utilisé pour SMTP sécurisé. Cela pourrait aussi être 587.
    secure: true,                   // true pour le port 465, false pour les autres ports
    auth: {
        user: process.env.EMAIL_USER,    // Votre adresse e-mail
        pass: process.env.EMAIL_PWD,      // Votre mot de passe
    }
});

// AFFICHAGE DU FORMULAIRE
export function showContactForm(req, res) {
    res.render('formContact', { pageTitle: 'Contact', fullPage: true });
}

// AJOUT D'UN CONTACT ET ACTUALISATION DE L'AFFICHAGE
export function addContactSubmit(req, res) {
    const form = formidable({ multiples: true });
    const creationDate = DateTime.now().toISODate();
    console.log(creationDate);

    const id = v4();

    // Insertion du contact dans la BDD
    query(
        'INSERT INTO contacts (id, lastName, firstname, email, message, creationDate) VALUES (?, ?, ?, ?, ?, ?)',
        [id, req.body.lastname, req.body.firstname, req.body.email, req.body.message, creationDate],
        (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send('Erreur lors de la requête');
                return;
            }

            // Envoi d'un email avec les informations du contact
            const mailOptions = {
                from: process.env.EMAIL_USER, // Expéditeur, // Expéditeur
                to: process.env.EMAIL_TO, // Destinataire
                subject: 'Nouveau message de contact reçu',
                text: `Nom: ${req.body.lastname}\nPrénom: ${req.body.firstname}\nEmail: ${req.body.email}\nMessage: ${req.body.message}`
            };

            transporter.sendMail(mailOptions, (mailError, info) => {
                if (mailError) {
                    console.error('Erreur lors de l\'envoi de l\'email:', mailError);
                } else {
                    console.log('Email envoyé: ' + info.response);
                }
            });

            // Redirection vers la page de confirmation d'envoi
            res.redirect("/contactSubmitted");
        }
    );
}



