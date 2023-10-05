import React, { useEffect, useState } from 'react'
import '../pages/All/All.scss'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';  
import TheatersRoundedIcon from '@mui/icons-material/TheatersRounded';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToBookmark, removeBookmarkItem } from '../features/movieSlice/MovieSlice';



export default function TrendingAll(props) {
  const [releaseDate,setReleaseDate] = useState(new Date())
  const {bookmark} = useSelector(state=>state.movie) 
  const {login} = useSelector(state=>state.auth) 
  const dispatch = useDispatch()
  const navigate = useNavigate()


  function toBookmark() {
    if (login) {
      dispatch(addToBookmark(props.item))
    } else {
      navigate('/login')
    }
  }

  useEffect(()=>{
    setReleaseDate(new Date(props.release))
  },[])

  return (
    <div className="field">
      <Link to={props.media == 'tv' ? '/tv/' + props.id : '/movie/' + props.id}>
    <div className='backdrop' style={{background: `url(${'https://image.tmdb.org/t/p/w185/'+props.backdrop}) no-repeat`}}>
      
      
      <div className="info">
      <small>
      {releaseDate.getFullYear()}
          <span></span>
          <i>
            <TheatersRoundedIcon/>
          </i>
          <span></span>
          {props.media}
      </small>
      <p>
        {props.title}
      </p>
      </div>
    </div>
    </Link>
      {bookmark.some(item => item.id == props.id)
      ?
      <i onClick={()=>dispatch(removeBookmarkItem(props.id))} className='bookmark'>
        <BookmarkOutlinedIcon/>
      </i>
      :
      <i onClick={()=>toBookmark()} className='bookmark'>
        <BookmarkBorderOutlinedIcon/>
      </i>
      }
    </div>
  )
}
