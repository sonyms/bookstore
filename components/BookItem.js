import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link'
import {deleteBook} from '../pages/api/frontend/utils'
import { useRouter } from 'next/router'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const BookItem = ({_id, title, author, price, image, featured}) => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const handleDelete = () => {
    deleteBook(_id).then((data) => {
      console.log(data);
      setOpen(true);
     // router.push('/books');
      
    }).catch((err) => {
      console.log(err);
    })
  }
  return (
    <>
      <Card sx={{ width: "100%", 
      height: "100%", 
      borderRadius:3 , 
      boxShadow:"5px 5px 10px #ccc", 
      ":hover":{boxShadow:"10px 10px 20px #bbb"}
      }} >
        <div style={{width: "100%", height: "50%", position: "relative"}}>
          {featured && 
          <div style={{position: "absolute",top: "0", background:"red", width:"75px", padding: "3px", color:"white"}}>Featured</div>
          }
          <img src={image} alt={title}  height={"100%"} width={"100%"} />
        </div>
        <CardContent sx={{ width: "100%", height: "30%"}}>
          <Typography  fontSize="22px" fontFamily={"Ubuntu"} gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography fontFamily={"Ubuntu"} variant="body2" color="text.secondary">
            {author}
          </Typography>
          <Typography  variant="body2" color="green">
            Rs {price}
          </Typography>
        </CardContent>
        <CardActions>
          <Link href={`/books/${_id}`}>
              <Button sx={{marginRight:"auto"}} endIcon={<EditIcon/>} size="small" color="warning">Edit</Button>
          </Link>
          
          <Button endIcon={<DeleteForeverIcon/>} onClick={handleDelete} size="small" color="error">Delete</Button>
        
        </CardActions>
      </Card>
      {open && <Snackbar open={open} autoHideDuration={1000} onClose={()=>{setOpen(false); featured ? router.push('/'):router.push('/books');}}>
        <Alert onClose={()=>setOpen(false)} severity="success" sx={{ width: '100%' }}>
          Book successfully deleted!
        </Alert>
      </Snackbar>}
    </>
  )
}

export default BookItem