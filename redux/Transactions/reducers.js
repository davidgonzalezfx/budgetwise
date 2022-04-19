import { createReducer } from '@reduxjs/toolkit'
import TransactionsTypes from './actionTypes'
import UserActionTypes from '../User/actionTypes'

/* ----------- Initial State ----------- */
export const TRANSACTIONS_INITIAL_STATE = {
  data: [],
  expense: {
    actual: 0,
    expected: 1000,
    percentage: 0,
    suggestions: [
      {
        name: 'prefered',
        items: [
          {
            name: 'Lifestyle',
            amount: 500
          },
          {
            name: 'Charity',
            amount: 100
          },
          {
            name: 'Savings',
            amount: 100
          },
          {
            name: 'Tithe',
            amount: 100
          },
          {
            name: 'Investments',
            amount: 100
          }
        ]
      },
      {
        name: 'hard',
        items: [
          {
            name: 'Lifestyle',
            amount: 300
          },
          {
            name: 'Debt',
            amount: 500
          },
          {
            name: 'Savings',
            amount: 100
          },
          {
            name: 'Investments',
            amount: 100
          }
        ]
      }
    ],
    categories: [
      {
        name: 'Housing',
        id: 'housing',
        amount: 500
      },
      {
        name: 'Food',
        id: 'food',
        amount: 300
      },
      {
        name: 'Other',
        id: 'other',
        amount: 200
      }
    ]
  },
  income: {
    actual: 0,
    expected: 1000,
    percentage: 0,
    suggestions: [
      {
        name: 'Young',
        items: [
          {
            name: 'Job',
            amount: 1000
          },
          {
            name: 'Online Business',
            amount: 300
          }
        ]
      },
      {
        name: 'Investor',
        items: [
          {
            name: 'Job',
            amount: 2000
          },
          {
            name: 'Real State',
            amount: 1500
          },
          {
            name: 'Stocks',
            amount: 300
          },
          {
            name: 'Online Business',
            amount: 200
          }
        ]
      }
    ],
    categories: [
      {
        name: 'Job',
        id: 'job',
        amount: 1000
      }
    ]
  },
  loading: false,
  error: null,
  totalBalance: 0
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
    expense: {
      ...state.expense,
      actual: expenses
    },
    income: {
      ...state.income,
      actual: income
    },
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
  if (payload.expenseCategories) {
    const { expenseCategories } = payload
    return {
      ...state,
      loading: false,
      error: null,
      expense: {
        ...state.expense,
        expected: expenseCategories.reduce((acc, category) => acc + category.amount, 0),
        categories: expenseCategories
      }
    }
  }
  if (payload.incomeCategories) {
    const { incomeCategories } = payload
    return {
      ...state,
      loading: false,
      error: null,
      income: {
        ...state.income,
        expected: incomeCategories.reduce((acc, category) => acc + category.amount, 0),
        categories: incomeCategories
      }
    }
  }
}
const updateBudgetFailure = (state, { payload }) => ({
  ...state,
  loading: false,
  error: payload
})

const updateSuggestions = (state) => {
  const suggestions = []
  const expected = state.expense.expected
  const prefered = {
    name: 'Our favorite',
    id: 1,
    items: [
      {
        name: 'Lifestyle',
        amount: expected * 0.5
      },
      {
        name: 'Charity',
        amount: expected * 0.1
      },
      {
        name: 'Savings',
        amount: expected * 0.1
      },
      {
        name: 'Tithe',
        amount: expected * 0.1
      },
      {
        name: 'Investments',
        amount: expected * 0.2
      }
    ]
  }

  const hard = {
    name: 'Out of debt',
    id: 2,
    items: [
      {
        name: 'Lifestyle',
        amount: expected * 0.3
      },
      {
        name: 'Debt',
        amount: expected * 0.5
      },
      {
        name: 'Savings',
        amount: expected * 0.1
      },
      {
        name: 'Investments',
        amount: expected * 0.2
      }
    ]
  }

  suggestions.push(prefered, hard)

  return {
    ...state,
    expense: {
      ...state.expense,
      suggestions
    }
  }
}

const resetTransactionList = () => TRANSACTIONS_INITIAL_STATE

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
  [UserActionTypes.userLoginRequest]: resetTransactionList,
  [UserActionTypes.userLogoutRequest]: resetTransactionList,

  [TransactionsTypes.updateSuggestionsRequest]: updateSuggestions
})
