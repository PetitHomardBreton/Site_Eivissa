//appel des dépendances
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import router from './router.js';
import session from 'express-session'; // importation du module express-session

const app = express();

app.use(session({ // configuration de la session
	secret: 'b7bae1bb-c40d-427e-989f-b43aeec2cafa', // clé de cryptage
	resave: false, // permet de ne pas sauvegarder la session si elle n'a pas été modifiée
	saveUninitialized: true, // permet de sauvegarder une session vide
	cookie: {maxAge: 3600000} // durée de vie du cookie en millisecondes
}));

//pour récupérer les informations du formulaire
app.use(express.json()) // pour analyser les requêtes avec un corps en JSON
app.use(express.urlencoded({ extended: true })) // pour analyser les requêtes avec un corps en urlencoded

//fichiers statiques
app.use(express.static('public'));

//spécifie le dossier qui contient les vues (par défaut /views)
app.set('views', './views'); 

//définit le moteur de template (permet de ne plus mettre l'extension .ejs dans les render)
app.set('view engine', 'ejs'); 

//importation des routes
app.use('/', router);

// connexion du serveur au réseau
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}. http://localhost:${process.env.PORT}`);
});

// gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// gestion des erreurs 404
app.use((req, res) => {
    res.status(404).send('Page Not Found');
});

// importation du module helmet pour sécuriser les en-têtes HTTP
import helmet from 'helmet';
app.use(helmet());

// importation du module compression pour compresser les réponses HTTP
import compression from 'compression';
app.use(compression());
