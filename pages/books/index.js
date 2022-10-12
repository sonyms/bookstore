import {getAllBooks} from '../api/frontend/utils';
import BookList from '../../components/BookList';

function BooksHome({books}){

    return (
        <BookList data={books}/>
      )
}

export default BooksHome;

export const getServerSideProps = async () => {

    const books = await getAllBooks();
  
    return {
  
      props: {
        books
      }
    }
  
  };