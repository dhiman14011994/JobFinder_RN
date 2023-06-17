import React from 'react';
import {StyleSheet} from 'react-native';
import Colors from '../../Resources/Colors';
import {mxHeight} from '../../Util';
import {theme} from '../../Util/constant';

export const style = StyleSheet.create({
  backgroundText: {
    ...theme.fontSemiBold,
    color: Colors.Black,
    fontSize: 18,
  },
  colorButton: {
    marginTop: 16,
    paddingHorizontal: 18,
    height: 65,
    borderRadius: 12,
    borderColor: Colors.SilverLight,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  colorText: {
    ...theme.fontSemiBold,
    fontSize: 16,
    textTransform: 'capitalize',
    color: Colors.Black,
  },
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 22,
  },
  arrowImage: {
    width: 22,
    height: 22,
    tintColor: '#696D6D',
  },
  modalContainer: {
    height: mxHeight * 0.85,
    padding: 22,
  },
  colorItemButton: {
    flexDirection: 'row',
    paddingVertical: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  colorView: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 22,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  colorItemName: {
    textTransform: 'capitalize', color: Colors.Black
  },
  separatorComponent :{
    height: 1, backgroundColor: '#E8E8E8'
  }
});
