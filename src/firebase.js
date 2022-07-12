import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
//import firebase from "firebase"
// earlier only this line of code is enough to import auth, storage, firestore ans all other stuffs, but in new version we need to import individual things seperately
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD_TPF9nC5pjInanRaosE2kK0GxzhrOSzk",
    authDomain: "instagram-clone-85e8b.firebaseapp.com",
    projectId: "instagram-clone-85e8b",
    storageBucket: "instagram-clone-85e8b.appspot.com",
    messagingSenderId: "922448024683",
    appId: "1:922448024683:web:c718b90d273b84d4b48d2e",
    measurementId: "G-MWZKSZHJ39",
});
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { db, auth, storage };
// export default db;