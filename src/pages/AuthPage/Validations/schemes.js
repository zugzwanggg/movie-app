import * as yup from 'yup';




export  const loginSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Required!'),
  password: yup.string().min(5).required('Required!')
})


export const basicSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Required!'),
  password: yup.string().min(5).required('Required!'),
  confirmPassword: 
  yup.string()
  .oneOf([yup.ref('password'), null], 'Passwords are not the same')
  .required('Required')
})