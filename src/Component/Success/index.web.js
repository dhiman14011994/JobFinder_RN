import { View, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import {
    CustomText,
} from '../../Component/CustomComponent';
import Colors from '../../Resources/Colors';
import { theme } from '../../Util/constant';
import { fontResize } from '../../Util/font';
import Modal from 'modal-enhanced-react-native-web';
import { SuccessIcon } from '../../Resources/assets';

// create a component
const Success = ({ setCreated, isCreated, navigation }) => {

    const { width, height } = Dimensions.get('window');

    const backToHome = () => {
        navigation.popToTop();
    };

    return (
        <Modal
            animationType="transparent"
            transparent={true}
            visible={isCreated}
            onRequestClose={() => {
                setCreated(!isCreated);
            }}>
            <View
                style={{
                    width: width * 0.25, height: height * 0.35,
                    alignSelf: 'center',
                    marginTop: 10,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    shadowColor: Colors.gray2,
                    backgroundColor: Colors.White,
                    padding: 10,
                    overflow: 'hidden',
                    shadowRadius: 20,
                    shadowOpacity: 1,
                    borderRadius: 10,
                    flexDirection: 'column'
                }}>

                <Image
                    style={{ width:height*0.1, height: height*0.1, alignSelf: 'center' }}
                    source={SuccessIcon}
                />

                <CustomText
                    style={{ margin:height*0.015 }}
                    textAlign={'center'}
                    {...theme.fontMedium}
                    fontSize={`${fontResize( height*0.025)}px`}
                    textColor={Colors.drakGray}
                >
                    Submitted
                </CustomText>


                <View style={{ flexDirection: 'row', width: '100%', marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => {
                            setTimeout(() => {
                                backToHome();
                            }, 200);
                            setCreated(false);
                        }}
                        style={{
                            width: '40%',
                            marginRight: '5%',
                            marginLeft: '5%',
                            backgroundColor: Colors.Blueberry,
                            padding: 10,
                            borderRadius: 5
                        }}>
                        <CustomText
                            textAlign={'center'}
                            {...theme.fontMedium}
                            fontSize={`${fontResize(14)}px`}
                            textColor={Colors.White}
                        >
                            OK
                        </CustomText>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Success;
