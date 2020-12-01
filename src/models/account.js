import mongoose from 'mongoose';

const accountSchema = mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true },
        //Hash the password
        password: { type: String, required: true },
        salt: { type: String, required: true },
        refreshToken: { type: String },
        createdDate: { type: Date, default: Date.now },
        //monster:[{ monster:{ type: mongoose.Schema.monster }}],
        element:[{ type: String, type: Number }],
        inox:{ type: Number}
    },
    {
        collection: 'accounts',
    }
);

export default mongoose.model('Account', accountSchema);