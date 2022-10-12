import React from 'react'
import AddForm from './AddForm'
import {saveBook} from '../pages/api/frontend/utils'
import { useRouter } from 'next/router'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Add = () => {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();
    const getFormData = (data) => {
        saveBook(data).then((res) => {
            console.log(res);
            setOpen(true);
            //router.push('/books');
        })

    }
    return (
        <div>
        <AddForm onSubmit={getFormData}/>
        {open && <Snackbar open={open} autoHideDuration={1000} onClose={()=>{setOpen(false);router.push('/books');}}>
        <Alert onClose={()=>setOpen(false)} severity="success" sx={{ width: '100%' }}>
          Book added Successfully!
        </Alert>
      </Snackbar>}
        </div>
    )
}

export default Add;
