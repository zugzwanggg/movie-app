import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './DetailsPage.scss'
import StarIcon from '@mui/icons-material/Star';
import ReactPlayer from 'react-player';
import {Swiper,SwiperSlide} from 'swiper/react'
import { Pagination } from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/pagination'

export default function DetailsPage() {

  const {id} = useParams()


  const [isLoading,setIsLoading] = useState(false)
  const [details,setDetails] = useState([])
  const [video,setVideo] = useState([])

  useEffect(()=>{
    setIsLoading(true)
    const fetchDetails = async () => {
      const res = await axios.get('https://api.themoviedb.org/3/movie/'+ id +'?language=en-U&api_key=e7f57cd6bd9d6cb7a454a9f694dd3e94')
      setDetails({...res.data, genres: res.data.genres })
    }
    const fetchVideos = async () => {
      const res = await axios.get('https://api.themoviedb.org/3/movie/'+id+'/videos?language=en-US&api_key=e7f57cd6bd9d6cb7a454a9f694dd3e94')
      setVideo(res.data.results)
    }
    fetchVideos()
    fetchDetails()
    setIsLoading(false)
  },[])

  

  



  return (
    <>
    {isLoading && <div className='loading'></div>}
    <div className='container'>
        
        
        <div className="details">
        <img className='poster' src={'https://image.tmdb.org/t/p/w185/'+details.poster_path} alt="" />
        <div className="details-info">
          <h3 className='title'>{details.title}</h3>
          <ul className='genres'>
          {details.genres ? details.genres.map(genre => <li key={genre.id}>{genre.name}</li>): []}
          </ul>
          <div className='rate'>
            <i><StarIcon/></i>
            {(details.vote_average ? details.vote_average : 0).toFixed(1)}/10
            </div>
          <p className="description">
            {details.overview}
          </p>
        </div>
        </div>
        <hr />
        <h3 className='trailers-title'>Trailers</h3>
        
        <Swiper
        breakpoints={{
          250 : {
            slidesPerView: 1
          },
          500 : {
            slidesPerView: 1.5
          },
          1200 : {
            slidesPerView: 3.2
          },
        }        
        }
        slidesPerView={3}
        spaceBetween={30}
        grabCursor={false}
        modules={[Pagination]}
        className='video-list'
        >
        {video
        .filter(item => item.type == 'Trailer')
        .map(video => {
          return <SwiperSlide key={video.id}>
            <ReactPlayer 
            url={'https://www.youtube.com/watch?v='+video.key}
            controls={true}
            width='330px'
            height='200px'
            />
            </SwiperSlide>})
        }
          
        </Swiper>
    </div>
    </>
  )
}
