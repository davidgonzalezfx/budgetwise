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
    yield addTransaction(payload)
    yield put(TransactionsActions.transactionsAddSuccess())
    yield put(TransactionsActions.transactionsRequest())
  } catch (error) {
    yield put(TransactionsActions.transactionsFailure(error))
  }
}

export function* updateBudget({ payload }) {
  try {
    yield put(TransactionsActions.updateBudgetSuccess(payload))
  } catch (error) {
    yield put(TransactionsActions.updateBudgetFailure(error))
  }
}
