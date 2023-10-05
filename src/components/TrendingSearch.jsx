import React, { useState,useEffect } from 'react'
import '../pages/OnSearch/OnSearch.scss'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import TheatersRoundedIcon from '@mui/icons-material/TheatersRounded';
import { useDispatch, useSelector } from 'react-redux';
import { addToBookmark, removeBookmarkItem } from '../features/movieSlice/MovieSlice';
import { Link, useNavigate } from 'react-router-dom';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined'; 

export default function TrendingSearch(props) {
  const [releaseDate,setReleaseDate] = useState(new Date(props.release))

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {login} = useSelector(state=>state.auth)
  const { searchItems,bookmark } = useSelector((state)=>state.movie)

  function toBookmark() {
    if (login) {
      dispatch(addToBookmark(props.item))
    } else {
      navigate('/login')
    }
  }

  useEffect(()=>{
    setReleaseDate(new Date(props.release))
  },[searchItems])




  return (
    <div className='field'>
      <Link to={props.media == 'movie'? `/movie/${props.id}`: `/tv/${props.id}`}>
      
      <div className='trending-search' style={{background: `url(${'https://image.tmdb.org/t/p/w185/'+props.backdrop}) no-repeat`}}>
        
      </div>
      </Link>

      {
        bookmark.some(item => item.id == props.id)
        ?
        <i onClick={()=>dispatch(removeBookmarkItem(props.id))} className='bookmark'><BookmarkOutlinedIcon/></i>
        :
        <i onClick={()=>toBookmark()} className='bookmark'><BookmarkBorderOutlinedIcon/></i>

      }

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
