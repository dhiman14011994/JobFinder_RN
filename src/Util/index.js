import { Platform, Dimensions } from 'react-native';
import { emailCheck } from '../Redux/services/authService';
export const isNative = Platform.OS !== 'web';
export const mxWidth = Dimensions.get('window').width;
export const mxHeight = Dimensions.get('screen').height;
export const client_id = '78wgmz0j48ogg9';
export const client_secret = 'smtpiLPT3R3KAdWv';
export const redirect_uri =
  'https://www.linkedin.com/developers/tools/oauth/redirect';
export const GoogleClientID =
  '764328256526-fsipc9532r3fj8ni3rc2fa2ijai1l2tk.apps.googleusercontent.com';
export const DeveloperKey = 'AIzaSyBYZcxuD4nDGnyrMmD-FZPU2D2lFeG5nVc';

export const productSkus = Platform.select({
  ios: ['com.axesseq.goldplan'],

  android: ['org.joieapp.oneyearsubscription'],

  default: [],
});
