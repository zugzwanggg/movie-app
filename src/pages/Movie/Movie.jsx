import React from 'react'
import './Movie.scss'
import { useSelector } from 'react-redux'
import TrendingMovie from '../../components/TrendingMovie'

export default function Movie() {

  const {movie} = useSelector((state)=>state.movie)


  return (
    <div className='movie'>
      <h3>Movies</h3>
      <ul className='movie-list'>
        {movie.map(obj => <li key={obj.id}>
          
          <TrendingMovie 
        active={obj.active ? true : false}
        item={obj}
        id={obj.id}
        release={obj.release_date} 
        backdrop={obj.backdrop_path}
        media={obj.media_type}
        title={obj.title}
        />
          
        </li>)}
      </ul>
    </div>
  )
}
