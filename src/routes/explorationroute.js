// But : Programmation des routes de l'api pour l'exploration.
// Auteur :  Etienne Desrochers
// Date : 30 novembre 2020

// On import les modules.
import express from 'express';
import axios from'axios';
import ExplorationService from "../services/explorationService.js"
import exploration from '../models/exploration.js';
import _ from 'lodash';
import account from '../models/account.js';
// On fait le routage.
const router = express.Router();



class ExplorationRoute
{

    constructor()
    {
        router.get('/explore/:idExplorateur/:CodeQr',this.explore)
        router.get('/:idExplorateur',this.getExploration)
        router.get('/one/:idExploration',this.getOne)
    }

    async explore(req,res,next)
    {
        let boolwe= false
        try
        {
            
            
            axios.get("https://api.andromia.science/portals/"+req.params.CodeQr).then(responce=>{
                responce.data.idExplorateur =req.params.idExplorateur
                responce.data.hrer =`${process.env.BASE_URL}/explorations/one/${responce.data._id}`
                exploration.create(responce.data)
                return res.status(200).json(responce.data)

            }).catch(err=>
                {
                    boolwe =true
                })
            
            if(boolwe)
                return res.status(404)
        }
        catch (e)
        {
            return next(e)
        }
    }
    async getOne(req,res,next)
    {
        try
        {
            let temp = await ExplorationService.getOne(req.params.idExploration,{})
            
            temp.href =temp.href =`${process.env.BASE_URL}/explorations/one/${temp._id}`
            
            res.status(200).json(temp)
        }
        catch (e)
        {
            return next(e)
        }
    }
    async getExploration(req,res,next)
    {
        try
        {
            let filter = {idExplorateur: `${req.params.idExplorateur}`};
            let [temp,t] = await ExplorationService.retriveByIdUser(filter,{}) 
            let e =[]  
            temp.forEach(element => {
                element.href =`${process.env.BASE_URL}/explorations/one/${element._id}`
                e.push(element)
            });     
            return res.status(200).json(e)
        }
        catch(err)
        {
            return next(err);
        }
    }
}
new ExplorationRoute();

export default router;
