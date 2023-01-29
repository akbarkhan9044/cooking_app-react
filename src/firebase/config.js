import firebase from 'firebase/app';
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB4e8DVeWQ7rFKB66IVpcHLUaAUrEBSTV8",
  authDomain: "cooking-4b2e5.firebaseapp.com",
  projectId: "cooking-4b2e5",
  storageBucket: "cooking-4b2e5.appspot.com",
  messagingSenderId: "335054271967",
  appId: "1:335054271967:web:e2cf68fcb49f204c86406a"
}

//init firebase
firebase.initializeApp(firebaseConfig)

const projectFirestore=firebase.firestore()

export { projectFirestore }