import mongoose from 'mongoose'

const explorationSchema = mongoose.Schema(
    {
        explorationDate:{type:Date,required:true},
        destination:{type:String,required:true},
        vault:{type:Object},
        monster:{type:Object},
        idExplorateur:{type:String},
        href:{type:String}
    },
    {
        collection : 'Exploration'
    }
)
export default mongoose.model('Exploration', explorationSchema);