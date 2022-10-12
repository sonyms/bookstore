import { connectToDatabase } from "../../api-helpers/utils";
import {getAllBooks, addBook} from "../../api-helpers/controllers/books-controller";

export default async function handler(req, res) {
   await connectToDatabase();

   if(req.method === "GET") {
     return getAllBooks(req, res);
   }
   if(req.method === "POST") {
      return addBook(req, res);
    }
} 