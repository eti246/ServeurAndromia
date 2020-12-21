// But : Configurer le gestionnaire des routes.
// Auteur : Équipe
// Date : 30 novembre 2020

import express from 'express';
import cors from 'cors';
import expressJWT from 'express-jwt';
import httpErrors from 'http-errors';
import database from './helper/database.js'
import errors from './helper/error.js';
import cron from 'node-cron';


// On importe les routes des modeles.
import explorationRoute from "./routes/explorationRoute.js"
import monsterRoute from "./routes/monsterRoute.js"
import accountRoute from "./routes/accountRoute.js"


const app = express();
database(app);
app.use(cors());
//Pour comprendre le json
app.use(express.json());

// Ajout des routes présentes  dans notre serveur
app.use('/monster',monsterRoute)
app.use('/explorations',explorationRoute)
app.use('/account',accountRoute)
app.use('*', errors);

export default app;