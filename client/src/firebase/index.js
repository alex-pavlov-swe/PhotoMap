const firebase = require('firebase/app');
const firebaseStorage = require('firebase/storage');
const auth = require('firebase/auth');
const config = require('./config');

firebase.initializeApp(config.firebaseConfig);

const storage = firebase.storage();

export { storage, firebase };
