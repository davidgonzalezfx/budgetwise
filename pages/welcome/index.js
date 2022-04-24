import { useRouter } from 'next/router'

import styles from './welcome.module.scss'

const Welcome = () => {
  const router = useRouter()

  const handleClick = () => {
    router.push('/login')
  }

  return (
    <div className={styles.container}>
      <h3>Track and plan your financial well-being</h3>
      <p>Budgeting made easy with out ready-to-use stategies</p>
      <button onClick={handleClick}>Get started</button>
    </div>
  )
}

export default Welcome
