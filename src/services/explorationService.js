import Exploration from'../models/exploration.js'
import axios from 'axios'

class ExplorationService
{
    getOne(IdExplorateur,retrieveOptions)
    {
        
        const e = Exploration.findById(IdExplorateur)
        e.href =`${process.env.BASE_URL}/explorateur/one/${e._id}`
        return e
    }
    retriveByIdUser(filter, retrieveOptions)
    {
        
        const limit = retrieveOptions.limit;
        const skip = retrieveOptions.skip;
        const retrieveQuery = Exploration.find(filter).skip(skip).limit(limit);
        const countQuery = Exploration.countDocuments(filter);

        
        return Promise.all([retrieveQuery, countQuery]);
    }
}
export default new ExplorationService();