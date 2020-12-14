import Monster from'../models/monster.js'
import axios from 'axios'

class MonsterService
{
    create(monster)
    {
        return Monster.create(monster)
    } 

    transform(monster, transformOptions = {})
    {
     
        
        delete monster._id;
        delete monster.__v;
        monster.href = `${process.env.BASE_URL}/monster/one/${monster.idMonster}`
        console.log(monster)
        
        return monster
    }
    getOne(idMonster,retrieveOptions)
    {
        
        const e = Monster.findById(idMonster)
        e.href =`${process.env.BASE_URL}/monster/one/${e._id}`
        return e
    }
    retriveByIdUser(filter, retrieveOptions)
    {
        
        const limit = retrieveOptions.limit;
        const skip = retrieveOptions.skip;
        const retrieveQuery = Monster.find(filter).skip(skip).limit(limit);
        const countQuery = Monster.countDocuments(filter);

        
        return Promise.all([retrieveQuery, countQuery]);
    }
    
}
export default new MonsterService();