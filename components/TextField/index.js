import { useState } from 'react'

import classNames from 'classnames'
import styles from './TextField.module.scss'

const TextField = (
  { id, isLocked = false, isFocussed = false, value, error, label, type, className, onChange },
  props
) => {
  const [errorState, setErrorState] = useState(error)
  const [focussed, setFocussed] = useState(isLocked && isFocussed)

  const handleChange = (event) => {
    const value = event.target.value
    setErrorState('')
    onChange(value)
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
        onFocus={() => !isLocked && setFocussed(true)}
        onBlur={() => !isLocked && setFocussed(false)}
      />
      <label htmlFor={id} className={errorState && styles.error}>
        {error || label}
      </label>
    </div>
  )
}

export default TextField
