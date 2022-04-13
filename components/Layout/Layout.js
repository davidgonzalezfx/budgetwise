/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'

import Menu from 'components/Menu/Menu'

import TransactionsActions from 'redux/Transactions'
import UserActions from 'redux/User'

import styles from './Layout.module.scss'
import { onAuthChanged } from 'services/firebase'

const Layout = ({
  children,
  className,
  transactionsRequest,
  userLogout,
  setUser,
  hideMenu = false
}) => {
  const router = useRouter()

  useEffect(() => {
    onAuthChanged((user) => {
      if (user) {
        setUser(user)
        transactionsRequest()
      } else {
        userLogout()
        router.push('/welcome')
      }
    })
  }, [])

  return (
    <>
      <div className={`${styles.layout} ${className || ''}`}>{children}</div>
      {!hideMenu && <Menu />}
    </>
  )
}

const mapDispatchToProps = (dispatch) => ({
  transactionsRequest: () => dispatch(TransactionsActions.transactionsRequest()),
  userLogout: () => dispatch(UserActions.userLogoutRequest()),
  setUser: (user) => dispatch(UserActions.userLoginSuccess(user))
})

export default connect(null, mapDispatchToProps)(Layout)
