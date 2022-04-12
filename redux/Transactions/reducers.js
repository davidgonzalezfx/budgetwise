import { createReducer } from '@reduxjs/toolkit'
import TransactionsTypes from './actionTypes'

/* ----------- Initial State ----------- */
export const TRANSACTIONS_INITIAL_STATE = {
  data: [],
  loading: false,
  error: null,
  totalBalance: 0,
  expenses: 0,
  income: 0
}

/* ----------- Reducers ----------- */
const transactionsRequest = (state) => ({
  ...state,
  loading: true
})

const transactionsSuccess = (state, { payload }) => {
  const currentMonth = new Date().getMonth()

  const totalBalance = payload.reduce((acc, transaction) => acc + +transaction.amount, 0)

  const expenses = payload.reduce((acc, transaction) => {
    const month = new Date(transaction.timestamp).getMonth()
    if (transaction.amount < 0 && month === currentMonth) {
      return acc + +transaction.amount
    }
    return acc
  }, 0)

  const income = payload.reduce((acc, transaction) => {
    const month = new Date(transaction.timestamp).getMonth()
    if (transaction.amount > 0 && month === currentMonth) {
      return acc + +transaction.amount
    }
    return acc
  }, 0)

  return {
    ...state,
    data: payload,
    totalBalance: totalBalance,
    expenses,
    income,
    loading: false
  }
}

const transactionsFailure = (state, { payload }) => ({
  ...state,
  error: payload,
  loading: false
})

const transactionsAddRequest = (state) => ({
  ...state,
  loading: true
})
const transactionsAddSuccess = (state) => ({
  ...state,
  loading: false,
  error: null
})
const transactionsAddFailure = (state, { payload }) => ({
  ...state,
  loading: false,
  error: payload
})

/* ----------- Hookup Reducer to Types ----------- */
export const TransactionsReducer = createReducer(TRANSACTIONS_INITIAL_STATE, {
  [TransactionsTypes.transactionsRequest]: transactionsRequest,
  [TransactionsTypes.transactionsSuccess]: transactionsSuccess,
  [TransactionsTypes.transactionsFailure]: transactionsFailure,

  [TransactionsTypes.transactionsAddRequest]: transactionsAddRequest,
  [TransactionsTypes.transactionsAddSuccess]: transactionsAddSuccess,
  [TransactionsTypes.transactionsAddFailure]: transactionsAddFailure
})
