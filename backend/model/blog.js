const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const blogSchema = Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    tags: {
        type: [String]
    },
    status: {
        type: String,
        enum: ["draft", "published"], // Only one of two
        default: "draft"
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }   // Automatically creates created_at and updated_at
})

const Blog = mongoose.model("Blog", blogSchema)

module.exports = Blog