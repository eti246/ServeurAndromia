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
        router.get('/one/:idMonster',this.getOne)
        router.get('/:idUser',this.getAll)
    }

    async getOne(req,res,next)
    {
        try
        {
            
            let temp = await MonsterService.getOne(req.params.idMonster,{})
            temp.href =temp.href =`${process.env.BASE_URL}/monster/one/${temp._id}`
            res.status(200).json(temp)
        }
        catch (e)
        {
            return next(e)
        }
    }
    async getAll(req,res,next)
    {
        try
        {
            let filter = {idExplorateur: `${req.params.idUser}`};
            let [temp,t] =await MonsterService.retriveByIdUser(filter,{})
            let e =[]
            temp.forEach(Element=>{
                Element.href = `${process.env.BASE_URL}/monster/one/${Element._id}`
                e.push( Element)
            })
            res.status(200).json(e)
        }
        catch (err)
        {
            return next(err);
        }
    }

}
new MonsterRoute()
export default router