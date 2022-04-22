import { select } from 'redux-saga/effects'
import { addCategories, editCategories } from 'services/firebase'

export function* registerCategories() {
  try {
    const categories = yield select((state) => state.transactions.expense.categories)
    yield addCategories({ categories })
    console.log('categories register')
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
