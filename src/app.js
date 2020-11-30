// But : Configurer le gestionnaire des routes.
// Auteur : Équipe
// Date : 30 novembre 2020

import express from 'express';

import database from './helpers/database.js'
import errors from './helpers/errors.js';
// On importe les routes des modeles.
import captureRoute from "./routes/captureroute.js"
import connectionCompteRoute from "./routes/connectionroute.js"
import creationCompteRoute from "./routes/creationcompteroute"
import deconectionRoute from "./routes/deconectionroute.js"
import elementsRoute from "./routes/elementsroute.js"
import explorationRoute from "./routes/explorationroute.js"
import monsterRoute from "./routes/monsterroute.js"
import portalRoute from "./routes/portalroute.js"
const app = express();
database(app);

//Pour comprendre le json
app.use(express.json());

// Ajout des routes présentes dans SuccursalesRoutes dans notre serveur
app.use('/capture',captureRoute)
app.use('/creationCompte',creationCompteRoute)
app.use('/connexion',connectionCompteRoute)
app.use('/andromia /deconnexion',deconectionRoute)
app.use('/monster',monsterRoute)
app.use('/explorations',explorationRoute)
app.use('/elements',elementsRoute)
app.use('/portal',portalRoute)
app.use('*', errors);

export default app;