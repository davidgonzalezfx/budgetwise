import { createAction } from '@reduxjs/toolkit'

/* ----------- Action Types ----------- */
const userRequest = createAction('transactions/request')
const userSuccess = createAction('transactions/success')
const userFailure = createAction('transactions/failure')

const userRegisterRequest = createAction('user/register/request')
const userRegisterFailure = createAction('user/register/failure')

const userLoginRequest = createAction('user/login/request')
const userLoginSuccess = createAction('user/login/success')
const userLoginFailure = createAction('user/login/failure')

const userLogoutRequest = createAction('user/logout/request')
const userLogoutSuccess = createAction('user/logout/success')
const userLogoutFailure = createAction('user/logout/failure')

export default {
  userRequest,
  userSuccess,
  userFailure,
  userRegisterRequest,
  userRegisterFailure,
  userLoginRequest,
  userLoginSuccess,
  userLoginFailure,
  userLogoutRequest,
  userLogoutSuccess,
  userLogoutFailure
}
