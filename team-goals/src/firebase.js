import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyAQnD-BrBGkT31GDEJDZiqHIaju1cVCL0U",
    authDomain: "team-goals-4fb22.firebaseapp.com",
    databaseURL: "https://team-goals-4fb22.firebaseio.com",
    projectId: "team-goals-4fb22",
    storageBucket: "",
    messagingSenderId: "734415423532"
  }

  export const firebaseApp = firebase.initializeApp(config)

  export const goalRef = firebase.database().ref('goals')
  export const completeGoalRef = firebase.database().ref('completeGoals')