// But : Programmation des services pour les fonctionnalités de la connection.
// Auteur : Etienne Desrochers
// Date : 21 décembre 2020
import Monster from'../models/monster.js'

class MonsterService
{
    //Créé un monstre
    create(monster)
    {
        return Monster.create(monster)
    } 

    //Transforme monster
    transform(monster, transformOptions = {})
    {
     
        //Suppréssion de champs
        delete monster._id;
        delete monster.__v;
        //Ajout d'un lien vers lui-même
        monster.href = `${process.env.BASE_URL}/monster/one/${monster.idMonster}`
        //Retour du monster
        return monster
    }
    //Va chercher un monster
    getOne(idMonster,retrieveOptions)
    {
        //Va chercher monster
        const e = Monster.findById(idMonster)
        //Modify le monster
        e.href =`${process.env.BASE_URL}/monster/one/${e._id}`
        //retourn le monster
        return e
    }
    //Retourne tout les monsters d'un utlisateur
    retriveByIdUser(filter, retrieveOptions)
    {
        
        //Filtre
        const limit = retrieveOptions.limit;
        const skip = retrieveOptions.skip;
        const retrieveQuery = Monster.find(filter).skip(skip).limit(limit);
        const countQuery = Monster.countDocuments(filter);

        //Retour de tout les monstres de l'utilisateur
        return Promise.all([retrieveQuery, countQuery]);
    }
    
}
export default new MonsterService();