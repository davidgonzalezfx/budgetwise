import { createAction } from '@reduxjs/toolkit'

/* ----------- Action Types ----------- */
const userRequest = createAction('transactions/request')
const userSuccess = createAction('transactions/success')
const userFailure = createAction('transactions/failure')

const userRegisterRequest = createAction('user/register/request')
const userRegisterSuccess = createAction('user/register/success')
const userRegisterFailure = createAction('user/register/failure')

const userLoginRequest = createAction('user/login/request')
const userLoginSuccess = createAction('user/login/success')
const userLoginFailure = createAction('user/login/failure')


export default {
  userRequest,
  userSuccess,
  userFailure,
  userRegisterRequest,
  userRegisterSuccess,
  userRegisterFailure,
  userLoginRequest,
  userLoginSuccess,
  userLoginFailure,
}
