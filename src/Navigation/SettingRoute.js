import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RouteName } from './routeName';
import Payment from '../Screen/Payment/index.web';
import Notification from '../Screen/Notification/index.web';
import PrivacySettings from '../Screen/PrivacySettings/index.web';

import Faq from '../Screen/Faq/index.web';
import Subscriptions from '../Screen/Subscriptions/index.web';
import PrivacyPolicy from '../Screen/PrivacyPolicy/index.web';
import TermsCondition from '../Screen/TermsCondition/index.web';
import Support from '../Screen/Support/index.web';
import CreateNewTicket from '../Screen/Support/CreateNewTicket/index.web';
import SupportDetail from '../Screen/Support/SupportDetail/index.web';
import BlockUser from '../Screen/BlockUser';
import DeleteUser from '../Screen/DeleteUser';

const MySetttingStack = createNativeStackNavigator();

const SettingRoute = () => {
  return (
    <MySetttingStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={RouteName.PAYMENT}
    >
      <MySetttingStack.Screen
        name={RouteName.NOTIFICATION}
        component={Notification}
      />

      <MySetttingStack.Screen name={RouteName.PAYMENT} component={Payment} />

      <MySetttingStack.Screen name={RouteName.FAQ} component={Faq} />

      <MySetttingStack.Screen
        name={RouteName.SUBSCRIPTIONS}
        component={Subscriptions}
      />

      <MySetttingStack.Screen
        name={RouteName.PRIVACY_SETTINGS}
        component={PrivacySettings}
      />
      <MySetttingStack.Screen
        name={RouteName.PRIVACY_POLICY}
        component={PrivacyPolicy}
      />
      <MySetttingStack.Screen
        name={RouteName.TERMS_CONDITION}
        component={TermsCondition}
      />
      <MySetttingStack.Screen name={RouteName.SUPPORT} component={Support} />
      <MySetttingStack.Screen
        name={RouteName.CREATE_NEW_TICKET}
        component={CreateNewTicket}
      />
      <MySetttingStack.Screen
        name={RouteName.SUPPORT_DETAIL}
        component={SupportDetail}
      />
      <MySetttingStack.Screen
        name={RouteName.BLOCK_USER_DATA}
        component={BlockUser}
      />
      
    </MySetttingStack.Navigator>
  );
};

export default SettingRoute;
