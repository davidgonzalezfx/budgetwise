import Head from 'next/head'
import { useRouter } from 'next/router'
import { useStore } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { wrapper } from '../redux'

import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const store = useStore((state) => state)

  return (
    <>
      <Head>
        <title>Budgetwise</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main
        className='app'
        style={{ overflow: router.pathname === '/login' ? 'scroll' : 'hidden' }}
      >
        <PersistGate loading={null} persistor={store.persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </main>
    </>
  )
}

export default wrapper.withRedux(MyApp)
