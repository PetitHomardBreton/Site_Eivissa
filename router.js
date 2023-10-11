import dotenv from "dotenv";
dotenv.config();

import express from "express";

const router = express.Router();

/***************************************
 * Importation des controllers
 ***************************************/

import HomeController from "./controllers/home.js";
import {showContactForm} from "./controllers/contact.js";
import {addContactSubmit} from "./controllers/contact.js";
import contactSubmittedController from "./controllers/contactSubmitted.js";
import portfolio from "./controllers/portfolio.js";
import {loginForm, login} from './controllers/login.js';
import logged from "./controllers/logged.js";
import logout from './controllers/logout.js';
import ThemeController from "./controllers/Themes.js";
import {addTheme, addThemeSubmit} from "./controllers/createTheme.js";

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
router.get("/submitted", contactSubmittedController);
router.get("/contact", showContactForm);
router.post("/contact", addContactSubmit);

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


export default router;
