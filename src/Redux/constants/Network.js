import axios from 'axios';
import baseUrl from './EndPoint';
import Config from 'react-native-config';

const Network = axios.create({
  baseURL: Config.BASE_URL,
  // baseURL:
  //   process.env.NODE_ENV == 'production'
  //     ? baseUrl.baseURL
  //     : baseUrl.developmentBaseUrl, // Change this to baseURL while share build with client
  // timeout: 30000,
});

export default Network;
