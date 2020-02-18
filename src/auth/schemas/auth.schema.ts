import * as mongoose from 'mongoose';

const AuthSchema = new mongoose.Schema(
    {
        accessToken: { type: String, required: true },
        refreshToken: { type: String, required: true },
        morph: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: 'morphModel'
        },
        morphModel: {
            type: String,
            required: true,
            enum: ['Admin']
        },
        accessExpiredAt: Date,
        refreshExpiredAt: Date,
    }
)

export { AuthSchema };