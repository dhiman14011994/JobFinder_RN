import auth from '@react-native-firebase/auth';
export const firbaseLogin = async (socialType, socialToken, userType) => {
  return await new Promise(async (resolve, reject) => {
    console.log(
      'socialType, socialToken, userType',
      socialType,
      socialToken,
      userType
    );
    try {
      auth()
        .signInWithCredential(socialToken)
        .then((user) => {
          auth()
            .currentUser.getIdToken()
            .then((token) => {
              console.log(`firebase token==== ${socialType}`, token);
              let data = {
                firebase_token: token,
                role: userType,
              };
              resolve(data);
            })
            .catch((error) => {
              console.log('google sign in3', error);
            });
        })
        .catch((error) => {
          console.log('google sign in4', error);
        });
    } catch (error) {
      console.log('error>>>', error);
      // reject(error);
      // some other error happened
    }
  });
};
