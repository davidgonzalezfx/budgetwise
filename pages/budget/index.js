/* eslint-disable no-useless-escape */
/* eslint-disable multiline-ternary */
import { useEffect, useMemo, useState } from 'react'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'

import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import ProgressBar from '@ramonak/react-progress-bar'
import TransactionsActions from 'redux/Transactions'

import Layout from 'components/Layout/Layout'

import currencyFormat from 'utils/currencyFormat'

import styles from './budget.module.scss'

ChartJS.register(ArcElement, Tooltip)

const Budget = ({
  expenses,
  income,
  expectedIncome,
  expectedExpense,
  updateBudget,
  expensesSuggestions,
  expenseCategories,
  incomeCategories,
  list
}) => {
  const router = useRouter()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [incomeValue, setIncomeValue] = useState(expectedIncome)
  const [expenseValue, setExpenseValue] = useState(expectedExpense)
  const [budgetOpen, setBudgetOpen] = useState(true)
  const [suggestionsOpen, setSuggestionsOpen] = useState(false)
  const [isFirstTime, setIsFirstTime] = useState(localStorage.getItem('isFirstTime') !== 'false')

  useEffect(() => {
    setIncomeValue(expectedIncome)
  }, [expectedIncome])

  useEffect(() => {
    setExpenseValue(expectedExpense)
  }, [expectedExpense])

  const incomePercentage = useMemo(
    () => Math.round((income / expectedIncome) * 100 || 0).toFixed(0) || 0,
    [income, expectedIncome]
  )

  const expensePercentage = useMemo(
    () => Math.round((expenses / expectedExpense) * 100 || 0).toFixed(0) || 0,
    [expenses, expectedExpense]
  )

  const handleChoose = (id) => {
    const suggestionSelected = expensesSuggestions.find((category) => category.id === id)
    updateBudget({ expenseCategories: suggestionSelected.items })
    setSuggestionsOpen(false)
    setBudgetOpen(true)
  }

  const setCategoryAmount = (type, category, amount) => {
    if (type === 'expense') {
      const newCategories = expenseCategories.map((c) => {
        if (c.name === category) {
          return { ...c, amount }
        }
        return c
      })
      updateBudget({ expenseCategories: newCategories })
    } else if (type === 'income') {
      const newCategories = incomeCategories.map((c) => {
        if (c.name === category) {
          return { ...c, amount }
        }
        return c
      })
      updateBudget({ incomeCategories: newCategories })
    }
  }

  const toggleSettings = () => {
    if (isFirstTime) {
      setIsFirstTime(false)
      localStorage.setItem('isFirstTime', false)
    }
    setIsSettingsOpen(!isSettingsOpen)
  }

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
          isSettingsOpen ? 'settings' : 'summary'
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
                  <div className={styles.settings__budget__expense}>
                    <div className={styles.settings__budget__header}>
                      <p style={{ color: 'var(--red)' }}>Total Expenses</p>
                      <input
                        style={{ color: 'var(--red)' }}
                        id='expense-btn'
                        type='tel'
                        placeholder='$'
                        value={currencyFormat(expenseValue || 0) || ''}
                        disabled
                      />
                    </div>
                    <div className={styles.settings__categories__body}>
                      {expenseCategories?.map((category) => (
                        <div key={category.name} className={styles.settings__categories__item}>
                          <p>{category.name}</p>
                          <form
                            onSubmit={(e) => {
                              e.preventDefault()
                              const element = e.target[0]
                              document.getElementById(element.id).blur()
                              const value = +element.value.replace(/[\.,']/g, '')
                              setCategoryAmount('expense', category.name, value)
                            }}
                          >
                            <input
                              id={`${category.name}-input`}
                              type='tel'
                              placeholder='$'
                              value={currencyFormat(category.amount || 0)}
                              onBlur={(e) => {
                                e.preventDefault()
                                const element = e.target
                                document.getElementById(element.id).blur()
                                const value = +element.value.replace(/[\.,']/g, '')
                                setCategoryAmount('expense', category.name, value)
                              }}
                              onChange={(e) => {
                                const value = +e.target.value.replace(/[\.,']/g, '')
                                setCategoryAmount('expense', category.name, value)
                              }}
                            />
                          </form>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={styles.settings__budget__income}>
                    <div className={styles.settings__budget__header}>
                      <p style={{ color: 'var(--green)' }}>Total Income</p>

                      <input
                        style={{ color: 'var(--green)' }}
                        id='income-btn'
                        type='tel'
                        placeholder='$'
                        value={currencyFormat(incomeValue || 0)}
                        disabled
                      />
                    </div>
                    <div className={styles.settings__categories__body}>
                      {incomeCategories?.map((category) => (
                        <div key={category.name} className={styles.settings__categories__item}>
                          <p>{category.name}</p>
                          <form
                            onSubmit={(e) => {
                              e.preventDefault()
                              const element = e.target[0]
                              document.getElementById(element.id).blur()
                              const value = +element.value.replace(/[\.,']/g, '')
                              setCategoryAmount('income', category.name, value)
                            }}
                          >
                            <input
                              id={`${category.name}-input`}
                              type='tel'
                              placeholder='$'
                              value={currencyFormat(category.amount || 0)}
                              onBlur={(e) => {
                                e.preventDefault()
                                const element = e.target
                                document.getElementById(element.id).blur()
                                const value = +element.value.replace(/[\.,']/g, '')
                                setCategoryAmount('income', category.name, value)
                              }}
                              onChange={(e) => {
                                const value = +e.target.value.replace(/[\.,']/g, '')
                                setCategoryAmount('income', category.name, value)
                              }}
                            />
                          </form>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.card}>
              <button onClick={() => setSuggestionsOpen(!suggestionsOpen)}>
                <div className={styles.card__header}>
                  Explore our suggestions
                  <svg width={24} height={24} fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41Z' fill='#fff' />
                  </svg>
                </div>
              </button>
              {suggestionsOpen && (
                <div className={styles.settings__categories}>
                  <>
                    <div className={styles.settings__suggestions}>
                      {expectedIncome <= 0 && (
                        <p style={{ fontSize: '12px' }}>
                          Pls update your income first and then we will provide you awesome
                          suggestions. Just touch the $0 to update
                        </p>
                      )}
                      {expectedIncome > 0 &&
                        expensesSuggestions.map((suggestion) => (
                          <div key={suggestion.name} className={styles.settings__suggestion}>
                            <div>
                              <p style={{ fontSize: '12px' }}>{suggestion.name}</p>
                              {suggestion.items.map((item, idx) => (
                                <p style={{ fontSize: '12px' }} key={idx}>{`${
                                  (item.amount / expectedIncome).toFixed(2) * 100 || 0
                                }% → ${item.name} = ${currencyFormat(item.amount)}`}</p>
                              ))}
                              <div className={styles.settings__suggestion__chart}>
                                <Pie
                                  data={{
                                    labels: suggestion.items.map(
                                      (item) =>
                                        `${item.name} - ${
                                          (item.amount / expectedIncome) * 100 || 0
                                        }%`
                                    ),
                                    datasets: [
                                      {
                                        data: suggestion.items.map((item) => item.amount),
                                        backgroundColor: [
                                          'rgba(255, 194, 68, 0.8)',
                                          'rgba(36, 99, 246, 0.8)',
                                          'rgba(0, 192, 175, 0.8)',
                                          'rgba(154, 206, 255, 0.8)',
                                          'rgba(255, 149, 91, 0.8)',
                                          'rgba(61, 209, 186, 0.8)'
                                        ],
                                        hoverBackgroundColor: [
                                          'rgba(255, 194, 68, 0.9)',
                                          'rgba(36, 99, 246, 0.9)',
                                          'rgba(0, 192, 175, 0.9)',
                                          'rgba(154, 206, 255, 0.9)',
                                          'rgba(255, 149, 91, 0.9)',
                                          'rgba(61, 209, 186, 0.9)'
                                        ],
                                        label: 'Expenses',
                                        borderWidth: 0
                                      }
                                    ]
                                  }}
                                />
                              </div>
                            </div>
                            <div>
                              <p style={{ fontSize: '8px' }}>
                                *Lifestyle: housing, utilities, transportation, food, etc.
                              </p>
                              <button type='button' onClick={() => handleChoose(suggestion.id)}>
                                Choose
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {isFirstTime && (
              <p style={{ fontSize: '14px' }}>
                Click the settings icon on the corner to set up your budget and see suggestions{' '}
              </p>
            )}
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
              {expenseCategories.map((category) => (
                <div key={category.name}>
                  <div className={styles.container__category__item}>
                    <p>{category.name}</p>
                    <p>
                      {currencyFormat(
                        list.reduce((acc, cnt) => {
                          if (cnt.category === category.name) return acc + Math.abs(cnt.amount)
                          else return acc
                        }, 0)
                      )}
                    </p>
                  </div>
                  <div
                    className={`${styles.container__category__item} ${styles['container__summary-card-info--red']}`}
                  >
                    <p>{`${
                      Math.round(
                        (list.reduce((acc, cnt) => {
                          if (cnt.category === category.name) return acc + Math.abs(cnt.amount)
                          else return acc
                        }, 0) /
                          category.amount) *
                          100
                      ) || 0
                    }%`}</p>
                    <p>{currencyFormat(category.amount)}</p>
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
                <p className={styles['container__summary-title']}>{`${incomePercentage || 0}%`}</p>
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
            <div className={styles.container__category} style={{ marginBottom: '48px' }}>
              {incomeCategories.map((category) => (
                <div key={category.name}>
                  <div className={styles.container__category__item}>
                    <p>{category.name}</p>
                    <p>
                      {currencyFormat(
                        list.reduce((acc, cnt) => {
                          if (cnt.category === category.name) return acc + Math.abs(cnt.amount)
                          else return acc
                        }, 0)
                      )}
                    </p>
                  </div>
                  <div
                    className={`${styles.container__category__item} ${styles['container__summary-card-info--green']}`}
                  >
                    <p>{`${
                      Math.round(
                        (list.reduce((acc, cnt) => {
                          if (cnt.category === category.name) return acc + Math.abs(cnt.amount)
                          else return acc
                        }, 0) /
                          category.amount) *
                          100
                      ) || 0
                    }%`}</p>
                    <p>{currencyFormat(category.amount)}</p>
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
                    bgColor='var(--green)'
                  />
                </div>
              ))}
            </div>

            <div className={styles['container__summary-card']} style={{ paddingBottom: '48px' }}>
              <div className={styles['container__summary-card-info']}>
                <p className={styles['container__summary-title']}>Net Earnings</p>
                <p className={styles['container__summary-description']}>{`${currencyFormat(
                  income - expenses
                )}`}</p>
              </div>
              <div
                className={
                  (income - expenses) / (expectedIncome - expectedExpense || 1) > 0
                    ? styles['container__summary-card-info--green']
                    : styles['container__summary-card-info--red']
                }
              >
                <p className={styles['container__summary-title']}>{`${
                  Math.round(
                    ((income - expenses) / (expectedIncome - expectedExpense || 1)) * 100
                  ) || 0
                }%`}</p>
                <p className={styles['container__summary-description']}>
                  {`${currencyFormat(expectedIncome - expectedExpense)}`}
                </p>
              </div>
              <div className={styles['container__summary-progress-bar']}>
                <ProgressBar
                  completed={(income - expenses) / (expectedIncome - expectedExpense || 1)}
                  height='4px'
                  maxCompleted={1}
                  isLabelVisible={false}
                  bgColor={`${income - expenses > 0 ? 'var(--green)' : 'var(--red)'}`}
                  baseBgColor={`${income - expenses < 0 ? 'var(--green)' : '#e0e0ed'}`}
                  width='100%'
                />
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}

const mapStateToProps = ({ transactions }) => ({
  expenses: Math.abs(transactions.expense.actual),
  income: transactions.income.actual,
  expectedIncome: transactions.income.expected,
  expectedExpense: transactions.expense.expected,
  expensesSuggestions: transactions.expense.suggestions,
  expenseCategories: transactions.expense.categories,
  incomeCategories: transactions.income.categories,
  list: transactions.data
})

const mapDispathToProps = (dispatch) => ({
  updateBudget: (data) => dispatch(TransactionsActions.updateBudgetRequest(data))
})

export default connect(mapStateToProps, mapDispathToProps)(Budget)
