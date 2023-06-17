import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RouteName } from './routeName';
import JobWeb from '../Screen/JobWeb/index.web';
import Events from '../Screen/Events/index.web';
import CreateJob from '../Screen/CreateJob/index.web';

const JobWebStack = createNativeStackNavigator();
const JobWebRoute = () => {
  return (
    <JobWebStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      // initialRouteName={RouteName.JOB_STACK}
    >
      <JobWebStack.Screen name={RouteName.JOB_STACK} component={JobWeb} />
      {/* <JobWebStack.Screen name={RouteName.CREATE_JOB} component={CreateJob} />
      <JobWebStack.Screen name={RouteName.EVENT_STACK} component={Events} /> */}
    </JobWebStack.Navigator>
  );
};

export default JobWebRoute;
