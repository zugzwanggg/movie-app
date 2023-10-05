import React from 'react'
import './Bookmark.scss'
import { useSelector } from 'react-redux'
import TrendingBookmark from '../../components/TrendingBookmark'
import './Bookmark.scss'
import { Link } from 'react-router-dom'

export default function Bookmark() {

  const {login} = useSelector(state=>state.auth)
  
  const {bookmark} = useSelector((state)=>state.movie)


 


  return (
    <div>
      <div className='bookmark'>
      <h3>Bookmark</h3>
      {
      login
      ?
      <ul className='bookmark-list'>
      {bookmark.length > 0
      ?
      bookmark.map(obj => <li key={obj.id}>
          
        <TrendingBookmark
      active={obj.active}
      item={obj}
      id={obj.id}
      backdrop={obj.backdrop_path} 
      title={obj.title ? obj.title : obj.name} 
      release={obj.release_date ? obj.release_date :obj.first_air_date} 
      media={obj.media_type}
      />
        
      </li>)
      :
      <h3 className='empty-text'>Empty...</h3>
    }
      </ul>
      :
      <h3>Please <Link to='/login' className='login-text'>login</Link> to see your bookmarks</h3>
      }
    </div>
    </div>
  )
}
