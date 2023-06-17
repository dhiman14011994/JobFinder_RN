import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RouteName } from './routeName';
import Companies from '../Screen/Chat/Companies';
import DirectMessages from '../Screen/Chat/DirectMessage';
import ChatNotifications from '../Screen/Chat/NotificationsChat';
import ChatDetail from '../Screen/ChatDetail/index.web';
import InterviewDateTime from '../Screen/ChatDetail/InterviewDateTime';

const ChatJobStack = createNativeStackNavigator();
const ChatJobRoute = () => {
  return (
    <ChatJobStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={RouteName.COMPANIES_WEB}
    >
      <ChatJobStack.Screen
        name={RouteName.COMPANIES_WEB}
        component={Companies}
      />
      <ChatJobStack.Screen
        name={RouteName.DIRECT_WEB}
        component={DirectMessages}
      />
      <ChatJobStack.Screen
        name={RouteName.NOTIFICATION_WEB}
        component={ChatNotifications}
      />
      <ChatJobStack.Screen
        name={RouteName.CHAT_DETAIL_WEB}
        component={ChatDetail}
      />
      <ChatJobStack.Screen
        name={RouteName.INTERVIEW_DATETIME}
        component={InterviewDateTime}
      />
    </ChatJobStack.Navigator>
  );
};

export default ChatJobRoute;
