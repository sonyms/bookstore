import {React,Fragment} from 'react'
import {Grid,Box,Typography} from '@mui/material'
import BookItem from './BookItem'

const BookList = ({data, featuredPage}) => {
    
  return (
    <Fragment>
        { 
        <Box padding={1} margin="auto" marginBottom={"10px"} boxShadow="10px 10px 20px #ccc" bgcolor={"#3d2870"} display="flex" flexDirection="column">
            <Typography fontFamily={"Ubuntu"} color={"white"} fontWeight="bold" variant="h4" mt={1} padding={2} textAlign="center"> 
               {featuredPage ? "Featured Books" :"Books"}
            </Typography>

        </Box>
        }
        <Grid justifyContent={featuredPage ?"center":"flex-start"} padding={2} spacing={1} container>
            {data.map((book) => (
            
                <Grid item 
                xs={6} 
                sm={4} 
                md={3} 
                lg={2} 
                height={featuredPage ? "500px": "450px"} 
                width="100%" padding={1} 
                key={book._id}
                >       
                    <BookItem {...book}/>
                </Grid>
            ))}
    </Grid>
   </Fragment>
  )
}

export default BookList