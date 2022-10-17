import axios from "axios";
export const getAllBooks = async () => {
  const response = await axios.get(
    "https://sy9t9u-3000.preview.csb.app/api/books"
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
      "https://sy9t9u-3000.preview.csb.app/api/books",
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
    const res = await axios.get(
      `https://sy9t9u-3000.preview.csb.app/api/book/${id}`
    );
    return await res.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateBook = async (id, data) => {
  try {
    const res = await axios.put(
      "https://sy9t9u-3000.preview.csb.app/api/book/" + id,
      data
    );
    console.log(id);
    return await res.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteBook = async (id) => {
  try {
    const res = await axios.delete(
      `https://sy9t9u-3000.preview.csb.app/api/book/${id}`
    );
    return await res.data;
  } catch (err) {
    console.log(err);
  }
};
