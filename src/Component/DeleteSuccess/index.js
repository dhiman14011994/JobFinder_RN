//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, Image, TextInput, TouchableOpacity } from 'react-native';
import { success } from '../../Resources/assets';
import Colors from '../../Resources/Colors';
import Strings from '../../Resources/Strings';
import { mxWidth } from '../../Util';
import { theme } from '../../Util/constant';


// create a component
const DeleteSuccess = ({ modalVisible, setModalVisible }) => {
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible)
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <View style={{ flexDirection: 'row',alignItems:'center',justifyContent:'center' }}>
                            <Image
                                resizeMode="contain"
                                style={{ height: 80, width: 80 }}
                                source={success}
                            />
                            <Text
                                style={styles.titleText}
                            >
                                {Strings.DELETED}
                            </Text>


                        </View>
                        <TouchableOpacity style={styles.buttonStyle}>
                            <Text
                                style={styles.buttonText}
                            >
                                {Strings.RETURN}
                            </Text>
                        </TouchableOpacity>
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
        paddingTop: 20,
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
        fontSize: 24,
        color: Colors.Black,
        ...theme.fontMedium,
    },

    buttonStyle: {
        borderTopWidth: 1,
        marginTop: 20,
        borderColor: 'gray',
        width: 250,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {

        fontSize: 20,
        padding: mxWidth * 0.03,
        color: Colors.Blueberry,
        ...theme.fontMedium,
    },

});

//make this component available to the app
export default DeleteSuccess;
