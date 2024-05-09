import './App.css';
import SignIn from './components/signin';
import SignUp from './components/signup';
import MainPage from './components/mainpage';
import MovieDisplay from './components/movieDisplay'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />}/>
        <Route path='/signin' element={<SignIn />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/movieDisplay' element={<MovieDisplay mode='default'/>}/>
        <Route path='/Likes' element={<MovieDisplay mode='likes'/>}/>
        <Route path='/Dislikes' element={<MovieDisplay mode='dislikes'/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
