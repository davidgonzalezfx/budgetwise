import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth'
import { getFirestore, addDoc, collection, getDocs } from 'firebase/firestore'
import findTimeAgo from '../utils/date'

const firebaseConfig = {
  apiKey: 'AIzaSyCKYJPoa16jwyfmvfMGkortNLmS_nczaA4',
  authDomain: 'be-budgetwise-28837.firebaseapp.com',
  projectId: 'be-budgetwise-28837',
  storageBucket: 'be-budgetwise-28837.appspot.com',
  messagingSenderId: '796957495515',
  appId: '1:796957495515:web:bdbe7f7de247ef0308bcfe',
  measurementId: 'G-EV5KPBHJV8'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore()

export const createUserWithEmail = async (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      updateProfile(user, {
        displayName: 'Dave Admin'
      }).then((user) => user)
    })
    .catch((error) => {
      throw error
    })
}

export const loginUserWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((user) => {
      console.log('user logged', user)
      return user.user
    })
    .catch((error) => {
      console.log('user not logged', error)
      throw error
    })
}

export const logOutUser = async () => {
  return signOut(auth)
    .then(() => {
      window.location.href = '/welcome'
    })
    .catch((error) => {
      throw error
    })
}

export const onAuthChanged = (onChange) =>
  onAuthStateChanged(auth, (user) => {
    onChange(user)
  })

export const addTransaction = async (data) => {
  const user = auth.currentUser
  if (!user) return []

  try {
    const docRef = await addDoc(collection(db, `users/${user.uid}/transactions`), data)
    console.log('Document written: ', docRef)
  } catch (e) {
    console.error('Error adding document: ', e)
  }
  return []
}

export const fetchTransactionList = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(db, `users/${auth.currentUser.uid}/transactions`)
    )
    const data = []
    querySnapshot.forEach((doc) => {
      const { createdAt } = doc.data()
      const date = +createdAt.toDate()

      data.push({
        ...doc.data(),
        id: doc.id,
        timestamp: date,
        createdAt: findTimeAgo(date)
      })
    })

    return data.sort((a, b) => b.timestamp - a.timestamp)
  } catch (e) {
    console.error('Error fetchin document: ', e)
    return []
  }
}
