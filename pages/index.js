
import { getFeaturedBooks } from './api/frontend/utils';
import BookList from '../components/BookList';

export default function Home({books}) {
  
  return (
    <BookList featuredPage={true} data={books}/>
  )
}

export const getStaticProps = async () => {

  const books = await getFeaturedBooks()

  return {

    props: {
      books
    }
  }

};
