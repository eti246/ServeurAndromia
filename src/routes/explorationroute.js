// But : Programmation des routes de l'api pour l'exploration.
// Auteur :  Etienne Desrochers
// Date : 30 novembre 2020

// On import les modules.
import express from 'express';
import paginate from 'express-paginate';
import error from 'http-errors';
// On fait le routage.
const router = express.Router();



class ExplorationRoute
{

    constructor()
    {
        router.get('/',this.getExploration)
    }

    async getExploration(req,res,next)
    {
        let vault ={
            "inox":15,
            "elements":
            [{
                "elements":"O",
                "quantite":15
            },
            {
                "elements":"A",
                "quantite":14
            },
            {
                "elements":"B",
                "quantite":1
            }
            ]
        }
        let monster =
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
        try
        {
            let temp =[]
            let t =
            {
                "idExploration":"87gfh8h4bd3y6jh4d37hd4b74j",
                "explorationDate":"2020-11-23T23:52:42.426+00:00",
                "destination":"Saint-Jerome",
                "vault":vault,
                "monster":monster
            }
            temp.push(t)
            t =
            {
                "idExploration":"re674gse474rse69b74g4es6947gs9es",
                "explorationDate":"2020-12-23T23:52:42.426+00:00",
                "destination":"Montreal",
                "vault":vault,
                "monster":monster
            }
            temp.push(t)
            res.status(200).json(temp)
        }
        catch(err)
        {
            return next(err);
        }
    }
}
new ExplorationRoute();

export default router;
