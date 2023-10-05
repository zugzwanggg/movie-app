import React from 'react'
import './Auth.scss'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux';
import { setAuth } from '../../features/AuthSlice/AuthSlice';

export default function Login() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div className="auth">
      <Link to='/'><img className='logo' src="./img/header-logo.svg" alt="" /></Link>
      <div className='container'>
      <div className="auth-item">
        <h1 className='title'>Login</h1>
        <GoogleOAuthProvider clientId='355365207011-u5qhv7qk3et4eqhnjfovvmnepfdo2c3g.apps.googleusercontent.com'>
        <GoogleLogin  
        onSuccess={credentialResponse => {
        var decoded = jwt_decode(credentialResponse.credential);
        dispatch(setAuth(decoded))
        navigate('/')
          }}
        onError={() => {
          console.log('Login Failed');
        }}/>
      </GoogleOAuthProvider>
      </div>
      </div>
    </div>
  )
}
