import { createReducer } from '@reduxjs/toolkit'
import UserTypes from './actionTypes'

/* ----------- Initial State ----------- */
export const USER_INITIAL_STATE = {
  data: {},
  loading: false,
  isLoggedIn: false,
  error: null
}

/* ----------- Reducers ----------- */
const userLoginRequest = (state) => ({
  ...state,
  loading: true
})

const userLoginSuccess = (state, { payload }) => ({
  ...state,
  data: payload,
  isLoggedIn: true,
  loading: false
})

const userLoginFailure = (state, { payload }) => {
  let msg = 'Something went wrong'

  if (payload.code === 'auth/user-not-found') {
    msg = 'User not found'
  } else if (payload.code === 'auth/wrong-password') {
    msg = 'Wrong password'
  }

  return {
    ...state,
    error: msg,
    loading: false
  }
}

/* ----------- Hookup Reducer to Types ----------- */
export const UserReducer = createReducer(USER_INITIAL_STATE, {
  [UserTypes.userLoginRequest]: userLoginRequest,
  [UserTypes.userLoginSuccess]: userLoginSuccess,
  [UserTypes.userLoginFailure]: userLoginFailure
})
