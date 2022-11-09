import { Schema, model } from "mongoose";

const meserosSchema = new Schema({
    name: String,
    password: String,
    user: String,
}, {
    timestamps: true
})

export default model('Meseros', meserosSchema)
