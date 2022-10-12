import React from 'react'
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import {getBookWithId, updateBook} from '../pages/api/frontend/utils'
import AddForm from '../components/AddForm'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const BookDetail = () => {
    const [book, setBook] = React.useState();
    const [open, setOpen] = React.useState(false);
    const router = useRouter();
    useEffect(() => {
        const id = router.query.id;
        getBookWithId(id).then((data) => {
            setBook(data)
        }).catch((err) => {
            console.log(err);
        })
    }, [router.query.id]);

    const getBookData = (data) => {
        console.log(book);
        updateBook(book._id, data).then((data) => {
            console.log(data);
           // router.push('/books');
           setOpen(true);
        }).catch((err) => {
            console.log(err);
        })
    }
  return (
    <>
    {book ? <><AddForm data={book} onSubmit={getBookData}/>
    {open && <Snackbar open={open} autoHideDuration={1000} onClose={()=>{setOpen(false);router.push('/books');}}>
        <Alert onClose={()=>setOpen(false)} severity="success" sx={{ width: '100%' }}>
          Book successfully updated!
        </Alert>
      </Snackbar>}
    
    </> : <>Loading...</>}    
    </>
  )
}

export default BookDetail