import { createAction } from '@reduxjs/toolkit'

const transactionsRequest = createAction('transactions/request')
const transactionsSuccess = createAction('transactions/success')
const transactionsFailure = createAction('transactions/failure')

const transactionsAddRequest = createAction('transactions/add/request')
const transactionsAddSuccess = createAction('transactions/add/success')
const transactionsAddFailure = createAction('transactions/add/failure')

const transactionsEditRequest = createAction('transactions/edit/request')
const transactionsEditSuccess = createAction('transactions/edit/success')
const transactionsEditFailure = createAction('transactions/edit/failure')

const updateBudgetRequest = createAction('budget/update/request')
const updateBudgetSuccess = createAction('budget/update/success')
const updateBudgetFailure = createAction('budget/update/failure')

const transactionDetailsRequest = createAction('transaction/details/request')
const transactionDetailsSuccess = createAction('transaction/details/success')
const transactionDetailsFailure = createAction('transaction/details/failure')

const updateSuggestionsRequest = createAction('suggestions/update/request')

export default {
  transactionsRequest,
  transactionsSuccess,
  transactionsFailure,
  transactionsAddRequest,
  transactionsAddSuccess,
  transactionsAddFailure,
  transactionsEditRequest,
  transactionsEditSuccess,
  transactionsEditFailure,
  updateBudgetRequest,
  updateBudgetSuccess,
  updateBudgetFailure,
  transactionDetailsRequest,
  transactionDetailsSuccess,
  transactionDetailsFailure,
  updateSuggestionsRequest
}
