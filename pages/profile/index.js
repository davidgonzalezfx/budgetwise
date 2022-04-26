import { useState } from 'react'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import classNames from 'classnames'

import Avatar from 'react-avatar'
import Layout from '../../components/Layout/Layout'

import UserActions from 'redux/User'

import styles from './profile.module.scss'
import ProgressBar from '@ramonak/react-progress-bar'

const Profile = ({ user, userLogoutRequest }) => {
  const [activeItem, setActiveItem] = useState('Goals')
  const router = useRouter()

  const handleGoBack = () => {
    router.back()
  }

  const handleLogout = () => {
    router.push('/login')
    userLogoutRequest()
  }

  return (
    <Layout className={styles.container}>
      <div className={styles.container__buttons}>
        <button type='button' onClick={handleGoBack}>
          <svg width={24} height={24} fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='m16 6-8 6.5 8 6.5' stroke='#fff' strokeWidth={2} strokeLinecap='round' />
          </svg>
        </button>
        <p className={styles['container__buttons-text']}>Profile</p>
        <button type='button' onClick={handleLogout}>
          <svg width={24} height={24} fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='m17 7-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5-5-5ZM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5Z'
              fill='#fff'
            />
          </svg>
        </button>
      </div>

      <div className={styles.container__profile}>
        <div className={styles['container__profile-image']}>
          <Avatar name={user.displayName} color='#22a2f2' round />
        </div>
        <div className={styles['container__profile-info']}>
          <p className={styles['container__profile-info-name']}>{user?.displayName}</p>
        </div>

        <div className={styles['container__profile-tabs']}>
          <button
            className={classNames(styles['container__profile-tabs-item'], {
              [styles['container__profile-tabs-item-active']]: activeItem === 'Goals'
            })}
            onClick={() => setActiveItem('Goals')}
          >
            <span>Goals</span>
          </button>
          <button
            className={classNames(styles['container__profile-tabs-item'], {
              [styles['container__profile-tabs-item-active']]: activeItem === 'Insights'
            })}
            onClick={() => setActiveItem('Insights')}
          >
            <span>Insights</span>
          </button>
          <button
            className={classNames(styles['container__profile-tabs-item'], {
              [styles['container__profile-tabs-item-active']]: activeItem === 'Settings'
            })}
            onClick={() => setActiveItem('Settings')}
          >
            <span>Settings</span>
          </button>
        </div>

        {activeItem === 'Goals' && (
          <div className={styles['container__profile-details']}>
            <p className={styles['container__profile-details-label']}>My goals</p>
            <p>New car</p>
            <ProgressBar
              completed={50}
              height='4px'
              isLabelVisible={false}
              bgColor='var(--green)'
              width='100%'
            />
            <p>New house</p>
            <ProgressBar
              completed={30}
              height='4px'
              isLabelVisible={false}
              bgColor='var(--green)'
              width='100%'
            />
            <p>Portfolio</p>
            <ProgressBar
              completed={30}
              height='4px'
              isLabelVisible={false}
              bgColor='var(--green)'
              width='100%'
            />
          </div>
        )}
        {activeItem === 'Insights' && (
          <div className={styles['container__profile-details']}>
            <p className={styles['container__profile-details-label']}>Insights</p>
          </div>
        )}
        {activeItem === 'Settings' && (
          <div className={styles['container__profile-details']}>
            <p className={styles['container__profile-details-label']}>Settings</p>
          </div>
        )}
      </div>
    </Layout>
  )
}

const mapDispatchToProps = (dispatch) => ({
  userLogoutRequest: () => dispatch(UserActions.userLogoutRequest())
})

const mapStateToProps = ({ user }) => ({ user: user.data })

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
