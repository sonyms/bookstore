import Book from "../model/Book.js";
import mongoose from "mongoose";

export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({});

        if(books.length > 0) {
            return res.status(200).json(books);
        }
        else {
            return res.status(404).json({ message: "No books found" });
        }
    } catch (error) {

        return res.status(404).json({ message: error.message });
    }
}

export const addBook = async (req, res) => {
    const { title, author, price, image, featured } = req.body;

    if(!title && title.trm() === "" && !author && author.trim() === "" && !price && price.trim() === "" && !image && image.trim() === "") {
        return res.status(422).json({ message: "Invalid Input" });
    }
    try {
        let book = new Book({title, author, price, image, featured });
        book = await book.save();
        return res.status(201).json({ message: "Book added successfully", book });
    } catch (error) {
        return res.status(409).json({ message: error.message });
    }
}

export const updateBook = async (req, res) => {
    const { id } = req.query;
    const { title, author, price, image, featured } = req.body;

    if(!title && title.trm() === "" && !author && author.trim() === "" && !price && price.trim() === "" && !image && image.trim() === "") {
        return res.status(422).json({ message: "Invalid Input" });
    }

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "No book found" });
    }
    const updatedBook = { title, author, price, image, featured};
    try {
        await Book.findByIdAndUpdate(id, updatedBook);
        return res.status(200).json({message: "Book updated successfully"});
    } catch (error) {
        return res.status(409).json({ message: error.message });
    }
   
}

export const deleteBook = async (req, res) => {
    const { id } = req.query;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "No book found" });
    }
    try {
        await Book.findByIdAndDelete(id);
        return  res.status(200).json({message: "Book deleted successfully"});
    } catch (error) {
        return res.status(409).json({ message: error.message });
    }
}

export const getBookWithId = async (req, res) => {
    const { id } = req.query;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "No book found" });
    }
    try {
        const book = await Book.findById(id);
        
        if(!book){
            return res.status(404).json({ message: "No book found" });  
        }
        return res.status(200).json(book);
    } catch (error) {
        return res.status(409).json({ message: error.message });
    }

}