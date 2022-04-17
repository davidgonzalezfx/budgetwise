import React from 'react'
import { useRouter } from 'next/router'

const Menu = () => {
  const router = useRouter()
  const activeRoute = router.pathname

  const hanldeHome = () => router.push('/')
  const handleProfile = () => router.push('/profile')
  const handleBudget = () => {
    router.push('/budget')
  }

  return (
    <footer className={'footer-menu'} tabIndex={-1}>
      <button onClick={hanldeHome}>
        <svg width={24} height={25} fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M15 22.5h4.894c1.166 0 2.117-.929 2.106-2.07v-9.754a2.04 2.04 0 0 0-.745-1.573l-7.389-6.112a2.147 2.147 0 0 0-2.732 0L3.745 9.103c-.475.39-.745.961-.745 1.573v9.755c0 1.14.95 2.069 2.117 2.069H10V17a2.5 2.5 0 0 1 5 0v5.5Z'
            fill={`${activeRoute === '/' ? '#22A2F2' : '#C4C4C4'}`}
          />
        </svg>
      </button>

      <button onClick={handleBudget}>
        <svg width={24} height={25} fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M5 9.7h3v9.8H5V9.7Zm5.6-4.2h2.8v14h-2.8v-14Zm5.6 8H19v6h-2.8v-6Z'
            fill={`${activeRoute === '/budget' ? '#22A2F2' : '#C4C4C4'}`}
          />
        </svg>
      </button>
      <button onClick={handleProfile}>
        <svg width={24} height={25} fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M12.06 12.12a3.51 3.51 0 1 0 0-7.02 3.51 3.51 0 0 0 0 7.02ZM18.51 20.9c.66 0 1.17-.64.96-1.28-1.01-3.13-3.94-5.4-7.41-5.4s-6.4 2.27-7.41 5.4c-.2.63.3 1.28.96 1.28h12.9Z'
            stroke={`${activeRoute === '/profile' ? '#22A2F2' : '#C4C4C4'}`}
            strokeWidth={1.2}
            strokeMiterlimit={10}
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
    </footer>
  )
}

export default Menu
