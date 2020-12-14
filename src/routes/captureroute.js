// But : Programmation des routes de l'api pour la capture.
// Auteur :  Etienne Desrochers
// Date : 30 novembre 2020

import express from 'express';
import MonsterService from '../services/monsterservice.js'
import _ from 'lodash';
const router = express.Router();
class CaptureRoute
{
    constructor()
    {
        router.post("/",this.captureMonster)
        router.post("/:idUser",this.captureMonsterUser)
        router.get("/:idMonster",this.getOne)
    }

    async getOne(req,res,next)
    {
        try
        {
            
            let temp = await MonsterService.getOne(req.params.idMonster)
            
            
            res.status(200).json(temp)
        }
        catch (e)
        {
            return next(e)
        }
    }
    async captureMonster(req,res,next)
    {
        try
        {
            //ED: Valide que l'utilisateur a bien envoyer un monster
            if (_.isEmpty(req.body)) { //Retourne vrai sur {}
                return next(error.BadRequest()); /*Erreur 400, 415*/}

            
            let monsterAdded = await MonsterService.create(req.body);
            
            res.status(200).json()
        }
        catch (err)
        {
            return next(err);
        }
    }
    async captureMonsterUser(req,res,next)
    {
        try
        {

            //ED: Valide que l'utilisateur a bien 
            if (_.isEmpty(req.body)) { //Retourne vrai sur {}
                return next(error.BadRequest()); /*Erreur 400, 415*/}
            let temp = req.body;
            temp.idExplorateur = req.params.idUser
            await MonsterService.create(req.body);
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
