import React, { useState,useEffect } from 'react'
import '../pages/Bookmark/Bookmark.scss'
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import TheatersRoundedIcon from '@mui/icons-material/TheatersRounded';
import { Link } from 'react-router-dom';
import { removeBookmarkItem } from '../features/movieSlice/MovieSlice';
import { useDispatch } from 'react-redux';


export default function TrendingBookmark(props) {
  const [releaseDate,setReleaseDate] = useState(new Date(props.release))

  const dispatch = useDispatch()



  useEffect(()=>{
    setReleaseDate(new Date(props.release))
  },[])

  return (
    <div className='field'>
      <Link to={props.media == 'tv' ? '/tv/' + props.id : '/movie/' + props.id}>
      <div className='trending-bookmark' style={{background: `url(${'https://image.tmdb.org/t/p/w185/'+props.backdrop}) no-repeat`}}>
        
      </div>

      </Link>
      <i onClick={()=>dispatch(removeBookmarkItem(props.id))} className={props.active ? 'bookmark active' : 'bookmark'}><BookmarkOutlinedIcon/></i>
      


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
  )
}
