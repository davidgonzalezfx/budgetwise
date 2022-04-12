import { useState } from 'react'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'

import Layout from 'components/Layout/Layout'
import TextField from 'components/TextField'

import TransactionsActions from 'redux/Transactions'

import styles from './add.module.scss'

const Add = ({ addTransaction, loading }) => {
  const router = useRouter()
  const [type, setType] = useState('-')
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState(new Date(Date.now() - 18000000).toISOString().slice(0, 16))
  const [category, setCategory] = useState('')

  const toggleType = () => setType(type === '-' ? '+' : '-')

  const handleGoBack = (e) => {
    router.back()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      name: title,
      amount: type === '-' ? -amount : amount,
      createdAt: new Date(date),
      category
    }
    await addTransaction(data)
    router.push('/')
  }

  return (
    <Layout className={styles.add}>
      <div className={styles.add__buttons}>
        <button type='button' onClick={handleGoBack}>
          <svg width={24} height={24} fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='m16 6-8 6.5 8 6.5' stroke='#fff' strokeWidth={2} strokeLinecap='round' />
          </svg>
        </button>
        <p className={styles['add__buttons-text']}>Add a new transaction</p>
        <button type='button'>
          <svg width={24} height={24} fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M12.335 1c-.658 0-1.23.422-2.373 1.265L8.24 3.533c-.18.133-.27.2-.367.255-.097.056-.2.101-.405.19l-1.959.857c-1.302.569-1.953.853-2.282 1.423-.328.57-.25 1.275-.091 2.687l.238 2.125c.025.223.037.334.037.445 0 .112-.012.223-.037.446l-.238 2.124c-.158 1.413-.237 2.119.091 2.688.329.57.98.854 2.282 1.423l1.96.856c.204.09.307.135.404.19.096.056.187.123.367.256l1.72 1.268c1.144.843 1.716 1.265 2.374 1.265.657 0 1.23-.422 2.373-1.265l1.721-1.268c.18-.133.27-.2.367-.256.097-.055.2-.1.405-.19l1.959-.856c1.302-.569 1.953-.854 2.282-1.423.328-.57.25-1.275.09-2.688l-.237-2.124c-.025-.223-.038-.334-.038-.446 0-.111.013-.223.038-.445l.238-2.125c.158-1.412.237-2.118-.091-2.687-.33-.57-.98-.854-2.282-1.423l-1.96-.856c-.204-.09-.307-.135-.404-.19-.096-.057-.187-.123-.367-.256l-1.72-1.268C13.563 1.422 12.991 1 12.334 1Zm0 14.515a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z'
              fill='#fff'
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
            style={{ background: type === '+' && 'var(--green)' }}
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
          value={amount}
          id='amount'
          label='Amount'
          type='tel'
          onChange={(value) => setAmount(value.replace(/-/g, ''))}
        />
        <TextField
          value={date}
          id='date'
          label='Date'
          type='datetime-local'
          onChange={(value) => setDate(value)}
        />
        <TextField
          value={category}
          id='categort'
          label='Category'
          onChange={(value) => setCategory(value)}
        />
        <button type='submit' className={styles.form__submit}>
          ✓
        </button>
      </form>
    </Layout>
  )
}

const mapDispatchToProps = (dispatch) => ({
  addTransaction: (data) => dispatch(TransactionsActions.transactionsAddRequest(data))
})

const mapStateToProps = ({ transactions }) => ({ loading: transactions.loading })

export default connect(mapStateToProps, mapDispatchToProps)(Add)
