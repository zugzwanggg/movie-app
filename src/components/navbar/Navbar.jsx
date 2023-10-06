import React, { useState } from 'react'
import './Navbar.scss'
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import TheatersRoundedIcon from '@mui/icons-material/TheatersRounded';
import LiveTvRoundedIcon from '@mui/icons-material/LiveTvRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/AuthSlice/AuthSlice';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';


export default function Navbar() {

  const dispatch = useDispatch()

  const {login} = useSelector(state=>state.auth)
  const [isActive,setIsActive] = useState('all')

  const handleLogout = async () => {
    try {
      await signOut(auth)
      dispatch(logout())
    } catch (err) {
      console.error(err)
    }
  }


  return (
    
    <header>
      <div className="container">
        <div className="header">


          <Link to='/' onClick={()=>setIsActive('all')}>
          <img className='header-logo' src="../img/logo.png" alt="" />
          </Link>

  
          <nav className='header-nav'>
            <ul className='nav-list'>
              <li className='list-items'>

                <Link to='/'>
                  <i onClick={()=>setIsActive('all')} className={isActive == 'all' ? 'active' : ''}><GridViewRoundedIcon/></i>
                </Link>
                
              </li>
              <li className='list-items'>

                <Link to='/movie'>
                  <i onClick={()=>setIsActive('movie')} className={isActive == 'movie' ? 'active' : ''}><TheatersRoundedIcon/></i>
                </Link>
                
              
              </li>
              <li className='list-items'>
                
                <Link to='tv'>
                  <i onClick={()=>setIsActive('tv')} className={isActive == 'tv' ? 'active' : ''}><LiveTvRoundedIcon/></i>
                </Link>
                
              </li>
              <li className='list-items'>
                
                <Link to='bookmark'>
                  <i onClick={()=>setIsActive('bookmark')} className={isActive == 'bookmark' ? 'active' : ''}><BookmarkRoundedIcon/></i>
                </Link>
                
              </li>
            </ul>
          </nav>

          {
            login
            ?
            <div className='login'>
              <button onClick={()=>handleLogout()} className='logout-btn'>
                Logout
              </button>
            </div>

            :
            <Link to='/login'>
            <i className='account-icon'><AccountCircleRoundedIcon/></i>
            </Link>
          }

        </div>
      </div>
    </header>
  )
}
