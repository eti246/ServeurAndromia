import mongoose from 'mongoose'

const elementSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        quantity:{ type: Number, default : 0}
    }
)
export default mongoose.model('element', elementSchema);