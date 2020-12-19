import mongoose from 'mongoose';

const accountSchema = mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true },
        hash: { type: String, required: true },
        salt: { type: String, required: true },
        refreshToken: { type: String },
        createdDate: { type: Date, default: Date.now },
        monster:[{  }],
        element:[{ type: String, type: Number }],
        inox:{ type: Number, default : 0}
    },
    {
        collection: 'Explorateur',
    }
);

export default mongoose.model('Explorateur', accountSchema);