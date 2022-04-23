import { put } from 'redux-saga/effects'

import UserActions from 'redux/User'
import TransactionsActions from 'redux/Transactions'

import { loginUserWithEmail, createUserWithEmail, logOutUser } from 'services/firebase'

export function* loginUser({ payload }) {
  try {
    const { email, password } = payload
    const user = yield loginUserWithEmail(email, password)
    yield put(UserActions.userLoginSuccess(user))
    yield put(TransactionsActions.transactionsRequest())
    yield put(TransactionsActions.categoriesRequest())
  } catch (error) {
    yield put(UserActions.userLoginFailure(error))
  }
}

export function* registerUser({ payload }) {
  try {
    const user = yield createUserWithEmail(payload)
    yield put(UserActions.userLoginSuccess(user))
    yield put(TransactionsActions.categoriesRegisterRequest())
    yield put(TransactionsActions.transactionsRequest())
  } catch (error) {
    yield put(UserActions.userRegisterFailure(error))
  }
}

export function* logoutUser() {
  try {
    yield logOutUser()
    yield put(UserActions.userLogoutSuccess())
  } catch (error) {
    yield put(UserActions.userLogoutFailure(error))
  }
}
