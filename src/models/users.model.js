import { Schema, model } from "mongoose";

const usersSchema = new Schema({
    name: String,
    email: String,
    password: String,
}, {
    timestamps: true
});

export default model('Users', usersSchema);