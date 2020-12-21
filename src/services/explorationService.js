// But : Programmation des services pour les fonctionnalités de la connection.
// Auteur : Etienne Desrochers
// Date : 21 décembre 2020
import account from '../models/account.js'
import Exploration from'../models/exploration.js'
import accountService from './accountService.js'


class ExplorationService
{
    //Va chercher une exploration
    getOne(IdExplorateur,retrieveOptions)
    {

        const e = Exploration.find({idExploration : accountService.retriveById(idExploration)})
        e.href =`${process.env.BASE_URL}/explorateur/one/${e._id}`
        return e
    }
    //Retourn des explorations d'un utilisateur
    async retriveByIdUser(filter, retrieveOptions)
    {
        
        let f = await account.find(filter)
        console.log(f[0]._id)
        const retrieveQuery = Exploration.find({idExplorateur : f[0]._id});
        const countQuery = Exploration.countDocuments(filter);
        //Retour des exploration
        return Promise.all([retrieveQuery, countQuery]);
    }
    //Valide que l'exploration a un vault
    validateExplorationElement(Exploration)
    {
        return typeof Exploration.vault  == 'undefined'
    }
}
export default new ExplorationService();