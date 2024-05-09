import AppBar from '@mui/material/AppBar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState, useEffect, useRef} from 'react';
import connection from './axios'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';



const defaultTheme = createTheme();

const MovieDisplay = (props) =>{
  const isMounted = useRef(false);
  const isMounted_ = useRef(false);
  const [errorMessage, setErrorMessage] = useState('')
  let [movies,setMovies]=useState([]);
  let [likes, setLikes]=useState('');
  let [dislikes, setDislikes]=useState('')
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [minYear, setMinYear] = useState('');
  const [maxYear, setMaxYear] = useState('');
  const [selectedGenres, setSelectedGenres] = useState('');
  const [minRuntimeMinutes, setMinRuntimeMinutes] = useState('');
  const [maxRuntimeMinutes, setMaxRuntimeMinutes] = useState('');
  const [titleType, setTitleType] = useState('');
  const [genres, setGenres] = useState([]); 

    useEffect(() => {
      if (!isMounted_.current) {
        isMounted_.current = true;
        return;
      }
      async function test_auth(){
        try{
            const response = await connection.get(`/ntuaflix_api/test`, null, { withCredentials: true })
            if (response.status===200){return }
            else if(response.status===401){window.location.href = 'http://localhost:3000/signin'; return}
        }
        catch(err){
            setErrorMessage('Could not serve your request')
        }
      }
      test_auth()
    }, []);

    useEffect(() => {
      async function fetchGenres() {
        try {
          const response = await connection.get(`/ntuaflix_api/genres`, null, { withCredentials: true });
          if (response.status === 200) {
            setGenres(response.data);
          } else if (response.status === 204) {
            setErrorMessage('No genres available');
          }
        } catch (err) {
          setErrorMessage('Could not fetch genres');
        }
      }
  
      fetchGenres();
    }, []); 

    async function get_movies(){
      if(props.mode==='likes'){
        try{
          const user = document.cookie.split('user_cookie=')[1].split('_')[0] //get username from token
          const response = await connection.get(`/ntuaflix_api/likes/${user}`, null, { withCredentials: true })
          if (response.status===200){return setMovies(response.data)}
          else if(response.status===204)return setErrorMessage('No liked movies')
        }
        catch(err){
          setErrorMessage('Could not process your request')
        }
      }
      else if(props.mode === 'dislikes'){
        try{
          const user = document.cookie.split('user_cookie=')[1].split('_')[0] //get username from token
          const response = await connection.get(`/ntuaflix_api/dislikes/${user}`, null, { withCredentials: true })
          if (response.status===200){return setMovies(response.data)}
          else if(response.status===204)return setErrorMessage('No disliked movies')
        }
        catch(err){
          setErrorMessage('Could not process your request')
        }
      }
      else{
        try{
            const response = await connection.post(`/ntuaflix_api/filters`,null, { withCredentials: true })
            if (response.status===200){return setMovies(response.data)}
            else if(response.status===204)return setErrorMessage('No films match your filters')
        }
        catch(err){
            setErrorMessage('Could not process your request')
        }
      }
    }

    async function get_likes(){
      try{
        const user = document.cookie.split('user_cookie=')[1].split('_')[0] //get username from token
        const response = await connection.get(`/ntuaflix_api/likes/${user}`, null, { withCredentials: true })
        if (response.status===200){let likeids=response.data.map(object=>object.tconst); return setLikes(likeids)}
        else if(response.status===204)return setErrorMessage('No liked movies')
      }
      catch(err){
        setErrorMessage('Could not process your request')
      }
    }

    async function get_dislikes(){
      try{
        const user = document.cookie.split('user_cookie=')[1].split('_')[0] //get username from token
        const response = await connection.get(`/ntuaflix_api/dislikes/${user}`, null, { withCredentials: true })
        if (response.status===200){let dislikeids=response.data.map(object=>object.tconst); return setDislikes(dislikeids)}
        else if(response.status===204)return setErrorMessage('No liked movies')
      }
      catch(err){
        setErrorMessage('Could not process your request')
      }
    }

    const handleOpenFilterMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleCloseFilterMenu = () => {
      setAnchorEl(null);
    };
  
    async function handleSelectFilter(){    
      try {
        // Make a POST request to apply filters
        const response = await connection.post('/ntuaflix_api/filters',  {
          "searchText": searchText,
          "minYear" : minYear,
          "maxYear" : maxYear,
          "genre": selectedGenres, // Convert array to comma-separated string
          "minRuntimeMinutes": minRuntimeMinutes,
          "maxRuntimeMinutes": maxRuntimeMinutes,
          "titleType" : titleType
       } , {
          withCredentials: true,
        });
        if (response.status === 200) {
          // Update movies state with the filtered data
          setMovies(response.data);
          setErrorMessage('');
        } else if (response.status === 204) {
          // No films match the filters
          setMovies([]);
          setErrorMessage('No films match your filters');
        } else {
          // Handle other error cases
          setErrorMessage('Could not apply filters');
        }
      } catch (err) {
        // Handle network or other errors
        setErrorMessage('Could not apply filters');
      }
      // Close the filter menu
      handleCloseFilterMenu();
    };
  
    useEffect(() => {
      if (!isMounted.current) {
        isMounted.current = true;
        return;
      }
      get_movies();
      get_likes();
      get_dislikes();
    }, []);

    
  async function handleLike(movieid) {
    try {
      const username = document.cookie.split('user_cookie=')[1].split('_')[0];
      const response = await connection.post(`/ntuaflix_api/rate/like/${username}/${movieid}`, null, {withCredentials:true});
      if (response.status === 200) {
        setLikes((prevLikes) => [...prevLikes, movieid]);
        get_movies();
      }
    } catch (err) {
      setErrorMessage('Could not like the movie');
    }
  }

  async function handleUnlike(movieid) {
    try {
      const username = document.cookie.split('user_cookie=')[1].split('_')[0];
      const response = await connection.post(`/ntuaflix_api/unrate/unlike/${username}/${movieid}`, null, {withCredentials:true});
      if (response.status === 200) {
        setLikes((prevLikes) => prevLikes.filter((id) => id !== movieid));
        get_movies();
      }
    } catch (err) {
      setErrorMessage('Could not unlike the movie');
    }
  }

  async function handleDislike(movieid) {
    try {
      const username = document.cookie.split('user_cookie=')[1].split('_')[0];
      const response = await connection.post(`/ntuaflix_api/rate/dislike/${username}/${movieid}`, null, {withCredentials:true});
      if (response.status === 200) {
        // Update dislikes state and re-fetch movies
        setDislikes((prevDislikes) => [...prevDislikes, movieid]);
        get_movies();
      }
    } catch (err) {
      setErrorMessage('Could not dislike the movie');
    }
  }

  async function handleUndislike(movieid) {
    try {
      const username = document.cookie.split('user_cookie=')[1].split('_')[0];
      const response = await connection.post(`/ntuaflix_api/unrate/undislike/${username}/${movieid}`, null, {withCredentials:true});
      if (response.status === 200) {
        // Update dislikes state and re-fetch movies
        setDislikes((prevDislikes) => prevDislikes.filter((id) => id !== movieid));
        get_movies();
      }
    } catch (err) {
      setErrorMessage('Could not undislike the movie');
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative"></AppBar>
      <Typography component="h1" variant="h5">
        <p style={{ color: 'red' }}>{errorMessage}</p>
      </Typography>
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Button variant="outlined" onClick={handleOpenFilterMenu} sx={{ mb: 2 }}>
            Filter
          </Button>
  
          {/* Filter menu */}
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseFilterMenu}>
            {/* Add filter inputs */}
            <MenuItem>
              <TextField
                label="Search Text"
                value={searchText}
                id = "Search Text"
                onChange={(e) => setSearchText(e.target.value)}
              />
            </MenuItem>
            <MenuItem>
              <TextField
                type="number"
                label="Min Year"
                value={minYear}
                onChange={(e) => setMinYear(e.target.value)}
              />
              <TextField
                type="number"
                label="Max Year"
                value={maxYear}
                onChange={(e) => setMaxYear(e.target.value)}
              />
            </MenuItem>
            <MenuItem>
              <InputLabel id="genre-label">Genre</InputLabel>
              <Select
                labelId="genre-label"
                
                value={selectedGenres}
                onChange={(e) => setSelectedGenres(e.target.value)}
              >
                {/* Map over genres and create MenuItem options */}
                {genres.map((genre) => (
                  <MenuItem key={genre.genre} value={genre.genre}>
                    { genre.genre}
                  </MenuItem>
                ))}
              </Select>
            </MenuItem>
            <MenuItem>
              <TextField
                type="number"
                label="Min Runtime Minutes"
                value={minRuntimeMinutes}
                onChange={(e) => setMinRuntimeMinutes(e.target.value)}
              />
              <TextField
                type="number"
                label="Max Runtime Minutes"
                value={maxRuntimeMinutes}
                onChange={(e) => setMaxRuntimeMinutes(e.target.value)}
              />
            </MenuItem>
            <MenuItem>
              <TextField
                label="Title Type"
                value={titleType}
                onChange={(e) => setTitleType(e.target.value)}
              />
            </MenuItem>
            <MenuItem>
              {/* Add a button to apply filters */}
              <Button variant="contained" onClick={handleSelectFilter}>
                Apply Filters
              </Button>
            </MenuItem>
          </Menu>
  
          {/* Grid container for displaying movies */}
          <Grid container spacing={4}>
            {movies.map((movie) => (
              <Grid item key={movies.indexOf(movie)} xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="div"
                    sx={{
                      pt: '150%',
                    }}
                    image={
                      movie.imageURL
                        ? movie.imageURL.replace(/{[^}]*}/, 'w500').trim()
                        : 'https://louisville.edu/history/images/noimage.jpg'
                    }
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {movie.primaryTitle}
                    </Typography>
                    <Typography>{movie.genres ? `type: ${movie.titleType}` : null}</Typography>
                    <Typography>{movie.genres}</Typography>
                    <Typography>{movie.runtimeMinutes? `Runtime: ${movie.runtimeMinutes}` : null}</Typography>
                    <div>
                      <Button
                        startIcon={
                          likes.includes(movie.tconst) ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />
                        }
                        onClick={() =>
                          likes.includes(movie.tconst)
                            ? handleUnlike(movie.tconst)
                            : handleLike(movie.tconst)
                        }
                      ></Button>
                      <Button
                        startIcon={
                          dislikes.includes(movie.tconst) ? (
                            <ThumbDownAltIcon />
                          ) : (
                            <ThumbDownOffAltIcon />
                          )
                        }
                        onClick={() =>
                          dislikes.includes(movie.tconst)
                            ? handleUndislike(movie.tconst)
                            : handleDislike(movie.tconst)
                        }
                      ></Button>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
  
};

export default MovieDisplay;

