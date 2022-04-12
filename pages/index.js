/* eslint-disable multiline-ternary */
import { connect } from 'react-redux'

import Layout from '../components/Layout/Layout'

import styles from './index.module.scss'

const Home = ({ user, totalBalance, expenses, income, transactionList }) => {
  return (
    <Layout className={styles.home}>
      <p className={styles.user}>Hi {user?.displayName}</p>
      <h4 className={styles.home__label}>Dashboard</h4>

      <div className={styles.card}>
        <p className={styles.card__label}>Total Balance</p>
        <h3 className={styles.card__balance}>{totalBalance}</h3>

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
              <p className={styles.resume__label}>Expenses</p>
              <p className={styles.resume__amount}>{expenses}</p>
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
              <p className={styles.resume__label}>Income</p>
              <p className={styles.resume__amount}>{income}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.transactions}>
        <div className={styles.transactions__header}>
          <p className={styles.transactions__label}>Transactions</p>
          {/* <p className={styles['transactions__view-all']}>View all</p> */}
        </div>

        {!transactionList.length && <p>Start adding transactions</p>}

        {transactionList.map((transaction, index) => {
          return (
            <div key={index} className={styles.transaction__card}>
              {transaction.amount > 0 ? (
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
                {transaction.amount}
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
    expenses: transactions.expenses,
    income: transactions.income,
    user: user.data
  }
}

export default connect(mapStateToProps, null)(Home)
