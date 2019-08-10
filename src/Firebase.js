import firebase from 'firebase'

const config = {
  apiKey: process.env.APP_API_KEY,
  authDomain: process.env.APP_AUTH_DOMAIN,
  databaseURL: process.env.APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: '',
  messagingSenderId: process.env.APP_MESSAGING_SENDER_APP,
  appId: process.env.APP_APP_ID
}

firebase.initializeApp(config)

// Firestore database
export const db = firebase.firestore()

// Firestore date type
export const Timestamp = firebase.firestore.Timestamp

// Export firebase for misc
export default firebase
