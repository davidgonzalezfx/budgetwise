/* eslint-disable no-useless-escape */
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'

import Layout from 'components/Layout/Layout'
import TextField from 'components/TextField'

import TransactionsActions from 'redux/Transactions'

import styles from '../add/add.module.scss'
import currencyFormat from 'utils/currencyFormat'

const TransactionID = ({
  id,
  updateTransaction,
  deleteTransaction,
  expenseCategories,
  incomeCategories,
  transactionDetails,
  fetchById
}) => {
  const router = useRouter()
  const [type, setType] = useState('-')
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [date, setDate] = useState(new Date(Date.now() - 18000000).toISOString().slice(0, 16))

  useEffect(() => {
    if (id) fetchById(id)
  }, [id, fetchById])

  useEffect(() => {
    if (transactionDetails) {
      setTitle(transactionDetails.name)
      setAmount(transactionDetails.amount)
      setDate(new Date(transactionDetails?.timestamp || Date.now() - 18000000).toISOString().slice(0, 16))
      setType(transactionDetails.amount < 0 ? '-' : '+')
    }
  }, [transactionDetails])

  const toggleType = (e, value) => {
    e.preventDefault()
    if (value) setType(value)
    else setType(type === '-' ? '+' : '-')
  }

  const handleGoBack = (e) => {
    e.preventDefault()
    router.push('/')
  }

  const handleDelete = (e) => {
    e.preventDefault()
    deleteTransaction(id)
    router.push('/')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      name: title,
      category: document.getElementsByTagName('select')[0].value,
      amount: type === '-' && amount > 0 ? -amount : amount,
      createdAt: new Date(date)
    }
    if (data.name && data.amount) {
      await updateTransaction(id, data)
      router.push('/')
    }
  }

  if (!transactionDetails || !Object.keys(transactionDetails).length) return <span className='loader center'></span>

  return (
    <Layout className={styles.add} hideMenu>
      <div className={styles.add__buttons}>
        <button type='button' onClick={handleGoBack}>
          <svg width={24} height={24} fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='m16 6-8 6.5 8 6.5' stroke='#fff' strokeWidth={2} strokeLinecap='round' />
          </svg>
        </button>
        <p className={styles['add__buttons-text']}>Transaction details</p>
        <button type='button'>
          <svg width={24} height={24} fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M12.335 1c-.658 0-1.23.422-2.373 1.265L8.24 3.533c-.18.133-.27.2-.367.255-.097.056-.2.101-.405.19l-1.959.857c-1.302.569-1.953.853-2.282 1.423-.328.57-.25 1.275-.091 2.687l.238 2.125c.025.223.037.334.037.445 0 .112-.012.223-.037.446l-.238 2.124c-.158 1.413-.237 2.119.091 2.688.329.57.98.854 2.282 1.423l1.96.856c.204.09.307.135.404.19.096.056.187.123.367.256l1.72 1.268c1.144.843 1.716 1.265 2.374 1.265.657 0 1.23-.422 2.373-1.265l1.721-1.268c.18-.133.27-.2.367-.256.097-.055.2-.1.405-.19l1.959-.856c1.302-.569 1.953-.854 2.282-1.423.328-.57.25-1.275.09-2.688l-.237-2.124c-.025-.223-.038-.334-.038-.446 0-.111.013-.223.038-.445l.238-2.125c.158-1.412.237-2.118-.091-2.687-.33-.57-.98-.854-2.282-1.423l-1.96-.856c-.204-.09-.307-.135-.404-.19-.096-.057-.187-.123-.367-.256l-1.72-1.268C13.563 1.422 12.991 1 12.334 1Zm0 14.515a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z'
              fill='#0d0f12'
            />
          </svg>
        </button>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.form__row}>
          <button
            type='button'
            onClick={toggleType}
            className={styles.form__type}
            style={{
              background:
                type === '+' ? 'var(--green)' : type === '-' ? 'var(--red)' : 'var(--primary)'
            }}
          >
            {type}
          </button>
          <TextField
            value={title}
            id='title'
            label='Title'
            onChange={(value) => setTitle(value)}
            className={styles.form__title}
          />
        </div>
        <TextField
          value={currencyFormat(amount).replace('-', '')}
          id='amount'
          label='Amount'
          type='tel'
          onChange={(value) => setAmount(+value.replace(/[\.,']/g, '') || 0)}
        />
        <TextField
          value={date}
          id='date'
          label='Date'
          type='datetime-local'
          onChange={(value) => setDate(value)}
        />
        <select id='category' className={styles.form__category}>
          {type === '-'
            ? expenseCategories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
            ))
            : incomeCategories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
            ))}
        </select>
        <select id='account' name='account'>
          <option value='Wallet'>Wallet</option>
          <option value='BankAccount'>Bank Account</option>
          <option value='CreditCard'>Credit Card</option>
        </select>
        <button type='button' onClick={handleDelete} className='app-button app-button--trash'>
          ✗
        </button>
        <button type='submit' className='app-button'>
          ✓
        </button>
      </form>
    </Layout>
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  const { id } = params

  return {
    props: {
      id
    }
  }
}

const mapStateToProps = ({ transactions }) => ({
  expenseCategories: transactions.expense.categories,
  incomeCategories: transactions.income.categories,
  transactionDetails: transactions.transactionDetails
})

const mapDispatchToProps = (dispatch) => ({
  updateTransaction: (id, data) => dispatch(TransactionsActions.transactionsEditRequest({ id, data })),
  deleteTransaction: (id) => dispatch(TransactionsActions.transactionsDeleteRequest(id)),
  fetchById: (id) => dispatch(TransactionsActions.transactionDetailsRequest(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(TransactionID)
