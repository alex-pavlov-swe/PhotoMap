import { firebase } from './index';

export const toggleSignIn = (email, password) => {
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
  } else {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => console.error(error));
  }
};
