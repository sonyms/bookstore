import mongoose from "mongoose";

const Scheme = mongoose.Schema;

const bookSchema = new Scheme({
    title: { 
        type: String, 
        required: true 
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
    }
})

export default mongoose.models.Book || mongoose.model("Book", bookSchema);
