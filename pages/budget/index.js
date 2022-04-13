import { useMemo, useState } from 'react'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'

import TransactionsActions from 'redux/Transactions'

import Layout from 'components/Layout/Layout'
import TextField from 'components/TextField'
import { CircularProgressbar } from 'react-circular-progressbar'

import styles from './budget.module.scss'
import 'react-circular-progressbar/dist/styles.css'

const Add = ({ spending, income, expectedIncome, expectedSpending, updateBudget }) => {
  const router = useRouter()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const setExpectedIncome = (value) => {
    updateBudget({ expectedIncome: +value })
  }

  const setExpectedSpending = (value) => {
    updateBudget({ expectedSpending: +value })
  }

  const incomePercentage = useMemo(
    () => Math.round((income / expectedIncome) * 100),
    [income, expectedIncome]
  )
  const spendingPercentage = useMemo(
    () => Math.round((spending / expectedSpending) * 100),
    [spending, expectedSpending]
  )

  const handleBack = () => {
    router.back()
  }

  return (
    <Layout className={styles.container}>
      <div className={styles.container__buttons}>
        <button type='button' onClick={handleBack}>
          <svg width={24} height={24} fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='m16 6-8 6.5 8 6.5' stroke='#fff' strokeWidth={2} strokeLinecap='round' />
          </svg>
        </button>
        <p className={styles['add__buttons-text']}>Budget resume</p>
        <button type='button' onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
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

      <div className={styles.container__summary}>
        {isSettingsOpen
          ? (
            <>
              <TextField
                id='income'
                label='Expected income'
                value={expectedIncome}
                onChange={(value) => setExpectedIncome(value)}
              />
              <TextField
                id='spending'
                label='Expected spending'
                value={expectedSpending}
                onChange={(value) => setExpectedSpending(value)}
              />
            </>)
          : (
          <>
            <div className={styles['container__summary-card']}>
              <div className={styles['container__summary-progress-bar']}>
                <CircularProgressbar
                  strokeWidth={12}
                  value={incomePercentage}
                  text={`${incomePercentage}%`}
                  styles={{
                    // Customize the root svg element
                    root: {},
                    // Customize the path, i.e. the "completed progress"
                    path: {
                      // Path color
                      stroke: 'var(--green)',
                      // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                      // strokeLinecap: 'butt',
                      // Customize transition animation
                      transition: 'stroke-dashoffset 0.5s ease 0s'
                      // Rotate the path
                      // transform: 'rotate(0.25turn)',
                      // transformOrigin: 'center center',
                    },
                    // Customize the circle behind the path, i.e. the "total progress"
                    trail: {
                      // Trail color
                      stroke: '#C4C4C4',
                      // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                      strokeLinecap: 'butt'
                      // Rotate the trail
                      // transform: 'rotate(0.25turn)',
                      // transformOrigin: 'center center',
                    },
                    // Customize the text
                    text: {
                      // Text color
                      fill: 'var(--white)',
                      // Text size
                      fontSize: '12px',
                      fontWeight: 'bold'
                    },
                    // Customize background - only used when the `background` prop is true
                    background: {
                      fill: '#3e98c7'
                    }
                  }}
                />
              </div>
              <div className={styles['container__summary-card-info']}>
                <p className={styles['container__summary-title']}>Your income</p>
                <p
                  className={styles['container__summary-description']}
                >{`${income} of ${expectedIncome}`}</p>
              </div>
            </div>

            <div className={styles['container__summary-card']}>
              <div className={styles['container__summary-progress-bar']}>
                <CircularProgressbar
                  strokeWidth={12}
                  value={spendingPercentage}
                  text={`${spendingPercentage}%`}
                  styles={{
                    // Customize the root svg element
                    root: {},
                    // Customize the path, i.e. the "completed progress"
                    path: {
                      // Path color
                      stroke: 'var(--red)',
                      // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                      // strokeLinecap: 'butt',
                      // Customize transition animation
                      transition: 'stroke-dashoffset 0.5s ease 0s'
                      // Rotate the path
                      // transform: 'rotate(0.25turn)',
                      // transformOrigin: 'center center',
                    },
                    // Customize the circle behind the path, i.e. the "total progress"
                    trail: {
                      // Trail color
                      stroke: '#C4C4C4',
                      // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                      strokeLinecap: 'butt'
                      // Rotate the trail
                      // transform: 'rotate(0.25turn)',
                      // transformOrigin: 'center center',
                    },
                    // Customize the text
                    text: {
                      // Text color
                      fill: 'var(--white)',
                      // Text size
                      fontSize: '12px',
                      fontWeight: 'bold'
                    },
                    // Customize background - only used when the `background` prop is true
                    background: {
                      fill: '#3e98c7'
                    }
                  }}
                />
              </div>
              <div className={styles['container__summary-card-info']}>
                <p className={styles['container__summary-title']}>Your spending</p>
                <p
                  className={styles['container__summary-description']}
                >{`${spending} of ${expectedSpending}`}</p>
              </div>
            </div>
          </>)}
      </div>

      <button type='button' onClick={() => router.push('/add')} className='app-button'>
        +
      </button>
    </Layout>
  )
}

const mapStateToProps = ({ transactions }) => ({
  spending: Math.abs(transactions.expenses),
  income: transactions.income,
  expectedIncome: transactions.expectedIncome,
  expectedSpending: transactions.expectedSpending
})

const mapDispathToProps = (dispatch) => ({
  updateBudget: (data) => dispatch(TransactionsActions.updateBudgetRequest(data))
})

export default connect(mapStateToProps, mapDispathToProps)(Add)
