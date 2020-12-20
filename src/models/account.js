import mongoose from 'mongoose';

const elements = [{name :"A", quantity: 0 },{name :"B", quantity: 0 } ,{name :"E", quantity: 0 }
        ,{name :"Ex", quantity: 0 },{name :"Fr", quantity: 0 },{name :"G", quantity: 0 }
        ,{name :"I", quantity: 0 },{name :"Ja", quantity: 0 },{name :"K", quantity: 0 }
        ,{name :"L", quantity: 0 },{name :"No", quantity: 0 },{name :"Q", quantity: 0 }
        ,{name :"Sm", quantity: 0 },{name :"Ve", quantity: 0 },{name :"Wu", quantity: 0 }
        ,{name :"Xu", quantity: 0 },{name :"Ye", quantity: 0 },{name :"Z", quantity: 0 }];

const accountSchema = mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true },
        hash: { type: String, required: true },
        salt: { type: String, required: true },
        refreshToken: { type: String },
        createdDate: { type: Date, default: Date.now },
        monster:[{ type:mongoose.Schema.Types.ObjectId, ref:'Monster' }],
        element: [{
            name: String,
            quantity: Number,
            ID: false
        }],
        inox:{ type: Number, default : 0}
    },
    {
        collection: 'Explorateur',
    }
);

export default mongoose.model('Explorateur', accountSchema);