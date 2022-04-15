import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from '@redux-saga/core'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import logger from 'redux-logger'
import { createWrapper } from 'next-redux-wrapper'

import rootSaga from 'sagas'

import { rootReducer } from './rootReducer'

export function configureStore({ isServer }) {
  const sagaMiddleware = createSagaMiddleware()

  if (isServer) {
    return createStore(rootReducer, compose(applyMiddleware(sagaMiddleware, logger)))
  }

  const persistConfig = {
    key: 'root',
    storage
  }

  let customCompose = compose

  if (typeof window !== 'undefined') {
    customCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  }

  const persistedReducer = persistReducer(persistConfig, rootReducer)
  const store = createStore(
    persistedReducer,
    customCompose(applyMiddleware(sagaMiddleware, logger))
  )

  sagaMiddleware.run(rootSaga)
  store.persistor = persistStore(store)
  return store
}

export const wrapper = createWrapper(configureStore)
