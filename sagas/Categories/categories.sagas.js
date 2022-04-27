import { put, select } from 'redux-saga/effects'
import TransactionsActions from 'redux/Transactions'
import {
  addCategories,
  editCategories,
  fetchCategories,
  updateExpenses,
  updateIncome
} from 'services/firebase'

export function* uploadCategories() {
  try {
    const categories = yield select((state) => state.transactions.expense.categories)
    yield addCategories({ categories })

    const expectedExpenses = yield select((state) => state.transactions.expense.expected)
    yield updateExpenses({ expected: expectedExpenses })

    const expectedIncome = yield select((state) => state.transactions.income.expected)
    yield updateIncome({ expected: expectedIncome })
  } catch (error) {
    console.log('error', error)
  }
}

export function* getCategories() {
  try {
    const categories = yield fetchCategories()
    yield put(TransactionsActions.categoriesSuccess(categories))
  } catch (error) {
    console.log('error', error)
  }
}

export function* updateCategories() {
  try {
    const categories = yield select((state) => state.transactions.expense.categories)
    yield editCategories({ categories })
  } catch (error) {
    console.log('error', error)
  }
}
