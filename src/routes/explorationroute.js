// But : Programmation des routes de l'api pour l'exploration.
// Auteur :  Etienne Desrochers
// Date : 30 novembre 2020

// On import les modules.
import express from 'express';
import paginate from 'express-paginate';
import error from 'http-errors';
// On fait le routage.
const router = express.Router();


class ExplorationRoute
{

    constructor()
    {
        router.get('/',this.getExploration)
    }

    async getExploration(req,res,next)
    {
        try
        {
            let temp =[]
            let t =
            {
                "idExploration":"87gfh8h4bd3y6jh4d37hd4b74j",
                "explorationDate":"2020-11-23T23:52:42.426+00:00",
                "destination":"Saint-Jerome"
            }
            temp.push(t)
            t =
            {
                "idExploration":"re674gse474rse69b74g4es6947gs9es",
                "explorationDate":"2020-12-23T23:52:42.426+00:00",
                "destination":"Montreal"
            }
            temp.push(t)
            
            res.status(200).json(temp)
        }
        catch(err)
        {
            return next(err);
        }
    }
}
new ExplorationRoute();

export default router;
