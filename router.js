import dotenv from "dotenv";
dotenv.config();

import express from "express";

const router = express.Router();

/***************************************
 * Importation des controllers
 ***************************************/

import HomeController from "./controllers/home.js";
/*import ThemeDetailController from "./controllers/readThemeByIdController.js";*/
import {showContactForm} from "./controllers/formContact.js";
import {addContactSubmit} from "./controllers/formContact.js";
import contactSubmittedController from "./controllers/contactSubmitted.js";
import portfolio from "./controllers/portfolioController.js";
import {loginForm, login} from './controllers/login.js';
import logged from "./controllers/logged.js";
import logout from './controllers/logout.js';
import ThemeController from "./controllers/readAllThemesController.js";
import {addTheme, addThemeSubmit} from "./controllers/createTheme.js";
import {addVisuel, addVisuelSubmit} from "./controllers/createVisuel.js";
import {addVisuelByRealisation, addVisuelByRealisationSubmit} from "./controllers/createVisuelByrealisation.js";
import { addRealisation, addRealisationSubmit } from "./controllers/createRealisation.js";  
import {updateTheme, updateThemeSubmit} from "./controllers/updateThemeController.js";
import {updateRealisation, updateRealisationSubmit} from "./controllers/updateRealisationController.js";
import deleteTheme from "./controllers/deleteThemeController.js";
import deleteRealisation from "./controllers/deleteRealisationController.js";
import deleteVisuelByRealisation  from "./controllers/deleteVisuelByRealisationController.js";
import deleteContact from "./controllers/deleteContactController.js";
import readAllContacts from "./controllers/readAllContactsController.js";
import getAllRealisations from "./controllers/readAllRealisationsController.js";
import getAllVisuelsByRealisationId from "./controllers/readAllVisuelsByRealisationController.js";
import getVisuelsOfRealisation from "./controllers/visuelsOfRealisationController.js";
import escapeData from './sanitizeInput.js';



/*********************************************
 * Middleware pour vérifier si l'utilisateur
 * est connecté
 ********************************************/
const checkAuthentication = (req, res, next) => {
  if(!req.session.isLogged) {
      res.redirect('/');
      return;
  }
  next();
}

router.use((req, res, next) => {
  res.locals.isLogged = req.session.isLogged;
  next();
});

/***************************************
 * Importation du controller d'erreur
 **************************************/

import errorController from "./controllers/errorController.js";




/*********************************************
  *Routes publiques get
 *********************************************/
router.get("/", HomeController);
router.get("/portfolio", portfolio);
router.get("/portfolio/:idRealisation", getVisuelsOfRealisation);
router.get("/contactSubmitted", contactSubmittedController);
router.get("/formContact", showContactForm);

/*********************************************
 * Routes publiques post
 ****************************************/
router.post("/formContact", escapeData, addContactSubmit);

/*********************************************
 * Routes Admin get
*********************************************/
/* login */
router.get('/login', loginForm);
router.get('/logged', checkAuthentication, logged);
router.get('/logout', checkAuthentication, logout);
/* affichage des contacts */
router.get('/contacts', checkAuthentication, readAllContacts)
/* affichage des thèmes */
router.get('/themes', checkAuthentication, ThemeController);
/* ajout d'un thème */
router.get('/themes/add', checkAuthentication, addTheme);
/* modification d'un thème */
router.get('/themes/:id/update', checkAuthentication, updateTheme);
/* affichage des réalisations */
router.get('/realisations', checkAuthentication, getAllRealisations);
/* affichage des visuels par réalisation */
router.get('/realisations/:idRealisation/visuels', checkAuthentication, getAllVisuelsByRealisationId);
/* ajout d'un visuel à une réalisation */
router.get('/realisations/:realisationId/visuels/add', checkAuthentication, addVisuelByRealisation);
/* suppression d'un visuel */
router.get('/realisations/:realisationId/visuels/delete', checkAuthentication, deleteVisuelByRealisation);
/* ajout d'une réalisation */
router.get('/realisations/add', checkAuthentication, addRealisation);
/* modification d'une réalisation */
router.get('/realisations/:id/update', checkAuthentication, updateRealisation);


/*********************************************
 * Routes Admin post
 *********************************************/
/* login */
router.post('/login', escapeData, login);
/* suppression d'un contact */
router.post("/contacts/delete", checkAuthentication, escapeData, deleteContact);
/* ajout d'un thème */
router.post('/themes/add', checkAuthentication, escapeData, addThemeSubmit);
/* modification d'un thème */
router.post('/themes/:id/update', checkAuthentication, escapeData, updateThemeSubmit);
/* suppression d'un thème */
router.post("/themes/delete", checkAuthentication, escapeData, deleteTheme);
/* ajout d'un visuel à une réalisation */
router.post('/realisations/:realisationId/visuels/add', checkAuthentication, escapeData, addVisuelByRealisationSubmit);
/* suppression d'un visuel */
router.post("/realisations/:realisationId/visuels/delete", checkAuthentication, escapeData, deleteVisuelByRealisation);
/* ajout d'une réalisation */
router.post('/realisations/add', checkAuthentication, escapeData, addRealisationSubmit);
/* modification d'une réalisation */
router.post('/realisations/:id/update', checkAuthentication, escapeData, updateRealisationSubmit);
/* suppression d'une réalisation */
router.post("/realisations/delete", checkAuthentication, escapeData, deleteRealisation);


router.use(errorController.get404);


export default router;
