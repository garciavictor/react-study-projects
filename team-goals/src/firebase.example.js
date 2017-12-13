import firebase from 'firebase'

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: "",
    messagingSenderId: "734415423532"
  }

  export const firebaseApp = firebase.initializeApp(config)

  export const goalRef = firebase.database().ref('goals')
  export const completeGoalRef = firebase.database().ref('completeGoals')