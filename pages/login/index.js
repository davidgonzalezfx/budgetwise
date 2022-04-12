import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'

import UserActions from 'redux/User'

import styles from './login.module.scss'

const Login = ({ isLoggedIn, loginError, loginUserWithEmail }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/')
    }
  }, [isLoggedIn, router])

  const handleLogin = (event) => {
    event.preventDefault()
    loginUserWithEmail(email, password)
  }

  return (
    <div className={styles.container}>
      <h3>Wlecome to the journey of your financial well-being</h3>
      <p>Pls login or create and acocunt</p>
      <form onSubmit={handleLogin}>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {loginError && <p className={styles.error}>{loginError}</p>}
        <button type='submit' onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  )
}

const mapStateToProps = ({ user }) => ({
  isLoggedIn: user.isLoggedIn,
  loginError: user.error
})

const mapDispatchToProps = (dispatch) => ({
  loginUserWithEmail: (email, password) =>
    dispatch(UserActions.userLoginRequest({ email, password }))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
