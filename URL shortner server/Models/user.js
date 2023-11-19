import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            lowercase: true,
        },
        email: {
            type: String,
            required: [true, "Email should not be empty"],
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, "Password should not be empty"],
            validate: {
                validator: function (password) {
                    return password.length >= 6;
                },
                message: "Passwords should be at least 6 characters long",
            },
        },
        role: {
            type: String,
            default: 'user'
        },
        urls: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Url",
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);


const User = model('User', userSchema);
export default User;