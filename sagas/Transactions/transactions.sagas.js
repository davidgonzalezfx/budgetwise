import { put, putResolve, select } from 'redux-saga/effects'
import {
  fetchTransactionList,
  addTransaction,
  fetchById,
  editTransaction,
  deleteTransaction,
  fetchIncome,
  updateExpenses,
  updateIncome
} from 'services/firebase'
import TransactionsActions from 'redux/Transactions'

export function* getAllTransactions() {
  try {
    const response = yield fetchTransactionList()
    const income = yield fetchIncome()

    yield put(TransactionsActions.transactionsSuccess(response))
    yield put(TransactionsActions.updateExpectedIncomeRequest(income.expected || 0))
    yield put(TransactionsActions.categoriesRequest())
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

export function* editTransactionsByID({ payload }) {
  try {
    yield editTransaction(payload)
    yield putResolve(TransactionsActions.transactionsRequest())
    yield put(TransactionsActions.transactionsEditSuccess())
  } catch (error) {
    console.log({ error })
    yield put(TransactionsActions.transactionsEditFailure(error))
  }
}

export function* deleteTransactionByID({ payload }) {
  try {
    yield deleteTransaction(payload)
    yield putResolve(TransactionsActions.transactionsRequest())
    yield put(TransactionsActions.transactionsDeleteSuccess())
  } catch (error) {
    yield put(TransactionsActions.transactionsDeleteFailure(error))
  }
}

export function* updateBudget({ payload }) {
  try {
    yield put(TransactionsActions.updateBudgetSuccess(payload))
    yield put(TransactionsActions.updateSuggestionsRequest())
    yield put(TransactionsActions.categoriesUpdateRequest())

    const expectedExpenses = yield select((state) => state.transactions?.expense?.expected || 0)
    yield updateExpenses({ expected: expectedExpenses })

    const expectedIncome = yield select((state) => state.transactions?.income?.expected || 0)
    yield updateIncome({ expected: expectedIncome })

    yield
  } catch (error) {
    yield put(TransactionsActions.updateBudgetFailure(error))
  }
}
