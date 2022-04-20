import { put } from 'redux-saga/effects'
import { fetchTransactionList, addTransaction, fetchById, editTransaction } from 'services/firebase'
import TransactionsActions from 'redux/Transactions'

export function* getAllTransactions() {
  try {
    const response = yield fetchTransactionList()
    yield put(TransactionsActions.transactionsSuccess(response))
    return { success: true }
  } catch (error) {
    yield put(TransactionsActions.transactionsFailure(error))
  }
}

export function* addNewTransaction({ payload }) {
  try {
    yield addTransaction(payload)
    yield put(TransactionsActions.transactionsAddSuccess())
    yield put(TransactionsActions.transactionsRequest())
  } catch (error) {
    yield put(TransactionsActions.transactionsFailure(error))
  }
}

export function* transactionDetails({ payload }) {
  try {
    const response = yield fetchById(payload)
    yield put(TransactionsActions.transactionDetailsSuccess(response))
  } catch (error) {
    yield put(TransactionsActions.transactionDetailsFailure(error))
  }
}

export function* editTransactions({ payload }) {
  try {
    yield editTransaction(payload)
    yield put(TransactionsActions.transactionsRequest())
    yield put(TransactionsActions.transactionsEditSuccess())
  } catch (error) {
    console.log({ error })
    yield put(TransactionsActions.transactionsEditFailure(error))
  }
}

export function* updateBudget({ payload }) {
  try {
    yield put(TransactionsActions.updateBudgetSuccess(payload))
    yield put(TransactionsActions.updateSuggestionsRequest())
    yield
  } catch (error) {
    yield put(TransactionsActions.updateBudgetFailure(error))
  }
}
