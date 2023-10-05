import React from 'react'
import './NotFound.scss'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className='not-found'>
      <Link to='/all'>
        <img src="./img/notfound.svg" alt="" />
        <h1>404 Not Found</h1>
      </Link>
    </div>
  )
}
