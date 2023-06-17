import { useWindowDimensions } from 'react-native-web';
import React, { useState } from 'react';
import CustomHeader from '../../Component/CustomHeader';
import { useDispatch, useSelector } from 'react-redux';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WebRoute from '../../Navigation/webRoute';
import { RouteName } from '../../Navigation/routeName';
import Strings from '../../Resources/Strings';

const WebStack = createNativeStackNavigator();
const Home = ({ route, navigation }) => {
  const window = useWindowDimensions();
  const userData = useSelector((state) => state.auth.userData);
  const type = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;
  const [activeTab, setActiveTab] = useState('Home');

  // call get stories api

  return (
    <>
      <CustomHeader
        window={window}
        activeTab={activeTab}
        type={type}
        onTabPress={(text) => {
          if (text == 'JobEvent') {
            navigation.navigate(RouteName.JOB_WEB);
            setActiveTab(text);
          } else if (text == 'Home') {
            navigation.navigate(RouteName.HOME_WEB);
            setActiveTab(text);
          } else {
            navigation.navigate(RouteName.NOTIFICATION_HEADER_STACK);
            setActiveTab(text);
          }
        }}
      />
      <WebRoute />
    </>
  );
};

export default Home;
