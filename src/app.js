// But : Configurer le gestionnaire des routes.
// Auteur : Équipe
// Date : 30 novembre 2020

import express from 'express';
import cors from 'cors';
import expressJWT from 'express-jwt';
import httpErrors from 'http-errors';
import database from './helper/database.js'
import errors from './helper/error.js';

// On importe les routes des modeles.
import captureRoute from "./routes/captureroute.js"
import elementsRoute from "./routes/elementsroute.js"
import explorationRoute from "./routes/explorationroute.js"
import monsterRoute from "./routes/monsterroute.js"
import portalRoute from "./routes/portalroute.js"
import accountRoute from "./routes/accountRoute.js"

const app = express();
database(app);
app.use(cors());
//Pour comprendre le json
app.use(express.json());

// Ajout des routes présentes dans SuccursalesRoutes dans notre serveur
app.use('/capture',captureRoute)
app.use('/monster',monsterRoute)
app.use('/explorations',explorationRoute)
app.use('/elements',elementsRoute)
app.use('/portals',portalRoute)
app.use('/account',accountRoute)
app.use('*', errors);

export default app;