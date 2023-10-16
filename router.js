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
import { addRealisation, addRealisationSubmit } from "./controllers/createRealisation.js";  
import {updateTheme, updateThemeSubmit} from "./controllers/updateThemeController.js";
import deleteTheme from "./controllers/deleteThemeController.js";
import deleteContact from "./controllers/deleteContactController.js";
import readAllContacts from "./controllers/readAllContactsController.js";
import getAllVisuels from "./controllers/readAllVisuelsController.js";
import getAllRealisations from "./controllers/readAllRealisationsController.js";

/*********************************************
 * Middleware pour vérifier si l'utilisateur
 * est connecté
 ********************************************/
const checkAuthentication = (req, res, next) => {
  if(!req.session.isLogged) {
      res.redirect('/login');
      return;
  }
  next();
}

router.use((req, res, next) => {
  res.locals.isLogged = req.session.isLogged;
  next();
});

/*********************************************
  *Routes
 *********************************************/
router.get("/", HomeController);
router.get("/portfolio", portfolio);
router.get("/contactSubmitted", contactSubmittedController);
router.get("/formContact", showContactForm);
router.post("/formContact", addContactSubmit);

/*********************************************
 * Routes Admin
*********************************************/
  
/* login */
router.get('/login', loginForm);
router.post('/login', login);
router.get('/logged', checkAuthentication, logged);
router.get('/logout', checkAuthentication, logout);

/* affichage des contacts */
router.get('/contacts', checkAuthentication, readAllContacts)

/* suppression d'un contact */
router.post("/contacts/delete", checkAuthentication, deleteContact);

/* affichage des thèmes */
router.get('/themes', checkAuthentication, ThemeController);


/* ajout d'un thème */
router.get('/themes/add', checkAuthentication, addTheme);
router.post('/themes/add', checkAuthentication, addThemeSubmit);

/* modification d'un thème */
router.get('/themes/:id/update', checkAuthentication, updateTheme);
router.post('/themes/:id/update', checkAuthentication, updateThemeSubmit);

/* suppression d'un thème */
router.post("/themes/delete", checkAuthentication, deleteTheme);

/* affichage des réalisations */
router.get('/realisations', checkAuthentication, getAllRealisations);

/* ajout d'une réalisation */
router.get('/realisations/add', checkAuthentication, addRealisation);
router.post('/realisations/add', checkAuthentication, addRealisationSubmit);

/* affichage des visuels */
router.get('/visuels', checkAuthentication, getAllVisuels);

/* ajout d'un visuel */
router.get('/visuels/add', checkAuthentication, addVisuel);
router.post('/visuels/add', checkAuthentication, addVisuelSubmit);




export default router;
