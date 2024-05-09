import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import connection from './axios'
import { useEffect } from 'react';




function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [menuSetting, setMenuSetting] = React.useState('');

  useEffect(() => {
    handleMenuItem();
  }, [menuSetting]);

  async function handleMenuItem(){
    if(menuSetting==='Logout') {
        try{
            const response = await connection.post(`/ntuaflix_api/logout`, null, { withCredentials: true })
            console.log(response)
            if(response.status===200){window.location.href = 'http://localhost:3000/signin'}
        }
        catch(err){
            console.log("axios error")
        }
    }
    if(menuSetting==='Signin') {
      window.location.href = 'http://localhost:3000/signin'
  }
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMoviesButton = () =>{
    window.location.href = 'http://localhost:3000/movieDisplay'
  }

  const handleLikeButton = () =>{
    window.location.href = 'http://localhost:3000/Likes'
  }

  const handleDislikeButton = () =>{
    window.location.href = 'http://localhost:3000/Dislikes'
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="http://localhost:3000/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Ntuaflix
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                key={'Movies'}
                onClick={handleMoviesButton}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Movies
              </Button>
              <Button
                key={'Likes'}
                onClick={handleLikeButton}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Likes
              </Button>
              <Button
                key={'Disikes'}
                onClick={handleDislikeButton}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Dislikes
              </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                  <Typography variant='caption'>
                    {document.cookie.includes('user_cookie') ? document.cookie.split('user_cookie=')[1].split('_')[0].split('%20').map(namepart=> `${namepart} `) : null}
                  </Typography>
                  {document.cookie.includes('user_cookie') ? <MenuItem 
                onClick={()=>{setMenuSetting('Logout')}}
                key={'Logout'}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem> : null}
                {!document.cookie.includes('user_cookie')?
                <MenuItem 
                onClick={()=>{setMenuSetting('Signin')}}
                key={'Signin'}>
                  <Typography textAlign="center">Sign In</Typography>
                </MenuItem> : null}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;