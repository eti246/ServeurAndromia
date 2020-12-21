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
        router.post("/",this.captureMonster)//Capture un monster
        router.post("/:idUser",this.captureMonsterUser)//Capture monster avec id
        //A SUPPRIMER DANS LE MERGE:
        router.get("/:idMonster",this.getOne)// Va voir un monster
    }

    // Va chercher un monster
    async getOne(req,res,next)
    {
        try
        {
            //Va chercher un monster       
            let temp = await MonsterService.getOne(req.params.idMonster)
            
            //Return du monsters
            res.status(200).json(temp)
        }
        catch (e)
        {
            //Retourn de l'erreur
            return next(e)
        }
    }
    //Capture d'un monster
    async captureMonster(req,res,next)
    {
        try
        {
            // Valide que l'utilisateur a bien envoyer un monster
            if (_.isEmpty(req.body)) { //Retourne vrai sur {}
                return next(error.BadRequest()); /*Erreur 400, 415*/}

            //ajoute le monster dans la bd 
            let monsterAdded = await MonsterService.create(req.body);
            
            res.status(200).json()
        }
        catch (err)
        {
            //Retour de l'erreur
            return next(err);
        }
    }
    async captureMonsterUser(req,res,next)
    {
        try
        {

            //Valide que l'utilisateur a bien envoyer un monster
            if (_.isEmpty(req.body)) { //Retourne vrai sur {}
                return next(error.BadRequest()); /*Erreur 400, 415*/}
            //Créé le monsters en Bd
            let temp = req.body;
            temp.idExplorateur = req.params.idUser
            await MonsterService.create(req.body);
            //Retour 
            res.status(200).json()
        }
        catch (err)
        {
            //Retour de l'erreur
            return next(err);
        }
    }
}
new CaptureRoute()
export default router    
