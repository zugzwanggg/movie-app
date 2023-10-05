import React from 'react'
import { useSelector } from 'react-redux'
import './All.scss'
import TrendingAll from '../../components/TrendingAll'
import {Swiper, SwiperSlide} from 'swiper/react'
import { Pagination, FreeMode } from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/pagination'
import Upcoming from '../Upcoming/Upcoming'
import { Routes,Route } from 'react-router-dom'

export default function All() {

  

  const {trending,bookmark} = useSelector((state)=>state.movie)


  return (
    <div className='all'>
      <div className="trending">
        <h3>Trending</h3>
        <Swiper
      breakpoints={
        {
          250 : {
            slidesPerView: 1.2
          },
          320 : {
            slidesPerView: 2.2,
            spaceBetween: 100
          },
          500 : {
            slidesPerView: 3,
          },
          1070 : {
            slidesPerView: 4
          },
          1200 : {
            slidesPerView: 5
          },
          1400 : {
            slidesPerView: 6
          }
        }
      }
      spaceBetween={30}
      grabCursor={true}
      freeMode={true}
      modules={[FreeMode,Pagination]}
      scrollbar={{hide: false}}
      className='trending-list'
    > 
      {trending.map(obj =><SwiperSlide>

            
<TrendingAll 
  active={obj.active ? true : false}
  item={obj}
  id={obj.id}
  backdrop={obj.backdrop_path} 
  title={obj.title ? obj.title : obj.name} 
  release={obj.release_date ? obj.release_date :obj.first_air_date} 
  media={obj.media_type}
/>

</SwiperSlide> )}
    </Swiper>

          


      </div>
      <div className="upcoming">
        <h3 style={{marginBottom: '3rem', textAlign: 'center'}} className='upcoming-title'>Upcoming</h3>
        <Upcoming/>
      </div>
    </div>
  )
}
