import { all, takeLatest } from 'redux-saga/effects'

/* ----------- Types ----------- */
// import { UserTypes } from 'redux/User'
import { TransactionsTypes } from 'redux/Transactions'
import { UserTypes } from 'redux/User'

/* ----------- Sagas ----------- */
import { getAllTransactions, addNewTransaction } from 'sagas/Transactions'
import { loginUser, logoutUser, registerUser } from 'sagas/User'

export default function* root() {
  yield all([
    // Transactions
    takeLatest(TransactionsTypes.transactionsRequest, getAllTransactions),
    takeLatest(TransactionsTypes.transactionsAddRequest, addNewTransaction),
    // User
    takeLatest(UserTypes.userLoginRequest, loginUser),
    takeLatest(UserTypes.userLogoutRequest, logoutUser),
    takeLatest(UserTypes.userRegisterRequest, registerUser)
  ])
}
