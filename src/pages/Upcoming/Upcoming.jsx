import React from 'react'
import './Upcoming.scss'
import { useSelector } from 'react-redux'
import UpcomingForm from '../../components/UpcomingForm'

export default function Upcoming() {
  const {upcoming} = useSelector((state)=>state.movie)



  return (
    <div className='upcoming'>
      <ul className='upcoming-list'>
        {upcoming.map(obj => <li key={obj.id}>
          
          <UpcomingForm 
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
