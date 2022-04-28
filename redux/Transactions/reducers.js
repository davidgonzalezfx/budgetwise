import { createReducer } from '@reduxjs/toolkit'
import TransactionsTypes from './actionTypes'
import UserActionTypes from '../User/actionTypes'

/* ----------- Initial State ----------- */
export const TRANSACTIONS_INITIAL_STATE = {
  data: [],
  transactionDetails: {},
  expense: {
    actual: 0,
    percentage: 0,
    suggestions: [
      {
        name: 'Our favorite',
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
        name: 'Out of debt',
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
    expected: 0,
    percentage: 0,
    isFilled: false,
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

const transactionsEditRequest = (state) => ({
  ...state,
  loading: true
})

const transactionsEditSuccess = (state) => ({
  ...state,
  loading: false,
  error: null,
  transactionDetails: {}
})

const transactionsEditFailure = (state, { payload }) => ({
  ...state,
  loading: false,
  error: payload
})

const transactionsDeleteRequest = (state) => ({
  ...state,
  loading: true
})
const transactionsDeleteSuccess = (state) => ({
  ...state,
  loading: false,
  error: null
})
const transactionsDeleteFailure = (state, { payload }) => ({
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
        isFilled: true,
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
  const income = state.income.expected
  const prefered = {
    name: 'Our favorite',
    id: 1,
    items: [
      {
        name: 'Lifestyle',
        amount: income * 0.5
      },
      {
        name: 'Charity',
        amount: income * 0.1
      },
      {
        name: 'Savings',
        amount: income * 0.1
      },
      {
        name: 'Tithe',
        amount: income * 0.1
      },
      {
        name: 'Investments',
        amount: income * 0.2
      }
    ]
  }

  const hard = {
    name: 'Out of debt',
    id: 2,
    items: [
      {
        name: 'Lifestyle',
        amount: income * 0.3
      },
      {
        name: 'Debt',
        amount: income * 0.5
      },
      {
        name: 'Savings',
        amount: income * 0.1
      },
      {
        name: 'Investments',
        amount: income * 0.2
      }
    ]
  }

  const soft = {
    name: 'Entertainment',
    id: 2,
    items: [
      {
        name: 'Lifestyle',
        amount: income * 0.5
      },
      {
        name: 'Entertainment',
        amount: income * 0.3
      },
      {
        name: 'Savings',
        amount: income * 0.1
      },
      {
        name: 'Debt',
        amount: income * 0.1
      }
    ]
  }

  const passion = {
    name: 'Go for your dreams',
    id: 2,
    items: [
      {
        name: 'Lifestyle',
        amount: income * 0.6
      },
      {
        name: 'Dreams',
        amount: income * 0.2
      },
      {
        name: 'Savings',
        amount: income * 0.1
      },
      {
        name: 'Investments',
        amount: income * 0.1
      }
    ]
  }

  suggestions.push(prefered, hard, soft, passion)

  return {
    ...state,
    expense: {
      ...state.expense,
      suggestions
    }
  }
}

const updateExpectedIncomeRequest = (state, { payload }) => {
  return {
    ...state,
    expense: {
      ...state.expense,
      expected: payload,
      categories: [
        {
          name: 'Housing',
          id: 'housing',
          amount: payload * 0.3
        },
        {
          name: 'Food',
          id: 'food',
          amount: payload * 0.3
        },
        {
          name: 'Savings',
          id: 'savings',
          amount: payload * 0.1
        },
        {
          name: 'Investments',
          id: 'investments',
          amount: payload * 0.2
        },
        {
          name: 'Other',
          id: 'other',
          amount: payload * 0.1
        }
      ],
      suggestions: [
        {
          name: 'Our favorite',
          items: [
            {
              name: 'Lifestyle',
              amount: payload * 0.5
            },
            {
              name: 'Charity',
              amount: payload * 0.1
            },
            {
              name: 'Savings',
              amount: payload * 0.1
            },
            {
              name: 'Tithe',
              amount: payload * 0.1
            },
            {
              name: 'Investments',
              amount: payload * 0.2
            }
          ]
        },
        {
          name: 'Out of debt',
          items: [
            {
              name: 'Debt',
              amount: payload * 0.5
            },
            {
              name: 'Lifestyle',
              amount: payload * 0.3
            },
            {
              name: 'Savings',
              amount: payload * 0.1
            },
            {
              name: 'Investments',
              amount: payload * 0.1
            }
          ]
        }
      ]
    },
    income: {
      ...state.income,
      expected: payload,
      isFilled: !!payload,
      categories: [
        {
          name: 'Job',
          id: 'job',
          amount: payload
        }
      ]
    }
  }
}

const transactionDetailsRequest = (state) => ({
  ...state,
  loading: true
})

const transactionDetailsSuccess = (state, { payload }) => ({
  ...state,
  loading: false,
  error: null,
  transactionDetails: payload
})

const transactionDetailsFailure = (state, { payload }) => ({
  ...state,
  loading: false,
  error: payload
})

const resetTransactionList = () => TRANSACTIONS_INITIAL_STATE

const categoriesRequest = (state) => ({
  ...state,
  loading: true
})
const categoriesSuccess = (state, { payload }) => ({
  ...state,
  loading: false,
  error: null,
  expense: {
    ...state.expense,
    categories: payload,
    expected: payload.reduce((acc, category) => acc + category.amount, 0)
  }
})

const categoriesFailure = (state, { payload }) => ({
  ...state,
  loading: false,
  error: payload
})

const categoriesUpdateRequest = (state) => ({
  ...state,
  loading: true
})
const categoriesUpdateSuccess = (state) => ({
  ...state,
  loading: false,
  error: null
})
const categoriesUpdateFailure = (state, { payload }) => ({
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
  [TransactionsTypes.transactionsAddFailure]: transactionsAddFailure,

  [TransactionsTypes.transactionsDeleteRequest]: transactionsDeleteRequest,
  [TransactionsTypes.transactionsDeleteSuccess]: transactionsDeleteSuccess,
  [TransactionsTypes.transactionsDeleteFailure]: transactionsDeleteFailure,

  [TransactionsTypes.transactionsEditRequest]: transactionsEditRequest,
  [TransactionsTypes.transactionsEditSuccess]: transactionsEditSuccess,
  [TransactionsTypes.transactionsEditFailure]: transactionsEditFailure,

  [TransactionsTypes.transactionDetailsRequest]: transactionDetailsRequest,
  [TransactionsTypes.transactionDetailsSuccess]: transactionDetailsSuccess,
  [TransactionsTypes.transactionDetailsFailure]: transactionDetailsFailure,

  [TransactionsTypes.updateBudgetRequest]: updateBudgetRequest,
  [TransactionsTypes.updateBudgetSuccess]: updateBudgetSuccess,
  [TransactionsTypes.updateBudgetFailure]: updateBudgetFailure,

  [UserActionTypes.userLoginRequest]: resetTransactionList,
  [UserActionTypes.userRegisterRequest]: resetTransactionList,
  [UserActionTypes.userLoginRequest]: resetTransactionList,
  [UserActionTypes.userLogoutRequest]: resetTransactionList,

  [TransactionsTypes.updateSuggestionsRequest]: updateSuggestions,
  [TransactionsTypes.updateExpectedIncomeRequest]: updateExpectedIncomeRequest,

  [TransactionsTypes.categoriesRequest]: categoriesRequest,
  [TransactionsTypes.categoriesSuccess]: categoriesSuccess,
  [TransactionsTypes.categoriesFailure]: categoriesFailure,

  [TransactionsTypes.categoriesUpdateRequest]: categoriesUpdateRequest,
  [TransactionsTypes.categoriesUpdateSuccess]: categoriesUpdateSuccess,
  [TransactionsTypes.categoriesUpdateFailure]: categoriesUpdateFailure
})
