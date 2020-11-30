// But : Configurer le gestionnaire des routes.
// Auteur : Équipe
// Date : 28 septembre 2020

import express from 'express';

import database from './helpers/database.js'
import errors from './helpers/errors.js';
// On importe les routes des modeles.
const app = express();
database(app);

//Pour comprendre le json
app.use(express.json());

// Ajout des routes présentes dans SuccursalesRoutes dans notre serveur
app.use('*', errors);

export default app;