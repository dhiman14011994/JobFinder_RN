import React from 'react';
import { StatusBar } from 'react-native';
import Route from './Navigation/route';
import { Provider } from 'react-redux';
import { store } from './Redux/store';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <StatusBar translucent backgroundColor={'transparent'} />
        <Route />
      </Provider>
    </>
  );
};

export default App;
