import { useEffect, useState } from 'react'

import classNames from 'classnames'
import styles from './TextField.module.scss'

const TextField = (
  { id, isLocked = false, isFocussed = false, value, error, label, type, className, onChange },
  props
) => {
  const [errorState, setErrorState] = useState(error)
  const [focussed, setFocussed] = useState(isLocked && isFocussed)

  useEffect(() => {
    setErrorState(error)
  }, [error])

  const handleChange = (event) => {
    const value = event.target.value
    setErrorState('')
    onChange(value)
  }

  const toggleMenu = () => {
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 481
      const menu = document.getElementsByClassName('footer-menu')[0]
      if (menu && isMobile) menu.classList.toggle('footer-menu--hidden')
    }
  }

  return (
    <div
      className={classNames(
        styles.field,
        { [className]: className },
        { [styles.active]: isLocked ? focussed : focussed || value },
        { [styles.locked]: isLocked && !focussed }
      )}
    >
      <input
        id={id}
        type={type || 'text'}
        value={value}
        placeholder={label}
        onChange={handleChange}
        {...props}
        autoComplete='off'
        onFocus={() => {
          !isLocked && setFocussed(true)
          toggleMenu()
        }}
        onBlur={() => {
          !isLocked && setFocussed(false)
          toggleMenu()
        }}
      />
      <label htmlFor={id} className={errorState && styles.error}>
        {errorState || label}
      </label>
    </div>
  )
}

export default TextField
