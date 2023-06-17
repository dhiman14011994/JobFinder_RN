//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, Image, TextInput, TouchableOpacity } from 'react-native';
import Colors from '../../Resources/Colors';
import Strings from '../../Resources/Strings';
import { mxWidth } from '../../Util';
import { theme } from '../../Util/constant';


// create a component
const DeleteConfirmation = ({ modalVisible, setModalVisible }) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {

        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={styles.titleText}
            >
              {Strings.CONFIRMATION}
            </Text>
            <Text
              style={styles.descriptionText}
            >
              {Strings.DELETE_DESCRIPTION}
            </Text>

            <TextInput
              style={styles.inputText}
              placeholder=""
              maxLength={15}
              keyboardType="default"
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: .5, marginTop: 10 }}>
              <TouchableOpacity onPress={() => {
                setModalVisible(false)
              }} style={[styles.buttonStyle, { borderRightWidth: .5 }]}>
                <Text
                  style={styles.buttonText}
                >
                  {Strings.CANCEL}

                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonStyle}>
                <Text
                  style={styles.buttonText}
                >
                  {Strings.OK}
                </Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// define your styles

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titleText: {
    fontSize: 20,
    color: Colors.Black,
    ...theme.fontBold,
  },
  descriptionText: {
    margin: 10,
    fontSize: 14,
    color: Colors.Black,
    ...theme.fontRegular,
    textAlign: 'center'
  },
  buttonStyle: {
    width: 150,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 20,
    padding: mxWidth * 0.03,
    color: Colors.Blueberry,
    ...theme.fontMedium,
  },
  inputText: {
    margin: 10,
    width: mxWidth * 0.65,
    height: 40,
    paddingHorizontal:20,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 10,
    fontSize: 20,
    marginHorizontal: 30,
    paddingHorizontal: 10,
    color: 'red',
    ...theme.fontRegular
  }
});

//make this component available to the app
export default DeleteConfirmation;
