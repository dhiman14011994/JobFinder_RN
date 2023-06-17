import { Platform } from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
// import { GoogleSignin, statusCodes } from 'react-native-google-signin'
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  Settings,
} from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';
export const googleLogin = async () => {
  await GoogleSignin.signOut();
  return await new Promise(async (resolve, reject) => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo?.idToken
      );
      resolve(googleCredential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('google error', error);
        reject(error);
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('google error', error);
        reject(error);
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('google error', error);
        reject(error);
        // play services not available or outdated
      } else {
        console.log('google error', error);
        reject(error);
        // some other error happened
      }
    }
  });
};

// export const facebookLogin = async () => {
//   // if (Platform.OS === 'android') {
//   LoginManager.setLoginBehavior('web_only');
//   // }
//   return await new Promise((resolve, reject) => {
//     LoginManager.logOut();
//     LoginManager.logInWithPermissions(['public_profile', 'email'])
//       .then((result) => {
//         if (result.isCancelled) {
//           reject('facebook Login cancelled');
//         }
//       })
//       .then(() => {
//         const infoRequest = new GraphRequest(
//           '/me?fields=id,name,email,picture',
//           null,
//           (error, result) => {
//             if (error) {
//               console.log('Error fetching data: ', error);
//               reject(error);
//             } else {
//               console.log('fetching data facebook>>>', result);
//               // resolve(result);
//               AccessToken.getCurrentAccessToken().then((data) => {
//                 let token = data.accessToken.toString();
//                 let nonce = '123456';
//                 const facebookCredential = auth.FacebookAuthProvider.credential(
//                   token,
//                   nonce
//                 );
//                 resolve(facebookCredential);
//               });
//             }
//           }
//         );
//         new GraphRequestManager().addRequest(infoRequest).start();
//       })
//       .catch((err) => reject(err));
//   });
// };

export const configureFacebook = () => {
  // setting up the app ID
  Settings.setAppID('912638386530087');
  Settings.initializeSDK();
};

export const facebookLogin = async () => {
  return await new Promise((resolve, reject) => {
    if (Platform.OS === 'android') {
      LoginManager.setLoginBehavior('web_only');
    }

    LoginManager.logOut();
    LoginManager.logInWithPermissions(['public_profile', 'email'])
      .then((result) => {
        if (result.isCancelled) {
          console.log('facebook Login cancelled');
        }
      })
      .then(() => {
        const infoRequest = new GraphRequest(
          '/me?fields=id,name,email,picture',
          undefined,
          (error, result) => {
            if (error) {
              console.log('Error fetching data: ', error);
              reject(error);
            } else {
              //   console.log('fetching data facebook>>>', result);
              //   resolve(result);
              AccessToken.getCurrentAccessToken().then(async (data) => {
                let token = data.accessToken.toString();

                const facebookCredential =
                  auth.FacebookAuthProvider.credential(token);

                resolve(facebookCredential);
              });
            }
          }
        );
        new GraphRequestManager().addRequest(infoRequest).start();
      })
      .catch((err) => {
        reject(err);
        console.log(err);
      });
  });
};
