// But : Programmation des routes de l'api pour la gestion des elements.
// Auteur :  Etienne Desrochers
// Date : 30 novembre 2020

import express from 'express';
const router = express.Router();
class ElementRoute
{
    constructor()
    {
        router.get('/', this.getAll)
    }
    
    async getAll(req,res,next)
    {
       try
       {

        let temp =[]
        let t = {
            "element":"A",
            "quantite":5
        }
        temp.push(t)
        t = {
            "element":"B",
            "quantite":6
        }
        temp.push(t)
        res.status(200).json(temp)
       }
       catch(err)
       {
           next.error(err);
       } 
    }
}
new ElementRoute()
export default router
