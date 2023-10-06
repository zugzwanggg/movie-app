import React from 'react'
import './Auth.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setAuth} from '../../features/AuthSlice/AuthSlice';
import { auth } from '../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useFormik } from 'formik';
import { basicSchema } from './Validations/schemes';

export default function SignUp() {



  const dispatch = useDispatch()
  const navigate = useNavigate()


  const onSubmit = async () => {
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password)
    dispatch(setAuth({
      email: values.email,
      password: values.password
    }))
    navigate('/')
    } catch(err) {
      console.error(err)
    } 
  }

  console.log(error)
  const {values,touched, handleBlur,errors, handleChange, handleSubmit} = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: basicSchema,
    onSubmit
  })


  return (
    <div className="auth">
      <Link to='/'><img className='logo' src="./img/header-logo.svg" alt="" /></Link>
      <div className='container'>
      <div className="auth-item signup">
        <h1 className='title'>SignUp</h1>
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
          <div className='password'>
            <input 
            id='confirmPassword'
            value={values.confirmPassword} 
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='Repeat Password' 
            type="text" />
            <hr className={errors.confirmPassword && touched.confirmPassword  ? 'error' : ''}/>
          </div>
          <button type='submit'>SignUp</button>
        </form>
        <p>Already have an account? <Link to='/login'>Login</Link></p>
      </div>
      </div>
    </div>
  )
}
