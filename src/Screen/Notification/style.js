import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../Resources/Colors';
import {theme} from '../../Util/constant';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  termText: {
    ...theme.fontMedium,
    lineHeight: 30,
  },

  // Notification tab styles
  noficationTabContainer: {
    width: '90%',
    marginHorizontal: '5%',
    // height: 50,
    borderRadius: 20,
    borderColor: Colors.PrimaryGray4,
    flexDirection: 'row',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
  noficationTabSunContainer: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lineView: {
    width: '40%',
    padding: 1,
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 0,
  },
});




