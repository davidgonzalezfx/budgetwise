import { createReducer } from '@reduxjs/toolkit'
import TransactionsTypes from './actionTypes'
import UserActionTypes from '../User/actionTypes'

/* ----------- Initial State ----------- */
export const TRANSACTIONS_INITIAL_STATE = {
  data: [],
  loading: false,
  error: null,
  totalBalance: 0,
  expectedIncome: 1000,
  expectedSpending: 1000,
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

const updateBudgetRequest = (state) => ({
  ...state,
  loading: true
})
const updateBudgetSuccess = (state, { payload }) => {
  return {
    ...state,
    loading: false,
    error: null,
    ...payload
  }
}
const updateBudgetFailure = (state, { payload }) => ({
  ...state,
  loading: false,
  error: payload
})

const updateSuggestions = (state) => {
  const suggestions = []
  const prefered = {
    name: 'prefered',
    items: [
      {
        name: 'Lifestyle',
        amount: state.expectedIncome * 0.5
      },
      {
        name: 'Charity',
        amount: state.expectedIncome * 0.1
      },
      {
        name: 'Savings',
        amount: state.expectedIncome * 0.1
      },
      {
        name: 'Tithe',
        amount: state.expectedIncome * 0.1
      },
      {
        name: 'Investments',
        amount: state.expectedIncome * 0.2
      }
    ]
  }

  const hard = {
    name: 'hard',
    items: [
      {
        name: 'Lifestyle',
        amount: state.expectedIncome * 0.3
      },
      {
        name: 'Debt',
        amount: state.expectedIncome * 0.5
      },
      {
        name: 'Savings',
        amount: state.expectedIncome * 0.1
      },
      {
        name: 'Investments',
        amount: state.expectedIncome * 0.2
      }
    ]
  }

  suggestions.push(prefered, hard)

  return {
    ...state,
    suggestions
  }
}

const resetTransactionList = (state) => ({
  ...state,
  data: [],
  loading: false,
  error: null,
  totalBalance: 0,
  expectedIncome: 1000,
  expectedSpending: 1000,
  expenses: 0,
  income: 0
})

/* ----------- Hookup Reducer to Types ----------- */
export const TransactionsReducer = createReducer(TRANSACTIONS_INITIAL_STATE, {
  [TransactionsTypes.transactionsRequest]: transactionsRequest,
  [TransactionsTypes.transactionsSuccess]: transactionsSuccess,
  [TransactionsTypes.transactionsFailure]: transactionsFailure,

  [TransactionsTypes.transactionsAddRequest]: transactionsAddRequest,
  [TransactionsTypes.transactionsAddSuccess]: transactionsAddSuccess,
  [TransactionsTypes.transactionsAddFailure]: transactionsAddFailure,

  [TransactionsTypes.updateBudgetRequest]: updateBudgetRequest,
  [TransactionsTypes.updateBudgetSuccess]: updateBudgetSuccess,
  [TransactionsTypes.updateBudgetFailure]: updateBudgetFailure,

  [UserActionTypes.userLoginRequest]: resetTransactionList,
  [UserActionTypes.userRegisterRequest]: resetTransactionList,
  [UserActionTypes.userLogoutRequest]: resetTransactionList,

  [TransactionsTypes.updateSuggestionsRequest]: updateSuggestions
})
