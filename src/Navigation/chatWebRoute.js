import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RouteName } from './routeName';
import Companies from '../Screen/Chat/Companies';
import DirectMessages from '../Screen/Chat/DirectMessage';
import ChatNotifications from '../Screen/Chat/NotificationsChat';
import ChatDetail from '../Screen/ChatDetail/index.web';
import InterviewDateTime from '../Screen/ChatDetail/InterviewDateTime';

const ChatWebStack = createNativeStackNavigator();
const ChatWebRoute = () => {
  return (
    <ChatWebStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={RouteName.COMPANIES_WEB}
    >
      <ChatWebStack.Screen
        name={RouteName.COMPANIES_WEB}
        component={Companies}
      />
      <ChatWebStack.Screen
        name={RouteName.DIRECT_WEB}
        component={DirectMessages}
      />
      <ChatWebStack.Screen
        name={RouteName.NOTIFICATION_WEB}
        component={ChatNotifications}
      />
      <ChatWebStack.Screen
        name={RouteName.CHAT_DETAIL_WEB}
        component={ChatDetail}
      />
      <ChatWebStack.Screen
        name={RouteName.INTERVIEW_DATETIME}
        component={InterviewDateTime}
      />
    </ChatWebStack.Navigator>
  );
};

export default ChatWebRoute;
