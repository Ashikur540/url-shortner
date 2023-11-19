import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const urlSchema = new Schema(
    {
        shortedID: {
            type: String,
            required: true,
        },
        originalURL: {
            type: String,
            required: [true, "URL should not be empty"],
        },
        shortenURL: {
            type: String,
            required: true,
        },
        clicks: {
            type: Number,
            required: true,
            default: 0,
        },
        date: {
            type: String,
            default: Date.now,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            // required: true
        },
        
        visitHistory: [
            {
                timestamp: { type: Number }
            }
        ]
    },
    { timestamps: true, }
);


const Url = model('Url', urlSchema);
export default Url;