// But : Programmation des routes de l'api pour les monstres.
// Auteur :  Etienne Desrochers
// Date : 30 novembre 2020

import express from 'express';
import _ from 'lodash';
import MonsterService from '../services/monsterservice.js';
import Monster from'../models/monster.js';
import error from 'http-errors';
import expressJWT from 'express-jwt';
import AccountServices from '../services/accountservice.js';
const router = express.Router();

const authenticateJwt = expressJWT({
    secret: process.env.JWT_TOKEN_SECRET,
    algorithms: ["HS256"]
});

class MonsterRoute
{

    constructor()
    {
        router.get('/one/:idMonster',this.getOne)//Va chercher un monster par son id
        router.get('/:idUser',this.getAll) // va chercher tout les monster du user
        router.post("/capture", authenticateJwt,this.captureMonsterUser);
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

    
    async captureMonsterUser(req,res,next)
    {
        try
        {

            //ED: Valide que l'utilisateur a bien 
            if (_.isEmpty(req.body)) { //Retourne vrai sur {}
                return next(error.BadRequest()); /*Erreur 400, 415*/}
            //VS: Valider que l'utilisateur a bien les elements nécessaires afin de capturer le monstre.
            //VS: Normalement, l'application devrait le valider, mais on le valide aussi côté serveur.
            // On va chercher l'explorateur
            let compte = await AccountServices.retriveByIdUser(req.user.email);
            // On crée le monster à partir du body

            let temp = req.body;

            temp.kernel.forEach(ele =>{
                compte.element.forEach(el =>{
                    if (ele === el.name && el.quantity == 0)
                        return next(error.BadRequest());
                });
            });
                
            
            // Une fois rendu ici, on sait que l'utilisateur possède suffisamment d'elements pour capturer le monster, on peut donc ajouter le monster dans la collection de l'explorateur.
            temp.idExplorateur = compte._id;

            // On doit finalement créer le monster et retirer les elements de l'inventaire de l'explorateur.
            await MonsterService.create(req.body);

            compte.element.forEach(el =>{
                temp.kernel.forEach(ele =>{
                    if (ele === el.name)
                        el.quantity -= 1;
                });
            });
            temp = await Monster.findOne({hash: temp.hash});
            compte.monster.push(temp._id);

            compte.save();

            res.status(200).json();
        }
        catch (err)
        {
            return next(err);
        }
    }

}
new MonsterRoute()
export default router