import {View, Text, TextInput, Image, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import CountryPicker from 'react-native-country-picker-modal';
import {countryPickerDownIcon} from '../../Resources/assets';
import {fontResize} from '../../Util/font';
import Colors from '../../Resources/Colors';

const CustomEmailView = ({
  onChange,
  placeholder,
  title,
  errMsg,
  secureTextEntry,
}) => {
  return (
    <View>
      <Text
        style={[styles.enterPhoneText, {color: errMsg ? 'red' : Colors.Black}]}>
        {title}
      </Text>
      <View
        style={[
          styles.container,
          {borderColor: errMsg ? 'red' : Colors.Silver},
        ]}>
        <View style={{flex: 1}}>
          <TextInput
            style={{
              paddingVertical: 10,
              paddingHorizontal: 6,
              outlineColor: 'white',
              color: Colors.Black,
            }}
            placeholder={placeholder}
            onChangeText={text => onChange(text)}
            keyboardType="email-address"
            secureTextEntry={secureTextEntry}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  enterPhoneText: {
    // padding: 12,
    marginVertical: 12,
    fontFamily: 'Gilroy-SemiBold',
    fontSize: fontResize(16),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    padding: 8,
  },
  countryPicker: {
    padding: 6,
    backgroundColor: '#F7F9FA',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
  },
});

export default CustomEmailView;
