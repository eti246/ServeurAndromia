// But : Programmation des services pour les fonctionnalités de la connection.
// Auteur : Etienne Desrochers
// Date : 21 décembre 2020
import Exploration from'../models/exploration.js'


class ExplorationService
{
    //Va chercher une exploration
    getOne(IdExplorateur,retrieveOptions)
    {
        const e = Exploration.findById(IdExplorateur)
        e.href =`${process.env.BASE_URL}/explorateur/one/${e._id}`
        return e
    }
    //Retourn des explorations d'un utilisateur
    retriveByIdUser(filter, retrieveOptions)
    {
        
        const limit = retrieveOptions.limit;
        const skip = retrieveOptions.skip;
        const retrieveQuery = Exploration.find(filter).skip(skip).limit(limit);
        const countQuery = Exploration.countDocuments(filter);

        //Retour des exoloration
        return Promise.all([retrieveQuery, countQuery]);
    }
    //Valide que l'exploration a un vault
    validateExplorationElement(Exploration)
    {
        return typeof Exploration.vault  == 'undefined'
    }
}
export default new ExplorationService();