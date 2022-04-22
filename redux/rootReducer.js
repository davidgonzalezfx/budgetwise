import { combineReducers } from 'redux'
import { TransactionsReducer } from './Transactions/reducers'
import { UserReducer } from './User/reducers'

const rootReducer = combineReducers({
  transactions: TransactionsReducer,
  user: UserReducer
})

export { rootReducer }
