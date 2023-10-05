import React, { useEffect } from 'react'
import './OnSearch.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSearch } from '../../features/movieSlice/MovieSlice'
import TrendingSearch from '../../components/TrendingSearch'

export default function OnSearch() {
  const { searchItems, searchValue,bookmark } = useSelector((state)=>state.movie)

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchSearch(searchValue))
  }, [searchValue])

  return (
    <div className="on-search">
      {searchItems.length > 1 && <h3>Results</h3>}
      <ul className="search-list">
        {
          searchItems.length > 1
          ?
          <>
          {searchItems.map(item=> {
            return <li>
              
              <TrendingSearch 
              active={item.active ? true : false}
              item={item}
              id={item.id}
              backdrop={item.backdrop_path ? item.backdrop_path : item.poster_path}
              media={item.media_type}
              title={item.title ? item.title : item.name}
              release={item.release_date ? item.release_date : item.first_air_date}
              />
            </li>
          })}
          </>
          :
          <h1 style={{textAlign: 'center'}}>No results</h1>
        }
        
      </ul>
    </div>

  )
}
