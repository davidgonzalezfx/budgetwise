import { put } from 'redux-saga/effects'
import { fetchTransactionList, addTransaction } from 'services/firebase'
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
    const response = yield addTransaction(payload)
    yield put(TransactionsActions.transactionsAddSuccess(response))
    yield put(TransactionsActions.transactionsRequest())
  } catch (error) {
    yield put(TransactionsActions.transactionsFailure(error))
  }
}
