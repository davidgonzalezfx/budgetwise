import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'

import TextField from 'components/TextField'

import UserActions from 'redux/User'

import styles from './login.module.scss'

const Login = ({ isLoggedIn, loginError, userLoginRequest, userRegisterRequest }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(loginError)
  const [signup, setSignup] = useState(false)
  const [name, setName] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (loginError) setError(loginError)
  }, [loginError])

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/')
    }
  }, [isLoggedIn, router])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (signup && name.length > 3) {
      userRegisterRequest({ name, email, password })
    } else if (!signup) {
      userLoginRequest(email, password)
    }
  }

  const enableSignup = () => {
    setSignup(!signup)
  }

  return (
    <div className={styles.container}>
      <h3>Wlecome to the journey of your financial well-being</h3>
      <p>Pls login or create and acocunt</p>
      <form onSubmit={handleSubmit} autoComplete='off'>
        {signup && (
          <TextField
            value={name}
            id='name'
            label='Your name'
            onChange={(value) => {
              setError(null)
              setName(value)
            }}
          />
        )}
        <TextField
          value={email}
          id='email'
          label='Email'
          type='email'
          onChange={(value) => {
            setError(null)
            setEmail(value)
          }}
        />
        <TextField
          value={password}
          id='password'
          label='Password'
          type='password'
          onChange={(value) => {
            setError(null)
            setPassword(value)
          }}
        />
        {loginError && <p className={styles.error}>{error}</p>}
        <button type='submit'>{`${!signup ? 'Login' : 'Signup'}`}</button>

        <button type='button' onClick={enableSignup}>
          {`${!signup ? "Doesn't have an account?" : 'Already have an account?'}`}
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
  userLoginRequest: (email, password) =>
    dispatch(UserActions.userLoginRequest({ email, password })),
  userRegisterRequest: (data) => dispatch(UserActions.userRegisterRequest(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
