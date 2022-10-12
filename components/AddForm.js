import React from 'react'
import { FormLabel, TextField, Typography, Box, Checkbox, Button } from '@mui/material';
import { Fragment } from 'react';

const labelSx = {marginTop: "10px"}

const AddForm = ({data, onSubmit}) => {
  const [inputs, setInputs] = React.useState(
    data? {
      title: data.title,
      author: data.author,
      price: data.price,
      image: data.image,
      featured: data.featured
    }: {
      title: "",
      author: "",
      price: "",
      image: "",
      featured: false
    }
  );

  const handleChange = (e) => {
    const {name, value, checked} = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: name === "featured" ? checked : value
    }))
  }
 
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputs);
  }

  return (
    <Fragment>
      <Box padding={1} margin="auto" marginBottom={"10px"} boxShadow="10px 10px 20px #ccc" bgcolor={"#3d2870"} display="flex" flexDirection="column">
          <Typography fontFamily={"Ubuntu"} color={"white"} fontWeight="bold" variant="h4" mt={1} padding={2} textAlign="center"> 
              {data ? "Edit Book" :"Add Book"}
          </Typography>

      </Box>
      <form onSubmit={handleSubmit} style={{ width:"80%", height:"100%",margin:"auto",boxShadow:"10px 10px 20px #ccc", borderRadius:"10px"}}>

        <Box padding={3} display="flex" flexDirection="column">
          <FormLabel sx={labelSx}>Title</FormLabel>
          <TextField onChange={handleChange} value={inputs.title} name="title" margin="normal"/>
          <FormLabel sx={labelSx}>Author</FormLabel>
          <TextField onChange={handleChange}  value={inputs.author} name="author" margin="normal"/>
          <FormLabel sx={labelSx}>Price</FormLabel>
          <TextField onChange={handleChange}  value={inputs.price}  name="price" margin="normal"/>
          <FormLabel sx={labelSx}>Image</FormLabel>
          <TextField onChange={handleChange}  value={inputs.image}  name="image" margin="normal"/>
          <FormLabel sx={labelSx}>Featured</FormLabel>
          <Checkbox onChange={handleChange} checked={inputs.featured} name="featured" sx={{marginRight:"auto"}}/>
          <Button  type="submit" variant="contained"  sx={{marginTop:"20px",bgcolor:"#c83576"}}>Submit</Button>
        </Box>
      </form> 
    </Fragment>
  )
}

export default AddForm
