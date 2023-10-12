import dotenv from "dotenv";
dotenv.config();

import express from "express";

const router = express.Router();

/***************************************
 * Importation des controllers
 ***************************************/

import HomeController from "./controllers/home.js";
import ThemeDetailController from "./controllers/readTheme.js";
import {showContactForm} from "./controllers/formContact.js";
import {addContactSubmit} from "./controllers/formContact.js";
import contactSubmittedController from "./controllers/contactSubmitted.js";
import portfolio from "./controllers/portfolio.js";
import {loginForm, login} from './controllers/login.js';
import logged from "./controllers/logged.js";
import logout from './controllers/logout.js';
import ThemeController from "./controllers/Themes.js";
import {addTheme, addThemeSubmit} from "./controllers/createTheme.js";
import {updateTheme, updateThemeSubmit} from "./controllers/updateTheme.js";
import DeleteThemeController from "./controllers/deleteTheme.js";

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

/* affichage des thèmes */
router.get('/themes', checkAuthentication, ThemeController);


/* ajout d'un thème */
router.get('/themes/add', checkAuthentication, addTheme);
router.post('/themes/add', checkAuthentication, addThemeSubmit);

/* modification d'un thème */
router.get('/themes/:id/update', checkAuthentication, updateTheme);
router.post('/themes/:id/update', checkAuthentication, updateThemeSubmit);

/* affichage d'un thème */
router.get('/themes/:id', checkAuthentication, ThemeDetailController);

/* suppression d'un thème */
router.post("/themes/delete", checkAuthentication, DeleteThemeController);




export default router;
