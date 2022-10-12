import axios from 'axios';
export const getAllBooks = async () => {

    const response = await axios.get("http://localhost:3000/api/books");
    
    if(response.status !== 200) {
        return new Error("Internal Server Error");
    }

    const data = await response.data;

    return data;

}

export const getFeaturedBooks = async () => {
    
        const books = await getAllBooks();
       

        if(books!=undefined && books.length > 0) {

            return books.filter(book => book.featured === true);
            
        }
        else{
           
            return [];
        }  
    
}   

export const saveBook = async (data) => {
    try{
        const res = await axios.post("http://localhost:3000/api/books", data);
        console.log(res);
        return await res.data;
    }catch(err){
        console.log(err);
    }
}

export const getBookWithId = async (id) => {
    try{
        const res = await axios.get(`http://localhost:3000/api/book/${id}`);
        return await res.data;
    }catch(err){
        console.log(err);
    }
} 

export const updateBook = async (id, data) => {
    try{
        const res = await axios.put(`http://localhost:3000/api/book/${id}`, data);
        return await res.data;
    }catch(err){
        console.log(err);
    }
}

export const deleteBook = async (id) => {
    try{
        const res = await axios.delete(`http://localhost:3000/api/book/${id}`);
        return await res.data;
    }catch(err){
        console.log(err);
    }
}