import React from 'react'
import { Outlet} from 'react-router-dom'
import './Layout.scss'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Navbar from '../navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue } from '../../features/movieSlice/MovieSlice';
import { Link } from 'react-router-dom';

export default function Layout(props) {

  const {isLoading} = useSelector(state=>state.movie)


  const dispatch = useDispatch()


  function submitSearchValue (value) {
    value.preventDefault()
  }

  return (
    <>
    <Navbar/>



      {isLoading && <div className="loading"></div>}

      <main className="layout">

      <div className='container'>

      <Link to='/search'>
      
      <form onSubmit={(e)=>submitSearchValue(e)} className='search' action="">
         <i><SearchRoundedIcon/></i>
        <input onChange={(e)=>dispatch(setSearchValue(e.target.value))} placeholder='Search for movies or Tv series' type="text" />
      </form>
      
      </Link>
      
      <Outlet/>
      </div>

      </main>
    </>
  )
}
