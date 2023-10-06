import { useEffect } from 'react'
import './App.scss'
import Layout from './components/Layout/Layout'
import { useDispatch } from 'react-redux'
import { fetchMovies , fetchTrending, fetchTv,fetchUpcoming } from './features/movieSlice/MovieSlice'
import { Route,Routes } from 'react-router-dom'
import All from './pages/All/All'
import Movie from './pages/Movie/Movie'
import Tv from './pages/Tv/Tv'
import Bookmark from './pages/Bookmark/Bookmark'
import OnSearch from './pages/OnSearch/OnSearch'
import Login from './pages/AuthPage/Login'
import SignUp from './pages/AuthPage/SignUp'
import MovieDetailsPage from './components/DetailsPage/MovieDetailsPage'
import TvDetailsPage from './components/DetailsPage/TvDetailsPage'
import NotFound from './pages/NotFoundPage/NotFound'





function App() {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchTrending())
    dispatch(fetchMovies())
    dispatch(fetchTv())
    dispatch(fetchUpcoming())
  }, [])

  return (
    <div className='app'>
      
      <Routes>
        <Route path='/' element={<Layout/>}>

          <Route path='/' element={<All/>}/>
        
          <Route path='/movie' element={<Movie/>}/>

          <Route path='/tv' element={<Tv/>}/>

          <Route path='/bookmark' element={<Bookmark/>}/>

          <Route path='/search' element={<OnSearch/>}/>

          <Route path='/movie/:id' element={<MovieDetailsPage/>}/>

          <Route path='/tv/:id' element={<TvDetailsPage/>}/>

        </Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </div>
  )
}

export default App
