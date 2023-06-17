import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import React, { useState, useRef } from 'react';
import CountryPicker from 'react-native-country-picker-modal';
import { countryPickerDownIcon } from '../../Resources/assets';
import Colors from '../../Resources/Colors';
import { style } from './styles';

const CountryPickerView = ({ onPhoneNumberChange, errMsg }) => {
  const [code, setCode] = useState('US'); //US
  const [countryCode, setCountryCode] = useState('1'); //1
  const [isVisible, setVisible] = useState(false); //US
  const picker = useRef(null);

  const onSelect = (country) => {
    console.log('country>>>', country);
    setCountryCode(country.callingCode[0]);
    setCode(country.cca2);
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={[style.enterPhoneText, { color: Colors.Black }]}>
        Enter phone number
      </Text>
      <View
        style={[
          style.container,
          { borderColor: errMsg ? 'red' : Colors.Silver },
        ]}
      >
        <TouchableOpacity
          style={style.countryPicker}
          onPress={() => setVisible(true)}
        >
          <CountryPicker
            ref={picker}
            withEmoji={false}
            withCallingCode={true}
            withFilter={true}
            countryCode={code}
            visible={isVisible}
            onClose={() => {
              setVisible(false);
            }}
            withFlag={true}
            onSelect={onSelect}
          />
          <Text style={style.countryCodeText}>+{countryCode}</Text>
          <Image style={style.downIcone} source={countryPickerDownIcon} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <TextInput
            style={style.inputText}
            placeholder="Enter Phone Number"
            maxLength={15}
            onChangeText={(text) => onPhoneNumberChange({ countryCode, text })}
            keyboardType="phone-pad"
          />
        </View>
      </View>

      {/* Error message text */}
      <Text style={style.errText}>{errMsg}</Text>
    </View>
  );
};

export default CountryPickerView;
