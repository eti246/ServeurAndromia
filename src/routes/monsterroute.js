// But : Programmation des routes de l'api pour les monstres.
// Auteur :  Etienne Desrochers
// Date : 30 novembre 2020

import express from 'express';
import _ from 'lodash';
import MonsterService from '../services/monsterservice.js'
const router = express.Router();
class MonsterRoute
{

    constructor()
    {
        router.get('/one/:idMonster',this.getOne)//Va chercher un monster par son id
        router.get('/:idUser',this.getAll) // va chercher tout les monster du user
    }

    //Va chercher un monsters par son id
    async getOne(req,res,next)
    {
        try
        {
            //Va chercher les informations
            let temp = await MonsterService.getOne(req.params.idMonster,{})
            temp.href =temp.href =`${process.env.BASE_URL}/monster/one/${temp._id}`
            //Retour du monster
            res.status(200).json(temp)
        }
        catch (e)
        {
            // Retour de l'erreur
            return next(e)
        }
    }
    //Retour de tout les monster d'un user
    async getAll(req,res,next)
    {
        try
        {
            //Filtre
            let filter = {idExplorateur: `${req.params.idUser}`};
            //Va chercher les monsters
            let [temp,t] =await MonsterService.retriveByIdUser(filter,{})
            let e =[]
            //Pour chaque monsters
            temp.forEach(Element=>{
                //Ajout de l'url perso
                Element.href = `${process.env.BASE_URL}/monster/one/${Element._id}`
                //Ajoute le monster à la liste 
                e.push( Element)
            })
            // Retour de la liste des monster
            res.status(200).json(e)
        }
        catch (err)
        {
            //Retour de l'erreur
            return next(err);
        }
    }

}
new MonsterRoute()
export default router