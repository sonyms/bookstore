import axios from "axios";

const url = process.env.API_URL;

export const getAllBooks = async () => {
  console.log( process.env.API_URL+"/api/books")
  const response = await axios.get(
    process.env.API_URL+"/api/books"
  );

  if (response.status !== 200) {
    return new Error("Internal Server Error");
  }

  const data = await response.data;

  return data;
};

export const getFeaturedBooks = async () => {
  const books = await getAllBooks();

  if (books != undefined && books.length > 0) {
    return books.filter((book) => book.featured === true);
  } else {
    return [];
  }
};

export const saveBook = async (data) => {
  try {
    const res = await axios.post(
      "http://localhost:3001/api/books",
      data
    );
    console.log(res);
    return await res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getBookWithId = async (id) => {
  try {
   
    console.log(process.env.API_URL+"/api/book/"+id)
    const res = await axios.get(
      "http://localhost:3001/api/book/"+id
    );
    return await res.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateBook = async (id, data) => {
  try {
    const res = await axios.put(
      "http://localhost:3001/api/book/"+id,
      data
    );
    return await res.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteBook = async (id) => {
  try {
    const res = await axios.delete(
      "http://localhost:3001/api/book/"+id
    );
    return await res.data;
  } catch (err) {
    console.log(err);
  }
};
