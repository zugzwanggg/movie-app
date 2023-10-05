import React from 'react'
import { useSelector } from 'react-redux'
import TrendingTv from '../../components/TrendingTv'
import './Tv.scss'

export default function Tv() {
  const { tv } = useSelector((state)=>state.movie)


  return (
    <div className='tv'>
      <h3>Tv</h3>
      <ul className='tv-list'>
        {tv.map(obj => <li key={obj.id}>
   
          <TrendingTv 
        active={obj.active ? true : false}
        item={obj}
        id={obj.id}
        release={obj.first_air_date} 
        backdrop={obj.backdrop_path}
        media={obj.media_type}
        title={obj.name}
        />
     
        </li>)}
      </ul>
    </div>
  )
}
