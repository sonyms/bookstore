import { connectToDatabase } from "../../../api-helpers/utils";
import { updateBook,deleteBook,getBookWithId } from "../../../api-helpers/controllers/books-controller";

export default async function  handler(req, res) {
    await connectToDatabase();
    if(req.method === "PUT") {
        return updateBook(req, res);
    }
    else if(req.method === "DELETE") {
        return deleteBook(req, res);
    }
    else if(req.method === "GET") {
        return getBookWithId(req, res);
    }
} 