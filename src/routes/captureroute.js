// But : Programmation des routes de l'api pour la capture.
// Auteur :  Etienne Desrochers
// Date : 30 novembre 2020

import express from 'express';
const router = express.Router();
class CaptureRoute
{
    constructor()
    {
        router.post("/",this.captureMonster)
    }

    async captureMonster(req,res,next)
    {
        try
        {
            res.status(200).json()
        }
        catch (err)
        {
            return next(err);
        }
    }
}
new CaptureRoute()
export default router    
