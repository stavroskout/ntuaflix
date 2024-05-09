import * as React from 'react';
import { Link } from 'react-router-dom';
import connection from './axios'
import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';


export default function MainPage(){
  async function handleLogout(){
    try{
      const response = await connection.post(`/ntuaflix_api/logout`, null, { withCredentials: true })
      console.log(response)
      if(response.status===200){window.location.href = 'http://localhost:3000/signin'}
  }
  catch(err){
      console.log("axios error")
  }
  }

  return (
    <div>
      <Typography variant='h2' align='center'> Welcome to Ntuaflix!</Typography>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        <Button key={'Sign in'} sx={{ my: 2, color: 'white', display: 'block' }}><Link to='/signin' >Sign In</Link></Button>
        <Button key={'Sign Up'} sx={{ my: 2, color: 'white', display: 'block' }}><Link to='/signup'>Sign Up</Link></Button>
        <Button key={'Movies'} sx={{ my: 2, color: 'white', display: 'block' }}><Link to='/movieDisplay'>Movies</Link></Button>
        <Button key={'Logout'} onClick={handleLogout} sx={{ my: 2, display: 'block' }}>Logout</Button>
      </Box>
  </div>

  );
}