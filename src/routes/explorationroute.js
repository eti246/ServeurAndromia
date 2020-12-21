// But : Programmation des routes de l'api pour l'exploration.
// Auteur :  Etienne Desrochers
// Date : 30 novembre 2020

// On import les modules.
import express from 'express';
import axios from'axios';
import ExplorationService from "../services/explorationService.js"
import exploration from '../models/exploration.js';
import _ from 'lodash';
import Account from '../models/account.js'
import AccountService from '../services/accountService.js'
import account from '../models/account.js';
// On fait le routage.
const router = express.Router();



class ExplorationRoute
{

    constructor()
    {
        router.get('/explore/:idExplorateur/:CodeQr',this.explore)// Fait une exploration
        router.get('/:idExplorateur',this.getExploration) // Va chercher les exploration faire par l'utilisateur
        router.get('/one/:idExploration',this.getOne) // Va chercher une exploration selon son id
    }

    
    // Fait une exploration, la met en bd, 
    // met les elements dans le compte en bd
    // et retourne l'exploration en json 
    async explore(req,res,next)
    {
        
        try
        {
            // Va chercher le Compte par son id
            let e = await AccountService.retriveById(req.params.idExplorateur,{})
            //Utilise axios pour aller faire un exploration selon le code QR
            axios.get("https://api.andromia.science/portals/"+req.params.CodeQr).then(responce=>{
                //Peuple responce avec les information de l'exploration
                responce.data.idExplorateur =req.params.idExplorateur
                responce.data.hrer =`${process.env.BASE_URL}/explorations/one/${responce.data._id}`
                exploration.create(responce.data);
                //Rajoute les elements dans le compte du users
                AccountService.addElement(e,responce.data);
                //Retour du code 200 avec l'exploration
                return res.status(200).json(responce.data)
            }).catch(err=>
                {
                    //retour du code d'erreur 404 puisque la page portail n'est psa disponible 
                    return res.status(404)
                })
            
            
                
        }
        catch (e)
        {
            //affiche l'erreur
            return next(e)
        }
    }
    //Route qui va chercher une exploration
    async getOne(req,res,next)
    {
        try
        {
            //Va chercher l'exploration choisie
            let temp = await ExplorationService.getOne(req.params.idExploration,{})
            
            //Rajoute un lien ver sois meme
            temp.href =temp.href =`${process.env.BASE_URL}/explorations/one/${temp._id}`
            
            //Return l'exploration avec le code 200
            res.status(200).json(temp)
        }
        catch (e)
        {
            //Retour de l'erreur
            return next(e)
        }
    }
    //Va chercher les Exploration d'un utilisateur
    async getExploration(req,res,next)
    {
        try
        {
            //Filtre
            let filter = {idExplorateur: `${req.params.idExplorateur}`};
            //Va chercher les exploration
            let [temp,t] = await ExplorationService.retriveByIdUser(filter,{}) 
            let e =[]  
            // Ajout des elements
            temp.forEach(element => {
                element.href =`${process.env.BASE_URL}/explorations/one/${element._id}`
                e.push(element)
            });     
            //Retour des explorations avec le code 200
            return res.status(200).json(e)
        }
        catch(err)
        {
            //Retour de l'erreur
            return next(err);
        }
    }
}
new ExplorationRoute();

export default router;
