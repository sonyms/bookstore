import React from 'react'
import MenuBookIcon from '@mui/icons-material/MenuBook';
import {AppBar, Toolbar, Box, Tabs, Tab} from '@mui/material'
import {useRouter} from 'next/router'
const Header = () => {
    const router = useRouter();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
        if(newValue === 0){
            router.push('/')
        }else if(newValue === 1){
            router.push('/books')
        }else if(newValue === 2){
            router.push('/books/add')
        }
    }
  return (
    <AppBar position="sticky" sx={{bgcolor:"#c83576"}}>
        <Toolbar>
            <MenuBookIcon sx={{fontSize:"30px"}} />
            <Box display="flex" margin="auto">
                <Tabs textColor="inherit" value={value} onChange={handleChange}>
                    <Tab sx={{fontFamily:'Ubuntu'}} label="Home"  />
                    <Tab sx={{fontFamily:'Ubuntu'}} label="All Books" />
                    <Tab sx={{fontFamily:'Ubuntu'}} label="Add Book" />
                </Tabs>
            </Box>
        </Toolbar>
    </AppBar>
  )
}

export default Header