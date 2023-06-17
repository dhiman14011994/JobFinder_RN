import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  getRedirectResult,
  FacebookAuthProvider,
  OAuthProvider,
} from '@firebase/auth';
import { getFirestore, collection, getDocs } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAK9HAAyPUmlv0jHC74MzuulLlQiDoI_G8',
  authDomain: 'axesseq-cc197.firebaseapp.com',
  projectId: 'axesseq-cc197',
  storageBucket: 'axesseq-cc197.appspot.com',
  messagingSenderId: '764328256526',
  appId: '1:764328256526:web:8e56b47464d24d7c12c85f',
  measurementId: 'G-RH6WR3DRD9',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);

const provider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  return await new Promise(async (resolve, reject) => {
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = result.user.accessToken;
          resolve(token);
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          reject(error);
          // ...
        });
    } catch (err) {
      console.log('err>>', err);
    }
  });
};

const facebookauth = getAuth();
const facebookProvider = new FacebookAuthProvider();

export const signInWithFacebook = async () => {
  return await new Promise(async (resolve, reject) => {
    signInWithPopup(facebookauth, facebookProvider)
      .then((result) => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.

        const token = result.user.accessToken;
        resolve(token);

        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = FacebookAuthProvider.credentialFromError(error);
        reject(error);
      });
  });
};
const appleProvider = new OAuthProvider('apple.com');
const appleAuth = getAuth();
export const signInWithApple = async () => {
  return await new Promise(async (resolve, reject) => {
    signInWithPopup(appleAuth, appleProvider)
      .then((result) => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const token = result.user.accessToken;
        resolve(token);
        // const credential = OAuthProvider.credentialFromResult(result);
        // if (credential) {
        //   // You can also get the Apple OAuth Access and ID Tokens.
        //   const accessToken = credential.accessToken;
        //   const idToken = credential.idToken;
        //   resolve(accessToken);
        // }
        // The signed-in user info.

        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = OAuthProvider.credentialFromError(error);
        reject(error);
      });
  });
};
