import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: JSON.parse(localStorage.getItem('auth')) ? JSON.parse(localStorage.getItem('auth')) : false,
  user_data: JSON.parse(localStorage.getItem('user_data')) ? JSON.parse(localStorage.getItem('user_data')) : []
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state,action)=> {
      state.login = true
      state.user_data = action.payload
      localStorage.setItem('auth', JSON.stringify(state.login))
      localStorage.setItem('user_data',JSON.stringify(state.user_data))
    },
    logout: () => {
      const logout = {login: false, user_data: []}
      localStorage.setItem('auth',JSON.stringify(logout.login) )
      localStorage.setItem('user_data', JSON.stringify(logout.user_data))
      return logout
    }
  }
})

export const { setAuth, logout } = AuthSlice.actions

export default AuthSlice.reducer