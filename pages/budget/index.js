/* eslint-disable no-useless-escape */
/* eslint-disable multiline-ternary */
import { useEffect, useMemo, useState } from 'react'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'

import ProgressBar from '@ramonak/react-progress-bar'
import TransactionsActions from 'redux/Transactions'

import Layout from 'components/Layout/Layout'

import currencyFormat from 'utils/currencyFormat'

import styles from './budget.module.scss'

const Budget = ({
  expenses,
  income,
  expectedIncome,
  expectedExpense,
  updateBudget,
  suggestions,
  categories,
  list
}) => {
  const router = useRouter()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [incomeValue, setIncomeValue] = useState(expectedIncome)
  const [expenseValue, setExpenseValue] = useState(expectedExpense)
  const [budgetOpen, setBudgetOpen] = useState(false)
  const [suggestionsOpen, setSuggestions] = useState(true)
  const [categoriesOpen, setCategoriesOpen] = useState(false)

  useEffect(() => {
    setIncomeValue(expectedIncome)
  }, [expectedIncome])

  useEffect(() => {
    setExpenseValue(expectedExpense)
  }, [expectedExpense])

  const setExpectedIncome = (value) => {
    setIncomeValue(value)
  }

  const setExpectedExpense = (value) => {
    setExpenseValue(value)
  }

  const incomePercentage = useMemo(
    () => Math.round((income / expectedIncome) * 100) || 0,
    [income, expectedIncome]
  )
  const expensePercentage = useMemo(
    () => Math.round((expenses / expectedExpense) * 100) || 0,
    [expenses, expectedExpense]
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    const element = e.target[0] || e.target
    const value = +element.value.replace(/[\.,']/g, '')
    document.getElementById(element.id).blur()
    if (element.id === 'income-btn') {
      if (value && /^[0-9.,']+$/.test(value)) updateBudget({ expectedIncome: value })
      else updateBudget({ expectedIncome: income })
    } else if (element.id === 'expense-btn') {
      if (value && /^[0-9.,']+$/.test(value)) {
        updateBudget({ expectedExpense: value })
      } else updateBudget({ expectedExpense: expenses })
    }
  }

  const setCategoryAmount = (category, amount) => {
    const newCategories = categories.map((c) => {
      if (c.name === category) {
        return { ...c, amount }
      }
      return c
    })
    updateBudget({ categories: newCategories })
  }

  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen)

  const handleBack = () => {
    if (isSettingsOpen) {
      setIsSettingsOpen(false)
    } else router.back()
  }

  return (
    <Layout className={styles.container} hideMenu={isSettingsOpen}>
      <div className={styles.container__buttons}>
        <button type='button' onClick={handleBack}>
          <svg width={24} height={24} fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='m16 6-8 6.5 8 6.5' stroke='#fff' strokeWidth={2} strokeLinecap='round' />
          </svg>
        </button>
        <p className={styles['container__buttons-text']}>{`Budget ${
          isSettingsOpen ? 'settings' : 'resume'
        }`}</p>
        <button type='button' onClick={toggleSettings}>
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
        {isSettingsOpen ? (
          <>
            <div className={styles.card}>
              <button onClick={() => setBudgetOpen(!budgetOpen)}>
                <div className={styles.card__header}>
                  Budget
                  <svg
                    style={{ transform: budgetOpen ? 'rotate(180deg)' : '' }}
                    width={24}
                    height={24}
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41Z' fill='#fff' />
                  </svg>
                </div>
              </button>
              {budgetOpen && (
                <div className={styles.settings__budget}>
                  <div>
                    <p>Expense</p>
                    <form onSubmit={handleSubmit}>
                      <input
                        id='expense-btn'
                        type='tel'
                        placeholder='$'
                        value={currencyFormat(expenseValue) || ''}
                        onBlur={handleSubmit}
                        onChange={(e) => {
                          const value = +e.target.value.replace(/[\.,']/g, '')
                          setExpectedExpense(value)
                        }}
                      />
                    </form>
                  </div>
                  <div>
                    <p>Income</p>
                    <form onSubmit={handleSubmit}>
                      <input
                        id='income-btn'
                        type='tel'
                        placeholder='$'
                        value={currencyFormat(incomeValue) || ''}
                        onBlur={handleSubmit}
                        onChange={(e) => {
                          const value = +e.target.value.replace(/[\.,']/g, '')
                          setExpectedIncome(value)
                        }}
                      />
                    </form>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.card}>
              <button onClick={() => setCategoriesOpen(!categoriesOpen)}>
                <div className={styles.card__header}>
                  Categories
                  <svg width={24} height={24} fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41Z' fill='#fff' />
                  </svg>
                </div>
              </button>
              {categoriesOpen && (
                <>
                  <div className={styles.settings__categories}>
                    <div className={styles.settings__categories__header}>
                      <p style={{ fontSize: '12px', flex: '1' }}>Explore our suggestions:</p>
                      <button onClick={() => setSuggestions(!suggestionsOpen)}>
                        {suggestionsOpen ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    {suggestionsOpen && (
                      <div className={styles.settings__suggestions}>
                        {suggestions.map((suggestion) => (
                          <div key={suggestion.name} className={styles.settings__suggestion}>
                            <div>
                              {suggestion.items.map((item) => (
                                <div key={item.name}>
                                  <p>{item.name}</p>
                                  <input
                                    id={`${item.name}-btn`}
                                    type='tel'
                                    placeholder='$'
                                    disabled
                                    value={currencyFormat(item.amount)}
                                  />
                                </div>
                              ))}
                            </div>
                            <div>
                              <p style={{ fontSize: '8px' }}>
                                *Lifestyle: housing, utilities, transportation, food, etc.
                              </p>
                              <button>Choose</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className={styles.settings__categories__body}>
                      {categories?.map((category) => (
                        <div key={category.name} className={styles.settings__categories__item}>
                          <p>{category.name}</p>
                          <input
                            id={`${category.name}-input`}
                            type='tel'
                            placeholder='$'
                            value={currencyFormat(category.amount)}
                            onChange={(e) => {
                              const value = +e.target.value.replace(/[\.,']/g, '')
                              setCategoryAmount(category.name, value)
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <div className={styles['container__summary-card']}>
              <div className={styles['container__summary-card-info']}>
                <p className={styles['container__summary-title']}>Your expenses</p>
                <p className={styles['container__summary-description']}>{`${currencyFormat(
                  expenses
                )}`}</p>
              </div>
              <div className={styles['container__summary-card-info--red']}>
                <p className={styles['container__summary-title']}>{`${expensePercentage}%`}</p>
                {/* <p className={styles['container__summary-description']}>
                  {`${currencyFormat(100000)} left from ${currencyFormat(expectedExpense)}`}
                </p> */}
                <p className={styles['container__summary-description']}>
                  {`${currencyFormat(expectedExpense)}`}
                </p>
              </div>
              <div className={styles['container__summary-progress-bar']}>
                <ProgressBar
                  completed={expensePercentage}
                  height='4px'
                  isLabelVisible={false}
                  bgColor='var(--red)'
                  width='100%'
                />
              </div>
            </div>
            <div className={styles.container__category}>
              {categories.map((category) => (
                <div key={category.name}>
                  <div className={styles.container__category__item}>
                    <p>{category.name}</p>
                    <p>{currencyFormat(category.amount)}</p>
                  </div>
                  <div
                    className={`${styles.container__category__item} ${styles['container__summary-card-info--red']}`}
                  >
                    <p>{`${
                      (
                        list.reduce((acc, cnt) => {
                          if (cnt.category === category.name) return acc + Math.abs(cnt.amount)
                          else return acc
                        }, 0) / category.amount
                      ).toFixed(2) * 100 || 0
                    }%`}</p>
                    <p>
                      {currencyFormat(
                        list.reduce((acc, cnt) => {
                          if (cnt.category === category.name) return acc + Math.abs(cnt.amount)
                          else return acc
                        }, 0)
                      )}
                    </p>
                  </div>
                  <ProgressBar
                    completed={
                      list.reduce((acc, cnt) => {
                        if (cnt.category === category.name) return acc + Math.abs(cnt.amount)
                        else return acc
                      }, 0) / category.amount || 0
                    }
                    maxCompleted={1}
                    height='4px'
                    isLabelVisible={false}
                    bgColor='var(--red)'
                  />
                </div>
              ))}
            </div>
            <div className={styles['container__summary-card']}>
              <div className={styles['container__summary-card-info']}>
                <p className={styles['container__summary-title']}>Your income</p>
                <p className={styles['container__summary-description']}>{`${currencyFormat(
                  income
                )}`}</p>
              </div>
              <div className={styles['container__summary-card-info--green']}>
                <p className={styles['container__summary-title']}>{`${incomePercentage}%`}</p>
                {/* <p className={styles['container__summary-description']}>
                  {`${currencyFormat(100000)} over ${currencyFormat(expectedIncome)}`}
                </p> */}
                <p className={styles['container__summary-description']}>
                  {`${currencyFormat(expectedIncome)}`}
                </p>
              </div>
              <div className={styles['container__summary-progress-bar']}>
                <ProgressBar
                  completed={incomePercentage}
                  height='4px'
                  isLabelVisible={false}
                  bgColor='var(--green)'
                  width='100%'
                />
              </div>
            </div>

            <button type='button' onClick={() => router.push('/add')} className='app-button'>
              +
            </button>
          </>
        )}
      </div>
    </Layout>
  )
}

const mapStateToProps = ({ transactions }) => ({
  expenses: Math.abs(transactions.expenses),
  income: transactions.income,
  expectedIncome: transactions.expectedIncome,
  expectedExpense: transactions.expectedExpense,
  suggestions: transactions.suggestions,
  categories: transactions.categories,
  list: transactions.data
})

const mapDispathToProps = (dispatch) => ({
  updateBudget: (data) => dispatch(TransactionsActions.updateBudgetRequest(data))
})

export default connect(mapStateToProps, mapDispathToProps)(Budget)
