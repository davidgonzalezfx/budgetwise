import React from 'react'
import { useRouter } from 'next/router'

const Menu = () => {
  const router = useRouter()
  const activeRoute = router.pathname

  const hanldeHome = () => router.push('/')
  const handleProfile = () => router.push('/profile')
  const handleBudget = () => {
    // router.push('/add')
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
        <svg width={25} height={25} fill='none' xmlns='http://www.w3.org/2000/svg' >
          <path
            d='M13.727 10.92h-4.78M16.237 14.21h-5.29M18.597 18.44c3.67-3.67 3.23-9.89-1.31-12.95-2.83-1.91-6.65-1.85-9.43.12a8.407 8.407 0 0 0-2.28 11.4l-1.08 2.68c-.25.61.36 1.22.98.98l2.68-1.08a8.39 8.39 0 0 0 10.44-1.15Z'
            stroke='#C4C4C4'
            strokeWidth={1.2}
            strokeMiterlimit={10}
            strokeLinecap='round'
            strokeLinejoin='round'
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
