import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import HomeWeb from '../Screen/HomeWeb';
import { RouteName } from './routeName';
import JobEventMain from '../Screen/Job';
import NotificationHeader from '../Screen/NotificationHeader';
import CreateJob from '../Screen/CreateJob/index.web';
import Events from '../Screen/Events';
import PostDetails from '../Screen/PostDetails';

const WebStack = createNativeStackNavigator();

const JobWebStack = createNativeStackNavigator();
const JobWebRoute = () => {
  return (
    <JobWebStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={RouteName.JOB_STACK}
    >
      <JobWebStack.Screen name={RouteName.JOB_STACK} component={JobEventMain} />
      <JobWebStack.Screen name={RouteName.CREATE_JOB} component={CreateJob} />
      <JobWebStack.Screen name={RouteName.EVENT_STACK} component={Events} />
    </JobWebStack.Navigator>
  );
};

const WebRoute = () => {
  return (
    <WebStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={RouteName.HOME_WEB}
    >
      <WebStack.Screen name={RouteName.HOME_WEB} component={HomeWeb} />
      <WebStack.Screen name={RouteName.JOB_WEB} component={JobEventMain} />
      <WebStack.Screen
        name={RouteName.NOTIFICATION_HEADER_STACK}
        component={NotificationHeader}
      />
      <WebStack.Screen name={RouteName.POST_DETAILS} component={PostDetails} />
    </WebStack.Navigator>
  );
};

export default WebRoute;
