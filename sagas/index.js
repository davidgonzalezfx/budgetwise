import { all, takeLatest } from 'redux-saga/effects'

/* ----------- Types ----------- */
// import { UserTypes } from 'redux/User'
import { TransactionsTypes } from 'redux/Transactions'
import { UserTypes } from 'redux/User'

/* ----------- Sagas ----------- */
import {
  getAllTransactions,
  addNewTransaction,
  editTransactionsByID,
  deleteTransactionByID,
  transactionDetails,
  updateBudget
} from 'sagas/Transactions'
import { loginUser, logoutUser, registerUser } from 'sagas/User'
import { uploadCategories, updateCategories, getCategories } from 'sagas/Categories'

export default function* root() {
  yield all([
    // Transactions
    takeLatest(TransactionsTypes.transactionsRequest, getAllTransactions),
    takeLatest(TransactionsTypes.transactionsAddRequest, addNewTransaction),
    takeLatest(TransactionsTypes.transactionsDeleteRequest, deleteTransactionByID),
    takeLatest(TransactionsTypes.transactionDetailsRequest, transactionDetails),
    takeLatest(TransactionsTypes.transactionsEditRequest, editTransactionsByID),
    takeLatest(TransactionsTypes.updateBudgetRequest, updateBudget),
    // User
    takeLatest(UserTypes.userLoginRequest, loginUser),
    takeLatest(UserTypes.userLogoutRequest, logoutUser),
    takeLatest(UserTypes.userRegisterRequest, registerUser),
    // Categories
    takeLatest(TransactionsTypes.categoriesRegisterRequest, uploadCategories),
    takeLatest(TransactionsTypes.updateExpectedIncomeRequest, uploadCategories),
    takeLatest(TransactionsTypes.categoriesRequest, getCategories),
    takeLatest(TransactionsTypes.categoriesUpdateRequest, updateCategories)
  ])
}
