// But : Programmation des routes de l'api pour les monstres.
// Auteur :  Etienne Desrochers
// Date : 30 novembre 2020

import express from 'express';
const router = express.Router();
class MonsterRoute
{
    constructor()
    {
        router.get('/',this.getAll)
    }

    async getAll(req,res,next)
    {
        
        let temp =[]
        let t =
        {
            "idMonster":"f8er96g7btr6bh8746sh4rbs6erh",
            "talent":["Electric"],
            "kernel":["A","B","C"],
            "atlas":1,
            "name":"Pikachu",
            "health":666,
            "damage":42,
            "speed":728,
            "critical":0.2,
            "affinity":"dance",
            "asset":"https://upload.wikimedia.org/wikipedia/en/thumb/7/73/Pikachu_artwork_for_Pok%C3%A9mon_Red_and_Blue.webp/220px-Pikachu_artwork_for_Pok%C3%A9mon_Red_and_Blue.webp.png",
            "hash":"e5s7fbes87yb86esb7g8es64gse8g746se",
            "href":"http:google.com"
        }
        temp.push(t)
        t ={
            "idMonster":"regegsg",
            "talent":["Electric"],
            "kernel":["d","e","f"],
            "atlas":1,
            "name":"Pikachu2",
            "health":666,
            "damage":42,
            "speed":728,
            "critical":0.2,
            "affinity":"dance",
            "asset":"https://upload.wikimedia.org/wikipedia/en/thumb/7/73/Pikachu_artwork_for_Pok%C3%A9mon_Red_and_Blue.webp/220px-Pikachu_artwork_for_Pok%C3%A9mon_Red_and_Blue.webp.png",
            "hash":"serfergregseg",
            "href":"http:google.com"
        }

        temp.push(t)
        res.status(200).json(temp)
    }

}
new MonsterRoute()
export default router