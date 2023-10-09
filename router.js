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
router.get('/login', loginForm);
router.post('/login', login);
router.get('/logged', logged);
router.get('/logout', logout);
router.get("/portfolio", portfolio);
router.get("/contact", showContactForm);
router.post("/contact", addContactSubmit);
router.get("/submitted", contactSubmittedController);
router.get('/logout', checkAuthentication, logout);


export default router;
