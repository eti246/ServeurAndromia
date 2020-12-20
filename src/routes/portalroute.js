// But : Programmation des routes de l'api pour les monstres.
// Auteur :  Etienne Desrochers
// Date : 3 décembre 2020

import error from 'http-errors';
import express from 'express'
const router = express.Router()
class PortalRoute
{
    constructor()
    {
        router.get("/:key", this.getPortal)
    }

    async getPortal(req,res,next)
    {
        console.log(req.params)
        try
        {
            if(req.params)
            {
                res.status(200).json(req.params)
            }
            else
            {
                return next(error.BadRequest());
            }
        }
        catch (err)
        {
            return next(err);
        }
    }

}
new PortalRoute()
export default router