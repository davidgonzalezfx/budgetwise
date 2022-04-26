/* eslint-disable no-useless-escape */
/* eslint-disable multiline-ternary */
import { useState } from 'react'
import TextField from 'components/TextField'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'

import TransactionsActions from 'redux/Transactions'

import currencyFormat from 'utils/currencyFormat'

import Layout from '../components/Layout/Layout'

import styles from './index.module.scss'

const Home = ({
  user,
  totalBalance,
  expenses,
  income,
  expectedIncome,
  transactionList,
  updateIncome
}) => {
  const router = useRouter()
  const [hasFillIncome, setHasFillIncome] = useState(localStorage.getItem('hasIncome') || false)

  const handleChange = (value) => {
    const expectedIncome = +value.replace(/[\.,']/g, '')
    updateIncome(expectedIncome)
  }

  const handleContinue = () => {
    localStorage.setItem('hasIncome', true)
    setHasFillIncome(true)
    router.push('/budget')
  }

  return (
    <Layout className={styles.home}>
      <h4 className={styles.home__label}>Dashboard</h4>
      <p className={styles.user}>Hi {user?.displayName}</p>

      <div className={styles.card}>
        <p className={styles.card__label}>Total Balance</p>
        <h3 className={styles.card__balance}>{currencyFormat(totalBalance.toFixed(2))}</h3>

        <div className={styles.resume}>
          <div className={styles.resume__expenses}>
            <svg width={32} height={32} fill='none' xmlns='http://www.w3.org/2000/svg'>
              <circle cx={16} cy={16} r={16} fill='#F34747' />
              <path
                d='m16 21.818-.707.707.707.707.707-.707-.707-.707Zm1-10.909a1 1 0 1 0-2 0h2Zm-6.07 7.253 4.363 4.363 1.414-1.414-4.364-4.364-1.414 1.415Zm5.777 4.363 4.364-4.363-1.415-1.415-4.363 4.364 1.414 1.414Zm.293-.707V10.91h-2v10.91h2Z'
                fill='snow'
              />
            </svg>
            <div>
              <p className={styles.resume__amount}>{currencyFormat(expenses)}</p>
            </div>
          </div>
          <div className={styles.resume__income}>
            <svg width={32} height={32} fill='none' xmlns='http://www.w3.org/2000/svg'>
              <circle cx={16} cy={16} r={16} fill='#22E458' />
              <path
                d='m16 10.182-.707-.707.707-.707.707.707-.707.707Zm1 10.909a1 1 0 1 1-2 0h2Zm-6.07-7.253 4.363-4.363 1.414 1.414-4.364 4.364-1.414-1.415Zm5.777-4.363 4.364 4.363-1.415 1.415-4.363-4.364 1.414-1.414Zm.293.707V21.09h-2V10.18h2Z'
                fill='#fff'
              />
            </svg>
            <div>
              <p className={styles.resume__amount}>{currencyFormat(income)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.transactions}>
        <div className={styles.transactions__header}>
          <p className={styles.transactions__label}>Transactions</p>
          {/* <p className={styles['transactions__view-all']}>View all</p> */}
        </div>

        {!transactionList.length && (
          <div className={styles.transactions__empty}>
            {hasFillIncome ? (
              <p>Start adding transactions</p>
            ) : (
              <>
                <p>First input your estimated monthly income</p>
                <div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      const element = document.getElementById('initial-income')
                      element.blur()
                      const value = +element.value.replace(/[\.,']/g, '')
                      updateIncome(value)
                      router.push('/budget')
                    }}
                  >
                    <TextField
                      id='initial-income'
                      placeholder='$0.00'
                      type='tel'
                      isFocussed
                      value={currencyFormat(expectedIncome) || ''}
                      onChange={handleChange}
                    />
                  </form>
                  <button onClick={handleContinue}>Continue</button>
                </div>
              </>
            )}
          </div>
        )}

        {transactionList.map((transaction, index) => {
          return (
            <div
              key={index}
              className={styles.transaction__card}
              onClick={() => router.push(`/transaction/${transaction.id}`)}
            >
              {/* {transaction.amount > 0 ? (
                <svg width={32} height={32} fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <circle cx={16} cy={16} r={16} fill='#22E458' />
                  <path
                    d='m16 10.182-.707-.707.707-.707.707.707-.707.707Zm1 10.909a1 1 0 1 1-2 0h2Zm-6.07-7.253 4.363-4.363 1.414 1.414-4.364 4.364-1.414-1.415Zm5.777-4.363 4.364 4.363-1.415 1.415-4.363-4.364 1.414-1.414Zm.293.707V21.09h-2V10.18h2Z'
                    fill='#fff'
                  />
                </svg>
              ) : (
                <svg width={32} height={32} fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <circle cx={16} cy={16} r={16} fill='#F34747' />
                  <path
                    d='m16 21.818-.707.707.707.707.707-.707-.707-.707Zm1-10.909a1 1 0 1 0-2 0h2Zm-6.07 7.253 4.363 4.363 1.414-1.414-4.364-4.364-1.414 1.415Zm5.777 4.363 4.364-4.363-1.415-1.415-4.363 4.364 1.414 1.414Zm.293-.707V10.91h-2v10.91h2Z'
                    fill='snow'
                  />
                </svg>
              )} */}
              {transaction.category === 'Housing' && (
                <svg width={24} height={24} fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M19 9.3V4h-3v2.6L12 3 2 12h3v8h5v-6h4v6h5v-8h3l-3-2.7Zm-9 .7c0-1.1.9-2 2-2s2 .9 2 2h-4Z'
                    fill='#fff'
                  />
                </svg>
              )}
              {transaction.category === 'Food' && (
                <svg width={24} height={24} fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='m8.1 13.34 2.83-2.83L3.91 3.5a4.008 4.008 0 0 0 0 5.66l4.19 4.18Zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47Z'
                    fill='#fff'
                  />
                </svg>
              )}
              {transaction.category === 'Savings' && (
                <svg width={24} height={24} fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M17.684 21.752H2.526V6.316h8.842V3.789H2.526A2.534 2.534 0 0 0 0 6.316v15.158A2.534 2.534 0 0 0 2.526 24h15.158a2.534 2.534 0 0 0 2.526-2.526v-8.842h-2.526v9.12Z'
                    fill='#fff'
                  />
                  <path
                    d='M20.21 0h-2.526v3.79h-3.79c.013.012 0 2.526 0 2.526h3.79v3.777c.013.012 2.526 0 2.526 0V6.316H24V3.789h-3.79V0ZM15.158 8.842H5.053v2.526h10.105V8.842ZM5.053 12.632v2.526h10.105v-2.526H5.053ZM15.158 16.421H5.053v2.526h10.105v-2.526Z'
                    fill='#fff'
                  />
                </svg>
              )}
              {transaction.category === 'Investments' && (
                <svg width={24} height={24} fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='m0 22.103 9-9.496 4.8 5.058 8.508-10.078L24 9.37 13.8 21.458 9 16.4 1.8 24 0 22.103Zm1.8-5.69 7.2-7.6 4.8 5.058L24 1.783 22.308 0 13.8 10.078 9 5.02l-9 9.496 1.8 1.897Z'
                    fill='#fff'
                  />
                </svg>
              )}

              <div className={styles.transaction__info}>
                <p className={styles.transaction__title}>{transaction.name}</p>
                <p className={styles.transaction__date}>{transaction.createdAt}</p>
                <p className={styles.transaction__date}>{transaction?.category}</p>
              </div>
              <p
                className={styles.transaction__amount}
                style={{ color: transaction.amount > 0 ? 'var(--green)' : 'var(--red)' }}
              >
                {currencyFormat(transaction.amount)}
              </p>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

const mapStateToProps = ({ transactions, user }) => {
  return {
    transactionList: transactions.data,
    totalBalance: transactions.totalBalance,
    expenses: transactions.expense.actual,
    income: transactions.income.actual,
    expectedIncome: transactions.income.expected,
    user: user.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateIncome: (amount) => dispatch(TransactionsActions.updateExpectedIncomeRequest(amount))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
