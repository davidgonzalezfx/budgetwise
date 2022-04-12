import { put } from 'redux-saga/effects'

import UserActions from 'redux/User'
import TransactionsActions from 'redux/Transactions'

import { loginUserWithEmail } from 'services/firebase'

export function* loginUser({ payload }) {
  try {
    const { email, password } = payload
    const user = yield loginUserWithEmail(email, password)
    yield put(UserActions.userLoginSuccess(user))
    yield put(TransactionsActions.transactionsRequest())
  } catch (error) {
    yield put(UserActions.userLoginFailure(error))
  }
}
