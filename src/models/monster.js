import mongoose from 'mongoose'

const monsterSchema = mongoose.Schema(
    {
        
        talents : [{type: String,required:true}],
        kernel : [{type:String,required:true}],
        atlasNumber: {type: Number,required:true},
        name : {type: String,required:true},
        health : {type: Number,required:true},
        damage : {type: Number,required:true},
        speed : {type: Number,required:true},
        critical : {type: Number,required:true},
        affinity : {type: String,required:true},
        assets : {type: String,required:true},
        hash : {type: String,required:true},
        href:{type:String},
        idExplorateur: {type: String},
        __v:{type:Number}
    },
    {
        collection : 'Monster'
    }
);

monsterSchema.virtual('account', {
    ref: 'Account',
    localField: '_id',
    foreignField: 'monster',
    justOne: false
});
export default mongoose.model('Monster', monsterSchema);