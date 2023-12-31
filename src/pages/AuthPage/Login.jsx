import React, { useState } from 'react'
import './Auth.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setAuth} from '../../features/AuthSlice/AuthSlice';
import { auth  } from '../../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useFormik } from 'formik';
import { loginSchema } from './Validations/schemes';

export default function Login() {

  const [error,setError] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const onSubmit = async () => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password)
    dispatch(setAuth({
      email: values.email,
      password: values.password
    }))
    navigate('/')
    } catch(err) {
      console.error(err)
      setError(true)
    } 
  }

  const {values,touched, handleBlur,errors, handleChange, handleSubmit} = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginSchema,
    onSubmit
  })


  return (
    <div className="auth">
      <Link to='/'><img className='logo' src="./img/header-logo.svg" alt="" /></Link>
      <div className='container'>
      <div className="auth-item">
        <h1 className='title'>Login</h1>
        {error && <small className='wrong-pass'>Wrong password</small>}
        <form onSubmit={handleSubmit} className='auth-form'>
          <div className='email'>
            <input 
            id='email'
            value={values.email} 
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='Email address' 
            type="email" />
            <hr className={errors.email && touched.email ? 'error' : ''}/>
          </div>
          <div className='password'>
            <input 
            id='password'
            value={values.password} 
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='Password' 
            type="password" />
            <hr className={errors.password && touched.password  ? 'error' : ''}/>
          </div>
          <button type='submit'>Sign In</button>
        </form>
        <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
      </div>
      </div>
    </div>
  )
}
