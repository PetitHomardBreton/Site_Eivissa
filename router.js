import dotenv from "dotenv";
dotenv.config();

import express from "express";

const router = express.Router();

/***************************************
 * Importation des controllers
 ***************************************/

import HomeController from "./controllers/home.js";
import {showcontactform} from "./controllers/contact.js";
import {addContactSubmit} from "./controllers/contact.js";


/*********************************************
  *Routes
 *********************************************/
router.get("/", HomeController);
router.get("/contact", showcontactform);
router.post("/contact", addContactSubmit);


export default router;
