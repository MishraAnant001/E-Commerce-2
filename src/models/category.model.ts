import mongoose from "mongoose"

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase:true,
        unique:true,
        trim:true
    }
})

export const Category = mongoose.model("Category", categorySchema)