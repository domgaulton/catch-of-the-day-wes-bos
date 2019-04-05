import Rebase from "re-base";
// import firebase from "firebase/app";
import firebase from 'firebase/app';
import 'firebase/database';

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyCDUq2U879fqsFXQujKSkYmQalWzvQZK9U",
	authDomain: "wes-bos-catch-of-the-day-76704.firebaseapp.com",
	databaseURL: "https://wes-bos-catch-of-the-day-76704.firebaseio.com",
});

// This is a named export
export { firebaseApp };

// this is a default export
const base = Rebase.createClass(firebaseApp.database());
export default base;