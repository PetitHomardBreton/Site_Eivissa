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



/*********************************************
  *Routes
 *********************************************/
router.get("/", HomeController);
router.get("/portfolio", portfolio);
router.get("/contact", showContactForm);
router.post("/contact", addContactSubmit);
router.get("/submitted", contactSubmittedController);


export default router;
