import { View, Image, StyleSheet, Text } from 'react-native';
import React from 'react';
import Colors from '../../Resources/Colors';
import { ic_search, filterIcon } from '../../Resources/assets';
import {
  TouchableOpacity,
  Dimensions,
  TextInput,
  Modal,
} from 'react-native-web';
import { isNative } from '../../Util';

const CustomSearchViewWeb = ({
  onChange,
  placeholder,
  value,
  IsFilterIcon,
  textinputContainer,
  IsSearchView,
}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={[styles.container, { borderColor: Colors.Silver }]}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <TextInput
            style={[
              styles.textinputContainer,
              textinputContainer,
              isNative ? {} : { outlineColor: Colors.Silver },
            ]}
            value={value}
            placeholder={placeholder}
            onChangeText={(text) => {
              onChange(text);
            }}
          />
          <Image source={ic_search} style={styles.imageIcon} />
        </View>
      </View>
      {/* {IsFilterIcon && (
        <TouchableOpacity style={styles.filterContainer}>
          <Image source={filterIcon} style={styles.filterIcon} />
        </TouchableOpacity>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '1%',
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    marginTop: '1%',
    width: '100%',
    height: '75%',
  },
  textinputContainer: {
    paddingVertical: 10,
    paddingHorizontal: 6,
    width: '100%',
    height: '100%',
    borderRadius: 8,
    // outlineColor: Colors.Silver,
    color: Colors.Silver,
    borderWidth: 0.3,
    borderColor: Colors.Silver,
  },
  imageIcon: {
    height: Dimensions.get('window').height * 0.03,
    width: Dimensions.get('window').height * 0.03,
    position: 'absolute',
    right: 10,
    top: 8,
    resizeMode: 'contain',
    zIndex: 1,
  },
  filterContainer: {
    height: '72%',
    width: '8%',
    borderWidth: 2,
    borderRadius: 8,
    marginTop: '1%',
    borderColor: Colors.Silver,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterIcon: {
    height: Dimensions.get('window').height * 0.03,
    width: Dimensions.get('window').height * 0.03,
    resizeMode: 'contain',
  },
});

export default CustomSearchViewWeb;
